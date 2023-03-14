import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './AppLayoutContentView.module.css';
import { type AppLayoutContentViewProps } from './AppLayoutContentViewProps';

export function AppLayoutContentView ({ backgroundColor }: AppLayoutContentViewProps) {
  return (
    <div className={styles.root} style={{ background: backgroundColor }}>
      <Outlet />
    </div>
  );
}
