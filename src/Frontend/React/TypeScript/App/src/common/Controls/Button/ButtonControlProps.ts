import { type PropsWithChildren } from 'react';

export interface ButtonControlProps extends PropsWithChildren {
  className?: string;
  onClick?: () => void;
  title?: string;
}
