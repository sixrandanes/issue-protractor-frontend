import { TestBed, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { StoreModule } from '@ngrx/store';
import { Http, BaseRequestOptions } from '@angular/http';
import { IldaGridService } from '../services/ilda-grid.service';
import  gridInfoReducer from './grid-info.reducers';
import { GridInfo } from '../grid-info';
import { GridActions } from './grid.actions';

describe('Reducer: grid-info', () => {

  let service: IldaGridService;

  let payload = {
    _embedded: {
      values: ['resultats'],
    },
    _links: {
      first: {
        href: 'link_to_first'
      },
      prev: {
        href: 'link_to_prev'
      },
      self: {
        href: 'link_to_self'
      },
      next: {
        href: 'link_to_next'
      },
      last: {
        href: 'link_to_last'
      }
    },
    page: {
      size: 10,
      totalPages: 3,
      totalElements: 30,
      number: 0
    },
    info: {
      prop: 'prop',
      selected: 'url'
    }
  };

  beforeEach(() =>
      TestBed.configureTestingModule({
        imports: [StoreModule.provideStore(gridInfoReducer)],
        providers: [
      IldaGridService,
      GridActions,
      {provide: Http,
        useFactory: (back, options) => {
          return new Http(back, options);
        }, deps: [MockBackend, BaseRequestOptions]
      },
      MockBackend,
      BaseRequestOptions]})
  );

  beforeEach(inject([IldaGridService, Http, MockBackend], (tcb, comp, serv) => {
    service = serv;
  }));

  it('should get INIT state', () => {

    let initInfo: GridInfo = gridInfoReducer(null, {type: GridActions.INIT_SUCCESSFUL, payload: payload});

    expect(initInfo.first).toEqual('link_to_first');
    expect(initInfo.prev).toEqual('link_to_prev');
    expect(initInfo.current).toEqual('link_to_self');
    expect(initInfo.next).toEqual('link_to_next');
    expect(initInfo.last).toEqual('link_to_last');
    expect(initInfo.currentPage).toEqual(1);
    expect(initInfo.totalPages).toEqual(3);
    expect(initInfo.size).toEqual(10);
    expect(initInfo.pagination).toBeTruthy();
    expect(initInfo.empty).toBeFalsy();
    expect(initInfo.prop).toEqual('prop');
    expect(initInfo.values[0]).toEqual('resultats');
    expect(initInfo.selected).toBeNull();

  });

  it('should get FIRST state', () => {

    let initInfo: GridInfo = gridInfoReducer(null, {type: GridActions.FIRST_SUCCESSFUL, payload: payload});

    expect(initInfo.first).toEqual('link_to_first');
    expect(initInfo.prev).toEqual('link_to_prev');
    expect(initInfo.current).toEqual('link_to_self');
    expect(initInfo.next).toEqual('link_to_next');
    expect(initInfo.last).toEqual('link_to_last');
    expect(initInfo.currentPage).toEqual(1);
    expect(initInfo.totalPages).toEqual(3);
    expect(initInfo.size).toEqual(10);
    expect(initInfo.pagination).toBeTruthy();
    expect(initInfo.empty).toBeFalsy();
    expect(initInfo.prop).toEqual('prop');
    expect(initInfo.values[0]).toEqual('resultats');
    expect(initInfo.selected).toBeNull();

  });

  it('should get PREV state', () => {

    let initInfo: GridInfo = gridInfoReducer(null, {type: GridActions.PREV_SUCCESSFUL, payload: payload});

    expect(initInfo.first).toEqual('link_to_first');
    expect(initInfo.prev).toEqual('link_to_prev');
    expect(initInfo.current).toEqual('link_to_self');
    expect(initInfo.next).toEqual('link_to_next');
    expect(initInfo.last).toEqual('link_to_last');
    expect(initInfo.currentPage).toEqual(1);
    expect(initInfo.totalPages).toEqual(3);
    expect(initInfo.size).toEqual(10);
    expect(initInfo.pagination).toBeTruthy();
    expect(initInfo.empty).toBeFalsy();
    expect(initInfo.prop).toEqual('prop');
    expect(initInfo.values[0]).toEqual('resultats');
    expect(initInfo.selected).toBeNull();

  });

  it('should get NEXT state', () => {

    let initInfo: GridInfo = gridInfoReducer(null, {type: GridActions.NEXT_SUCCESSFUL, payload: payload});

    expect(initInfo.first).toEqual('link_to_first');
    expect(initInfo.prev).toEqual('link_to_prev');
    expect(initInfo.current).toEqual('link_to_self');
    expect(initInfo.next).toEqual('link_to_next');
    expect(initInfo.last).toEqual('link_to_last');
    expect(initInfo.currentPage).toEqual(1);
    expect(initInfo.totalPages).toEqual(3);
    expect(initInfo.size).toEqual(10);
    expect(initInfo.pagination).toBeTruthy();
    expect(initInfo.empty).toBeFalsy();
    expect(initInfo.prop).toEqual('prop');
    expect(initInfo.values[0]).toEqual('resultats');
    expect(initInfo.selected).toBeNull();

  });

  it('should get LAST state', () => {

    let initInfo: GridInfo = gridInfoReducer(null, {type: GridActions.LAST_SUCCESSFUL, payload: payload});

    expect(initInfo.first).toEqual('link_to_first');
    expect(initInfo.prev).toEqual('link_to_prev');
    expect(initInfo.current).toEqual('link_to_self');
    expect(initInfo.next).toEqual('link_to_next');
    expect(initInfo.last).toEqual('link_to_last');
    expect(initInfo.currentPage).toEqual(1);
    expect(initInfo.totalPages).toEqual(3);
    expect(initInfo.size).toEqual(10);
    expect(initInfo.pagination).toBeTruthy();
    expect(initInfo.empty).toBeFalsy();
    expect(initInfo.prop).toEqual('prop');
    expect(initInfo.values[0]).toEqual('resultats');
    expect(initInfo.selected).toBeNull();

  });

  it('should get SORT state', () => {

    let initInfo: GridInfo = gridInfoReducer(null, {type: GridActions.SORT_SUCCESSFUL, payload: payload});

    expect(initInfo.first).toEqual('link_to_first');
    expect(initInfo.prev).toEqual('link_to_prev');
    expect(initInfo.current).toEqual('link_to_self');
    expect(initInfo.next).toEqual('link_to_next');
    expect(initInfo.last).toEqual('link_to_last');
    expect(initInfo.currentPage).toEqual(1);
    expect(initInfo.totalPages).toEqual(3);
    expect(initInfo.size).toEqual(10);
    expect(initInfo.pagination).toBeTruthy();
    expect(initInfo.empty).toBeFalsy();
    expect(initInfo.prop).toEqual('prop');
    expect(initInfo.values[0]).toEqual('resultats');
    expect(initInfo.selected).toBeNull();

  });

  it('should get default state', () => {
    let state: GridInfo = new GridInfo();
    state.totalPages = 10;

    let defaultSate: GridInfo = gridInfoReducer(state, {type: '', payload: ''});
    expect(defaultSate).toEqual(state);

  });

  it('should get SELECTED state', () => {

    let initInfo: GridInfo = gridInfoReducer(null, {type: GridActions.INIT_SUCCESSFUL, payload: payload});
    initInfo = gridInfoReducer(initInfo, {type: GridActions.CONFIRM_DELETE});
    initInfo = gridInfoReducer(initInfo, {type: GridActions.SELECT_SUCCESSFUL, payload: 'url'});

    expect(initInfo.first).toEqual('link_to_first');
    expect(initInfo.prev).toEqual('link_to_prev');
    expect(initInfo.current).toEqual('link_to_self');
    expect(initInfo.next).toEqual('link_to_next');
    expect(initInfo.last).toEqual('link_to_last');
    expect(initInfo.currentPage).toEqual(1);
    expect(initInfo.totalPages).toEqual(3);
    expect(initInfo.size).toEqual(10);
    expect(initInfo.pagination).toBeTruthy();
    expect(initInfo.empty).toBeFalsy();
    expect(initInfo.prop).toEqual('prop');
    expect(initInfo.values[0]).toEqual('resultats');
    expect(initInfo.selected).toEqual('url');
    expect(initInfo.confirm).toBeFalsy();

  });

  it('should get DESELECTED state', () => {

    let initInfo: GridInfo = gridInfoReducer(null, {type: GridActions.INIT_SUCCESSFUL, payload: payload});
    initInfo = gridInfoReducer(initInfo, {type: GridActions.SELECT_SUCCESSFUL, payload: 'url'});
    initInfo = gridInfoReducer(initInfo, {type: GridActions.CONFIRM_DELETE});
    initInfo = gridInfoReducer(initInfo, {type: GridActions.UNSELECT_SUCCESSFUL, payload: {}});

    expect(initInfo.first).toEqual('link_to_first');
    expect(initInfo.prev).toEqual('link_to_prev');
    expect(initInfo.current).toEqual('link_to_self');
    expect(initInfo.next).toEqual('link_to_next');
    expect(initInfo.last).toEqual('link_to_last');
    expect(initInfo.currentPage).toEqual(1);
    expect(initInfo.totalPages).toEqual(3);
    expect(initInfo.size).toEqual(10);
    expect(initInfo.pagination).toBeTruthy();
    expect(initInfo.empty).toBeFalsy();
    expect(initInfo.prop).toEqual('prop');
    expect(initInfo.values[0]).toEqual('resultats');
    expect(initInfo.selected).toBeNull();
    expect(initInfo.confirm).toBeFalsy();
  });

  it('should get CONFIRM state (1)', () => {

    let initInfo: GridInfo = gridInfoReducer(null, {type: GridActions.INIT_SUCCESSFUL, payload: payload});
    initInfo = gridInfoReducer(initInfo, {type: GridActions.SELECT_SUCCESSFUL, payload: 'url'});
    initInfo = gridInfoReducer(initInfo, {type: GridActions.CONFIRM_DELETE});

    expect(initInfo.first).toEqual('link_to_first');
    expect(initInfo.prev).toEqual('link_to_prev');
    expect(initInfo.current).toEqual('link_to_self');
    expect(initInfo.next).toEqual('link_to_next');
    expect(initInfo.last).toEqual('link_to_last');
    expect(initInfo.currentPage).toEqual(1);
    expect(initInfo.totalPages).toEqual(3);
    expect(initInfo.size).toEqual(10);
    expect(initInfo.pagination).toBeTruthy();
    expect(initInfo.empty).toBeFalsy();
    expect(initInfo.prop).toEqual('prop');
    expect(initInfo.values[0]).toEqual('resultats');
    expect(initInfo.selected).toEqual('url');
    expect(initInfo.confirm).toBeTruthy();
  });

  it('should get CONFIRM state (2)', () => {

    let initInfo: GridInfo = gridInfoReducer(null, {type: GridActions.INIT_SUCCESSFUL, payload: payload});
    initInfo = gridInfoReducer(initInfo, {type: GridActions.SELECT_SUCCESSFUL, payload: 'url'});
    initInfo = gridInfoReducer(initInfo, {type: GridActions.CONFIRM_DELETE});
    initInfo = gridInfoReducer(initInfo, {type: GridActions.CANCEL_DELETE});

    expect(initInfo.first).toEqual('link_to_first');
    expect(initInfo.prev).toEqual('link_to_prev');
    expect(initInfo.current).toEqual('link_to_self');
    expect(initInfo.next).toEqual('link_to_next');
    expect(initInfo.last).toEqual('link_to_last');
    expect(initInfo.currentPage).toEqual(1);
    expect(initInfo.totalPages).toEqual(3);
    expect(initInfo.size).toEqual(10);
    expect(initInfo.pagination).toBeTruthy();
    expect(initInfo.empty).toBeFalsy();
    expect(initInfo.prop).toEqual('prop');
    expect(initInfo.values[0]).toEqual('resultats');
    expect(initInfo.selected).toEqual('url');
    expect(initInfo.confirm).toBeFalsy();
  });

  it('should get REFRESH_SUCCESS state', () => {

    let initInfo: GridInfo = gridInfoReducer(null, {type: GridActions.REFRESH_SUCCESSFUL, payload: payload});

    expect(initInfo.first).toEqual('link_to_first');
    expect(initInfo.prev).toEqual('link_to_prev');
    expect(initInfo.current).toEqual('link_to_self');
    expect(initInfo.next).toEqual('link_to_next');
    expect(initInfo.last).toEqual('link_to_last');
    expect(initInfo.currentPage).toEqual(1);
    expect(initInfo.totalPages).toEqual(3);
    expect(initInfo.size).toEqual(10);
    expect(initInfo.pagination).toBeTruthy();
    expect(initInfo.empty).toBeFalsy();
    expect(initInfo.prop).toEqual('prop');
    expect(initInfo.values[0]).toEqual('resultats');
    expect(initInfo.selected).toBeNull();
  });

  it('should get REFRESH_AFTER_DELETE_SUCCESSFUL state', () => {

    let initInfo: GridInfo = gridInfoReducer(null, {type: GridActions.REFRESH_AFTER_DELETE_SUCCESSFUL, payload: payload});

    expect(initInfo.first).toEqual('link_to_first');
    expect(initInfo.prev).toEqual('link_to_prev');
    expect(initInfo.current).toEqual('link_to_self');
    expect(initInfo.next).toEqual('link_to_next');
    expect(initInfo.last).toEqual('link_to_last');
    expect(initInfo.currentPage).toEqual(1);
    expect(initInfo.totalPages).toEqual(3);
    expect(initInfo.size).toEqual(10);
    expect(initInfo.pagination).toBeTruthy();
    expect(initInfo.empty).toBeFalsy();
    expect(initInfo.prop).toEqual('prop');
    expect(initInfo.values[0]).toEqual('resultats');
    expect(initInfo.selected).toBeNull();
  });

  it('should get GOTO_SUCCESSFUL state', () => {

    let initInfo: GridInfo = gridInfoReducer(null, {type: GridActions.GOTO_SUCCESSFUL, payload: payload});

    expect(initInfo.first).toEqual('link_to_first');
    expect(initInfo.prev).toEqual('link_to_prev');
    expect(initInfo.current).toEqual('link_to_self');
    expect(initInfo.next).toEqual('link_to_next');
    expect(initInfo.last).toEqual('link_to_last');
    expect(initInfo.currentPage).toEqual(1);
    expect(initInfo.totalPages).toEqual(3);
    expect(initInfo.size).toEqual(10);
    expect(initInfo.pagination).toBeTruthy();
    expect(initInfo.empty).toBeFalsy();
    expect(initInfo.prop).toEqual('prop');
    expect(initInfo.values[0]).toEqual('resultats');
    expect(initInfo.selected).toBeNull();
  });

  it('should get SHOW_ENTRIES__SUCCESSFUL state', () => {

    let initInfo: GridInfo = gridInfoReducer(null, {type: GridActions.SHOW_ENTRIES_SUCCESSFUL, payload: payload});

    expect(initInfo.first).toEqual('link_to_first');
    expect(initInfo.prev).toEqual('link_to_prev');
    expect(initInfo.current).toEqual('link_to_self');
    expect(initInfo.next).toEqual('link_to_next');
    expect(initInfo.last).toEqual('link_to_last');
    expect(initInfo.currentPage).toEqual(1);
    expect(initInfo.totalPages).toEqual(3);
    expect(initInfo.size).toEqual(10);
    expect(initInfo.pagination).toBeTruthy();
    expect(initInfo.empty).toBeFalsy();
    expect(initInfo.prop).toEqual('prop');
    expect(initInfo.values[0]).toEqual('resultats');
    expect(initInfo.selected).toBeNull();
  });

});
