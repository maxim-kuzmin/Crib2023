import React from 'react';
import styles from './SpinnerControl.module.css';
import { Spin } from 'antd';

export const SpinnerControl: React.FC = () => {
  return (
    <div className={styles.root}>
      <Spin/>
    </div>
  )
}
