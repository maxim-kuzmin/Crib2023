import { type ControlsComponents } from '../../common';
import { createControlsComponents } from '../../controls/ControlsComponents';

export interface InstanceComponents {
  readonly Controls: ControlsComponents;
}

export function createInstanceComponents (): InstanceComponents {
  const componentsOfControls = createControlsComponents();

  return {
    Controls: componentsOfControls
  };
}
