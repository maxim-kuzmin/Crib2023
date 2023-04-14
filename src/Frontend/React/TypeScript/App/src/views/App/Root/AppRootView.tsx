import React, { memo } from 'react';
import { AppLayoutAsideView } from '../Layout/Aside';
import { AppLayoutContentView } from '../Layout/Content';
import { AppLayoutFooterView } from '../Layout/Footer';
import { AppLayoutHeaderView } from '../Layout/Header';
import { AppNotificationView } from '../Notification';
import logo from './logo.svg';
import { LayoutControl } from '../../../controls';

export const AppRootView: React.FC = memo(
function AppRootView () {
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
