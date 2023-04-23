import React, { memo } from 'react';
import { Input } from 'antd';
import { type TextAreaControlProps } from '../../common';

export const TextAreaControl: React.FC<TextAreaControlProps> = memo(
function TextAreaControl ({
  className
}: TextAreaControlProps) {
  const props = {
    className
  };

  return (
    <Input.TextArea {...props} />
  );
});
