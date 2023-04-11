import React, { memo, useCallback, useMemo, useRef } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import {
  getModule,
  StoreDispatchType,
  OperationStatus,
  type ArticleDomainItemGetOperationInput,
  TreeGetOperationAxisForItem,
  type TopicDomainItemGetOperationInput,
  type TopicDomainItemGetOperationResponse,
  ArticleItemView,
  type ArticlePageProps,
  ArticleItemEditView,
  ArticlePageMode,
  type ArticleItemStoreSetActionPayload
} from '../../all';

export const ArticlePage: React.FC<ArticlePageProps> = memo(
    function ArticlePage ({
      mode
    }: ArticlePageProps) {
  const urlParams = useParams();
  const [searchParams] = useSearchParams();

  const articleItemStoreHooks = getModule().getArticleItemStoreHooks();

  const { response: articleItemResponse, status: articleItemStatus } = articleItemStoreHooks.useState();

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

  articleItemStoreHooks.useDispatchToLoad({
    dispatchType: StoreDispatchType.MountOrUpdate,
    callback: callbackOnArticleItemLoad,
    payload: payloadToArticleItemLoad
  });

  articleItemStoreHooks.useDispatchToClear({
    dispatchType: StoreDispatchType.Unmount
  });

  const topicItemStoreService = getModule().getTopicItemStoreService();

  const callbackOnTopicItemLoad = useCallback((response: TopicDomainItemGetOperationResponse | null) => {
    console.log('MAKC:TopicPage:callbackOnTopicItemtLoad:response', response);
  }, []);

  const payloadToTopicItemLoad: TopicDomainItemGetOperationInput = useMemo(
    () => ({
      axis: TreeGetOperationAxisForItem.Self,
      id: topicId
    }),
    [topicId]
  );

  topicItemStoreService.useDispatchToLoad({
    dispatchType: StoreDispatchType.MountOrUpdate,
    isCanceled: !articleItemIsLoaded.current,
    callback: callbackOnTopicItemLoad,
    payload: payloadToTopicItemLoad
  });

  topicItemStoreService.useDispatchToClear({
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
