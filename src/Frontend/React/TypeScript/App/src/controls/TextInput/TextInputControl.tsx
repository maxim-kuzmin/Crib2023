import React, { memo } from 'react';
import { Input } from 'antd';
import { type TextInputControlProps } from '../../all';

export const TextInputControl: React.FC<TextInputControlProps> = memo(
function TextInputControl ({
  className
}: TextInputControlProps) {
  return (
    <Input className={className} />
  );
});
