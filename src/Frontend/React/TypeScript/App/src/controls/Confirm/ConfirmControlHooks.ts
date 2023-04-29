import { useMemo } from 'react';
import appInstance from '../../app/AppInstance';
import { LocalizationTarget } from '../../app';
import {
  type ConfirmControlHooks,
  type ConfirmControlResource,
} from '../../common';

export function createConfirmControlHooks (): ConfirmControlHooks {
  function useResource (): ConfirmControlResource {
    const translator = appInstance.hooks.Localization.useTranslator(LocalizationTarget.ConfirmControl);

    const tCancelButtonText = translator.translate('@@CancelButtonText');
    const tDeleteConfirmContent = translator.translate('@@DeleteConfirmContent');
    const tDeleteConfirmTitle = translator.translate('@@DeleteConfirmTitle');
    const tFormConfirmContent = translator.translate('@@LeaveFormConfirmContent');
    const tLeaveFormConfirmTitle = translator.translate('@@LeaveFormConfirmTitle');
    const tOkButtonText = translator.translate('@@OkButtonText');

    const { language } = translator;

    return useMemo(
      () => {
        const result: ConfirmControlResource = {
          getCancelButtonText: () => tCancelButtonText,
          getDeleteConfirmContent: () => tDeleteConfirmContent,
          getDeleteConfirmTitle: () => tDeleteConfirmTitle,
          getLeaveFormConfirmContent: () => tFormConfirmContent,
          getLeaveFormConfirmTitle: () => tLeaveFormConfirmTitle,
          getOkButtonText: () => tOkButtonText,
          language
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
        language
      ]
    );
  }

  return { useResource }
}
