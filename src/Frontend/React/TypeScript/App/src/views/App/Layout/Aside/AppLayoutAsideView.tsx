import React from 'react';
import {
  type AppLayoutAsideViewProps,
  TopicTreeView
} from '../../../../all';
import styles from './AppLayoutAsideView.module.css';

export const AppLayoutAsideView: React.FC<AppLayoutAsideViewProps> = ({ logoUrl }: AppLayoutAsideViewProps) => {
  return (
    <>
      <div className={styles.root}>
        <div className={styles.logo} style={{ backgroundImage: `url(${logoUrl})` }}/>
      </div>
      <TopicTreeView/>
    </>
  );
}
