import { type ControlsComponent } from '../controls';
import { createControlsComponent } from '../controls/ControlsComponent';

export interface Component {
  readonly Controls: ControlsComponent;
}

export function createComponent (): Component {
  const componentOfControls = createControlsComponent();

  return {
    Controls: componentOfControls
  };
}
