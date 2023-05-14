import { createContext } from 'react';
import { type AppInstance } from '..';

export const Context = createContext<AppInstance | null>(null);
