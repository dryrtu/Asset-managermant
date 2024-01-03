import { assetStatus } from './asset-status';
import { Currency } from './Currency';
import { PlanListDetail } from './PlanListDetail';
import { ProductTypeDetail } from './ProductTypeDetail';
import { Unit } from './Unit';

export class ShoppingPlan {
    id: number;
    productName: string;
    productTypeDetails: ProductTypeDetail[];
    units: Unit[];
    currencies: Currency[];
    quantity: number;
    status: assetStatus;
    description: string;
    planListDetails: PlanListDetail[];
    createdBy: string;
    createdDateTime: Date;
    approvedBy: string;
    expectedPrice: number;
  }
