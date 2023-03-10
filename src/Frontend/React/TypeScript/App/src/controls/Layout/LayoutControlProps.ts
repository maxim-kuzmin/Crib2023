import { type PropsWithChildren, type ReactElement } from 'react';

export default interface LayoutControlProps extends PropsWithChildren {
  contentView: ReactElement
  logoView: ReactElement
  topicPathView: ReactElement
  topicTreeView: ReactElement
}
