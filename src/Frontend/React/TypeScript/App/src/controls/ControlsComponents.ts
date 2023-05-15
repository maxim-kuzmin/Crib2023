import { type ConfirmControlComponent, type ControlsComponents } from '../common';
import { createConfirmControlComponent } from './Confirm/ConfirmControlComponent';

class Implementation implements ControlsComponents {
  readonly Confirm: ConfirmControlComponent;

  constructor () {
    this.Confirm = createConfirmControlComponent();
  }
}
export function createControlsComponents (): ControlsComponents {
  return new Implementation();
}
