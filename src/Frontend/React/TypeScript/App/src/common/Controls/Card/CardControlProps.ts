import { type PropsWithChildren } from 'react';
import { type CardControlExtra, type CardControlAction } from '../../../all';

export interface CardControlProps extends PropsWithChildren {
  controlActions?: CardControlAction[];
  controlExtra?: CardControlExtra;
  loading: boolean;
  title?: string;
}
