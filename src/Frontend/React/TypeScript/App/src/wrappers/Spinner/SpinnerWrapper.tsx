import React from 'react';
import styles from './SpinnerWrapper.module.css';

export default function SpinnerWrapper () {
  return (
    <div className={styles.root}>
      <h2>Loading...</h2>
    </div>
  )
}
