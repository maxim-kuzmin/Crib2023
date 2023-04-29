import React, { memo } from 'react';
import { Select } from 'antd';
import { type SelectControlProps } from '../../common';

export const SelectControl: React.FC<SelectControlProps> = memo(
function SelectControl ({
  defaultValue,
  className,
  key,
  onChange,
  options
}: SelectControlProps): React.ReactElement<SelectControlProps> | null {
  const props = {
    defaultValue,
    className,
    onChange,
    key,
    options: options.map((controlOption) => {
      const { label, value } = controlOption;

      return {
        label: label ?? value,
        value
      };
    })
  }

  return (<Select {...props} />);
});
