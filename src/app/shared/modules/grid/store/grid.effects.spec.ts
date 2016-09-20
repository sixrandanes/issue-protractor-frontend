/*
import {
  TestBed,
  inject
} from '@angular/core/testing';
import {
  MOCK_EFFECTS_PROVIDERS,
  MockStateUpdates
} from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { GridInfo } from '../grid-info';
import { GridActions } from './grid.actions';
import { GridEffects } from './grid.effects';
import { IldaGridService } from '../services/ilda-grid.service';
import { HttpResultActions } from '../../../store/actions/http.result.actions';
import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import reducers from '../../../store/reducers';

describe('Effects: Grids', function() {
  let gridEffects: GridEffects;
  let updates$: MockStateUpdates;
  let service: IldaGridService;
  let obsGrid: Observable<any>;
  let gridInfo = new GridInfo('first', 'next', 'previous', 'last', 'current', 'prop');

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [StoreModule.provideStore(reducers)],
      providers: [ GridEffects,
        MOCK_EFFECTS_PROVIDERS,
        IldaGridService,
        MockBackend,
        {provide: Http, useFactory: (back, options) => {
          return new Http(back, options);
        }, deps: [MockBackend, BaseRequestOptions]},
        BaseRequestOptions
      ]
    }));

  beforeEach(inject([GridEffects, MockStateUpdates, IldaGridService],
    (effect, upd, serv) => {
      gridEffects = effect;
      updates$ = upd;
      service = serv;

      obsGrid = Observable.from(['element']);
    }));

  it('should init grid', function() {
    // Add an action in the updates queue
    updates$.sendAction(GridActions.init(gridInfo));

    gridEffects.init$.subscribe(function(action) {
      // Action suivante
      expect(action.type).toBe(GridActions.INIT_SUCCESSFUL);
    });
  });

  it('should go to first page', function() {
    // Add an action in the updates queue
    updates$.sendAction(GridActions.first(gridInfo));

    spyOn(service, 'loadData').and.returnValue(obsGrid);

    gridEffects.first$.subscribe(function(action) {
      // Appel du service
      expect(service.loadData).toHaveBeenCalledWith(gridInfo.first, gridInfo.prop);
      // Action suivante
      expect(action.type).toBe(GridActions.FIRST_SUCCESSFUL);
    });
  });

  it('should go to last page', function() {
    // Add an action in the updates queue
    updates$.sendAction(GridActions.last(gridInfo));

    spyOn(service, 'loadData').and.returnValue(obsGrid);

    gridEffects.last$.subscribe(function(action) {
      // Appel du service
      expect(service.loadData).toHaveBeenCalledWith(gridInfo.last, gridInfo.prop);
      // Action suivante
      expect(action.type).toBe(GridActions.LAST_SUCCESSFUL);
    });
  });

  it('should go to next page', function() {
    // Add an action in the updates queue
    updates$.sendAction(GridActions.next(gridInfo));

    spyOn(service, 'loadData').and.returnValue(obsGrid);

    gridEffects.next$.subscribe(function(action) {
      // Appel du service
      expect(service.loadData).toHaveBeenCalledWith(gridInfo.next, gridInfo.prop);
      // Action suivante
      expect(action.type).toBe(GridActions.NEXT_SUCCESSFUL);
    });
  });

  it('should go to previous page', function() {
    // Add an action in the updates queue
    updates$.sendAction(GridActions.previous(gridInfo));

    spyOn(service, 'loadData').and.returnValue(obsGrid);

    gridEffects.prev$.subscribe(function(action) {
      // Appel du service
      expect(service.loadData).toHaveBeenCalledWith(gridInfo.prev, gridInfo.prop);
      // Action suivante
      expect(action.type).toBe(GridActions.PREV_SUCCESSFUL);
    });
  });

  it('should sort elements', function() {
    // Add an action in the updates queue
    updates$.sendAction(GridActions.previous(gridInfo));

    spyOn(service, 'sortData').and.returnValue(obsGrid);

    gridEffects.sort$.subscribe(function(action) {
      // Appel du service
      expect(service.sortData).toHaveBeenCalledWith(gridInfo);
      // Action suivante
      expect(action.type).toBe(GridActions.SORT_SUCCESSFUL);
    });
  });

  it('should delete element', function() {
    // Add an action in the updates queue
    gridInfo.selected = {_links: {self: {href: 'url'}}};
    updates$.sendAction(GridActions.deleteItem(gridInfo));

    spyOn(service, 'deleteItem').and.returnValue(obsGrid);

    gridEffects.deleteItem$.subscribe(function(action) {
      // Appel du service
      expect(service.deleteItem).toHaveBeenCalledWith(gridInfo.selected._links.self.href);
      // Action suivante
      expect(action.type).toBe(GridActions.REFRESH_DATA_AFTER_DELETE);
    });
  });

  it('should refresh page', function() {
    // Add an action in the updates queue
    updates$.sendAction(GridActions.refreshData(gridInfo));

    spyOn(service, 'refreshData').and.returnValue(obsGrid);

    gridEffects.refresh.subscribe(function(action) {
      // Appel du service
      expect(service.refreshData).toHaveBeenCalledWith(gridInfo);
      // Action suivante
      expect(action.type).toBe(GridActions.REFRESH_SUCCESSFUL);
    });
  });

  it('should refresh page after delete', function() {
    // Add an action in the updates queue
    updates$.sendAction(GridActions.refreshDataAfterDelete(gridInfo));

    spyOn(service, 'refreshDataAfterDelete').and.returnValue(obsGrid);

    gridEffects.refreshAfterDelete.subscribe(function(action) {
      // Appel du service
      expect(service.refreshDataAfterDelete).toHaveBeenCalledWith(gridInfo);
      // Action suivante
      expect(action.type).toBe(GridActions.REFRESH_AFTER_DELETE_SUCCESSFUL);
    });
  });

  it('should refresh page after delete - success', function() {
    // Add an action in the updates queue
    updates$.sendAction(GridActions.refreshAfterDeleteSuccessful(gridInfo));

    gridEffects.refreshAfterDeleteSuccessful.subscribe(function(action) {
      // Action suivante
      expect(action.type).toBe(HttpResultActions.HTTP_REQUEST_SUCCESSFUL_DELETE);
    });
  });

});
*/
