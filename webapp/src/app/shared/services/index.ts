import { UtilsService } from './utils.service';
import { ExcelService } from './xls.service';

export const services: any[] = [
  UtilsService,
  ExcelService,
];

export * from './utils.service';
export * from './xls.service';
