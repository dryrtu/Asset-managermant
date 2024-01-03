import { ShoppingPlan } from "./ShoppingPlan";

export class ShoppingPlanHistory {

    id: number;
    shoppingPlan: ShoppingPlan[];
    productName: string;
    productTypeDetail: string;
    unit: string;
    currency: string;
    quantity: number;
    description: string;
    planListDetail: string;
    createdBy: string;
    createdDateTime: Date;
    updateDate: Date;
    version: string;
    modifiedBy: string;
    
  }