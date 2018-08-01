import React, {Component} from 'react';
import AppBar from '@6thquake/react-material/AppBar';
import Toolbar from '@6thquake/react-material/Toolbar';
import Typography from '@6thquake/react-material/Typography';
import {withStyles} from '@6thquake/react-material/styles';
import classNames from 'classnames';
import User from '$components/User';
import LanguageMenu from '$components/LanguageMenu';
import {withLocale} from '@6thquake/react-material/LocaleProvider';
import compose from 'recompose/compose';
import {connect} from 'react-redux';

const styles = theme => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    appBarShift: {
        transition: theme.transitions.create(['width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    flex: {
        flex: 1
    }
});

class Bar extends Component {
    render() {
        const {classes, open, title} = this.props;

        return (
            <AppBar
                position="absolute"
                className={classNames(classes.appBar, open && classes.appBarShift)}>
                <Toolbar>
                    <Typography variant="title" color="inherit" noWrap className={classes.flex}>
                        {title}
                    </Typography>
                    <LanguageMenu/>
                    <User/>
                </Toolbar>
            </AppBar>
        )
    }
}

export default compose(connect(state => ({open: state.open})), withLocale({name: 'AppBar'}), withStyles(styles))(Bar);
