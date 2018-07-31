import React from 'react';
import {Route} from "react-router-dom";

function RouteWithSubRoutes(routes) {
    const SubRoutes = route => {
        const {component, ...rest} = route;
        return (
            <Route
                {...rest}
                render={props => (
                    <route.component {...props} routes={route.routes}/>
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