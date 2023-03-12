import React from 'react';
import { useTopicPathStoreState } from '../../store/Topic/Path/topicPathStoreSlice';
import styles from './TopicPathView.module.css';

export default function TopicPathView () {
  const { data } = useTopicPathStoreState();

  return (
    <div className={styles.root}>
      <h2>TopicPathView: {data}</h2>
    </div>
  );
}
