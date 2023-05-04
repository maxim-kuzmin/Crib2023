import { type PropsWithChildren } from 'react';
import { type AppInstance } from '../AppInstance';

export interface ContextProviderProps extends PropsWithChildren {
  readonly instanceOfApp: AppInstance;
}
