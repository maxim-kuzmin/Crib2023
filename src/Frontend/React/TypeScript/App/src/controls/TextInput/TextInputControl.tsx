import React, { memo } from 'react';
import { Input } from 'antd';
import { type TextInputControlProps } from '../../common';

export const TextInputControl: React.FC<TextInputControlProps> = memo(
function TextInputControl ({
  className
}: TextInputControlProps): React.ReactElement<TextInputControlProps> | null {
  const props = {
    className
  };

  return (<Input {...props} />);
});
