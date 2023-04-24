import { useMemo } from 'react';
import { getModule, LocalizationNamespace } from '../../../app';
import { type TopicPathViewHooks } from './TopicPathViewHooks';
import { type TopicPathViewResource } from './TopicPathViewResource';

export function createTopicPathViewHooks (): TopicPathViewHooks {
  function useResource (): TopicPathViewResource {
    const hooksOfLocalization = getModule().getLocalizationHooks();

    const localizer = hooksOfLocalization.useLocalizer(LocalizationNamespace.TopicPathView);

    const valueOfTitleForRoot: string = localizer.getValue('@@TitleForRoot');

    return useMemo(() => {
        const result: TopicPathViewResource = {
          getTitleForRoot: () => valueOfTitleForRoot,
        };

        return result;
      },
      [valueOfTitleForRoot]
    );
  }

  return { useResource };
}
