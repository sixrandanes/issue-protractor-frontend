import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { HttpResultActions, PaysActions } from '../../../../shared/store/actions';
import { PaysService } from '../service';
import { Observable } from 'rxjs/Observable';

/**
 * Effects pays
 */
@Injectable()
export class PaysEffects {
  constructor(private actions$: Actions,
              private paysSvc: PaysService) {
  }

  /**
   * load Pays
   */
  @Effect() loadPays$ = this.actions$
    .ofType(PaysActions.LOAD_PAYS)
    .switchMap(() => this.paysSvc.loadItems()
      .map(pays => PaysActions.loadPaysSuccess(pays))
      .catch(error => Observable.of(HttpResultActions.httpRequestError(error)))
    );

  /**
   * search Pays
   */
  @Effect() searchPays$ = this.actions$
    .ofType(PaysActions.SEARCH_PAYS)
    .map(action => action.payload)
    .switchMap(searchParam => this.paysSvc.searchWithObjParam(searchParam)
      .map(pays => PaysActions.searchPaysSuccess(pays))
      .catch(error => Observable.of(HttpResultActions.httpRequestError(error)))
    );

  /**
   * Add Pays
   */
  @Effect() addPays$ = this.actions$
    .ofType(PaysActions.ADD_PAYS)
    .map(action => action.payload)
    .switchMap(pays => this.paysSvc.addItem(pays.payload)
      .map(() => HttpResultActions.httpRequestSuccessfulAndRedirection('pays'))
      .catch(error => Observable.of(HttpResultActions.httpRequestError(error)))
    );

  /**
   * Get Pays
   */
  @Effect() getPays$ = this.actions$
    .ofType(PaysActions.GET_PAYS)
    .map(action => action.payload)
    .switchMap(resource => this.paysSvc.loadItem(resource)
      .map(pays => PaysActions.getPaysSuccess(pays))
      .catch(error => Observable.of(HttpResultActions.httpRequestError(error)))
    );

  /**
   * update Pays
   */
  @Effect() updatePays$ = this.actions$
    .ofType(PaysActions.UPDATE_PAYS)
    .map(action => action.payload)
    .switchMap(pays => this.paysSvc.updateItem(pays.resource, pays.payload, pays.etag)
      .map(() => HttpResultActions.httpRequestSuccessfulAndRedirection('pays'))
      .catch((error) => Observable.of(HttpResultActions.httpRequestError(error)))
    );

}
