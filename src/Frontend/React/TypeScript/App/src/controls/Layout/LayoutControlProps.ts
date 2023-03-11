import { type PropsWithChildren, type ReactElement } from 'react';

export default interface LayoutControlProps extends PropsWithChildren {
  createAsideView: () => ReactElement
  createContentView: (backgroundColor: string) => ReactElement
  createFooterView: () => ReactElement
  createHeaderView: () => ReactElement
}
