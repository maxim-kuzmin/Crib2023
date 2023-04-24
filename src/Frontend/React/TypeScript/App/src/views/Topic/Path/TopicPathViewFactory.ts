import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { type TopicPathViewHooks } from './TopicPathViewHooks';
import { type TopicPathViewResource } from './TopicPathViewResource';

export function createTopicPathViewHooks (): TopicPathViewHooks {
  function useResource (): TopicPathViewResource {
    const { t } = useTranslation('views/Topic/Path/TopicPathView');

    const tAllTopics: string = t('@@All_topics');

    return useMemo(() => {
        const result: TopicPathViewResource = {
          getAllTopics: () => tAllTopics,
        };

        return result;
      },
      [tAllTopics]
    );
  }

  return { useResource };
}
