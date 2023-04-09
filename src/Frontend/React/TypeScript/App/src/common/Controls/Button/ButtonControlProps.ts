import { type PropsWithChildren } from 'react';

export interface ButtonControlProps extends PropsWithChildren {
  className?: string;
  onClickCallback?: () => void;
  title?: string;
}
