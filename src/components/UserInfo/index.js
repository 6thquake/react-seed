import React, {Component} from 'react';
import {withStyles} from '@6thquake/react-material/styles';
import IconButton from '@6thquake/react-material/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Avatar from '@6thquake/react-material/Avatar';
import Popover from '@6thquake/react-material/Popover';
import Card from '@6thquake/react-material/Card';
import CardHeader from '@6thquake/react-material/CardHeader';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Api from './dao';
import DefaultAvatar from '../../assets/svg/avatar';
import compose from 'recompose/compose';
import {connect} from 'react-redux';
import {getUserInfo} from "../../redux/actions/userInfo";

const styles = theme => ({
    card: {
        minWidth: 275
    },
    avatar: {
        backgroundColor: '#FFF'
    },
    title: {},
    subheader: {},
    hide: {
        display: 'none'
    },
    flex: {
        flex: 1
    }
});

class UserInfo extends Component {
    state = {
        anchorEl: null,
        ssoUrl: '',
        principalModel: {},
    };

    componentDidMount() {
        const {dispatch} = this.props;

        Api.getBasicInfo().then(res => {
            if (!res) {
                return;
            }
            const {ssoUrl, principalModel} = res.data;
            this.setState({
                ssoUrl: `${ssoUrl}/logout`,
                principalModel
            });
            dispatch(getUserInfo(principalModel));
        })
    }

    handleMenu = event => {
        this.setState({anchorEl: event.currentTarget});
    };
    handleClose = () => {
        this.setState({anchorEl: null});
    };

    logout = () => {
        this.handleClose();
        window.location.href = this.state.ssoUrl;
    };

    render() {
        const {classes} = this.props;
        const {anchorEl, principalModel} = this.state;
        const {displayName, department, employee} = principalModel;
        const open = Boolean(anchorEl);

        return (
            <div>
                <IconButton
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    color="inherit"
                >
                    <AccountCircle/>
                </IconButton>
                <Popover
                    open={open}
                    anchorEl={anchorEl}
                    onClose={this.handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                >
                    <Card className={classes.card}>
                        <CardHeader
                            classes={{title: classes.title, subheader: classes.subheader}}
                            avatar={<Avatar classes={{root: classes.avatar}}><DefaultAvatar/></Avatar>}
                            title={displayName}
                            subheader={
                                <div>
                                    <div>{employee}</div>
                                    <div>{department}</div>
                                </div>
                            }
                            action={<IconButton onClick={this.logout}><ExitToApp/></IconButton>}
                        />
                    </Card>
                </Popover>
            </div>
        );
    }
}

export default compose(connect(), withStyles(styles))(UserInfo);