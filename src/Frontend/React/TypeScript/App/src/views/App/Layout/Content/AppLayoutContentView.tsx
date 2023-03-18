import React from 'react';
import { Outlet } from 'react-router-dom';
import { type AppLayoutContentViewProps } from '../../../../all';
import styles from './AppLayoutContentView.module.css';

export function AppLayoutContentView ({ backgroundColor }: AppLayoutContentViewProps) {
  return (
    <div className={styles.root} style={{ background: backgroundColor }}>
      <Outlet />
    </div>
  );
}
