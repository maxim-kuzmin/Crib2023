import React, { memo, useCallback, useMemo, useRef } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import {
  StoreDispatchType,
  OperationStatus,
  type ArticleDomainItemGetOperationInput,
  TreeGetOperationAxisForItem,
  type TopicDomainItemGetOperationInput,
  ArticleItemView,
  type ArticlePageProps,
  ArticleItemEditView,
  ArticlePageMode,
  type ArticleItemStoreSetActionPayload,
  type TopicItemStoreSetActionPayload
} from '../../all';
import { getModule } from '../../app/Module/Impls';
import { ArticleItemStoreSliceName, TopicItemStoreSliceName } from '../../app/Stores';

const articleItemStoreSliceName = ArticleItemStoreSliceName.Global;
const topicItemStoreSliceName = TopicItemStoreSliceName.Global;

export const ArticlePage: React.FC<ArticlePageProps> = memo(
function ArticlePage ({
  mode
}: ArticlePageProps) {
  const urlParams = useParams();
  const [searchParams] = useSearchParams();

  const articleItemStoreHooks = getModule().getArticleItemStoreHooks();

  const {
    payloadFromSetAction: articleItemResponse,
    status: articleItemStatus
  } = articleItemStoreHooks.useState(articleItemStoreSliceName);

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
    sliceName: articleItemStoreSliceName,
    dispatchType: StoreDispatchType.MountOrUpdate,
    callback: callbackOnArticleItemLoad,
    payload: payloadToArticleItemLoad
  });

  articleItemStoreHooks.useDispatchToClear({
    sliceName: articleItemStoreSliceName,
    dispatchType: StoreDispatchType.Unmount
  });

  const topicItemStoreHooks = getModule().getTopicItemStoreHooks();

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

  topicItemStoreHooks.useDispatchToLoad({
    sliceName: topicItemStoreSliceName,
    dispatchType: StoreDispatchType.MountOrUpdate,
    isCanceled: !articleItemIsLoaded.current,
    callback: callbackOnTopicItemLoad,
    payload: payloadToTopicItemLoad
  });

  topicItemStoreHooks.useDispatchToClear({
    sliceName: topicItemStoreSliceName,
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
