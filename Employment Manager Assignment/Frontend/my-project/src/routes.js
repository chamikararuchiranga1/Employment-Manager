import React from 'react';
import DefaultLayout from './containers/DefaultLayout';

const Employment = React.lazy(() => import('./views/Employment'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/blueTac/employment', name: 'Employment', component: Employment },
];

export default routes;
