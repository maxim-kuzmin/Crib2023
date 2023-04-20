import React, { memo, useCallback, useMemo } from 'react';
import { getModule } from '../../../../app/ModuleImpl';
import { type ArticleItemStoreLoadActionPayload } from '../../../../app/Stores';
import {
  type FormControlAction,
  FormControlActionType,
  type FormControlField,
  FormControlFieldType,
} from '../../../../common';
import { FormControl, SpinnerControl } from '../../../../controls';
import { type ArticleItemEditViewProps } from './ArticleItemEditViewProps';
import styles from './ArticleItemEditView.module.css';

export const ArticleItemEditView: React.FC<ArticleItemEditViewProps> = memo(
function ArticleItemEditView ({
  articleId,
  onArticleItemClearActionCompleted,
  onArticleItemLoadActionCompleted,
  topicPageLastUrl
}: ArticleItemEditViewProps) {
  const hooks = getModule().getArticleItemViewHooks();

  hooks.useClearActionOutput({
    onActionCompleted: onArticleItemClearActionCompleted
  });

  const payloadOfLoadAction: ArticleItemStoreLoadActionPayload = useMemo(
    () => ({
      id: articleId
    }),
    [articleId]
  );

  const { payloadOfLoadCompletedAction, pendingOfLoadAction } = hooks.useLoadActionOutput({
    onActionCompleted: onArticleItemLoadActionCompleted,
    payloadOfLoadAction
  });

  const entity = payloadOfLoadCompletedAction?.data?.item.data;

  const { dispatchOfSaveAction } = hooks.useSaveActionOutput();

  const formValues = useMemo(
    () => getModule().getArticleItemEditViewService().convertToFormValues(entity),
    [entity]
  );

  const { fieldNameForBody, fieldNameForId, fieldNameForTitle } = getModule().getArticleItemEditViewService();

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

      if (topicPageLastUrl) {
        const actionToBackToList: FormControlAction = {
          href: topicPageLastUrl,
          key: 'goToList',
          title: '@@BackToList',
          type: FormControlActionType.None
        };

        result.push(actionToBackToList);
      }

      return result;
    },
    [
      articleId,
      topicPageLastUrl
    ]
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
    [
      articleId,
      fieldNameForBody,
      fieldNameForId,
      fieldNameForTitle
    ]
  );

  const onSubmitFailed = useCallback(
    (error: any) => {
      console.log('MAKC:onSubmitFailed:error', error);
    },
    []
  );

  const onSubmitSuccess = useCallback(
    (values: any) => {
      const entity = getModule().getArticleItemEditViewService().convertToEntity(values);

      dispatchOfSaveAction.run(entity);
    },
    [dispatchOfSaveAction]
  );

  return (
    <div className={styles.root}>
      <h2>{ articleId > 0 ? '@@ArticleEdit' : '@@ArticleNew' }</h2>
      {
        pendingOfLoadAction
          ? <SpinnerControl/>
          : <FormControl
              controlActions={controlActions}
              controlFields={controlFields}
              formValues={formValues}
              name="article"
              onSubmitFailed={onSubmitFailed}
              onSubmitSuccess={onSubmitSuccess}
            />
      }
    </div>
  );
});
