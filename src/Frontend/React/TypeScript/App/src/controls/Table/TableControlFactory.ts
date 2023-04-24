import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { type TableControlHooks } from './TableControlHooks';
import { type TableControlResource } from './TableControlResource';

export function createTableControlHooks (): TableControlHooks {
  function useResource (): TableControlResource {
    const { t } = useTranslation('controls/Table/TableControl');

    const tFrom: string = t('@@from');
    const tJumpTo: string = t('@@Jump_to');
    const tNext3Pages: string = t('@@Next_3_pages');
    const tNext5Pages: string = t('@@Next_5_pages');
    const tNextPage: string = t('@@Next_page');
    const tPageTo: string = t('@@page_to');
    const tPerPage: string = t('@@per_page');
    const tPrev3Pages: string = t('@@Prev_3_pages');
    const tPrev5Pages: string = t('@@Prev_5_pages');
    const tPrevPage: string = t('@@Prev_page');

    return useMemo(() => {
        const result: TableControlResource = {
          getFrom: () => tFrom,
          getJumpTo: () => tJumpTo,
          getNext3Pages: () => tNext3Pages,
          getNext5Pages: () => tNext5Pages,
          getNextPage: () => tNextPage,
          getPageTo: () => tPageTo,
          getPerPage: () => tPerPage,
          getPrev3Pages: () => tPrev3Pages,
          getPrev5Pages: () => tPrev5Pages,
          getPrevPage: () => tPrevPage,
        };

        return result;
      },
      [
        tFrom,
        tJumpTo,
        tNext3Pages,
        tNext5Pages,
        tNextPage,
        tPageTo,
        tPerPage,
        tPrev3Pages,
        tPrev5Pages,
        tPrevPage,
      ]
    );
  }

  return { useResource };
}
