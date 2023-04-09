import React, { memo, useMemo } from 'react';
import { type ArticleItemEditViewProps } from './ArticleItemEditViewProps';
import {
  ButtonControl,
  FormControl,
  FormItemControl,
  SpinnerControl,
  TextAreaControl,
  TextInputControl,
  getModule
} from '../../../../all';

export const ArticleItemEditView: React.FC<ArticleItemEditViewProps> = memo(function ArticleItemEditView ({
  topicId,
  response
}: ArticleItemEditViewProps) {
  const entity = response?.data?.item.data;

  const formValues = useMemo(
    () => getModule().getArticleItemEditViewService().convertToFormValues(entity),
    [entity]
  );

  const { fieldNameForTitle, fieldNameForBody } = getModule().getArticleItemEditViewService();

  return (
    entity
      ? (
        <FormControl formValues={formValues}>
          <FormItemControl label="@@Title" name={fieldNameForTitle}>
            <TextInputControl/>
          </FormItemControl>
          <FormItemControl label="@@Body" name={fieldNameForBody}>
            <TextAreaControl/>
          </FormItemControl>
          <FormItemControl>
            <ButtonControl>@@Save</ButtonControl>
          </FormItemControl>
        </FormControl>
      )
      : (
        <SpinnerControl/>
      )
  );
});
