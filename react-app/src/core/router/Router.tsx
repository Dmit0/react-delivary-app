import React from 'react';
import { Switch } from 'react-router';
import { IRouterConfig } from '../types/routes.types';
import RouteWithSubRoutes from './RouteWithSubRoutes';

const Router = ({ routes }: { routes: IRouterConfig[] }) => {
  return (
    <Switch>
      { routes.map((route: IRouterConfig) => <RouteWithSubRoutes key={ route.path } { ...route } />) }
    </Switch>
)};

export default Router;