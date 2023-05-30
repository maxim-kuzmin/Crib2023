import { useMemo } from 'react';
import { useAppInstance } from '../../../app';
import { type TopicPathViewResource } from './TopicPathViewResource';

export interface TopicPathViewHooks {
  readonly useResource: () => TopicPathViewResource;
}

interface Opttions {
  readonly pathOfTopicPathViewResource: string;
}

export function createTopicPathViewHooks ({
  pathOfTopicPathViewResource,
}: Opttions): TopicPathViewHooks {
  function useResource (): TopicPathViewResource {
    const { hooks } = useAppInstance();

    const translator = hooks.Features.App.Localization.useTranslator(pathOfTopicPathViewResource);

    const tTitleForRoot: string = translator.translate('@@TitleForRoot');

    const { language } = translator;

    return useMemo<TopicPathViewResource>(
      () => ({
        getTitleForRoot: () => tTitleForRoot,
        language
      }),
      [
        tTitleForRoot,
        language
      ]
    );
  }

  return { useResource };
}
