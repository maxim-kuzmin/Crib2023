import { useMemo } from 'react';
import { useAppInstance } from '../../../app';
import { getTopicPathViewResourcePath, type TopicPathViewResource } from './TopicPathViewResource';

export interface TopicPathViewHooks {
  readonly useResource: () => TopicPathViewResource;
}

export function createTopicPathViewHooks (): TopicPathViewHooks {
  function useResource (): TopicPathViewResource {
    const { hooks } = useAppInstance();

    const translator = hooks.Features.App.Localization.useTranslator(getTopicPathViewResourcePath());

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
