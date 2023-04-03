import React from 'react';
import styles from './SpinnerControl.module.css';

export const SpinnerControl: React.FC = () => {
  return (
    <div className={styles.root}>
      <h2>Loading...</h2>
    </div>
  )
}
