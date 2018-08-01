import React from 'react';
import {Link} from "react-router-dom";
import SubRoutes from '../components/RouteWithSubRoutes/SubRoutes';
import asyncComponent from '../components/AsyncComponent';


const Hello = asyncComponent(() => import('@pages/Hello'));

const World = asyncComponent(() => import('@pages/World'));

export default [
    {
        path: '/hello',
        name: 'module one',
        component: SubRoutes,
        routes: [
            {
                path: '/hello/world',
                name: '',
                component: SubRoutes,
                routes: [
                    {
                        path: '/hello/world/1',
                        name: <Link to="/hello/world/1">Hello</Link>,
                        component: Hello,
                    },
                ]
            }
        ]
    },
    {
        path: '/world',
        name: 'module two',
        component: SubRoutes,
        routes: [
            {
                path: '/world/2',
                name: 'World',
                component: World,
            },
        ]
    }
]