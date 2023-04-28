import { type ConfirmControlComponent } from '../common';
import { createConfirmControlComponent } from '../controls/Confirm/ConfirmControlComponent';

export interface Component {
  readonly Controls: {
      readonly Confirm: ConfirmControlComponent;
  };
}

export function createComponent (): Component {
  const componentOfConfirmControl = createConfirmControlComponent();

  return {
    Controls: {
      Confirm: componentOfConfirmControl
    }
  };
}
