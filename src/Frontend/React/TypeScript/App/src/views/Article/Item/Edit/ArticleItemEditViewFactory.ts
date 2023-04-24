import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { type ArticleItemEditViewHooks } from './ArticleItemEditViewHooks';
import { type ArticleItemEditViewResource } from './ArticleItemEditViewResource';

export function createArticleItemEditViewHooks (): ArticleItemEditViewHooks {
  function useResource (): ArticleItemEditViewResource {
    const { t } = useTranslation('views/Article/Item/Edit/ArticleItemEditView');

    const tArticleEdit: string = t('@@Article_edit');
    const tArticleNew = t('@@Article_new');
    const tBackToList: string = t('@@Back_to_list');
    const tBody: string = t('@@Body');
    const tDisplay: string = t('@@Display');
    const tId: string = t('@@Id');
    const tReset: string = t('@@Reset');
    const tSave: string = t('@@Save');
    const tTitle: string = t('@@Title');
    const tTopic = t('@@Topic');

    return useMemo(() => {
        const result: ArticleItemEditViewResource = {
          getArticleEdit: () => tArticleEdit,
          getArticleNew: () => tArticleNew,
          getBackToList: () => tBackToList,
          getBody: () => tBody,
          getDisplay: () => tDisplay,
          getId: () => tId,
          getReset: () => tReset,
          getSave: () => tSave,
          getTitle: () => tTitle,
          getTopic: () => tTopic,
        };

        return result;
      },
      [
        tArticleEdit,
        tArticleNew,
        tBackToList,
        tBody,
        tDisplay,
        tId,
        tReset,
        tSave,
        tTitle,
        tTopic
      ]
    );
  }

  return { useResource };
}
