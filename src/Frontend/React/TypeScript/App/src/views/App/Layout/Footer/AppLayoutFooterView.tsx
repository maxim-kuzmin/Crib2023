import React from 'react';

export const AppLayoutFooterView: React.FC = () => {
  return (
    <>
      ©{(new Date()).getFullYear()} Maxim Kuzmin
    </>
  );
}
