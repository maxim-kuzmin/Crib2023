import React, { memo, useCallback, useMemo, useRef } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import {
  getModule,
  StoreDispatchType,
  OperationStatus,
  type ArticleDomainItemGetOperationResponse,
  type ArticleDomainItemGetOperationInput,
  TreeGetOperationAxisForItem,
  type TopicDomainItemGetOperationInput,
  type TopicDomainItemGetOperationResponse,
  ArticleItemView,
  type ArticlePageProps,
  ArticleItemEditView,
  ArticlePageMode
} from '../../all';

export const ArticlePage: React.FC<ArticlePageProps> = memo(
    function ArticlePage ({
      mode
    }: ArticlePageProps) {
  const urlParams = useParams();
  const [searchParams] = useSearchParams();

  const articleItemStoreHooks = getModule().getArticleItemStoreHooks();

  const { response: articleItemResoponse, status: articleItemStatus } = articleItemStoreHooks.useState();

  let topicId = articleItemResoponse?.data?.item?.data.topicId ?? 0;

  if (topicId === 0) {
    topicId = getModule().getArticlePageService().getUrlSearch(searchParams).topicId;
  }

  let articleId = Number(urlParams.articleId ?? 0);

  if (isNaN(articleId)) {
    articleId = 0;
  }

  const articleItemIsLoaded = useRef(false);

  const callbackOnArticleItemLoad = useCallback((response: ArticleDomainItemGetOperationResponse | null) => {
    console.log('MAKC:ArticlePage:callbackOnArticleItemLoad:response', response);
    articleItemIsLoaded.current = true;
  }, []);

  const inputAtDispatchToArticleItemLoad: ArticleDomainItemGetOperationInput = useMemo(
    () => ({
      id: articleId
    }),
    [articleId]
  );

  articleItemStoreHooks.useDispatchToLoad({
    dispatchType: StoreDispatchType.MountOrUpdate,
    callback: callbackOnArticleItemLoad,
    inputAtDispatch: inputAtDispatchToArticleItemLoad
  });

  articleItemStoreHooks.useDispatchToClear({
    dispatchType: StoreDispatchType.Unmount
  });

  const topicItemStoreService = getModule().getTopicItemStoreService();

  const callbackOnTopicItemLoad = useCallback((response: TopicDomainItemGetOperationResponse | null) => {
    console.log('MAKC:TopicPage:callbackOnTopicItemtLoad:response', response);
  }, []);

  const inputAtDispatchToTopicItemLoad: TopicDomainItemGetOperationInput = useMemo(
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
    inputAtDispatch: inputAtDispatchToTopicItemLoad
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
          response={articleItemResoponse}
          topicPageLastUrl={topicPageLastUrl}
        />
      : <ArticleItemEditView
          articleId={articleId}
          loading={articleItemLoading}
          response={articleItemResoponse}
          topicId={topicId}
          topicPageLastUrl={topicPageLastUrl}
        />
  )
});
