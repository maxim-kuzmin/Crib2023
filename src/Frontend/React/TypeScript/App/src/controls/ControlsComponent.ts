import { type ControlsComponent } from '../common';
import { createConfirmControlComponent } from './Confirm/ConfirmControlComponent';

export function createControlsComponent (): ControlsComponent {
  const componentOfConfirm = createConfirmControlComponent();

  return {
    Confirm: componentOfConfirm,
  };
}
