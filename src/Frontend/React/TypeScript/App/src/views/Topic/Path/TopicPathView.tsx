import React from 'react';
import { getModule } from '../../../all';
import styles from './TopicPathView.module.css';

export function TopicPathView () {
  const { getTopicPathStoreService } = getModule();

  const service = getTopicPathStoreService();

  const { response } = service.useState();

  return (
    <div className={styles.root}>
      <h2>TopicPathView: {response?.data?.totalCount}</h2>
    </div>
  );
}
