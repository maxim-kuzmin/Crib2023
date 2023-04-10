import React, { memo, useMemo } from 'react';
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
  topicId,
  response
}: ArticleItemEditViewProps) {
  const entity = response?.data?.item.data;

  const formValues = useMemo(
    () => getModule().getArticleItemEditViewService().convertToFormValues(entity),
    [entity]
  );

  const { fieldNameForBody, fieldNameForId, fieldNameForTitle } = getModule().getArticleItemEditViewService();

  const articleId = entity?.id;

  const controlActions = useMemo(
    () => {
      const articlePageService = getModule().getArticlePageService();

      const actionToDisplay: FormControlAction = {
        href: articlePageService.createUrl({ articleId }),
        key: 'display',
        title: '@@Display',
        type: FormControlActionType.None
      };

      const actionToSave: FormControlAction = {
        key: 'save',
        title: '@@Save',
        type: FormControlActionType.Submit
      };

      return [actionToSave, actionToDisplay];
    },
    [articleId]
  );

  const controlFields = useMemo(
    () => {
      const fieldForId: FormControlField = {
        label: '@@ID',
        name: fieldNameForId,
        type: FormControlFieldType.Readonly
      };

      const fieldForBody: FormControlField = {
        label: '@@Body',
        name: fieldNameForBody,
        type: FormControlFieldType.TextArea
      };

      const fieldForTitle: FormControlField = {
        label: '@@Title',
        name: fieldNameForTitle,
        type: FormControlFieldType.TextInput
      };

      return [fieldForId, fieldForTitle, fieldForBody];
    },
    [fieldNameForBody, fieldNameForId, fieldNameForTitle]
  );

  return (
    entity
      ? <FormControl
          controlActions={controlActions}
          controlFields={controlFields}
          formValues={formValues}
          name="article"
        />
      : <SpinnerControl/>
  );
});
