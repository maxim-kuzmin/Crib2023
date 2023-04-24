import React, { memo, useCallback, useMemo, useRef } from 'react';
import {
  getModule,
  type TopicTreeStoreLoadActionPayload
} from '../../../app';
import {
  OperationSortDirection,
  OperationStatus,
  type TreeControlNode,
  TreeGetOperationAxisForList
} from '../../../common';
import { SpinnerControl, TreeControl } from '../../../controls';
import {
  type TopicDomainEntityForTree,
  type TopicDomainTreeGetOperationInput,
  createTopicDomainTreeGetOperationRequest
} from '../../../domains';
import styles from './TopicTreeView.module.css';

const topicInput: TopicDomainTreeGetOperationInput = {
  axis: TreeGetOperationAxisForList.Child,
  sortField: 'Name',
  sortDirection: OperationSortDirection.Asc,
};

function convertToControlNodes (topicId: number, entities?: TopicDomainEntityForTree[]): TreeControlNode[] {
  const topicPageService = getModule().getTopicPageService();

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
function TopicTreeView () {
  const hooksOfTopicTreeStore = getModule().getTopicTreeStoreHooks();

  const resourceOfTopicTreeStore = hooksOfTopicTreeStore.useResource();

  const hooksOfApiResponse = getModule().getApiResponseHooks();

  const resourceOfApiResponse = hooksOfApiResponse.useResource();

  const topicItemStoreHooks = getModule().getTopicItemViewHooks();

  const {
    payloadOfSetAction: topicItemResponse,
    statusOfLoadAction: topicItemStatus
  } = topicItemStoreHooks.useStoreState();

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
  } = getModule().getTopicTreeViewHooks().useStoreLoadActionOutput({
    payloadOfLoadAction,
    isCanceled: topicItemStatus !== OperationStatus.Fulfilled
  });

  const entities = payloadOfLoadCompletedAction?.data?.nodes;

  const controlNodes = useMemo(
    () => convertToControlNodes(topicId, entities),
    [topicId, entities]
  );

  const requestHandler = useRef(getModule().useTopicDomainTreeGetOperationRequestHandler()).current;

  const getChildren = useCallback(
    async (key: string) => {
      const response = await requestHandler.handle(
        createTopicDomainTreeGetOperationRequest({
            ...topicInput,
            rootNodeId: Number(key)
          },
          {
            operationName: resourceOfTopicTreeStore.getGetChildrenOperationName(),
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
          ? <SpinnerControl/>
          : <TreeControl controlNodes={controlNodes} getChildren={getChildren} />
      }
    </div>
  );
});
