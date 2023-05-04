import { createContext } from 'react';
import { type AppInstance } from '../AppInstance';

export const Context = createContext<AppInstance | null>(null);
