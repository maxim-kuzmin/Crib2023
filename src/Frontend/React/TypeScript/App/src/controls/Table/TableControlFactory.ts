import { useMemo } from 'react';
import { getModule, LocalizationTarget } from '../../app';
import { type TableControlHooks } from './TableControlHooks';
import { type TableControlResource } from './TableControlResource';

export function createTableControlHooks (): TableControlHooks {
  function useResource (): TableControlResource {
    const hooksOfLocalization = getModule().getLocalizationHooks();

    const localizer = hooksOfLocalization.useTranslator(LocalizationTarget.TableControl);

    const tPaginationPartForFrom: string = localizer.translate('@@PaginationPartForFrom');
    const tPaginationPartForJumpTo: string = localizer.translate('@@PaginationPartForJumpTo');
    const tPaginationPartForNext3Pages: string = localizer.translate('@@PaginationPartForNext3Pages');
    const tPaginationPartForNext5Pages: string = localizer.translate('@@PaginationPartForNext5Pages');
    const tPaginationPartForNextPage: string = localizer.translate('@@PaginationPartForNextPage');
    const tPaginationPartForPageTo: string = localizer.translate('@@PaginationPartForPageTo');
    const tPaginationPartForPerPage: string = localizer.translate('@@PaginationPartForPerPage');
    const tPaginationPartForPrev3Pages: string = localizer.translate('@@PaginationPartForPrev3Pages');
    const tPaginationPartForPrev5Pages: string = localizer.translate('@@PaginationPartForPrev5Pages');
    const tPaginationPartForPrevPage: string = localizer.translate('@@PaginationPartForPrevPage');

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
      ]
    );
  }

  return { useResource };
}
