import { type StoreService } from './StoreService';
import { StoreServiceImpl } from './StoreServiceImpl';

export interface StoreModule {
  readonly getService: () => StoreService;
}

export function createStoreModule (): StoreModule {
  const implOfService = new StoreServiceImpl();

  function getService (): StoreService {
    return implOfService;
  }

  return { getService };
}
