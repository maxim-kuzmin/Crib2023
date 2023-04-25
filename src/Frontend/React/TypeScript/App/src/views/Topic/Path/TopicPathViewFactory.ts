import { useMemo } from 'react';
import { getModule, LocalizationTarget } from '../../../app';
import { type TopicPathViewHooks } from './TopicPathViewHooks';
import { type TopicPathViewResource } from './TopicPathViewResource';

export function createTopicPathViewHooks (): TopicPathViewHooks {
  function useResource (): TopicPathViewResource {
    const hooksOfLocalization = getModule().getLocalizationHooks();

    const localizer = hooksOfLocalization.useTranslator(LocalizationTarget.TopicPathView);

    const tTitleForRoot: string = localizer.translate('@@TitleForRoot');

    return useMemo(() => {
        const result: TopicPathViewResource = {
          getTitleForRoot: () => tTitleForRoot,
        };

        return result;
      },
      [tTitleForRoot]
    );
  }

  return { useResource };
}
