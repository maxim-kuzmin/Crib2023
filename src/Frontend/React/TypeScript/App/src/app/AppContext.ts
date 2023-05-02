import { createContext } from 'react';
import { type AppInstance } from './AppInstance';

export const AppContext = createContext<AppInstance | null>(null);
