import React, { useMemo } from 'react';
import { Modal, type ModalFuncProps } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { getModule, LocalizationNamespace } from '../../app';
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

    const localizer = hooksOfLocalization.useLocalizer(LocalizationNamespace.ConfirmControl);

    const valueOfCancelButtonText = localizer.getValue('@@CancelButtonText');
    const valueOfDeleteConfirmContent = localizer.getValue('@@DeleteConfirmContent');
    const valueOfDeleteConfirmTitle = localizer.getValue('@@DeleteConfirmTitle');
    const valueOfFormConfirmContent = localizer.getValue('@@LeaveFormConfirmContent');
    const valueOfLeaveFormConfirmTitle = localizer.getValue('@@LeaveFormConfirmTitle');
    const valueOfOkButtonText = localizer.getValue('@@OkButtonText');

    return useMemo(
      () => {
        const result: ConfirmControlResource = {
          getCancelButtonText: () => valueOfCancelButtonText,
          getDeleteConfirmContent: () => valueOfDeleteConfirmContent,
          getDeleteConfirmTitle: () => valueOfDeleteConfirmTitle,
          getLeaveFormConfirmContent: () => valueOfFormConfirmContent,
          getLeaveFormConfirmTitle: () => valueOfLeaveFormConfirmTitle,
          getOkButtonText: () => valueOfOkButtonText,
        }

        return result;
      },
      [
        valueOfCancelButtonText,
        valueOfDeleteConfirmContent,
        valueOfDeleteConfirmTitle,
        valueOfFormConfirmContent,
        valueOfLeaveFormConfirmTitle,
        valueOfOkButtonText,
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
