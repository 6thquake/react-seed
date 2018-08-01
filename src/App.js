import React from 'react';
import {HashRouter} from "react-router-dom";
import {Provider} from 'react-redux';
import {withStyles, MuiThemeProvider} from '@6thquake/react-material/styles';

import SideBar from '$components/SideBar';
import Container from '$components/Container';
import Message from '$components/Message';
import BrowserTitle from '$components/BrowserTitle';
import LocaleProvider from '$components/LocaleProvider';

import theme from '$themes'
import store from '$redux';

const styles = theme => ({
    root: {
        display: 'flex'
    }
});

class App extends React.Component {
    render() {
        const {classes} = this.props;

        return (
            <Provider store={store}>
                <MuiThemeProvider theme={theme}>
                    <LocaleProvider>
                        <HashRouter>
                            <div className={classes.root}>
                                <SideBar/>
                                <Container/>
                            </div>
                        </HashRouter>
                        <Message/>
                        <BrowserTitle/>
                    </LocaleProvider>
                </MuiThemeProvider>
            </Provider>
        );
    }
}

export default withStyles(styles, {withTheme: true})(App);
