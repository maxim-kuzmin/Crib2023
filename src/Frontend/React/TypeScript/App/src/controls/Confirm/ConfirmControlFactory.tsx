import React from 'react';
import { Modal } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import {
  type ConfirmControlComponent,
  type ConfirmControlProps,
  ConfirmControlType
} from '../../common';

const { confirm } = Modal;

function show ({ onCancel, onOk, title, type }: ConfirmControlProps) {
  const commonProps = {
    onCancel,
    onOk,
    title
  };

  switch (type) {
    case ConfirmControlType.Delete:
      confirm({
        ...commonProps,
        icon: <ExclamationCircleFilled />
      });
      break;
  }
}

export function createConfirmControlComponent (): ConfirmControlComponent {
  return {
    show
  };
}
