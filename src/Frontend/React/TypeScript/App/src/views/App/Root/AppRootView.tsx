import React, { memo, useEffect } from 'react';
import { getModule } from '../../../app';
import { LayoutControl } from '../../../controls';
import { AppLayoutAsideView } from '../Layout/Aside';
import { AppLayoutContentView } from '../Layout/Content';
import { AppLayoutFooterView } from '../Layout/Footer';
import { AppLayoutHeaderView } from '../Layout/Header';
import { AppNotificationView } from '../Notification';
import logo from './logo.svg';

export const AppRootView: React.FC = memo(
function AppRootView () {
  const hooksOfLocalization = getModule().getLocalizationHooks();

  const serviceOfLocalization = hooksOfLocalization.useService();

  useEffect(
    () => {
      if (serviceOfLocalization.isLanguageFoundBySearchParam()) {
        serviceOfLocalization.removeSearchParamForLanguage();
      }
    }
  );

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
