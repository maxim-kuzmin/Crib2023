import React from 'react';
import styles from './LogoView.module.css';
import type LogoViewProps from './LogoViewProps';

export default function LogoView ({ imageUrl }: LogoViewProps) {
  return (
    <div className={styles.root}>
      <div className={styles.image} style={{ backgroundImage: `url(${imageUrl})` }}/>
    </div>
  );
}
