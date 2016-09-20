import { ValidationMessageService } from './validation-message.service';
import { PaysService } from './../../business/referentiel/pays/service/pays.service';
import { IldaGridService } from '../modules/grid/services/ilda-grid.service';
import { CrudService } from './crud.service';
import { IldaHttpService } from './http.service';

export {
    PaysService,
    ValidationMessageService,
    IldaGridService,
    CrudService,
    IldaHttpService
};

export default [
  PaysService,
  ValidationMessageService,
  IldaGridService,
  CrudService,
  IldaHttpService
];
