import React, { useMemo } from 'react';
import { Modal, type ModalFuncProps } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { getModule, LocalizationTarget } from '../../app';
import {
  type ConfirmControlComponent,
  type ConfirmControlProps,
  ConfirmControlType
} from '../../common';
import { type ConfirmControlHooks } from './ConfirmControlHooks';
import { type ConfirmControlResource } from './ConfirmControlResource';

export function createConfirmControlHooks (): ConfirmControlHooks {
  function useResource (): ConfirmControlResource {
    const hooksOfLocalization = getModule().getLocalizationHooks();

    const translator = hooksOfLocalization.useTranslator(LocalizationTarget.ConfirmControl);

    const tCancelButtonText = translator.translate('@@CancelButtonText');
    const tDeleteConfirmContent = translator.translate('@@DeleteConfirmContent');
    const tDeleteConfirmTitle = translator.translate('@@DeleteConfirmTitle');
    const tFormConfirmContent = translator.translate('@@LeaveFormConfirmContent');
    const tLeaveFormConfirmTitle = translator.translate('@@LeaveFormConfirmTitle');
    const tOkButtonText = translator.translate('@@OkButtonText');

    return useMemo(
      () => {
        const result: ConfirmControlResource = {
          getCancelButtonText: () => tCancelButtonText,
          getDeleteConfirmContent: () => tDeleteConfirmContent,
          getDeleteConfirmTitle: () => tDeleteConfirmTitle,
          getLeaveFormConfirmContent: () => tFormConfirmContent,
          getLeaveFormConfirmTitle: () => tLeaveFormConfirmTitle,
          getOkButtonText: () => tOkButtonText,
        }

        return result;
      },
      [
        tCancelButtonText,
        tDeleteConfirmContent,
        tDeleteConfirmTitle,
        tFormConfirmContent,
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
