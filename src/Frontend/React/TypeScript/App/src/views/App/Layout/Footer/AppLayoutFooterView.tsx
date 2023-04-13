import React, { memo } from 'react';

export const AppLayoutFooterView: React.FC = memo(
function AppLayoutFooterView () {
  return (
    <>
      ©{(new Date()).getFullYear()} Maxim Kuzmin
    </>
  );
});
