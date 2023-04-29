import React, { memo, useMemo } from 'react';
import appInstance from '../../../app/AppInstance';
import { type BreadcrumbControlItem } from '../../../common';
import { type TopicDomainEntityForItem } from '../../../domains';
import styles from './TopicPathView.module.css';

interface ConvertToControlItemsOptions {
  entity?: TopicDomainEntityForItem;
  titleForRoot: string;
}

function convertToControlItems (options: ConvertToControlItemsOptions): BreadcrumbControlItem[] {
  const { entity, titleForRoot } = options;

  const root: BreadcrumbControlItem = { title: titleForRoot, key: 0 };

  const result: BreadcrumbControlItem[] = [root];

  const topicPageService = appInstance.module.Pages.Topic.getService();

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
function TopicPathView (): React.ReactElement | null {
  const topicPathViewResource = appInstance.hooks.Views.Topic.Path.useResource();

  const {
    payloadOfSetAction: topicItemResponse
  } = appInstance.hooks.Views.Topic.Item.useStoreState();

  const entity = topicItemResponse?.data?.item;

  const controlItems = useMemo(
    () => convertToControlItems({ entity, titleForRoot: topicPathViewResource.getTitleForRoot() }),
    [entity, topicPathViewResource]
  );

  const currentItemKey = entity?.data.id ?? 0;

  return (
    <div className={styles.root}>
      <appInstance.control.Breadcrumb controlItems={controlItems} currentItemKey={currentItemKey}/>
    </div>
  );
});
