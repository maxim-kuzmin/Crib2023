import React from 'react';
import { Modal, type ModalFuncProps } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import {
  type ConfirmControlComponent,
  type ConfirmControlProps,
  ConfirmControlType
} from '../../common';

const { confirm } = Modal;

function show ({ content, onCancel, onOk, title, type }: ConfirmControlProps) {
  const props: ModalFuncProps = {
    content,
    icon: <ExclamationCircleFilled />,
    onCancel,
    onOk,
    title,
    okText: '@@Yes',
    cancelText: '@@No',
  };

  switch (type) {
    case ConfirmControlType.Delete:
      if (!content) {
        props.content = '@@DataWillBePermanentlyDeleted';
      }
      if (!title) {
        props.title = '@@AreYouSureYouWantToDeleteTheData';
      }
      props.okType = 'danger';
      break;
    case ConfirmControlType.LeaveForm:
      if (!content) {
        props.content = '@@FormDataWillBeLost';
      }
      if (!title) {
        props.title = '@@AreYouSureYouWantToLeaveTheForm';
      }
      break;
    }

    confirm(props);
}

export function createConfirmControlComponent (): ConfirmControlComponent {
  return { show };
}
