import React, { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { getModule } from '../../../app';
import { type BreadcrumbControlItem } from '../../../common';
import { BreadcrumbControl } from '../../../controls';
import { type TopicDomainEntityForItem } from '../../../domains';
import styles from './TopicPathView.module.css';

interface ConvertToControlItemsOptions {
  entity?: TopicDomainEntityForItem;
  title: string;
}

function convertToControlItems (options: ConvertToControlItemsOptions): BreadcrumbControlItem[] {
  const { entity, title } = options;

  const root: BreadcrumbControlItem = { title, key: 0 };

  const result: BreadcrumbControlItem[] = [root];

  const topicPageService = getModule().getTopicPageService();

  if (entity) {
    root.href = '/';

    const treeAncestors = entity.treeAncestors.map((valueObject) => {
      const { id, name } = valueObject;

      return {
        href: topicPageService.createUrl({ topicId: Number(id) }),
        key: id,
        title: name
      };
    });

    result.push(...treeAncestors);

    const { id, name } = entity.data;

    result.push({
      href: topicPageService.createUrl({ topicId: Number(id) }),
      key: id,
      title: name
    });
  }

  return result;
}

export const TopicPathView: React.FC = memo(
function TopicPathView () {
  const { t } = useTranslation('views/Topic/Path/TopicPathView');

  const tAllTopics: string = t('@@All_topics');

  const {
    payloadOfSetAction: topicItemResponse
  } = getModule().getTopicItemViewHooks().useStoreState();

  const entity = topicItemResponse?.data?.item;

  const controlItems = useMemo(
    () => convertToControlItems({ entity, title: tAllTopics }),
    [entity, tAllTopics]
  );

  const currentItemKey = entity?.data.id ?? 0;

  return (
    <div className={styles.root}>
      <BreadcrumbControl controlItems={controlItems} currentItemKey={currentItemKey}/>
    </div>
  );
});
