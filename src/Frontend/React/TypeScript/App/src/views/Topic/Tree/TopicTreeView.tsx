import React, { useState } from 'react';
import { getModule } from '../../../all';
import styles from './TopicTreeView.module.css';

export function TopicTreeView () {
  const [clickedTopicId, setClickedTopicId] = useState(0);

  function handleClick (e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();

    console.log('MAKC:TopicTreeView:handleClick:clickedTopicId', clickedTopicId);
  }

  function handleChange (e: React.ChangeEvent<HTMLInputElement>) {
    let value = Number(e.currentTarget.value);

    if (isNaN(value)) {
      value = 0;
    }

    setClickedTopicId(value);
  }

  const { getTopicItemStoreService } = getModule();

  const service = getTopicItemStoreService();

  const { response: topicItemResponse } = service.useState();

  const topicId = topicItemResponse?.data?.item.data.id ?? 0;

  return (
    <div className={styles.root}>
      <h2>TopicTreeView: {topicId}</h2>
      <input name="topicId" value={clickedTopicId} onChange={handleChange}/>
      <button onClick={handleClick}>Load</button>
    </div>
  );
}
