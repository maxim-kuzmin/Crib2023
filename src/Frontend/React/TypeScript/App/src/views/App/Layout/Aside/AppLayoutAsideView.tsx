import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { type AppLayoutAsideViewProps } from './AppLayoutAsideViewProps';
import { TopicTreeView } from '../../../Topic';
import styles from './AppLayoutAsideView.module.css';

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
