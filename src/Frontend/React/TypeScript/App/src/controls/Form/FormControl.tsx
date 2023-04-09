import React, { memo } from 'react';
import { Form } from 'antd';
import { type FormControlProps } from '../../all';

export const FormControl: React.FC<FormControlProps> = memo(function FormControl ({
  children,
  className
}: FormControlProps) {
  const [form] = Form.useForm();

  return (
    <Form
      className={className}
      form={form}
    >
      { children }
    </Form>
  );
});
