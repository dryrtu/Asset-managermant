import { ShoppingPlan } from "./ShoppingPlan";
import {Unit} from './Unit';
import {Manufacturer} from './Manufacturer';
import {WarrantyInfo} from './WarrantyInfo';
import {Contract} from './Contract';


export class Asset {
  id: number;
  itemCode: string;
  assetName: string;
  itemCodeKt: string;
  shoppingPlan: ShoppingPlan;
  serial: string;
  specifications: string;
  description: string;
  quantity: string;
  price: number;
  dayStartedUsing: Date;
  productOrigin: string;
  assetLicenceStatus: string;
  licenceDuration: Date;
  units: Unit[];
  manufacturers: Manufacturer[];
  warrantyInfo: WarrantyInfo[];
  contracts: Contract[];
  lookingUpInformation: string;
  }
