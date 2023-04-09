import React, { memo } from 'react';
import styles from './NotFoundPage.module.css';

export const NotFoundPage: React.FC = memo(function NotFoundPage () {
  return (
    <div className={styles.root}>
      <h1>NotFoundPage</h1>
    </div>
  )
});
