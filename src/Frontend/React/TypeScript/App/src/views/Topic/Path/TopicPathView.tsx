import React from 'react';
import { topicPathStoreService } from '../../../stores';
import styles from './TopicPathView.module.css';

export function TopicPathView () {
  const { data } = topicPathStoreService.useState();

  return (
    <div className={styles.root}>
      <h2>TopicPathView: {data}</h2>
    </div>
  );
}
