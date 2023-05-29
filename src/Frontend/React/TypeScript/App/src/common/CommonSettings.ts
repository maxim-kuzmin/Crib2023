import { type ControlsSettings } from './Controls';

export interface CommonSettings {
  readonly Controls: ControlsSettings;
  readonly isTestModeEnabled: boolean;
}
