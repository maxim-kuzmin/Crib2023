import { type PropsWithChildren } from 'react';
import { type AppInstance } from '..';

export interface ContextProviderProps extends PropsWithChildren {
  readonly instanceOfApp: AppInstance;
}
