import React, { memo } from 'react';
import styles from './SpinnerControl.module.css';
import { Spin } from 'antd';

export const SpinnerControl: React.FC = memo(function SpinnerControl () {
  return (
    <div className={styles.root}>
      <Spin/>
    </div>
  )
});
