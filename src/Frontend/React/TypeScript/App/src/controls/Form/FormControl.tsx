import React, { type Attributes, memo, useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, type FormItemProps, Input, type FormInstance } from 'antd';
import {
  FormControlFieldType,
  type FormControlField,
  type FormControlAction,
  FormControlActionType,
  type FormControlProps,
  FormControlValidationRuleType
} from '../../common';
import styles from './FormControl.module.css';
import { type Rule } from 'antd/es/form';

function convertToFieldProps (controlField: FormControlField): FormItemProps<any> & Attributes {
  const { className, key, label, name, validationRules } = controlField;

  const rules = validationRules?.map((validationRule) => {
    const { message, type } = validationRule;

    const result: Rule = { message };

    switch (type) {
      case FormControlValidationRuleType.Length:
        result.len = validationRule.length;
        break;
      case FormControlValidationRuleType.Range:
        result.max = validationRule.max;
        result.min = validationRule.min;
        break;
      case FormControlValidationRuleType.Regex:
        result.pattern = validationRule.pattern;
        break;
      case FormControlValidationRuleType.Required:
        result.required = true;
        result.whitespace = validationRule.whitespace;
        break;
    }

    return result;
  });

  return {
    className,
    key: key ?? name,
    label,
    name,
    rules
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
    case FormControlFieldType.Hidden:
      return (
        <Form.Item {...props} hidden={true}>
          <Input readOnly/>
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

function convertToActionMarkup (controlAction: FormControlAction, isLast: boolean, form: FormInstance<any>) {
  const { className, disabled, href, key, loading, onClick, title, type } = controlAction;

  const commonProps = {
    className: isLast ? className : `${(className ?? '')} ${styles.action}`,
    key
  };

  const buttonProps = {
    ...commonProps,
    disabled,
    loading
  };

  if (!disabled && type === FormControlActionType.Submit) {
    buttonProps.disabled = !form.isFieldsTouched() ||
      !!form.getFieldsError().filter(({ errors }) => errors.length).length;
  }

  if (href) {
    return (<Link to={href} {...commonProps}>{title}</Link>);
  } else if (onClick) {
    return (<Button htmlType="button" onClick={onClick} {...buttonProps}>{title}</Button>);
  } else {
    switch (type) {
      case FormControlActionType.Submit:
        return (<Button htmlType="submit" {...buttonProps}>{title}</Button>);
      case FormControlActionType.Reset:
        return (<Button htmlType="button" onClick={() => { form.resetFields(); }} {...buttonProps}>{title}</Button>);
      default:
        return (<span {...commonProps}>{title}</span>);
    }
  }
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
  onFieldsTouched,
  onGetFunctionToResetFields,
  onSubmitFailed,
  onSubmitSuccess
}: FormControlProps): React.ReactElement<FormControlProps> | null {
  const [form] = Form.useForm();

  const [, forceUpdate] = useState({});

  // To disable submit button at the beginning.
  useEffect(() => {
    forceUpdate({});
  }, []);

  const isFieldsTouched = useRef(false);

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
                shouldUpdate
              >
                {
                  () => {
                    if (onGetFunctionToResetFields) {
                      onGetFunctionToResetFields(form.resetFields);
                    }

                    const isFieldsTouchedCurrent = form.isFieldsTouched();

                    if (onFieldsTouched && isFieldsTouchedCurrent !== isFieldsTouched.current) {
                      isFieldsTouched.current = isFieldsTouchedCurrent;
                      onFieldsTouched(isFieldsTouchedCurrent);
                    }

                    return controlActions.map((controlAction, index) => convertToActionMarkup(
                      controlAction,
                      index === controlActions.length - 1,
                      form
                    ));
                  }
                }
              </Form.Item>
            )
          : null
      }
    </Form>
  );
});
