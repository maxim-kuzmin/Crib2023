import { type Key } from 'react';
import { type BreadcrumbControlItem } from './BreadcrumbControlItem';

export interface BreadcrumbControlProps {
  controlItems: BreadcrumbControlItem[];
  currentItemKey?: Key;
}
