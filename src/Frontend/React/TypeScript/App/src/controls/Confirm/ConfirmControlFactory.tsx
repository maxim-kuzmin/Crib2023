import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, type ModalFuncProps } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import {
  type ConfirmControlComponent,
  type ConfirmControlProps,
  ConfirmControlType
} from '../../common';
import { type ConfirmControlHooks } from './ConfirmControlHooks';
import { type ConfirmControlResource } from './ConfirmControlResource';

export function createConfirmControlHooks (): ConfirmControlHooks {
  function useResource (): ConfirmControlResource {
    const { t } = useTranslation('controls/Confirm/ConfirmControl');

    const tCancelButtonText = t('@@CancelButtonText');
    const tDeleteConfirmContent = t('@@DeleteConfirmContent');
    const tDeleteConfirmTitle = t('@@DeleteConfirmTitle');
    const tLeaveFormConfirmContent = t('@@LeaveFormConfirmContent');
    const tLeaveFormConfirmTitle = t('@@LeaveFormConfirmTitle');
    const tOkButtonText = t('@@OkButtonText');

    return useMemo(
      () => {
        const result: ConfirmControlResource = {
          getCancelButtonText: () => tCancelButtonText,
          getDeleteConfirmContent: () => tDeleteConfirmContent,
          getDeleteConfirmTitle: () => tDeleteConfirmTitle,
          getLeaveFormConfirmContent: () => tLeaveFormConfirmContent,
          getLeaveFormConfirmTitle: () => tLeaveFormConfirmTitle,
          getOkButtonText: () => tOkButtonText,
        }

        return result;
      },
      [
        tCancelButtonText,
        tDeleteConfirmContent,
        tDeleteConfirmTitle,
        tLeaveFormConfirmContent,
        tLeaveFormConfirmTitle,
        tOkButtonText,
      ]
    );
  }

  return { useResource }
}

function show ({ content, onCancel, onOk, resourceOfConfirmControl, title, type }: ConfirmControlProps) {
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

export function createConfirmControlComponent (): ConfirmControlComponent {
  return { show };
}
