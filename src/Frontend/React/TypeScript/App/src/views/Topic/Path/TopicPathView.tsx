import React from 'react';
import { type TopicDomainEntityForItem, getModule } from '../../../all';
import styles from './TopicPathView.module.css';

function createTopicTitle (topic?: TopicDomainEntityForItem) {
  if (topic) {
    const { id, name } = topic.data;

    return `/${id}.${name}`;
  }

  return '';
}

export const TopicPathView: React.FC = () => {
  const { getTopicItemStoreService } = getModule();

  const service = getTopicItemStoreService();

  const { response: topicItemResponse } = service.useState();

  const topic = topicItemResponse?.data?.item;

  return (
    <div className={styles.root}>
      <h2>TopicPathView: {topic?.treeAncestors.map(x => `${x.id}.${x.name}`).join('/')}{createTopicTitle(topic)}</h2>
    </div>
  );
}
