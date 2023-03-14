import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './LayoutContentView.module.css';
import { type LayoutContentViewProps } from './LayoutContentViewProps';

export function LayoutContentView ({ backgroundColor }: LayoutContentViewProps) {
  return (
    <div className={styles.root} style={{ background: backgroundColor }}>
      <Outlet />
    </div>
  );
}
