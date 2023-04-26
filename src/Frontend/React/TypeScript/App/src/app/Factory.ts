import {
  type ConfirmControlComponent,
  type ConfirmControlHooks,
} from '../common';
import { useLeaveFormBlocker as useLeaveFormBlockerInner } from './Hooks/LeaveFormBlockerHook';
import {
  BreadcrumbControl,
  ButtonControl,
  CardControl,
  FormControl,
  LayoutControl,
  SpinnerControl,
  SelectControl,
  TableControl,
  TextAreaControl,
  TextInputControl,
  TreeControl,
} from '../controls';
import { ModuleImpl } from './ModuleImpl';
import { type Controls, type Hooks, type Module } from '.';

interface Options {
  readonly componentOfConfirmControl: ConfirmControlComponent;
  readonly hooksOfConfirmControl: ConfirmControlHooks;
}

export function createControls (): Controls {
  return {
    Breadcrumb: BreadcrumbControl,
    Button: ButtonControl,
    Card: CardControl,
    Form: FormControl,
    Layout: LayoutControl,
    Select: SelectControl,
    Spinner: SpinnerControl,
    Table: TableControl,
    TextArea: TextAreaControl,
    TextInput: TextInputControl,
    Tree: TreeControl,
  }
}

export function createHooks ({
  componentOfConfirmControl,
  hooksOfConfirmControl
}: Options): Hooks {
  function useLeaveFormBlocker (shouldBlock: boolean) {
    useLeaveFormBlockerInner({
      componentOfConfirmControl,
      hooksOfConfirmControl,
      shouldBlock
    });
  }

  return {
    useLeaveFormBlocker
  };
}

export function createModule (): Module {
  return new ModuleImpl();
}
