import React, { memo } from 'react';
import { type ArticleItemEditViewProps } from './ArticleItemEditViewProps';

export const ArticleItemEditView: React.FC<ArticleItemEditViewProps> = memo(function ArticleItemEditView ({
  topicId
}: ArticleItemEditViewProps) {
  return (
    <>
      ArticleItemEditView: {topicId}
    </>
  );
});
