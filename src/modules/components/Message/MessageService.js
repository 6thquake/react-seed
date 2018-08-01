import MessageQueen from '$core/MessageQueen';

/**
 * @class MessageService
 * @for Message组件
 * @constructor 消息业务实现
  */
class MessageService {
    constructor($snackbar) {
        this.$snackbar = $snackbar;
        this.init();
    }

    static defaultConfig = {
        maxLength: 1,
        maxHistory: 20,
        delay: 3000,
        position: {
            vertical: 'top',
            horizontal: 'right'
        }
    };

    init() {
        this.messages = [];
        this.histories = [];
        this.messageQueen = MessageQueen;
        this.messageQueen.addObserver(() => {
            if (this.messages.length <= 0) {
                this.poll();
            }
        });
        this.messageQueen.notifyObservers();
    }

    poll() {
        const messageQueen = this.messageQueen;
        const messages = this.messages;
        const histories = this.histories;
        const len = MessageService.defaultConfig.maxLength - messages.length;

        for (let i = len; i > 0; i--) {
            if (messageQueen.isEmpty()) {
                break;
            }
            messages.push(messageQueen.poll());
        }

        if (!messages.length) {
            return;
        }

        let message = messages[0];
        let record = null;

        switch (message.type) {
            case 'WARNING':
                record = this.warning(message);
                break;

            case 'ERROR':
                record = this.error(message);
                break;

            case 'SUCCESS':
                record = this.success(message);
                break;

            case 'INFO':
            default:
                record = this.info(message);
                break;
        }

        record.then(() => {
            const index = messages.findIndex((m => m === message));
            messages.splice(index, 1);
            if (histories.length > MessageService.defaultConfig.maxHistory) {
                histories.shift();
            }
            histories.push(message);
            if (!messageQueen.isEmpty()) {
                this.poll();
            }
        });
    }

    tip(message, config = {}) {
        return new Promise((resolve, reject) => {
            const {type, content, anchorOrigin, autoHideDuration, onClose} = message;
            const {content: c} = config;
            const $snackbar = this.$snackbar;
            $snackbar.setState({
                type,
                open: true,
                anchorOrigin: anchorOrigin || MessageService.defaultConfig.position,
                autoHideDuration: autoHideDuration || MessageService.defaultConfig.delay,
                message: content || c,
                onClose() {
                    $snackbar.setState({
                        open: false
                    });
                    typeof onClose === 'function' && onClose();
                    resolve()
                }
            })
        });
    }

    success(message) {
        return this.tip(message, {
            content: '成功'
        });
    }

    error(message) {
        return this.tip(message, {
            content: '错误'
        });
    }

    warning(message) {
        return this.tip(message, {
            content: '警告'
        });
    }

    info(message) {
        return this.tip(message, {
            content: '信息'
        });
    }
}

export default MessageService;