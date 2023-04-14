import React, { memo } from 'react';
import { Button } from 'antd';
import { type ButtonControlProps } from '../../common';

export const ButtonControl: React.FC<ButtonControlProps> = memo(
function ButtonControl ({
  children,
  className,
  onClick,
  title
}: ButtonControlProps) {
  return (
    <Button
      className={className}
      title={title}
      onClick={onClick}
    >
        {children}
    </Button>
  );
});
