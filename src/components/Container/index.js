import React, {Component} from 'react';
import routes from '../../config/routes';
import AppBar from '@components/AppBar';
import RouteWithSubRoutes from '../../components/RouteWithSubRoutes';
import {withStyles} from 'react-material/styles';


const styles = theme => ({
    right: {
        flex: 1,
        overflow: 'hidden'
    },
    container: {
        position: 'relative',
        height: '100vh',
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        backgroundColor: theme.palette.background.container,
        overflowX: 'hidden',
        height: '100%'
    }
});


class Container extends Component {

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.right}>
                <div className={classes.container}>
                    <AppBar handleDrawerOpen={this.handleDrawerOpen}/>
                    <main id='main' className={classes.content}>
                        <div className={classes.toolbar}/>
                        {RouteWithSubRoutes(routes)}
                    </main>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Container);
