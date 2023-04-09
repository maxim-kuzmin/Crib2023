import React, { memo } from 'react';
import { Button } from 'antd';
import { type ButtonControlProps } from '../../all';

export const ButtonControl: React.FC<ButtonControlProps> = memo(function ButtonControl ({
  children,
  className,
  onClickCallback,
  title
}: ButtonControlProps) {
  return (
    <Button
      className={className}
      title={title}
      onClick={onClickCallback}
    >
        {children}
    </Button>
  );
});