import React, { memo, useMemo } from 'react';
import { useAppInstance } from '../../../app';
import { type BreadcrumbControlItem } from '../../../common';
import { type TopicDomainEntityForItem } from '../../../domains';
import { type TopicPathViewProps } from './TopicPathViewProps';
import styles from './TopicPathView.module.css';

interface ConvertToControlItemsOptions {
  createTopicPageUrl: (topicId: number) => string;
  entity?: TopicDomainEntityForItem;
  titleForRoot: string;
}

function convertToControlItems (options: ConvertToControlItemsOptions): BreadcrumbControlItem[] {
  const { entity, createTopicPageUrl, titleForRoot } = options;

  const root: BreadcrumbControlItem = { title: titleForRoot, key: 0 };

  const result: BreadcrumbControlItem[] = [root];

  if (entity) {
    root.href = '/';

    const treeAncestors = entity.treeAncestors.map((valueObject) => {
      const { id, name } = valueObject;

      return {
        href: createTopicPageUrl(Number(id)),
        key: id,
        title: name
      };
    });

    result.push(...treeAncestors);

    const { id, name } = entity.data;

    result.push({
      href: createTopicPageUrl(Number(id)),
      key: id,
      title: name
    });
  }

  return result;
}

export const TopicPathView: React.FC<TopicPathViewProps> = memo(
function TopicPathView ({
  createTopicPageUrl
}: TopicPathViewProps): React.ReactElement<TopicPathViewProps> | null {
  const { controls, hooks } = useAppInstance();

  const topicPathViewResource = hooks.Views.Topic.Path.useResource();

  const {
    resultOfSetAction: topicItemResponse
  } = hooks.Views.Topic.Item.useStoreState();

  const entity = topicItemResponse?.data?.item;

  const titleForRoot = topicPathViewResource.getTitleForRoot();

  const controlItems = useMemo(
    () => convertToControlItems({ createTopicPageUrl, entity, titleForRoot }),
    [createTopicPageUrl, entity, titleForRoot]
  );

  const currentItemKey = entity?.data.id ?? 0;

  return (
    <div className={styles.root}>
      <controls.Breadcrumb controlItems={controlItems} currentItemKey={currentItemKey}/>
    </div>
  );
});
