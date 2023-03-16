import React from 'react';
import { getModule } from '../../../app/Module';
import styles from './TopicPathView.module.css';

export function TopicPathView () {
  const { getTopicPathStoreService } = getModule();

  const service = getTopicPathStoreService();

  const { data } = service.useState();

  return (
    <div className={styles.root}>
      <h2>TopicPathView: {data}</h2>
    </div>
  );
}
