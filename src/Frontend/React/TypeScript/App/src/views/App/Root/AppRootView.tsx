import React, { memo, useEffect } from 'react';
import { useAppInstance } from '../../../app';
import { AppLayoutAsideView } from '../Layout/Aside';
import { AppLayoutContentView } from '../Layout/Content';
import { AppLayoutFooterView } from '../Layout/Footer';
import { AppLayoutHeaderView } from '../Layout/Header';
import { AppNotificationView } from '../Notification';
import logo from './logo.svg';

export const AppRootView: React.FC = memo(
function AppRootView (): React.ReactElement | null {
  const { controls, hooks } = useAppInstance();

  const serviceOfLocalization = hooks.Features.Localization.useService();

  useEffect(
    () => {
      serviceOfLocalization.removeLanguageFromSearchParams();
    }
  );

  return (
    <>
      <AppNotificationView/>
      <controls.Layout
        createAsideView={() => <AppLayoutAsideView logoUrl={logo}/>}
        createContentView={(backgroundColor) => <AppLayoutContentView backgroundColor={String(backgroundColor)}/>}
        createFooterView={() => <AppLayoutFooterView/>}
        createHeaderView={() => <AppLayoutHeaderView/>}
      />
    </>
  );
});
