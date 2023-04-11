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
import styles from './FormControl.module.css';

function convertToFieldProps (controlField: FormControlField): FormItemProps<any> & Attributes {
  const { className, key, label, name } = controlField;

  return {
    className,
    key: key ?? name,
    label,
    name
  };
}

function convertToFieldMarkup (controlField: FormControlField) {
  const props = convertToFieldProps(controlField);

  const { children, type } = controlField;

  switch (type) {
    case FormControlFieldType.Container:
      return (
        <Form.Item {...props}>
          { children?.map((child) => convertToFieldMarkup(child)) }
        </Form.Item>
      );
    case FormControlFieldType.Readonly:
      return (
        <Form.Item {...props}>
          <Input readOnly/>
        </Form.Item>
      );
    case FormControlFieldType.TextInput:
      return (
        <Form.Item {...props}>
          <Input/>
        </Form.Item>
      );
    case FormControlFieldType.TextArea:
      return (
        <Form.Item {...props}>
          <Input.TextArea autoSize />
        </Form.Item>
      );
    default:
      return null;
  }
}

function convertToActionMarkup (controlAction: FormControlAction, isLast: boolean) {
  const { className, href, key, onClick, title, type } = controlAction;

  const props = {
    className: isLast ? className : `${(className ?? '')} ${styles.action}`,
    key
  };

  return href
    ? <Link to={href} {...props}>{title}</Link>
    : (
        onClick
          ? <Button htmlType="button" onClick={onClick} {...props}>{title}</Button>
          : (
              type === FormControlActionType.Submit
                ? <Button htmlType="submit" {...props}>{title}</Button>
                : <span {...props}>{title}</span>
            )
      )
}

export const FormControl: React.FC<FormControlProps> = memo(
    function FormControl ({
      className,
      classNameForActions,
      controlActions,
      controlFields,
      formValues,
      keyForActions,
      name,
      onSubmitFailed,
      onSubmitSuccess
    }: FormControlProps) {
  const [form] = Form.useForm();

  return (
    <Form
      autoComplete="off"
      className={className}
      form={form}
      initialValues={formValues}
      name={name}
      labelCol={{ span: 2 }}
      wrapperCol={{ span: 22 }}
      onFinish={onSubmitSuccess}
      onFinishFailed={onSubmitFailed}
    >
      { controlFields?.map((controlField) => convertToFieldMarkup(controlField)) }
      {
        controlActions
          ? (
              <Form.Item
                className={classNameForActions}
                key={keyForActions ?? 'actions'}
                wrapperCol={{ offset: 2, span: 22 }}
              >
                {
                  controlActions.map((controlAction, index) => convertToActionMarkup(
                    controlAction,
                    index === controlActions.length - 1
                  ))
                }
              </Form.Item>
            )
          : null
      }
    </Form>
  );
});
