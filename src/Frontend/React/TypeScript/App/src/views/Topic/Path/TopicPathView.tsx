import React, { useMemo } from 'react';
import {
  type TopicDomainEntityForItem,
  getModule,
  type BreadcrumbControlItem,
  BreadcrumbControl
} from '../../../all';
import styles from './TopicPathView.module.css';

function convertToControlItems (entity?: TopicDomainEntityForItem): BreadcrumbControlItem[] {
  const root: BreadcrumbControlItem = { title: '@@AllTopics', key: 0 };

  const result: BreadcrumbControlItem[] = [root];

  if (entity) {
    root.href = '/';

    const treeAncestors = entity.treeAncestors.map((valueObject) => {
      const { id, name } = valueObject;

      return {
        href: `/topic/${id}`,
        key: id,
        title: name
      };
    });

    result.push(...treeAncestors);

    const { id, name } = entity.data;

    result.push({
      href: `/topic/${id}`,
      key: id,
      title: name
    });
  }

  return result;
}

export const TopicPathView: React.FC = () => {
  const { getTopicItemStoreService } = getModule();

  const service = getTopicItemStoreService();

  const { response: topicItemResponse } = service.useState();

  const topic = topicItemResponse?.data?.item;

  const controlItems = useMemo(() => convertToControlItems(topic), [topic]);

  const currentItemKey = topic?.data.id ?? 0;

  return (
    <div className={styles.root}>
      <BreadcrumbControl controlItems={controlItems} currentItemKey={currentItemKey}/>
    </div>
  );
}
