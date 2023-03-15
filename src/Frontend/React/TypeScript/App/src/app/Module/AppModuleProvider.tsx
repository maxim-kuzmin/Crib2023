import React, { type PropsWithChildren } from 'react';
import { createAppModuleService } from './AppModuleService';

const service = createAppModuleService();

export function AppModuleProvider ({ children }: PropsWithChildren) {
  return (
    <service.ModuleContext.Provider value={service.module}>
      {children}
    </service.ModuleContext.Provider>
  )
}
