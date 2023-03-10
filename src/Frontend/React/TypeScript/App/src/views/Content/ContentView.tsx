import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './ContentView.module.css';
import type ContentViewProps from './ContentViewProps';

export default function ContentView ({ backgroundColor }: ContentViewProps) {
  return (
    <div className={styles.root} style={{ background: backgroundColor }}>
    <Outlet />
  </div>
  );
}
