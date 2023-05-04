import React from 'react';
import { Modal, type ModalFuncProps } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import {
  type ConfirmControlComponent,
  type ConfirmControlProps,
  ConfirmControlType
} from '../../common';

class Implementation implements ConfirmControlComponent {
  show ({ content, onCancel, onOk, resourceOfConfirmControl, title, type }: ConfirmControlProps) {
    const props: ModalFuncProps = {
      content,
      icon: <ExclamationCircleFilled />,
      onCancel,
      onOk,
      title,
      okText: resourceOfConfirmControl.getOkButtonText(),
      cancelText: resourceOfConfirmControl.getCancelButtonText(),
    };

    switch (type) {
      case ConfirmControlType.Delete:
        if (!content) {
          props.content = resourceOfConfirmControl.getDeleteConfirmContent();
        }
        if (!title) {
          props.title = resourceOfConfirmControl.getDeleteConfirmTitle();
        }
        props.okType = 'danger';
        break;
      case ConfirmControlType.LeaveForm:
        if (!content) {
          props.content = resourceOfConfirmControl.getLeaveFormConfirmContent();
        }
        if (!title) {
          props.title = resourceOfConfirmControl.getLeaveFormConfirmTitle();
        }
        break;
      }

      Modal.confirm(props);
  }
}

export function createConfirmControlComponent (): ConfirmControlComponent {
  return new Implementation();
}
