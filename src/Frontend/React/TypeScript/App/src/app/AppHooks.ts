import { useContext } from 'react';
import { type AppInstance, Context } from '.';

export function useAppInstance (): AppInstance {
  return useContext(Context)!;
}
