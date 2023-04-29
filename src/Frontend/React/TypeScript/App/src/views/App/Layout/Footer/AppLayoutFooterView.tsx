import React, { memo } from 'react';

export const AppLayoutFooterView: React.FC = memo(
function AppLayoutFooterView (): React.ReactElement | null {
  return (
    <>
      ©{(new Date()).getFullYear()} Maxim Kuzmin
    </>
  );
});
