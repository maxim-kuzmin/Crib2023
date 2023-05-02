import React, { memo, useCallback, useMemo, useRef } from 'react';
import appInstance from '../../../app/AppInstance';
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

const topicInput: TopicDomainTreeGetOperationInput = {
  axis: TreeGetOperationAxisForList.Child,
  sortField: 'Name',
  sortDirection: OperationSortDirection.Asc,
};

function convertToControlNodes (topicId: number, entities?: TopicDomainEntityForTree[]): TreeControlNode[] {
  const topicPageService = appInstance.module.Pages.Topic.getService();

  return entities
    ? entities.map((entity) => {
      const { treeChildren, treeHasChildren, treeIsExpanded, data } = entity;
      const { id, name } = data;

      const result: TreeControlNode = {
        href: topicPageService.createUrl({ topicId: Number(id) }),
        isLeaf: !treeHasChildren,
        isExpanded: treeIsExpanded,
        isSelected: id === topicId,
        key: id,
        title: name,
        children: treeChildren.length > 0 ? convertToControlNodes(topicId, treeChildren) : []
      };

      return result;
    })
  : [];
}

export const TopicTreeView: React.FC = memo(
function TopicTreeView (): React.ReactElement | null {
  const resourceOfTopicTreeStore = appInstance.hooks.Features.Stores.Topic.Tree.useResource();

  const resourceOfApiResponse = appInstance.hooks.Api.Response.useResource();

  const {
    payloadOfSetAction: topicItemResponse,
    statusOfLoadAction: topicItemStatus
  } = appInstance.hooks.Views.Topic.Item.useStoreState();

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
  } = appInstance.hooks.Views.Topic.Tree.useStoreLoadActionOutput({
    payloadOfLoadAction,
    isCanceled: topicItemStatus !== OperationStatus.Fulfilled
  });

  const entities = payloadOfLoadCompletedAction?.data?.nodes;

  const controlNodes = useMemo(
    () => convertToControlNodes(topicId, entities),
    [topicId, entities]
  );

  const requestHandler = useRef(appInstance.hooks.Domains.Topic.useTreeGetOperationRequestHandler()).current;

  const getChildren = useCallback(
    async (key: string) => {
      const response = await requestHandler.handle(
        createTopicDomainTreeGetOperationRequest({
            ...topicInput,
            rootNodeId: Number(key)
          },
          {
            operationName: resourceOfTopicTreeStore.getOperationNameForGetChildren(),
            resourceOfApiResponse
          }
        ),
        () => false
      );

      return convertToControlNodes(topicId, response?.data?.nodes);
    },
    [
      requestHandler,
      resourceOfApiResponse,
      resourceOfTopicTreeStore,
      topicId
    ]
  );

  return (
    <div className={styles.root}>
      {
        pendingOfLoadAction
          ? <appInstance.control.Spinner/>
          : <appInstance.control.Tree controlNodes={controlNodes} getChildren={getChildren} />
      }
    </div>
  );
});
