import { Location } from 'history';
import { ReactNode } from 'react';
import * as React from 'react';
import { RouteConfigComponentProps } from 'react-router-config';

export interface IRouterConfig {
  key?: React.Key;
  location?: Location;
  component?: React.ComponentType<any>;
  path: string;
  exact: boolean;
  strict?: boolean;
  routes?: IRouterConfig[];
  render?: (props: RouteConfigComponentProps<any>) => React.ReactNode;
  redirect?: string;
  private?: boolean;
  fallback?: NonNullable<ReactNode> | null;
  [propName: string]: any;
}