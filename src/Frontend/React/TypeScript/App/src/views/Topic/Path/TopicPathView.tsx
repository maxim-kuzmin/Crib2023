import React from 'react';
import { useAppModule } from '../../../app/Module';
import styles from './TopicPathView.module.css';

export function TopicPathView () {
  const { getTopicPathStoreService } = useAppModule();

  const service = getTopicPathStoreService();

  const { data } = service.useState();

  return (
    <div className={styles.root}>
      <h2>TopicPathView: {data}</h2>
    </div>
  );
}
