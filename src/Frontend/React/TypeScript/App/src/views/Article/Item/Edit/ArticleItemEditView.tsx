import React, { memo, useCallback, useMemo } from 'react';
import { getModule } from '../../../../app/ModuleImpl';
import { type ArticleItemStoreLoadActionPayload } from '../../../../app/Stores';
import {
  type FormControlAction,
  FormControlActionType,
  type FormControlField,
  FormControlFieldType
} from '../../../../common';
import { FormControl, SpinnerControl } from '../../../../controls';
import { type ArticleItemEditViewProps } from './ArticleItemEditViewProps';
import styles from './ArticleItemEditView.module.css';
import { createArticleTypeEntity, type ArticleTypeEntity } from '../../../../data';

export const ArticleItemEditView: React.FC<ArticleItemEditViewProps> = memo(
function ArticleItemEditView ({
  articleId,
  onArticleItemClearActionCompleted,
  onArticleItemLoadActionCompleted,
  topicId,
  topicPageLastUrl
}: ArticleItemEditViewProps) {
  const hooksOfArticleItemView = getModule().getArticleItemViewHooks();

  hooksOfArticleItemView.useClearActionOutput({
    onActionCompleted: onArticleItemClearActionCompleted
  });

  const payloadOfLoadAction: ArticleItemStoreLoadActionPayload = useMemo(
    () => ({
      id: articleId
    }),
    [articleId]
  );

  const { payloadOfLoadCompletedAction, pendingOfLoadAction } = hooksOfArticleItemView.useLoadActionOutput({
    onActionCompleted: onArticleItemLoadActionCompleted,
    payloadOfLoadAction
  });

  const loadedEntity = payloadOfLoadCompletedAction?.data?.item.data;

  const entity: ArticleTypeEntity = useMemo(
    () => loadedEntity ?? createArticleTypeEntity({ topicId }),
    [loadedEntity, topicId]
  );

  const { dispatchOfSaveAction, pendingOfSaveAction } = hooksOfArticleItemView.useSaveActionOutput();

  const formValues = useMemo(
    () => getModule().getArticleItemEditViewService().convertToFormValues(entity),
    [entity]
  );

  const {
    fieldNameForBody,
    fieldNameForId,
    fieldNameForTitle,
    fieldNameForTopicId
  } = getModule().getArticleItemEditViewService();

  const controlActions = useMemo(
    () => {
      const result: FormControlAction[] = [];

      const articlePageService = getModule().getArticlePageService();

      const actionToSave: FormControlAction = {
        key: 'save',
        title: '@@Save',
        loading: pendingOfSaveAction,
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
    [articleId, pendingOfSaveAction, topicPageLastUrl]
  );

  const controlFields: FormControlField[] = useMemo(
    () => {
      const fieldForId: FormControlField = {
        label: '@@ID',
        name: fieldNameForId,
        type: articleId > 0 ? FormControlFieldType.Readonly : FormControlFieldType.Hidden
      };

      const fieldForTitle: FormControlField = {
        name: fieldNameForTitle,
        label: '@@Title',
        type: FormControlFieldType.TextInput
      };

      const fieldForBody: FormControlField = {
        label: '@@Body',
        name: fieldNameForBody,
        type: FormControlFieldType.TextArea
      };

      const fieldForTopicId: FormControlField = {
        label: '@@Topic',
        name: fieldNameForTopicId,
        type: FormControlFieldType.Hidden
      };

      return [
        fieldForId,
        fieldForTitle,
        fieldForBody,
        fieldForTopicId
      ];
    },
    [
      articleId,
      fieldNameForBody,
      fieldNameForId,
      fieldNameForTitle,
      fieldNameForTopicId
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

  getModule().getHooks().useLeaveFormBlocker(true);

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
