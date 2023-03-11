import React from 'react';
import TopicTreeView from '../../TopicTree/TopicTreeView';
import styles from './LayoutAsideView.module.css';
import type LayoutAsideViewProps from './LayoutAsideViewProps';

export default function LayoutAsideView ({ logoUrl }: LayoutAsideViewProps) {
  return (
    <>
      <div className={styles.root}>
        <div className={styles.logo} style={{ backgroundImage: `url(${logoUrl})` }}/>
      </div>
      <TopicTreeView/>
    </>
  );
}
