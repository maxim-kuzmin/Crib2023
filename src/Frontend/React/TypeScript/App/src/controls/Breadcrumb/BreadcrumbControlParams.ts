import { type Key } from 'react';
import { type BreadcrumbControlItem } from '../../all';

export interface BreadcrumbControlParams {
  controlItems: BreadcrumbControlItem[];
  currentItemKey?: Key;
}
