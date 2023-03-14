import React from 'react';
import logo from './logo.svg';
import {
  AppLayoutAsideView,
  AppLayoutContentView,
  AppLayoutFooterView,
  AppLayoutHeaderView,
  AppNotificationView,
} from './views';
import { LayoutControl } from './controls';

export default function App () {
  return (
    <>
    <AppNotificationView/>
    <LayoutControl
      createAsideView={() => <AppLayoutAsideView logoUrl={logo}/>}
      createContentView={(backgroundColor) => <AppLayoutContentView backgroundColor={backgroundColor}/>}
      createFooterView={() => <AppLayoutFooterView/>}
      createHeaderView={() => <AppLayoutHeaderView/>}/>
    </>
  );
}
