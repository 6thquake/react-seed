import React from 'react';
import { Link } from 'react-router-dom';
import RouteComponent, { renderRoutes } from '$components/Router';
import { loadComponent } from '$components/AsyncComponent';
import StarIcon from '@material-ui/icons/Star';
import InboxIcon from '@material-ui/icons/MoveToInbox';

const Home = loadComponent(() => import('$pages/Home'));

const Hello = loadComponent(() => import('$pages/Hello'));

const World = loadComponent(() => import('$pages/World'));

const China = loadComponent(() => import('$pages/China'));

const Shanghai = loadComponent(() => import('$pages/Shanghai'));

const DyncRoute = loadComponent(() => import('$pages/DyncRoute'));

export default [
  {
    path: '/',
    name: 'Home',
    component: Home,
    icon: <StarIcon />,
    exact: true,
  },
  {
    path: '/hello',
    name: 'Hello',
    icon: <StarIcon />,
    component: RouteComponent,
    routes: [
      {
        path: '/hello/1',
        name: 'Hello-1',
        component: Hello,
        routes: [
          {
            path: '/hello/1/world',
            name: 'World',
            component: World,
          },
          {
            path: '/hello/1/china',
            name: 'China',
            icon: <InboxIcon />,
            component: China,
            routes: [
              {
                path: '/hello/1/china/shanghai',
                name: 'Shanghai',
                component: Shanghai,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '/dr',
    name: '测试动态路由',
    component: DyncRoute,
  },
];
