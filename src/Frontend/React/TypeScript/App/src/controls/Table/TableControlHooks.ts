import { useMemo } from 'react';
import app from '../../app';
import {
  type TableControlHooks,
  type TableControlResource
} from '../../common';
import { getTableControlResourcePath } from './TableControlResource';

export function createTableControlHooks (): TableControlHooks {
  function useResource (): TableControlResource {
    const translator = app.hooks.Features.Localization.useTranslator(getTableControlResourcePath());

    const tPaginationPartForFrom: string = translator.translate('@@PaginationPartForFrom');
    const tPaginationPartForJumpTo: string = translator.translate('@@PaginationPartForJumpTo');
    const tPaginationPartForNext3Pages: string = translator.translate('@@PaginationPartForNext3Pages');
    const tPaginationPartForNext5Pages: string = translator.translate('@@PaginationPartForNext5Pages');
    const tPaginationPartForNextPage: string = translator.translate('@@PaginationPartForNextPage');
    const tPaginationPartForPageTo: string = translator.translate('@@PaginationPartForPageTo');
    const tPaginationPartForPerPage: string = translator.translate('@@PaginationPartForPerPage');
    const tPaginationPartForPrev3Pages: string = translator.translate('@@PaginationPartForPrev3Pages');
    const tPaginationPartForPrev5Pages: string = translator.translate('@@PaginationPartForPrev5Pages');
    const tPaginationPartForPrevPage: string = translator.translate('@@PaginationPartForPrevPage');

    const { language } = translator;

    return useMemo(() => {
        const result: TableControlResource = {
          getPaginationPartForFrom: () => tPaginationPartForFrom,
          getPaginationPartForJumpTo: () => tPaginationPartForJumpTo,
          getPaginationPartForNext3Pages: () => tPaginationPartForNext3Pages,
          getPaginationPartForNext5Pages: () => tPaginationPartForNext5Pages,
          getPaginationPartForNextPage: () => tPaginationPartForNextPage,
          getPaginationPartForPageTo: () => tPaginationPartForPageTo,
          getPaginationPartForPerPage: () => tPaginationPartForPerPage,
          getPaginationPartForPrev3Pages: () => tPaginationPartForPrev3Pages,
          getPaginationPartForPrev5Pages: () => tPaginationPartForPrev5Pages,
          getPaginationPartForPrevPage: () => tPaginationPartForPrevPage,
          language
        };

        return result;
      },
      [
        tPaginationPartForFrom,
        tPaginationPartForJumpTo,
        tPaginationPartForNext3Pages,
        tPaginationPartForNext5Pages,
        tPaginationPartForNextPage,
        tPaginationPartForPageTo,
        tPaginationPartForPerPage,
        tPaginationPartForPrev3Pages,
        tPaginationPartForPrev5Pages,
        tPaginationPartForPrevPage,
        language
      ]
    );
  }

  return { useResource };
}
