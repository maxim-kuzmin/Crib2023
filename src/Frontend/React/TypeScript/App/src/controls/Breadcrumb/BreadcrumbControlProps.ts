import { type Key } from 'react';
import { type BreadcrumbControlItem } from '../../all';

export interface BreadcrumbControlProps {
  controlItems: BreadcrumbControlItem[];
  currentItemKey?: Key;
}
