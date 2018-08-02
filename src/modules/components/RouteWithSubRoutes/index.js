import React from 'react';
import {Route} from "react-router-dom";
import store from '../../redux'
import compose from 'recompose/compose';
import {
    connect
} from 'react-redux';
import {
  pageLoad
} from "../../redux/actions/pageLoad";
import {
  PAGE_LOAD
} from '../../redux/actionTypes'
import ComponentWrapper from '../../../modules/components/AsyncComponent/ComponentWrapper'
function RouteWithSubRoutes(routes) {
    const SubRoutes = route => {
        const {component, ...rest} = route;
        store.dispatch(pageLoad(false));
        
        return (
            <Route
                {...rest}
                render={props => (
                    // <route.components {...props} routes={route.routes}/>
                    <ComponentWrapper> 
                        <route.component {...props} routes={route.routes}/>
                    </ComponentWrapper>
                )}
            />
        );
    };

    if (routes && routes.length) {
        return routes.map((route, i) => <SubRoutes key={i} {...route} />);
    }
    return [];
}

export default RouteWithSubRoutes;