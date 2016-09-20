import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { GridActions } from './grid.actions';
import { IldaGridService } from '../services/ilda-grid.service';
import { Observable } from 'rxjs/Observable';
import { HttpResultActions } from '../../../store/actions/http.result.actions';

/**
 * Effects de la datatable
 */
@Injectable()
export class GridEffects {
  constructor(private actions$: Actions,
              private gridSvc: IldaGridService) {
  }

  /**
   * init method
   */
  @Effect() init$ = this.actions$
    .ofType(GridActions.INIT)
    .map(action => action.payload)
    .map(payload => GridActions.initSuccessful(payload));

  /**
   * first method
   */
  @Effect() first$ = this.actions$
    .ofType(GridActions.FIRST)
    .map(action => action.payload)
    .switchMap(info => this.gridSvc.loadData(info.first, info.prop)
      .map(payload => GridActions.firstSuccessful(payload))
      .catch(error => Observable.of(HttpResultActions.httpRequestError(error)))
    );

  /**
   * last method
   */
  @Effect() last$ = this.actions$
    .ofType(GridActions.LAST)
    .map(action => action.payload)
    .switchMap(info => this.gridSvc.loadData(info.last, info.prop)
      .map(payload => GridActions.lastSuccessful(payload))
      .catch(error => Observable.of(HttpResultActions.httpRequestError(error)))
    );

  /**
   * next method
   */
  @Effect() next$ = this.actions$
    .ofType(GridActions.NEXT)
    .map(action => action.payload)
    .switchMap(info => this.gridSvc.loadData(info.next, info.prop)
      .map(payload => GridActions.nextSuccessful(payload))
      .catch(error => Observable.of(HttpResultActions.httpRequestError(error)))
    );

  /**
   * prev method
   */
  @Effect() prev$ = this.actions$
    .ofType(GridActions.PREV)
    .map(action => action.payload)
    .switchMap(info => this.gridSvc.loadData(info.prev, info.prop)
      .map(payload => GridActions.previousSuccessful(payload))
      .catch(error => Observable.of(HttpResultActions.httpRequestError(error)))
    );

  /**
   * sort method
   */
  @Effect() sort$ = this.actions$
    .ofType(GridActions.SORT)
    .map(action => action.payload)
    .switchMap(info => this.gridSvc.sortData(info)
      .map(payload => GridActions.sortSuccessful(payload))
      .catch(error => Observable.of(HttpResultActions.httpRequestError(error)))
    );

  /**
   * delete method
   */
  @Effect() deleteItem$ = this.actions$
    .ofType(GridActions.DELETE_ITEM)
    .map(action => action.payload)
    .switchMap(info => this.gridSvc.deleteItem(info.selected._links.self.href)
      .map(() => GridActions.refreshDataAfterDelete(info))
      .catch(error => Observable.of(HttpResultActions.httpRequestError(error)))
    );

  /**
   * refresh method
   */
  @Effect() refresh = this.actions$
    .ofType(GridActions.REFRESH_DATA)
    .map(action => action.payload)
    .switchMap(info => this.gridSvc.refreshData(info)
      .map(payload => GridActions.refreshSuccessful(payload))
      .catch(error => Observable.of(HttpResultActions.httpRequestError(error)))
    );

  /**
   * refresh after delete
   */
  @Effect() refreshAfterDelete = this.actions$
    .ofType(GridActions.REFRESH_DATA_AFTER_DELETE)
    .map(action => action.payload)
    .switchMap(info => this.gridSvc.refreshDataAfterDelete(info)
      .map(payload => GridActions.refreshAfterDeleteSuccessful(payload))
      .catch(error => Observable.of(HttpResultActions.httpRequestError(error)))
    );

  /**
   * Affichage du message de success apres un delete heureux
   */
  @Effect() refreshAfterDeleteSuccessful = this.actions$
    .ofType(GridActions.REFRESH_AFTER_DELETE_SUCCESSFUL)
    .map(payload => HttpResultActions.httpRequestSuccessfulDelete());

  /**
   * Go to
   */
  @Effect() goto$ = this.actions$
    .ofType(GridActions.GOTO)
    .map(action => action.payload)
    .switchMap(info => this.gridSvc.loadData(info.link, info.prop))
    .map(payload => GridActions.gotoSuccessful(payload));

  /**
   * Show entries
   */
  @Effect() showentries$ = this.actions$
    .ofType(GridActions.SHOW_ENTRIES)
    .map(action => action.payload)
    .switchMap(info => this.gridSvc.loadData(info.link, info.prop))
    .map(payload => GridActions.showEntriesSuccessful(payload));
}
