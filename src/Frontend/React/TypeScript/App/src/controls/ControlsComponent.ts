import { type ConfirmControlComponent } from '../common';
import { createConfirmControlComponent } from './Confirm/ConfirmControlComponent';

export interface ControlsComponent {
  readonly Confirm: ConfirmControlComponent;
}

export function createControlsComponent (): ControlsComponent {
  const componentOfConfirmControl = createConfirmControlComponent();

  return {
    Confirm: componentOfConfirmControl
  };
}
