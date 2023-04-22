import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getModule } from '../../../../app';
import { type ArticleItemStoreLoadActionPayload } from '../../../../app/Stores';
import {
  type FormControlAction,
  FormControlActionType,
  type FormControlField,
  FormControlFieldType
} from '../../../../common';
import { ButtonControl, FormControl, SpinnerControl } from '../../../../controls';
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

  const {
    payloadOfLoadCompletedAction,
    pendingOfLoadAction
  } = hooksOfArticleItemView.useLoadActionOutput({
    onActionCompleted: onArticleItemLoadActionCompleted,
    payloadOfLoadAction
  });

  const loadedEntity = payloadOfLoadCompletedAction?.data?.item.data;

  const {
    dispatchOfSaveAction,
    payloadOfSaveCompletedAction,
    pendingOfSaveAction
  } = hooksOfArticleItemView.useSaveActionOutput();

  const savedEntity = payloadOfSaveCompletedAction?.data?.item.data;

  const entity: ArticleTypeEntity = useMemo(
    () => savedEntity ?? loadedEntity ?? createArticleTypeEntity({ topicId }),
    [loadedEntity, savedEntity, topicId]
  );

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
        disabled: pendingOfLoadAction,
        loading: pendingOfSaveAction,
        type: FormControlActionType.Submit
      };

      result.push(actionToSave);

      const actionToReset: FormControlAction = {
        key: 'reset',
        title: '@@Reset',
        disabled: pendingOfLoadAction || pendingOfSaveAction,
        type: FormControlActionType.Reset
      };

      result.push(actionToReset);

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
    [articleId, pendingOfLoadAction, pendingOfSaveAction, topicPageLastUrl]
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

  const [isFormFieldsTouched, setIsFormFieldsTouched] = useState(false);

  getModule().getHooks().useLeaveFormBlocker(isFormFieldsTouched);

  const handleFieldsTouched = useCallback(
    (isFieldsTouched: boolean) => {
      if (isFieldsTouched !== isFormFieldsTouched) {
        setTimeout(() => {
          setIsFormFieldsTouched(isFieldsTouched);
        }, 0);
      }
    },
    [isFormFieldsTouched]
  );

  const form = useRef<{ reset?: () => void; }>({});

  const handleGetFunctionToResetFields = useCallback(
    (functionToResetFields: () => void) => {
      form.current.reset = functionToResetFields;
    },
    []
  )
  const handleSubmitFailed = useCallback(
    (error: any) => {
      console.log('MAKC:onSubmitFailed:error', error);
    },
    []
  );

  const handleSubmitSuccess = useCallback(
    (values: any) => {
      const entity = getModule().getArticleItemEditViewService().convertToEntity(values);

      dispatchOfSaveAction.run(entity).then(() => {
          if (form.current.reset) {
            form.current.reset();
          }
      });
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
              onFieldsTouched={handleFieldsTouched}
              onGetFunctionToResetFields={handleGetFunctionToResetFields}
              onSubmitFailed={handleSubmitFailed}
              onSubmitSuccess={handleSubmitSuccess}
            />
      }
    </div>
  );
});
