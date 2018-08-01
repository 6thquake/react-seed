import React, {Component} from 'react';
import Typography from '@6thquake/react-material/Typography';
import {withStyles} from '@6thquake/react-material/styles';
import IconButton from '@6thquake/react-material/IconButton';
import Tooltip from '@6thquake/react-material/Tooltip'
import Language from '@material-ui/icons/Language';
import Popover from '@6thquake/react-material/Popover';
import MenuItem from '@6thquake/react-material/MenuItem';
import {withLocale} from '@6thquake/react-material/LocaleProvider';
import language from '$utils/language';
import compose from 'recompose/compose';

const styles = theme => ({});

class LanguageMenu extends Component {
    state = {
        anchorEl: null,
        value: language.getFormatLang(),
        options: [
            {label: '中文', value: 'zh'},
            {label: 'English', value: 'en'}
        ],
    };
    handleMenu = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleMenuItemClick = (option) => () => {
        const {changeLocale} = this.props;
        const {label, value} = option;
        this.setState({
            value,
            anchorEl: null,
            currentLanguage: label,
        });
        language.setLang(value);
        changeLocale && changeLocale(value)();
    };

    handleClose = event => {
        this.setState({
            anchorEl: null,
        });
    };

    getLabel = () => {
        let label = '';
        const {value} = this.state;
        this.state.options.some(o => {
            if (o.value === value) {
                label = o.label;
                return true;
            }
            return false;
        });
        return label;
    };

    render() {
        const {classes} = this.props;
        const {anchorEl} = this.state;
        const open = Boolean(anchorEl);
        const label = this.getLabel();
        return (
            <div>
                <Tooltip title={label}>
                    <IconButton
                        aria-haspopup="true"
                        onClick={this.handleMenu}
                        color="inherit"
                    >
                        <Language/>
                    </IconButton>
                </Tooltip>
                <Popover
                    open={open}
                    anchorEl={anchorEl}
                    onClose={this.handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >
                    {this.state.options.map((option, index) => (
                        <MenuItem
                            key={option.value}
                            onClick={this.handleMenuItemClick(option)}
                        >
                            <Typography>{option.label}</Typography>
                        </MenuItem>
                    ))}
                </Popover>
            </div>
        );
    }
}

export default compose(withLocale({name: 'ehr'}), withStyles(styles))(LanguageMenu);