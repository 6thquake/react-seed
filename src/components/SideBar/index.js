import React, {Component} from 'react';
import {TreeMenu} from '@6thquake/react-material/Menu';
import menuService from './service';
import Divider from '@6thquake/react-material/Divider';
import IconButton from '@6thquake/react-material/IconButton';
import {withStyles} from '@6thquake/react-material/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {withLocale} from '@6thquake/react-material/LocaleProvider';
import Logo from './svg/Logo';
import Config from './svg/Config';
import IndicatorLibrary from './svg/IndicatorLibrary';
import PerformanceManage from './svg/PerformanceManage';
import PlatformManage from './svg/PlatformManage';
import SystemManage from './svg/SystemManage';
import ManageCenter from './svg/ManageCenter';
import CommunicationrResults from './svg/CommunicationrResults';
import MyGoal from './svg/MyGoal';
import SelfEvaluation from './svg/SelfEvaluation';
import MyApproval from './svg/MyApproval';
import Distribution from './svg/Distribution';
import Progress from './svg/Progress';
import Scrollbar from '@6thquake/react-material/Scrollbar';
import compose from 'recompose/compose';
import SessionStorage from '../../util/SessionStorage';
import {SESSIONSTORAGE_KEYS} from '../../util/constant';
import difference from 'lodash/difference';
import {withRouter} from 'react-router-dom';
import classNames from 'classnames';
import Drawer from '@6thquake/react-material/Drawer';
import {connect} from 'react-redux';
import {operateMenuOpen} from "../../redux/actions/menuOpen";

const styles = theme => {
    return {
        menuButton: {
            marginLeft: 12,
            marginRight: 36
        },
        drawerPaper: {
            position: 'relative',
            whiteSpace: 'nowrap',
            overflowX: 'hidden',
            width: 240,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            })
        },
        drawerPaperClose: {
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing.unit * 7,
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing.unit * 9
            }
        },
        docked: {
            overflowX: 'hidden',
            overflowY: 'auto'
        },
        paperAnchorDockedLeft: {
            borderRight: 'none'
        },
        menu: {
            height: '100%',
            overflow: 'hidden',
            background: 'rgba(0, 0, 0, 0.87)',
            '& svg': {
                fontSize: '14px',
                marginRight: '8px',
                marginBottom: '2px',
                verticalAlign: 'text-bottom'
            },
            '& .material-icons': {
                marginBottom: '2px'
            }
        },
        sideCollepseNav: {
            textAlign: 'center',
            width: '100%',
            height: '50px',
            backgroundColor: 'rgba(0, 0, 0, 0.87)'
        },
        sideCollepseNavBtn: {
            color: '#fff'
        },
        divider: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)'
        }
    }
};

class SideBar extends Component {
    state = {
        menu: null,
        icons: {
            PerformanceManage: <PerformanceManage/>,
            PlatformManage: <PlatformManage/>,
            SystemManage: <SystemManage/>,
            Config: <Config/>,
            IndicatorLibrary: <IndicatorLibrary/>,
            ManageCenter: <ManageCenter/>,
            CommunicationrResults: <CommunicationrResults/>,
            MyGoal: <MyGoal/>,
            SelfEvaluation: <SelfEvaluation/>,
            MyApproval: <MyApproval/>,
            Distribution: <Distribution/>,
            Progress: <Progress/>
        }
    };

    componentDidMount() {
        this.getMenu();
    }

    componentDidUpdate(prevProps) {
        let {locale} = this.props;
        if (locale !== prevProps.locale) {
            this.getMenu()
        }
    }

    getMenu = () => {
        menuService.getMenu().then(res => {
            if (res) {
                const {data} = res;
                if (data) {
                    const routes = data.retValue[0] && data.retValue[0].routes || [];
                    const openKeys = this.getOpenKeys();
                    this.setState({
                        menu: this.transformIcon(routes),
                        openKeys: this.getSessionStorageMenu(openKeys)
                    });
                }
            }
        });
    };

    transformIcon(routes) {
        const {icons} = this.state;
        routes.forEach(r => {
            let icon = r.icon;
            if (icon) {
                r.icon = icons[icon] || r.icon;
            }
            if (r.routes && r.routes.length) {
                this.transformIcon(r.routes);
            }
        });
        return routes;
    }

    setSessionStorageMenu() {
        const {hash} = window.location;
        const pathname = hash.substr(1);
        let openKeys = [];
        pathname.split('/').reduce((prev, next) => {
            const path = prev + '/' + next;
            openKeys.push(path);
            return path;
        });
        SessionStorage.put(SESSIONSTORAGE_KEYS[0], openKeys);
    }

    getSessionStorageMenu(openKeys) {
        const sessionStorageKeys = SessionStorage.get(SESSIONSTORAGE_KEYS[0]);
        if (sessionStorageKeys && difference(sessionStorageKeys, openKeys).length) {
            return sessionStorageKeys;
        }
        return openKeys;
    }

    changeRoute = (info) => {
        const route = info.key;
        const {history} = this.props;
        history.push(route);
        this.setSessionStorageMenu();
    };

    getOpenKeys() {
        const {location: {pathname}} = this.props;
        let openKeys = [];
        pathname.split('/').reduce((prev, next) => {
            const path = prev + '/' + next;
            openKeys.push(path);
            return path;
        });

        return openKeys;
    }

    triggerCollapsed = () => {
        const {dispatch, open} = this.props;
        dispatch(operateMenuOpen(!open));
    };

    render() {
        const {menu, openKeys} = this.state;
        const {classes, triggerCollapsed, open} = this.props;

        return (
            <Drawer
                variant="permanent"
                classes={{
                    paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose),
                    docked: classes.docked,
                    paperAnchorDockedLeft: classes.paperAnchorDockedLeft
                }}
                open={open}
            >
                <Logo open={open}/>
                <div className={classes.menu}>
                    <Scrollbar>
                        {menu && (
                            <TreeMenu
                                list={menu}
                                mode='inline'
                                itemKeysMap={{
                                    children: 'routes',
                                    key: 'path'
                                }}
                                defaultOpenKeys={openKeys}
                                defaultSelectedKeys={openKeys}
                                theme='dark'
                                inlineCollapsed={!open}
                                onClick={this.changeRoute}
                            />
                        )}
                    </Scrollbar>
                </div>
                <Divider className={classes.divider}/>
                <div className={classes.sideCollepseNav}>
                    <IconButton className={classes.sideCollepseNavBtn} onClick={this.triggerCollapsed}>
                        {!open ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                    </IconButton>
                </div>
            </Drawer>
        )
    }
}

export default compose(connect(state => ({open: state.menuOpen})), withRouter, withLocale({name: 'ehr'}), withStyles(styles))(SideBar);