import { useContext } from 'react';
import { AppContext } from './AppDefinition';
import { type AppInstance } from './AppInstance';

export function useAppInstance (): AppInstance {
  return useContext(AppContext)!;
}
