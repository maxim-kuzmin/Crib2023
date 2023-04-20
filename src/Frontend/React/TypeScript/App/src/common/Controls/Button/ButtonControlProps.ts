import { type PropsWithChildren } from 'react';

export interface ButtonControlProps extends PropsWithChildren {
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  title?: string;
}
