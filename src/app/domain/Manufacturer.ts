import {Contact} from './Contact';

export class Manufacturer {
  id: number;
  manufacturer: string;
  address: string;
  note: string;
  contacts: Contact[];
}
