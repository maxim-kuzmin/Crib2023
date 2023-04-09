import React, { memo } from 'react';
import { Form } from 'antd';
import { type FormControlProps } from '../../all';

export const FormControl: React.FC<FormControlProps> = memo(function FormControl ({
  children,
  className,
  formValues
}: FormControlProps) {
  const [form] = Form.useForm();

  return (
    <Form
      className={className}
      form={form}
      initialValues={formValues}
    >
      { children }
    </Form>
  );
});
