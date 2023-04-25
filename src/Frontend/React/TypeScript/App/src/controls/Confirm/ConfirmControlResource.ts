import { type LocalizationResource } from '../../common';

export interface ConfirmControlResource extends LocalizationResource {
  readonly getCancelButtonText: () => string;
  readonly getDeleteConfirmContent: () => string;
  readonly getDeleteConfirmTitle: () => string;
  readonly getLeaveFormConfirmContent: () => string;
  readonly getLeaveFormConfirmTitle: () => string;
  readonly getOkButtonText: () => string;
}
