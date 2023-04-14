import { type PropsWithChildren } from 'react';
import { type CardControlAction } from './CardControlAction';
import { type CardControlExtra } from './CardControlExtra';
import { type CardControlType } from './CardControlType';

export interface CardControlProps extends PropsWithChildren {
  controlActions?: CardControlAction[];
  controlExtra?: CardControlExtra;
  loading: boolean;
  title?: string;
  type: CardControlType;
}
