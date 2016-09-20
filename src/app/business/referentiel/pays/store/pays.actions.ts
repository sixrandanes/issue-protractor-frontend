import { Action } from '@ngrx/store';

export class PaysActions {
  static LOAD_PAYS = '[PAYS] Load Pays';
  static loadPays(): Action {
    return {
      type: PaysActions.LOAD_PAYS
    };
  }

  static LOAD_PAYS_SUCCESS = '[PAYS] Load Pays Success';
  static loadPaysSuccess(pays): Action {
    return {
      type: PaysActions.LOAD_PAYS_SUCCESS,
      payload: pays
    };
  }

  static SEARCH_PAYS = '[PAYS] Search Pays';
  static searchPays(search: Object): Action {
    return {
      type: PaysActions.SEARCH_PAYS,
      payload: search
    };
  }

  static SEARCH_PAYS_SUCCESS = '[PAYS] Search Pays Success';
  static searchPaysSuccess(pays): Action {
    return {
      type: PaysActions.SEARCH_PAYS_SUCCESS,
      payload: pays
    };
  }

  static INIT_PAYS = '[PAYS] Init';
  static init(): Action {
    return {
      type: PaysActions.INIT_PAYS
    };
  }

  static ADD_PAYS = '[PAYS] Add Pays';
  static addPays(pays): Action {
    return {
      type: PaysActions.ADD_PAYS,
      payload: pays
    };
  }

  static GET_PAYS= '[PAYS] Get Pays';
  static getPays(resource): Action {
    return {
      type: PaysActions.GET_PAYS,
      payload: resource
    };
  }

  static GET_PAYS_SUCCESS = '[PAYS] Get pays Success';
  static getPaysSuccess(pays): Action {
    return {
      type: PaysActions.GET_PAYS_SUCCESS,
      payload: pays
    };
  }

  static UPDATE_PAYS = '[PAYS] Update Pays';
  static updatePays(pays): Action {
    return {
      type: PaysActions.UPDATE_PAYS,
      payload: pays
    };
  }
}
