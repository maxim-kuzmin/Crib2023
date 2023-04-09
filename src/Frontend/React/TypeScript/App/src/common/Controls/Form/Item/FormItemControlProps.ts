import { type PropsWithChildren } from 'react';

export interface FormItemControlProps extends PropsWithChildren {
  className?: string;
  label?: string;
  name?: string;
}
