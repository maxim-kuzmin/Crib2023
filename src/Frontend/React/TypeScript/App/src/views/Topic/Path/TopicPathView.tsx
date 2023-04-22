import React, { memo, useMemo } from 'react';
import { getModule } from '../../../app';
import { type BreadcrumbControlItem } from '../../../common';
import { BreadcrumbControl } from '../../../controls';
import { type TopicDomainEntityForItem } from '../../../domains';
import styles from './TopicPathView.module.css';

function convertToControlItems (entity?: TopicDomainEntityForItem): BreadcrumbControlItem[] {
  const root: BreadcrumbControlItem = { title: '@@AllTopics', key: 0 };

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
  const {
    payloadOfSetAction: topicItemResponse
  } = getModule().getTopicItemViewHooks().useStoreState();

  const topic = topicItemResponse?.data?.item;

  const controlItems = useMemo(
    () => convertToControlItems(topic),
    [topic]
  );

  const currentItemKey = topic?.data.id ?? 0;

  return (
    <div className={styles.root}>
      <BreadcrumbControl controlItems={controlItems} currentItemKey={currentItemKey}/>
    </div>
  );
});
