import { Card } from 'antd';
import React from 'react';
import { type CardControlProps } from '../../all';

export const CardControl: React.FC<CardControlProps> = ({ children, title }: CardControlProps) => {
  return <Card title={title}>
      {children}
    </Card>
}
