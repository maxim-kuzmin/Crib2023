import { type ControlsComponents } from '../common';
import { createConfirmControlComponent } from './Confirm/ConfirmControlComponent';

export function createControlsComponents (): ControlsComponents {
  const componentOfConfirm = createConfirmControlComponent();

  return {
    Confirm: componentOfConfirm,
  };
}
