import React from 'react';
import { Link } from 'react-router-dom';
import SubRoutes from '../modules/components/RouteWithSubRoutes/SubRoutes';
import asyncComponent from '../modules/components/AsyncComponent';
import StarIcon from '@material-ui/icons/Star';
import InboxIcon from '@material-ui/icons/MoveToInbox';

const Hello = asyncComponent(() => import('$pages/Hello'));

const World = asyncComponent(() => import('$pages/World'));

export default [
  {
    path: '/hello',
    name: 'module one',
    icon: <StarIcon />,
    component: SubRoutes,
    routes: [
      {
        path: '/hello/world',
        name: 'my',
        component: SubRoutes,
        routes: [
          {
            path: '/hello/world/1',
            name: <Link to="/hello/world/1">Hello</Link>,
            component: Hello,
          },
        ],
      },
    ],
  },
  {
    path: '/world',
    name: 'module two',
    icon: <InboxIcon />,
    component: SubRoutes,
    routes: [
      {
        path: '/world/2',
        name: 'World',
        component: World,
      },
    ],
  },
];
