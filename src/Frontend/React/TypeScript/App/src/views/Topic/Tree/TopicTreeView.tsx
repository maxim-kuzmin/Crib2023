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
import { type TopicTreeStoreLoadActionResult } from '../../../features';
import { type TopicTreeViewProps } from './TopicTreeViewProps';
import styles from './TopicTreeView.module.css';

const topicInput: TopicDomainTreeGetOperationInput = {
  axis: TreeGetOperationAxisForList.Child,
  sortField: 'Name',
  sortDirection: OperationSortDirection.Asc,
};

interface ConvertToControlNodesOptions {
  createTopicPageUrl: (topicId: number) => string;
  entities?: TopicDomainEntityForTree[];
  topicId: number;
}

function convertToControlNodes ({
  createTopicPageUrl,
  entities,
  topicId,
}: ConvertToControlNodesOptions
): TreeControlNode[] {
  return entities
    ? entities.map((entity) => {
      const { treeChildren, treeHasChildren, treeIsExpanded, data } = entity;
      const { id, name } = data;

      const result: TreeControlNode = {
        href: createTopicPageUrl(Number(id)),
        isLeaf: !treeHasChildren,
        isExpanded: treeIsExpanded,
        isSelected: id === topicId,
        key: id,
        title: name,
        children: treeChildren.length > 0
          ? convertToControlNodes({
              topicId,
              createTopicPageUrl,
              entities: treeChildren
            })
          : []
      };

      return result;
    })
  : [];
}

export const TopicTreeView: React.FC<TopicTreeViewProps> = memo(
function TopicTreeView ({
  createTopicPageUrl
}: TopicTreeViewProps): React.ReactElement<TopicTreeViewProps> | null {
  const { controls, hooks } = useAppInstance();

  const resourceOfApiResponse = hooks.Data.Api.Response.useResource();

  const resourceOfTopicTreeStore = hooks.Features.Topic.Tree.Store.useResource();

  const {
    resultOfSetAction: topicItemResponse,
    statusOfLoadAction: topicItemStatus
  } = hooks.Views.Topic.Item.useStoreState();

  hooks.Views.Topic.Tree.useStoreClearActionOutput();

  const topicId = topicItemResponse?.data?.item.data.id ?? 0;

  const resultOfLoadAction = useMemo<TopicTreeStoreLoadActionResult>(
    () => ({
      ...topicInput,
      expandedNodeId: topicId
    }),
    [topicId]
  );

  const abortControllerOfLoadAction = useMemo(
    () => {
      const result = new AbortController();

      if (topicItemStatus !== OperationStatus.Fulfilled) {
        result.abort();
      }

      return result;
    },
    [topicItemStatus]
  );

  const {
    resultOfLoadCompletedAction,
    pendingOfLoadAction
  } = hooks.Views.Topic.Tree.useStoreLoadActionOutput({
    resultOfLoadAction,
    abortController: abortControllerOfLoadAction
  });

  const entities = resultOfLoadCompletedAction?.data?.nodes;

  const controlNodes = useMemo(
    () => convertToControlNodes({ createTopicPageUrl, entities, topicId }),
    [createTopicPageUrl, entities, topicId]
  );

  const requestHandlerOfLoadChildrenAction = useRef(hooks.Domains.Topic.useTreeGetOperationRequestHandler()).current;

  const getChildren = useCallback(
    async (key: string) => {
      const response = await requestHandlerOfLoadChildrenAction.handle(
        createTopicDomainTreeGetOperationRequest({
            ...topicInput,
            rootNodeId: Number(key)
          },
          {
            operationName: resourceOfTopicTreeStore.getOperationNameForGetChildren(),
            resourceOfApiResponse
          }
        )
      );

      return convertToControlNodes({
        topicId,
        createTopicPageUrl,
        entities: response?.data?.nodes
      });
    },
    [
      createTopicPageUrl,
      requestHandlerOfLoadChildrenAction,
      resourceOfApiResponse,
      resourceOfTopicTreeStore,
      topicId
    ]
  );

  return (
    <div className={styles.root}>
      {
        pendingOfLoadAction
          ? <controls.Spinner/>
          : <controls.Tree controlNodes={controlNodes} getChildren={getChildren} />
      }
    </div>
  );
});
