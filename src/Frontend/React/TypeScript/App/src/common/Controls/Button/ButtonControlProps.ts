import { type PropsWithChildren } from 'react';
import { type ControlProps } from '../..';

export interface ButtonControlProps extends ControlProps, PropsWithChildren {
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  title?: string;
}
