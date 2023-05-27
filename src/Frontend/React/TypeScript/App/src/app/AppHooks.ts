import { useContext } from 'react';
import { AppInstanceContext } from './AppDefinition';
import { type AppInstance } from './AppInstance';

export function useAppInstance (): AppInstance {
  return useContext(AppInstanceContext)!;
}
