import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { Links } from '../enums';
import { Core } from '../enums/core.enum';
import { IRouterConfig } from '../types/routes.types';
import { getLocaleStorageItem } from '../utils/locale-storage.utils';

const RouteWithSubRoutes = (route: IRouterConfig) => {
  const authenticated: boolean = !!getLocaleStorageItem(Core.Token);
  return (
      <Route
        path={ route.path }
        render={ (props) =>
          route.redirect ? <Redirect to={ route.redirect }/> :
            route.private ? (
              authenticated ? route.component &&
                <route.component { ...props } routes={ route.routes }/> : <Redirect to={ Links.HOME }/>
            ) : route.component && <route.component { ...props } routes={ route.routes }/>
        }
      />
  );
};

export default RouteWithSubRoutes;