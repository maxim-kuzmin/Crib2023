import React from 'react';
import { TopicTreeView } from '../../../Topic';
import styles from './AppLayoutAsideView.module.css';
import { type AppLayoutAsideViewProps } from './AppLayoutAsideViewProps';

export function AppLayoutAsideView ({ logoUrl }: AppLayoutAsideViewProps) {
  return (
    <>
      <div className={styles.root}>
        <div className={styles.logo} style={{ backgroundImage: `url(${logoUrl})` }}/>
      </div>
      <TopicTreeView/>
    </>
  );
}
