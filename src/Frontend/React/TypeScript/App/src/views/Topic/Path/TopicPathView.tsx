import React from 'react';
import { getModule } from '../../../all';
import styles from './TopicPathView.module.css';

export function TopicPathView () {
  const { getTopicItemStoreService } = getModule();

  const service = getTopicItemStoreService();

  const { response } = service.useState();

  return (
    <div className={styles.root}>
      <h2>TopicPathView: {response?.data?.item.treeAncestors.map(x => x.name).join('/')}</h2>
    </div>
  );
}
