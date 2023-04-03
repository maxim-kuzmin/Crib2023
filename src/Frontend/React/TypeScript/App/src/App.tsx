import React from 'react';
import logo from './logo.svg';
import {
  AppLayoutAsideView,
  AppLayoutContentView,
  AppLayoutFooterView,
  AppLayoutHeaderView,
  AppNotificationView,
  LayoutControl
} from './all';

export const App: React.FC = () => {
  return (
    <>
      <AppNotificationView/>
      <LayoutControl
        createAsideView={() => <AppLayoutAsideView logoUrl={logo}/>}
        createContentView={(backgroundColor) => <AppLayoutContentView backgroundColor={backgroundColor}/>}
        createFooterView={() => <AppLayoutFooterView/>}
        createHeaderView={() => <AppLayoutHeaderView/>}
      />
    </>
  );
}
