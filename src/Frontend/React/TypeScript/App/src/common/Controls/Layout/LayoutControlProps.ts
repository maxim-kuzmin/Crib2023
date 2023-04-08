import { type PropsWithChildren, type ReactElement } from 'react';

export interface LayoutControlProps extends PropsWithChildren {
  createAsideView: () => ReactElement;
  createContentView: (backgroundColor: string) => ReactElement;
  createFooterView: () => ReactElement;
  createHeaderView: () => ReactElement;
}
