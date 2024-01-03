import {Supplier} from './Supplier';

export class Contract {
  id: number;
  contractCode: string;
  contractName: string;
  archiveLink: string;
  contractStartDate: Date;
  contractEndDate: Date;
  warrantyPeriod: number;
  warrantyStartDate: Date;
  warrantyEndDate: Date;
  suppliers: Supplier[];
  attachedFiles: string;
  contractStatus: string;
}
