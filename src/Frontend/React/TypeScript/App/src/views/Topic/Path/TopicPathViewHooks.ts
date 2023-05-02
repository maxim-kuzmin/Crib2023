import { useMemo } from 'react';
import appInstance from '../../../app/AppInstance';
import { getTopicPathViewResourcePath, type TopicPathViewResource } from './TopicPathViewResource';

export interface TopicPathViewHooks {
  readonly useResource: () => TopicPathViewResource;
}

export function createTopicPathViewHooks (): TopicPathViewHooks {
  function useResource (): TopicPathViewResource {
    const translator = appInstance.hooks.Features.Localization.useTranslator(getTopicPathViewResourcePath());

    const tTitleForRoot: string = translator.translate('@@TitleForRoot');

    const { language } = translator;

    return useMemo(() => {
        const result: TopicPathViewResource = {
          getTitleForRoot: () => tTitleForRoot,
          language
        };

        return result;
      },
      [
        tTitleForRoot,
        language
      ]
    );
  }

  return { useResource };
}
