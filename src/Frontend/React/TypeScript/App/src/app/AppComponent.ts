import { type ControlsComponent } from '../common';
import { createControlsComponent } from '../controls/ControlsComponent';

export interface AppComponent {
  readonly Controls: ControlsComponent;
}

export function createAppComponent (): AppComponent {
  const componentOfControls = createControlsComponent();

  return {
    Controls: componentOfControls
  };
}
