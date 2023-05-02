import React, { memo, useMemo } from 'react';
import { useApp } from '../../../app';
import { type BreadcrumbControlItem } from '../../../common';
import { type TopicDomainEntityForItem } from '../../../domains';
import { type TopicPageService } from '../../../pages';
import styles from './TopicPathView.module.css';

interface ConvertToControlItemsOptions {
  entity?: TopicDomainEntityForItem;
  serviceOfTopicPage: TopicPageService;
  titleForRoot: string;
}

function convertToControlItems (options: ConvertToControlItemsOptions): BreadcrumbControlItem[] {
  const { entity, serviceOfTopicPage, titleForRoot } = options;

  const root: BreadcrumbControlItem = { title: titleForRoot, key: 0 };

  const result: BreadcrumbControlItem[] = [root];

  if (entity) {
    root.href = '/';

    const treeAncestors = entity.treeAncestors.map((valueObject) => {
      const { id, name } = valueObject;

      return {
        href: serviceOfTopicPage.createUrl({ topicId: Number(id) }),
        key: id,
        title: name
      };
    });

    result.push(...treeAncestors);

    const { id, name } = entity.data;

    result.push({
      href: serviceOfTopicPage.createUrl({ topicId: Number(id) }),
      key: id,
      title: name
    });
  }

  return result;
}

export const TopicPathView: React.FC = memo(
function TopicPathView (): React.ReactElement | null {
  const { control, hooks, module } = useApp();

  const topicPathViewResource = hooks.Views.Topic.Path.useResource();

  const {
    payloadOfSetAction: topicItemResponse
  } = hooks.Views.Topic.Item.useStoreState();

  const entity = topicItemResponse?.data?.item;

  const serviceOfTopicPage = module.Pages.Topic.getService();

  const titleForRoot = topicPathViewResource.getTitleForRoot();

  const controlItems = useMemo(
    () => convertToControlItems({ entity, serviceOfTopicPage, titleForRoot }),
    [entity, serviceOfTopicPage, titleForRoot]
  );

  const currentItemKey = entity?.data.id ?? 0;

  return (
    <div className={styles.root}>
      <control.Breadcrumb controlItems={controlItems} currentItemKey={currentItemKey}/>
    </div>
  );
});
