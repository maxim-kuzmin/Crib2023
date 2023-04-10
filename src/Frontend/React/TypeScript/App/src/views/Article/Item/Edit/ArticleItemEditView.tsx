import React, { memo, useCallback, useMemo } from 'react';
import { type ArticleItemEditViewProps } from './ArticleItemEditViewProps';
import {
  FormControl,
  type FormControlAction,
  FormControlActionType,
  SpinnerControl,
  getModule,
  type FormControlField,
  FormControlFieldType
} from '../../../../all';

export const ArticleItemEditView: React.FC<ArticleItemEditViewProps> = memo(function ArticleItemEditView ({
  loading,
  response,
  topicId
}: ArticleItemEditViewProps) {
  const entity = response?.data?.item.data;

  const formValues = useMemo(
    () => getModule().getArticleItemEditViewService().convertToFormValues(entity),
    [entity]
  );

  const { fieldNameForBody, fieldNameForId, fieldNameForTitle } = getModule().getArticleItemEditViewService();

  const articleId = entity?.id ?? 0;

  const controlActions = useMemo(
    () => {
      const result: FormControlAction[] = [];

      const articlePageService = getModule().getArticlePageService();

      const actionToSave: FormControlAction = {
        key: 'save',
        title: '@@Save',
        type: FormControlActionType.Submit
      };

      result.push(actionToSave);

      if (articleId > 0) {
        const actionToDisplay: FormControlAction = {
          href: articlePageService.createUrl({ articleId }),
          key: 'display',
          title: '@@Display',
          type: FormControlActionType.None
        };

        result.push(actionToDisplay);
      }

      return result;
    },
    [articleId]
  );

  const controlFields = useMemo(
    () => {
      const result: FormControlField[] = [];

      if (articleId > 0) {
        const fieldForId: FormControlField = {
          label: '@@ID',
          name: fieldNameForId,
          type: FormControlFieldType.Readonly
        };

        result.push(fieldForId);
      }

      const fieldForTitle: FormControlField = {
        name: fieldNameForTitle,
        label: '@@Title',
        type: FormControlFieldType.TextInput
      };

      result.push(fieldForTitle);

      const fieldForBody: FormControlField = {
        label: '@@Body',
        name: fieldNameForBody,
        type: FormControlFieldType.TextArea
      };

      result.push(fieldForBody);

      return result;
    },
    [articleId, fieldNameForBody, fieldNameForId, fieldNameForTitle]
  );

  const onSubmitFailed = useCallback(
    (error: any) => {
      console.log('MAKC:onSubmitFailed:error', error);
    },
    []
  );

  const onSubmitSuccess = useCallback(
    (values: any) => {
      console.log('MAKC:onSubmitSuccess:values', values);
    },
    []
  );

  return (
    loading
      ? <SpinnerControl/>
      : <FormControl
          controlActions={controlActions}
          controlFields={controlFields}
          formValues={formValues}
          name="article"
          onSubmitFailed={onSubmitFailed}
          onSubmitSuccess={onSubmitSuccess}
        />
  );
});
