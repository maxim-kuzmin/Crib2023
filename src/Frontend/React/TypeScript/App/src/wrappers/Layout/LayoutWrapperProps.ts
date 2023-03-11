import { type PropsWithChildren, type ReactElement } from 'react';

export default interface LayoutWrapperProps extends PropsWithChildren {
  createAsideView: () => ReactElement
  createContentView: (backgroundColor: string) => ReactElement
  createFooterView: () => ReactElement
  createHeaderView: () => ReactElement
}
