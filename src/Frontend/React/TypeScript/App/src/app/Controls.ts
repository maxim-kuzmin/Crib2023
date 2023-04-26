import type React from 'react';
import {
  type BreadcrumbControlProps,
  type ButtonControlProps,
  type CardControlProps,
  type FormControlProps,
  type LayoutControlProps,
  type SelectControlProps,
  type TableControlProps,
  type TextAreaControlProps,
  type TextInputControlProps,
  type TreeControlProps,
} from '../common';

export interface Controls {
  readonly Breadcrumb: React.FC<BreadcrumbControlProps>;
  readonly Button: React.FC<ButtonControlProps>;
  readonly Card: React.FC<CardControlProps>;
  readonly Form: React.FC<FormControlProps>;
  readonly Layout: React.FC<LayoutControlProps>;
  readonly Select: React.FC<SelectControlProps>;
  readonly Spinner: React.FC;
  readonly Table: React.FC<TableControlProps>;
  readonly TextArea: React.FC<TextAreaControlProps>;
  readonly TextInput: React.FC<TextInputControlProps>;
  readonly Tree: React.FC<TreeControlProps>;
}
