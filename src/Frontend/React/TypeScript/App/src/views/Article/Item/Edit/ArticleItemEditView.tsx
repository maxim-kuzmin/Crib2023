import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import {
  getModule,
  type ArticleItemStoreLoadActionPayload
} from '../../../../app';
import {
  type FormControlAction,
  FormControlActionType,
  type FormControlField,
  FormControlFieldType
} from '../../../../common';
import { FormControl, SpinnerControl } from '../../../../controls';
import { createArticleTypeEntity, type ArticleTypeEntity } from '../../../../data';
import { type ArticleItemEditViewProps } from './ArticleItemEditViewProps';
import styles from './ArticleItemEditView.module.css';

export const ArticleItemEditView: React.FC<ArticleItemEditViewProps> = memo(
function ArticleItemEditView ({
  articleId,
  onArticleItemClearActionCompleted,
  onArticleItemLoadActionCompleted,
  topicId,
  topicPageLastUrl
}: ArticleItemEditViewProps) {
  const hooksOfArticleItemEditView = getModule().getArticleItemEditViewHooks();

  const resourceOfArticleItemEditView = hooksOfArticleItemEditView.useResource();

  const hooksOfArticleItemView = getModule().getArticleItemViewHooks();

  hooksOfArticleItemView.useStoreClearActionOutput({
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
  } = hooksOfArticleItemView.useStoreLoadActionOutput({
    onActionCompleted: onArticleItemLoadActionCompleted,
    payloadOfLoadAction
  });

  const loadedEntity = payloadOfLoadCompletedAction?.data?.item.data;

  const {
    dispatchOfSaveAction,
    payloadOfSaveCompletedAction,
    pendingOfSaveAction
  } = hooksOfArticleItemView.useStoreSaveActionOutput();

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
        title: resourceOfArticleItemEditView.getSave(),
        disabled: pendingOfLoadAction,
        loading: pendingOfSaveAction,
        type: FormControlActionType.Submit
      };

      result.push(actionToSave);

      const actionToReset: FormControlAction = {
        key: 'reset',
        title: resourceOfArticleItemEditView.getReset(),
        disabled: pendingOfLoadAction || pendingOfSaveAction,
        type: FormControlActionType.Reset
      };

      result.push(actionToReset);

      if (articleId > 0) {
        const actionToDisplay: FormControlAction = {
          href: articlePageService.createUrl({ articleId }),
          key: 'display',
          title: resourceOfArticleItemEditView.getDisplay(),
          type: FormControlActionType.None
        };

        result.push(actionToDisplay);
      }

      if (topicPageLastUrl) {
        const actionToBackToList: FormControlAction = {
          href: topicPageLastUrl,
          key: 'backToList',
          title: resourceOfArticleItemEditView.getBackToList(),
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
      topicPageLastUrl,
      resourceOfArticleItemEditView,
    ]
  );

  const controlFields: FormControlField[] = useMemo(
    () => {
      const fieldForId: FormControlField = {
        label: resourceOfArticleItemEditView.getId(),
        name: fieldNameForId,
        type: articleId > 0 ? FormControlFieldType.Readonly : FormControlFieldType.Hidden
      };

      const fieldForTitle: FormControlField = {
        name: fieldNameForTitle,
        label: resourceOfArticleItemEditView.getTitle(),
        type: FormControlFieldType.TextInput
      };

      const fieldForBody: FormControlField = {
        label: resourceOfArticleItemEditView.getBody(),
        name: fieldNameForBody,
        type: FormControlFieldType.TextArea
      };

      const fieldForTopicId: FormControlField = {
        label: resourceOfArticleItemEditView.getTopic(),
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
      <h2>
        {
          articleId > 0
            ? resourceOfArticleItemEditView.getArticleEdit()
            : resourceOfArticleItemEditView.getArticleNew()
        }
      </h2>
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
