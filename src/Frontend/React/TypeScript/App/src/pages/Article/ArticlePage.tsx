import React, { memo, useCallback, useMemo, useRef } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getModule } from '../../app/ModuleImpl';
import { type ArticlePageProps } from './ArticlePageProps';
import { type ArticleItemStoreSetActionPayload, type TopicItemStoreSetActionPayload } from '../../app';
import { type ArticleDomainItemGetOperationInput, type TopicDomainItemGetOperationInput } from '../../domains';
import { OperationStatus, StoreDispatchType, TreeGetOperationAxisForItem } from '../../common';
import { ArticlePageMode } from './ArticlePageMode';
import { ArticleItemEditView, ArticleItemView } from '../../views';

export const ArticlePage: React.FC<ArticlePageProps> = memo(
function ArticlePage ({
  mode
}: ArticlePageProps) {
  const urlParams = useParams();
  const [searchParams] = useSearchParams();

  const articleItemViewHooks = getModule().getArticleItemViewHooks();

  const {
    payloadFromSetAction: articleItemResponse,
    status: articleItemStatus
  } = articleItemViewHooks.useState();

  let topicId = articleItemResponse?.data?.item?.data.topicId ?? 0;

  if (topicId === 0) {
    topicId = getModule().getArticlePageService().getUrlSearch(searchParams).topicId;
  }

  let articleId = Number(urlParams.articleId ?? 0);

  if (isNaN(articleId)) {
    articleId = 0;
  }

  const articleItemIsLoaded = useRef(false);

  const callbackOnArticleItemLoad = useCallback((payload: ArticleItemStoreSetActionPayload) => {
    console.log('MAKC:ArticlePage:callbackOnArticleItemLoad:payload', payload);
    articleItemIsLoaded.current = true;
  }, []);

  const payloadToArticleItemLoad: ArticleDomainItemGetOperationInput = useMemo(
    () => ({
      id: articleId
    }),
    [articleId]
  );

  articleItemViewHooks.useDispatchToLoad({
    dispatchType: StoreDispatchType.MountOrUpdate,
    callback: callbackOnArticleItemLoad,
    payload: payloadToArticleItemLoad
  });

  articleItemViewHooks.useDispatchToClear({
    dispatchType: StoreDispatchType.Unmount
  });

  const topicItemViewHooks = getModule().getTopicItemViewHooks();

  const callbackOnTopicItemLoad = useCallback((payload: TopicItemStoreSetActionPayload) => {
    console.log('MAKC:ArticlePage:callbackOnTopicItemtLoad:payload', payload);
  }, []);

  const payloadToTopicItemLoad: TopicDomainItemGetOperationInput = useMemo(
    () => ({
      axis: TreeGetOperationAxisForItem.Self,
      id: topicId
    }),
    [topicId]
  );

  topicItemViewHooks.useDispatchToLoad({
    dispatchType: StoreDispatchType.MountOrUpdate,
    isCanceled: !articleItemIsLoaded.current,
    callback: callbackOnTopicItemLoad,
    payload: payloadToTopicItemLoad
  });

  topicItemViewHooks.useDispatchToClear({
    dispatchType: StoreDispatchType.Unmount
  });

  const articleItemLoading = (articleItemStatus === OperationStatus.Pending);

  const topicPageLastUrl = getModule().getTopicPageService().lastUrl;

  return (
    mode === ArticlePageMode.Display
      ? <ArticleItemView
          loading={articleItemLoading}
          response={articleItemResponse}
          topicPageLastUrl={topicPageLastUrl}
        />
      : <ArticleItemEditView
          articleId={articleId}
          loading={articleItemLoading}
          response={articleItemResponse}
          topicId={topicId}
          topicPageLastUrl={topicPageLastUrl}
        />
  )
});
