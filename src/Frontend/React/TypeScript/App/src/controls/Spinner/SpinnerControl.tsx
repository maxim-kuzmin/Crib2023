import React, { memo } from 'react';
import { Spin } from 'antd';
import styles from './SpinnerControl.module.css';

export const SpinnerControl: React.FC = memo(
    function SpinnerControl () {
  return (
    <div className={styles.root}>
      <Spin/>
    </div>
  )
});
