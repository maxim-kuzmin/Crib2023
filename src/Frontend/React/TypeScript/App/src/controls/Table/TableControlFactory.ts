import { useMemo } from 'react';
import { getModule, LocalizationNamespace } from '../../app';
import { type TableControlHooks } from './TableControlHooks';
import { type TableControlResource } from './TableControlResource';

export function createTableControlHooks (): TableControlHooks {
  function useResource (): TableControlResource {
    const hooksOfLocalization = getModule().getLocalizationHooks();

    const localizer = hooksOfLocalization.useLocalizer(LocalizationNamespace.TableControl);

    const valueOfPaginationPartForFrom: string = localizer.getValue('@@PaginationPartForFrom');
    const valueOfPaginationPartForJumpTo: string = localizer.getValue('@@PaginationPartForJumpTo');
    const valueOfPaginationPartForNext3Pages: string = localizer.getValue('@@PaginationPartForNext3Pages');
    const valueOfPaginationPartForNext5Pages: string = localizer.getValue('@@PaginationPartForNext5Pages');
    const valueOfPaginationPartForNextPage: string = localizer.getValue('@@PaginationPartForNextPage');
    const valueOfPaginationPartForPageTo: string = localizer.getValue('@@PaginationPartForPageTo');
    const valueOfPaginationPartForPerPage: string = localizer.getValue('@@PaginationPartForPerPage');
    const valueOfPaginationPartForPrev3Pages: string = localizer.getValue('@@PaginationPartForPrev3Pages');
    const valueOfPaginationPartForPrev5Pages: string = localizer.getValue('@@PaginationPartForPrev5Pages');
    const valueOfPaginationPartForPrevPage: string = localizer.getValue('@@PaginationPartForPrevPage');

    return useMemo(() => {
        const result: TableControlResource = {
          getPaginationPartForFrom: () => valueOfPaginationPartForFrom,
          getPaginationPartForJumpTo: () => valueOfPaginationPartForJumpTo,
          getPaginationPartForNext3Pages: () => valueOfPaginationPartForNext3Pages,
          getPaginationPartForNext5Pages: () => valueOfPaginationPartForNext5Pages,
          getPaginationPartForNextPage: () => valueOfPaginationPartForNextPage,
          getPaginationPartForPageTo: () => valueOfPaginationPartForPageTo,
          getPaginationPartForPerPage: () => valueOfPaginationPartForPerPage,
          getPaginationPartForPrev3Pages: () => valueOfPaginationPartForPrev3Pages,
          getPaginationPartForPrev5Pages: () => valueOfPaginationPartForPrev5Pages,
          getPaginationPartForPrevPage: () => valueOfPaginationPartForPrevPage,
        };

        return result;
      },
      [
        valueOfPaginationPartForFrom,
        valueOfPaginationPartForJumpTo,
        valueOfPaginationPartForNext3Pages,
        valueOfPaginationPartForNext5Pages,
        valueOfPaginationPartForNextPage,
        valueOfPaginationPartForPageTo,
        valueOfPaginationPartForPerPage,
        valueOfPaginationPartForPrev3Pages,
        valueOfPaginationPartForPrev5Pages,
        valueOfPaginationPartForPrevPage,
      ]
    );
  }

  return { useResource };
}
