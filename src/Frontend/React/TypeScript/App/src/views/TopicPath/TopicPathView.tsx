import React from 'react';
import topicPathStoreSlice from '../../store/Topic/Path/topicPathStoreSlice';
import styles from './TopicPathView.module.css';

export default function TopicPathView () {
  const { data } = topicPathStoreSlice.useState();

  return (
    <div className={styles.root}>
      <h2>TopicPathView: {data}</h2>
    </div>
  );
}
