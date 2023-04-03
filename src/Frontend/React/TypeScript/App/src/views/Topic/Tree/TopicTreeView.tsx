import React, { useCallback, useMemo, useState } from 'react';
import {
  StoreDispatchType,
  type TopicDomainTreeGetOperationResponse,
  getModule,
  type TopicDomainTreeGetOperationInput,
  TreeGetOperationAxisForList,
  OperationStatus
} from '../../../all';
import styles from './TopicTreeView.module.css';

export function TopicTreeView () {
  const [expandedTopicId, setExpandedTopicId] = useState(0);

  function handleClick (e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();

    console.log('MAKC:TopicTreeView:handleClick:clickedTopicId', expandedTopicId);
  }

  function handleChange (e: React.ChangeEvent<HTMLInputElement>) {
    let value = Number(e.currentTarget.value);

    if (isNaN(value)) {
      value = 0;
    }

    setExpandedTopicId(value);
  }

  const { getTopicItemStoreService, getTopicTreeStoreService } = getModule();

  const topicItemStoreService = getTopicItemStoreService();

  const { response: topicItemResponse, status: topicItemStatus } = topicItemStoreService.useState();

  const topicId = topicItemResponse?.data?.item.data.id ?? 0;

  const topicTreeStoreService = getTopicTreeStoreService();

  const callbackOnTopicTreeLoad = useCallback((response: TopicDomainTreeGetOperationResponse | null) => {
    console.log('MAKC:TopicTreeView:callbackOnTopicTreeLoad:response', response);
  }, []);

  const inputAtDispatchToTopicTreeLoad: TopicDomainTreeGetOperationInput = useMemo(() => ({
    axis: TreeGetOperationAxisForList.Child,
    expandedNodeId: topicId,
    sortField: 'Name',
    sortDirection: 'asc'
  }), [topicId]);

  topicTreeStoreService.useDispatchToLoad({
    dispatchType: StoreDispatchType.MountOrUpdate,
    isCanceled: topicItemStatus !== OperationStatus.Fulfilled,
    callback: callbackOnTopicTreeLoad,
    inputAtDispatch: inputAtDispatchToTopicTreeLoad
  });

  topicItemStoreService.useDispatchToClear({
    dispatchType: StoreDispatchType.Unmount
  });

  return (
    <div className={styles.root}>
      <h2>TopicTreeView: {topicId}</h2>
      <input name="expandedTopicId" value={expandedTopicId} onChange={handleChange}/>
      <button onClick={handleClick}>Load</button>
    </div>
  );
}
