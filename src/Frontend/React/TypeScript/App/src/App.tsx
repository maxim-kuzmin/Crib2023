import React from 'react';
import logo from './logo.svg';
import {
  LayoutAsideView,
  LayoutContentView,
  LayoutFooterView,
  LayoutHeaderView,
  NotificationView
} from './views';
import { LayoutControl } from './controls';

export default function App () {
  return (
    <>
    <NotificationView/>
    <LayoutControl
      createAsideView={() => <LayoutAsideView logoUrl={logo}/>}
      createContentView={(backgroundColor) => <LayoutContentView backgroundColor={backgroundColor}/>}
      createFooterView={() => <LayoutFooterView/>}
      createHeaderView={() => <LayoutHeaderView/>}/>
    </>
  );
}
