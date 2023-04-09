import React from 'react';
import { type ArticleItemEditViewProps } from './ArticleItemEditViewProps';

export const ArticleItemEditView: React.FC<ArticleItemEditViewProps> = ({ topicId }) => {
  return (
    <>
      ArticleItemEditView: {topicId}
    </>
  );
}
