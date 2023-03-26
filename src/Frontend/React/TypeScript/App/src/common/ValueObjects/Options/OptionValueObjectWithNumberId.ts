import { type OptionValueObject } from '../../../all';

export interface OptionValueObjectWithNumberId extends OptionValueObject<number> {
  id: number;
  name: string;
}
