import { type PropsWithChildren } from 'react';

export interface ArticleTableViewProps extends PropsWithChildren {
  articles: string | null;
}
