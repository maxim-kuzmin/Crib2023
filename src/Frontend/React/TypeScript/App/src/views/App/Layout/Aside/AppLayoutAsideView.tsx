import React, { memo } from 'react';
import {
  type AppLayoutAsideViewProps,
  TopicTreeView
} from '../../../../all';
import styles from './AppLayoutAsideView.module.css';
import { Link } from 'react-router-dom';

export const AppLayoutAsideView: React.FC<AppLayoutAsideViewProps> = memo(
    function AppLayoutAsideView ({
      logoUrl
    }: AppLayoutAsideViewProps) {
  return (
    <>
      <div className={styles.root}>
        <Link to="/">
          <div className={styles.logo} style={{ backgroundImage: `url(${logoUrl})` }}/>
        </Link>
      </div>
      <TopicTreeView/>
    </>
  );
});
