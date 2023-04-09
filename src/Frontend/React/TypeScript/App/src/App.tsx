import React, { memo } from 'react';
import logo from './logo.svg';
import { AppNotificationView } from './views/App/Notification';
import { LayoutControl } from './controls/Layout/LayoutControl';
import { AppLayoutAsideView } from './views/App/Layout/Aside';
import { AppLayoutContentView } from './views/App/Layout/Content';
import { AppLayoutFooterView } from './views/App/Layout/Footer';
import { AppLayoutHeaderView } from './views/App/Layout/Header';

export const App: React.FC = memo(function App () {
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
});
