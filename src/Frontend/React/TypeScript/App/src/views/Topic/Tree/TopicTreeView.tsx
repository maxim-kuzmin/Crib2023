import React, { memo, useCallback, useMemo, useRef } from 'react';
import { useAppInstance } from '../../../app';
import {
  OperationSortDirection,
  OperationStatus,
  type TreeControlNode,
  TreeGetOperationAxisForList
} from '../../../common';
import {
  type TopicDomainEntityForTree,
  type TopicDomainTreeGetOperationInput,
  createTopicDomainTreeGetOperationRequest
} from '../../../domains';
import { type TopicTreeStoreLoadActionPayload } from '../../../features';
import styles from './TopicTreeView.module.css';
import { type TopicPageService } from '../../../pages';

const topicInput: TopicDomainTreeGetOperationInput = {
  axis: TreeGetOperationAxisForList.Child,
  sortField: 'Name',
  sortDirection: OperationSortDirection.Asc,
};

function convertToControlNodes (
  topicId: number,
  serviceOfTopicPage: TopicPageService,
  entities?: TopicDomainEntityForTree[]
): TreeControlNode[] {
  return entities
    ? entities.map((entity) => {
      const { treeChildren, treeHasChildren, treeIsExpanded, data } = entity;
      const { id, name } = data;

      const result: TreeControlNode = {
        href: serviceOfTopicPage.createUrl({ topicId: Number(id) }),
        isLeaf: !treeHasChildren,
        isExpanded: treeIsExpanded,
        isSelected: id === topicId,
        key: id,
        title: name,
        children: treeChildren.length > 0 ? convertToControlNodes(topicId, serviceOfTopicPage, treeChildren) : []
      };

      return result;
    })
  : [];
}

export const TopicTreeView: React.FC = memo(
function TopicTreeView (): React.ReactElement | null {
  const { control, factory, hooks, module } = useAppInstance();

  const factoryOfApiResponse = factory.Data.Api.Response;

  const resourceOfApiResponse = hooks.Data.Api.Response.useResource();

  const resourceOfTopicTreeStore = hooks.Features.Stores.Topic.Tree.useResource();

  const {
    payloadOfSetAction: topicItemResponse,
    statusOfLoadAction: topicItemStatus
  } = hooks.Views.Topic.Item.useStoreState();

  const topicId = topicItemResponse?.data?.item.data.id ?? 0;

  const payloadOfLoadAction: TopicTreeStoreLoadActionPayload = useMemo(
    () => {
      const result: TopicTreeStoreLoadActionPayload = {
        ...topicInput,
        expandedNodeId: topicId
      };

      return result;
    },
    [topicId]
  )
  const {
    payloadOfLoadCompletedAction,
    pendingOfLoadAction
  } = hooks.Views.Topic.Tree.useStoreLoadActionOutput({
    payloadOfLoadAction,
    isCanceled: topicItemStatus !== OperationStatus.Fulfilled
  });

  const entities = payloadOfLoadCompletedAction?.data?.nodes;

  const serviceOfTopicPage = module.Pages.Topic.getService();

  const controlNodes = useMemo(
    () => convertToControlNodes(topicId, serviceOfTopicPage, entities),
    [entities, serviceOfTopicPage, topicId]
  );

  const requestHandler = useRef(hooks.Domains.Topic.useTreeGetOperationRequestHandler()).current;

  const getChildren = useCallback(
    async (key: string) => {
      const response = await requestHandler.handle(
        createTopicDomainTreeGetOperationRequest({
            ...topicInput,
            rootNodeId: Number(key)
          },
          {
            factoryOfApiResponse,
            operationName: resourceOfTopicTreeStore.getOperationNameForGetChildren(),
            resourceOfApiResponse
          }
        ),
        () => false
      );

      return convertToControlNodes(topicId, serviceOfTopicPage, response?.data?.nodes);
    },
    [
      factoryOfApiResponse,
      requestHandler,
      resourceOfApiResponse,
      resourceOfTopicTreeStore,
      serviceOfTopicPage,
      topicId
    ]
  );

  return (
    <div className={styles.root}>
      {
        pendingOfLoadAction
          ? <control.Spinner/>
          : <control.Tree controlNodes={controlNodes} getChildren={getChildren} />
      }
    </div>
  );
});
