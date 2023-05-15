import { type ControlsComponents } from '../../common';
import { createControlsComponents } from '../../controls';

export interface InstanceComponents {
  readonly Controls: ControlsComponents;
}

class Implementation implements InstanceComponents {
  readonly Controls: ControlsComponents;

  constructor () {
    this.Controls = createControlsComponents();
  }
}

export function createInstanceComponents (): InstanceComponents {
  return new Implementation();
}
