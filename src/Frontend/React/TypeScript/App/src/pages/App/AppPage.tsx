import React, { memo, useCallback, useEffect } from 'react';
import { useAppInstance } from '../../app';
import {
  AppLayoutAsideView,
  AppLayoutContentView,
  AppLayoutFooterView,
  AppLayoutHeaderView,
  AppNotificationView,
} from '../../views';
import logo from './logo.svg';

export const AppPage: React.FC = memo(
function AppPage (): React.ReactElement | null {
  const { controls, hooks, modules } = useAppInstance();

  const serviceOfLocalization = hooks.Features.App.Localization.useService();

  const serviceOfTopicPage = modules.Pages.Topic.getService();

  useEffect(
    () => {
      serviceOfLocalization.removeLanguageFromSearchParams();
    }
  );

  const createTopicPageUrl = useCallback(
    (topicId: number) => serviceOfTopicPage.createUrl({ topicId }),
    [serviceOfTopicPage]
  );

  return (
    <>
      <AppNotificationView/>
      <controls.Layout
        createAsideView={() => <AppLayoutAsideView createTopicPageUrl={createTopicPageUrl} logoUrl={logo}/>}
        createContentView={(backgroundColor) => <AppLayoutContentView backgroundColor={String(backgroundColor)}/>}
        createFooterView={() => <AppLayoutFooterView/>}
        createHeaderView={() => <AppLayoutHeaderView createTopicPageUrl={createTopicPageUrl}/>}
      />
    </>
  );
});
