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
}: ButtonControlProps) {
  const buttonProps = {
    className,
    disabled,
    loading,
    onClick,
    title
  };
console.log('MAKC:buttonProps', buttonProps);
  return (
    <Button {...buttonProps}>{children}</Button>
  );
});
