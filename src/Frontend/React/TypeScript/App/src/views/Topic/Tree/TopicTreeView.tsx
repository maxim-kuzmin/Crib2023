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
  const { controls, factories, hooks } = useAppInstance();

  const factoryOfApiResponse = factories.Data.Api.Response;

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

  const controlNodes = useMemo(
    () => convertToControlNodes({ createTopicPageUrl, entities, topicId }),
    [createTopicPageUrl, entities, topicId]
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

      return convertToControlNodes({
        topicId,
        createTopicPageUrl,
        entities: response?.data?.nodes
      });
    },
    [
      createTopicPageUrl,
      factoryOfApiResponse,
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
          ? <controls.Spinner/>
          : <controls.Tree controlNodes={controlNodes} getChildren={getChildren} />
      }
    </div>
  );
});
