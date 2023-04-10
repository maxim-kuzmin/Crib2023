import React, { type Attributes, memo } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, type FormItemProps, Input } from 'antd';
import {
  type FormControlAction,
  FormControlActionType,
  type FormControlField,
  FormControlFieldType,
  type FormControlProps
} from '../../all';

function convertToFieldProps (controlField: FormControlField): FormItemProps<any> & Attributes {
  const { className, key, label, name } = controlField;

  return {
    className,
    key: key ?? name,
    label,
    name,
  }
}

function convertToFieldMarkup (controlField: FormControlField) {
  const fieldProps = convertToFieldProps(controlField);

  const { type } = controlField;

  switch (type) {
    case FormControlFieldType.Readonly:
      return (
        <Form.Item {...fieldProps}>
          <Input readOnly/>
        </Form.Item>
      );
    case FormControlFieldType.TextInput:
      return (
        <Form.Item {...fieldProps}>
          <Input/>
        </Form.Item>
      );
    case FormControlFieldType.TextArea:
      return (
        <Form.Item {...fieldProps}>
          <Input.TextArea autoSize />
        </Form.Item>
      );
    default:
      return null;
  }
}

function convertToActionMarkup (controlAction: FormControlAction) {
  const { className, href, key, onClick, title, type } = controlAction;

  const props = { className, key };

  return href
    ? <Link to={href} {...props}>{title}</Link>
    : (
        onClick
          ? <Button onClick={onClick} {...props}>{title}</Button>
          : (
              type === FormControlActionType.Submit
                ? <Button htmlType="submit" {...props}>{title}</Button>
                : <span {...props}>{title}</span>
            )
      )
}

export const FormControl: React.FC<FormControlProps> = memo(function FormControl ({
  className,
  controlActions,
  controlFields,
  formValues,
  name
}: FormControlProps) {
  const [form] = Form.useForm();

  return (
    <Form
      className={className}
      form={form}
      initialValues={formValues}
      name={name}
    >
      { controlFields?.map((controlField) => convertToFieldMarkup(controlField)) }
      { controlActions?.map((controlAction) => convertToActionMarkup(controlAction)) }
    </Form>
  );
});
