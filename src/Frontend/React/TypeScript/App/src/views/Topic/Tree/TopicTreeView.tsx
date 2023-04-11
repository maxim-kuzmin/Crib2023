import React, { memo, useCallback, useMemo, useRef } from 'react';
import {
  StoreDispatchType,
  type TopicDomainTreeGetOperationResponse,
  getModule,
  type TopicDomainTreeGetOperationInput,
  TreeGetOperationAxisForList,
  OperationStatus,
  type TopicDomainEntityForTree,
  SpinnerControl,
  type TreeControlNode,
  TreeControl,
  createTopicDomainTreeGetOperationRequest
} from '../../../all';
import styles from './TopicTreeView.module.css';

const topicInput: TopicDomainTreeGetOperationInput = {
  axis: TreeGetOperationAxisForList.Child,
  sortField: 'Name',
  sortDirection: 'asc',
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
  const topicItemStoreHooks = getModule().getTopicItemStoreHooks();

  const { response: topicItemResponse, status: topicItemStatus } = topicItemStoreHooks.useState();

  const topicId = topicItemResponse?.data?.item.data.id ?? 0;

  const topicTreeStoreService = getModule().getTopicTreeStoreService();

  const callbackOnTopicTreeLoad = useCallback((response: TopicDomainTreeGetOperationResponse | null) => {
    console.log('MAKC:TopicTreeView:callbackOnTopicTreeLoad:response', response);
  }, []);

  const payloadToTopicTreeLoad: TopicDomainTreeGetOperationInput = useMemo(
    () => ({
      ...topicInput,
      expandedNodeId: topicId
    }),
    [topicId]
  );

  topicTreeStoreService.useDispatchToLoad({
    dispatchType: StoreDispatchType.MountOrUpdate,
    isCanceled: topicItemStatus !== OperationStatus.Fulfilled,
    callback: callbackOnTopicTreeLoad,
    payload: payloadToTopicTreeLoad
  });

  topicItemStoreHooks.useDispatchToClear({
    dispatchType: StoreDispatchType.Unmount
  });

  const { response: topicTreeResponse, status: topicTreeStatus } = topicTreeStoreService.useState();

  const entities = topicTreeResponse?.data?.nodes;

  const controlNodes = useMemo(
    () => convertToControlNodes(topicId, entities),
    [topicId, entities]
  );

  const requestHandler = useRef(getModule().useTopicDomainTreeGetOperationRequestHandler()).current;

  const getChildren = useCallback(async (key: string) => {
    const response = await requestHandler.handle(
      createTopicDomainTreeGetOperationRequest({
        ...topicInput,
        rootNodeId: Number(key)
      }),
      () => false
    );

    return convertToControlNodes(topicId, response?.data?.nodes);
  }, [requestHandler, topicId]);

  return (
    <div className={styles.root}>
      {
        topicTreeStatus === OperationStatus.Pending
          ? <SpinnerControl/>
          : <TreeControl controlNodes={controlNodes} getChildren={getChildren} />
      }
    </div>
  );
});
