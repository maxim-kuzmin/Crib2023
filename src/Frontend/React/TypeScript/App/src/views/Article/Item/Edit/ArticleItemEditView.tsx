import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useAppInstance } from '../../../../app';
import {
  type FormControlAction,
  FormControlActionType,
  type FormControlField,
  FormControlFieldType,
  FormControlValidationRuleType
} from '../../../../common';
import { createArticleTypeEntity, type ArticleTypeEntity } from '../../../../data';
import { type ArticleItemStoreLoadActionPayload } from '../../../../features';
import { type ArticleItemEditViewProps } from './ArticleItemEditViewProps';
import styles from './ArticleItemEditView.module.css';

export const ArticleItemEditView: React.FC<ArticleItemEditViewProps> = memo(
function ArticleItemEditView ({
  articleId,
  articlePageUrl,
  onArticleItemClearActionCompleted,
  onArticleItemLoadActionCompleted,
  topicId,
  topicPageLastUrl
}: ArticleItemEditViewProps): React.ReactElement<ArticleItemEditViewProps> | null {
  const { controls, hooks, modules } = useAppInstance();

  const shouldBeNavigetedToArticlePageRef = useRef(false);

  const [isFormFieldsTouched, setIsFormFieldsTouched] = useState(false);

  hooks.Common.useLeaveFormBlocker(isFormFieldsTouched);

  const navigate = useNavigate();

  useEffect(
    () => {
      if (shouldBeNavigetedToArticlePageRef.current) {
        navigate(articlePageUrl);
      }
    }
  );

  const resourceOfArticleItemEditView = hooks.Views.Article.Item.Edit.useResource();

  hooks.Views.Article.Item.useStoreClearActionOutput({
    onActionCompleted: onArticleItemClearActionCompleted
  });

  const isUpdating = articleId > 0;

  const payloadOfLoadAction: ArticleItemStoreLoadActionPayload = useMemo(
    () => {
      const result: ArticleItemStoreLoadActionPayload = {
        id: articleId
      };

      return result;
    },
    [articleId]
  );

  const {
    payloadOfLoadCompletedAction,
    pendingOfLoadAction
  } = hooks.Views.Article.Item.useStoreLoadActionOutput({
    onActionCompleted: onArticleItemLoadActionCompleted,
    payloadOfLoadAction
  });

  const loadedEntity = payloadOfLoadCompletedAction?.data?.item.data;

  const {
    dispatchOfSaveAction,
    payloadOfSaveCompletedAction,
    pendingOfSaveAction
  } = hooks.Views.Article.Item.useStoreSaveActionOutput();

  const savedEntity = payloadOfSaveCompletedAction?.data?.item.data;

  const entity: ArticleTypeEntity = useMemo(
    () => savedEntity ?? loadedEntity ?? createArticleTypeEntity({ topicId }),
    [loadedEntity, savedEntity, topicId]
  );

  const serviceOfArticleItemEditView = modules.Views.Article.Item.Edit.getService();

  const formValues = useMemo(
    () => serviceOfArticleItemEditView.convertToFormValues(entity),
    [entity, serviceOfArticleItemEditView]
  );

  const {
    fieldNameForBody,
    fieldNameForId,
    fieldNameForTitle,
    fieldNameForTopicId
  } = modules.Views.Article.Item.Edit.getService();

  const controlActions = useMemo(
    () => {
      const result: FormControlAction[] = [];

      const actionToSave: FormControlAction = {
        key: 'save',
        title: resourceOfArticleItemEditView.getActionForSave(),
        disabled: pendingOfLoadAction,
        loading: pendingOfSaveAction,
        type: FormControlActionType.Submit
      };

      result.push(actionToSave);

      const actionToReset: FormControlAction = {
        key: 'reset',
        title: resourceOfArticleItemEditView.getActionForReset(),
        disabled: pendingOfLoadAction || pendingOfSaveAction,
        type: FormControlActionType.Reset
      };

      result.push(actionToReset);

      if (isUpdating) {
        const actionToDisplay: FormControlAction = {
          href: articlePageUrl,
          key: 'display',
          title: resourceOfArticleItemEditView.getActionForDisplay(),
          type: FormControlActionType.None
        };

        result.push(actionToDisplay);
      }

      if (topicPageLastUrl) {
        const actionToBackToList: FormControlAction = {
          href: topicPageLastUrl,
          key: 'backToList',
          title: resourceOfArticleItemEditView.getActionForBackToList(),
          type: FormControlActionType.None
        };

        result.push(actionToBackToList);
      }

      return result;
    },
    [
      articlePageUrl,
      isUpdating,
      pendingOfLoadAction,
      pendingOfSaveAction,
      resourceOfArticleItemEditView,
      topicPageLastUrl
    ]
  );

  const controlFields: FormControlField[] = useMemo(
    () => {
      const fieldForId: FormControlField = {
        label: resourceOfArticleItemEditView.getLabelForId(),
        name: fieldNameForId,
        type: isUpdating ? FormControlFieldType.Readonly : FormControlFieldType.Hidden
      };

      const fieldForTitle: FormControlField = {
        name: fieldNameForTitle,
        label: resourceOfArticleItemEditView.getLabelForTitle(),
        type: FormControlFieldType.TextInput,
        validationRules: [{
          message: resourceOfArticleItemEditView.getValidationMessageForTitleRequired(),
          type: FormControlValidationRuleType.Required,
          whitespace: true
        }]
      };

      const fieldForBody: FormControlField = {
        label: resourceOfArticleItemEditView.getLabelForBody(),
        name: fieldNameForBody,
        type: FormControlFieldType.TextArea
      };

      const fieldForTopicId: FormControlField = {
        label: resourceOfArticleItemEditView.getLabelForTopic(),
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
      fieldNameForBody,
      fieldNameForId,
      fieldNameForTitle,
      fieldNameForTopicId,
      isUpdating,
      resourceOfArticleItemEditView,
    ]
  );

  const handleFieldsTouched = useCallback(
    (isFieldsTouched: boolean) => {
      if (isFieldsTouched !== isFormFieldsTouched) {
        setTimeout(() => {
          setIsFormFieldsTouched(isFieldsTouched);
        });
      }
    },
    [isFormFieldsTouched]
  );

  const formRef = useRef<{ reset?: () => void; }>({});

  const handleGetFunctionToResetFields = useCallback(
    (functionToResetFields: () => void) => {
      formRef.current.reset = functionToResetFields;
    },
    []
  )
  const handleSubmitFailed = useCallback(
    (error: unknown) => {
      console.log('MAKC:onSubmitFailed:error', error);
    },
    []
  );

  const handleSubmitSuccess = useCallback(
    (values: any) => {
      const entity = serviceOfArticleItemEditView.convertToEntity(values);

      dispatchOfSaveAction.run(entity).then(() => {
        if (isUpdating) {
          setIsFormFieldsTouched(false);
          shouldBeNavigetedToArticlePageRef.current = true;
        } else if (formRef.current.reset) {
          formRef.current.reset();
        }
      });
    },
    [dispatchOfSaveAction, isUpdating, serviceOfArticleItemEditView]
  );

  const title = isUpdating
    ? resourceOfArticleItemEditView.getTitleForEdit()
    : resourceOfArticleItemEditView.getTitleForNew();

  return (
    <div className={styles.root}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <h2>{ title }</h2>
      {
        pendingOfLoadAction
          ? <controls.Spinner/>
          : <controls.Form
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
