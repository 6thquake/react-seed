import React from 'react';
import { Link } from 'react-router-dom';
import SubRoutes from '$components/RouteWithSubRoutes/SubRoutes';
import asyncComponent from '$components/AsyncComponent';
import StarIcon from '@material-ui/icons/Star';
import InboxIcon from '@material-ui/icons/MoveToInbox';

const Hello = asyncComponent(() => import('$pages/Hello'));

const World = asyncComponent(() => import('$pages/World'));

export default [
  {
    path: '/hello',
    name: 'hello',
    icon: <StarIcon />,
    component: SubRoutes,
    routes: [
      {
        path: '/hello/1',
        name: 'one',
        component: SubRoutes,
        routes: [
          {
            path: '/hello/1/2',
            name: <Link to="/hello/1">Hello</Link>,
            component: Hello,
          },
        ],
      },
    ],
  },
  {
    path: '/world',
    name: 'world',
    icon: <InboxIcon />,
    component: SubRoutes,
    routes: [
      {
        path: '/world/3',
        name: 'three',
        component: World,
      },
    ],
  },
];
