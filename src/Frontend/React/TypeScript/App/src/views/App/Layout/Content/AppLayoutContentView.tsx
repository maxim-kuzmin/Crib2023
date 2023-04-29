import React, { memo } from 'react';
import { Outlet } from 'react-router-dom';
import { type AppLayoutContentViewProps } from './AppLayoutContentViewProps';
import styles from './AppLayoutContentView.module.css';

export const AppLayoutContentView: React.FC<AppLayoutContentViewProps> = memo(
function AppLayoutContentView ({
  backgroundColor
}: AppLayoutContentViewProps): React.ReactElement<AppLayoutContentViewProps> | null {
  return (
    <div className={styles.root} style={{ background: backgroundColor }}>
      <Outlet />
    </div>
  );
});
