import { useMemo } from 'react';
import app, { LocalizationTarget } from '../../../app';
import { type TopicPathViewHooks } from './TopicPathViewHooks';
import { type TopicPathViewResource } from './TopicPathViewResource';

export function createTopicPathViewHooks (): TopicPathViewHooks {
  function useResource (): TopicPathViewResource {
    const hooksOfLocalization = app.module.getLocalizationHooks();

    const translator = hooksOfLocalization.useTranslator(LocalizationTarget.TopicPathView);

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
