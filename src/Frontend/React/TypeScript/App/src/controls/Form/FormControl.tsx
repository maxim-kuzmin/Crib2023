import React, { memo } from 'react';
import { Form } from 'antd';
import { type FormControlProps } from '../../all';

export const FormControl: React.FC<FormControlProps> = memo(function FormControl ({
  children,
  className
}: FormControlProps) {
  return (
    <Form
      className={className}
    >
      { children }
    </Form>
  );
});
