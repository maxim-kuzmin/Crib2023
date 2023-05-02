import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
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
  onArticleItemClearActionCompleted,
  onArticleItemLoadActionCompleted,
  topicId,
  topicPageLastUrl
}: ArticleItemEditViewProps): React.ReactElement<ArticleItemEditViewProps> | null {
  const { control, hooks, module } = useAppInstance();

  const resourceOfArticleItemEditView = hooks.Views.Article.Item.Edit.useResource();

  hooks.Views.Article.Item.useStoreClearActionOutput({
    onActionCompleted: onArticleItemClearActionCompleted
  });

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

  const serviceOfArticleItemEditView = module.Views.Article.Item.Edit.getService();

  const formValues = useMemo(
    () => serviceOfArticleItemEditView.convertToFormValues(entity),
    [entity, serviceOfArticleItemEditView]
  );

  const {
    fieldNameForBody,
    fieldNameForId,
    fieldNameForTitle,
    fieldNameForTopicId
  } = module.Views.Article.Item.Edit.getService();

  const serviceOfArticlePage = module.Pages.Article.getService();

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

      if (articleId > 0) {
        const actionToDisplay: FormControlAction = {
          href: serviceOfArticlePage.createUrl({ articleId }),
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
      articleId,
      pendingOfLoadAction,
      pendingOfSaveAction,
      resourceOfArticleItemEditView,
      serviceOfArticlePage,
      topicPageLastUrl,
    ]
  );

  const controlFields: FormControlField[] = useMemo(
    () => {
      const fieldForId: FormControlField = {
        label: resourceOfArticleItemEditView.getLabelForId(),
        name: fieldNameForId,
        type: articleId > 0 ? FormControlFieldType.Readonly : FormControlFieldType.Hidden
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
      articleId,
      fieldNameForBody,
      fieldNameForId,
      fieldNameForTitle,
      fieldNameForTopicId,
      resourceOfArticleItemEditView,
    ]
  );

  const [isFormFieldsTouched, setIsFormFieldsTouched] = useState(false);

  hooks.Common.useLeaveFormBlocker(isFormFieldsTouched);

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
      const entity = serviceOfArticleItemEditView.convertToEntity(values);

      dispatchOfSaveAction.run(entity).then(() => {
          if (form.current.reset) {
            form.current.reset();
          }
      });
    },
    [dispatchOfSaveAction, serviceOfArticleItemEditView]
  );

  const title = articleId > 0
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
          ? <control.Spinner/>
          : <control.Form
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
