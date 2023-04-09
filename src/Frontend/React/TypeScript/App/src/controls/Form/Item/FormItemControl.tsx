import React, { memo } from 'react';
import { Form } from 'antd';
import { type FormItemControlProps } from '../../../all';

export const FormItemControl: React.FC<FormItemControlProps> = memo(function FormItemControl ({
  children,
  className,
  label,
  name
}: FormItemControlProps) {
  return (
    <Form.Item
      className={className}
      label={label}
      name={name}
    >
      { children }
    </Form.Item>
  );
});
