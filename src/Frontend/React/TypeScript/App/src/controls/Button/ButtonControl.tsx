import React, { memo } from 'react';
import { Button } from 'antd';
import { type ButtonControlProps } from '../../common';

export const ButtonControl: React.FC<ButtonControlProps> = memo(
function ButtonControl ({
  children,
  className,
  disabled,
  loading,
  onClick,
  title
}: ButtonControlProps): React.ReactElement<ButtonControlProps> | null {
  const buttonProps = {
    className,
    disabled,
    loading,
    onClick,
    title
  };
  return (
    <Button {...buttonProps}>{children}</Button>
  );
});
