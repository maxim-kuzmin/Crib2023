import React, { memo } from 'react';
import { Outlet } from 'react-router-dom';
import { type AppLayoutContentViewProps } from '../../../../all';
import styles from './AppLayoutContentView.module.css';

export const AppLayoutContentView: React.FC<AppLayoutContentViewProps> = memo(
function AppLayoutContentView ({
  backgroundColor
}: AppLayoutContentViewProps) {
  return (
    <div className={styles.root} style={{ background: backgroundColor }}>
      <Outlet />
    </div>
  );
});
