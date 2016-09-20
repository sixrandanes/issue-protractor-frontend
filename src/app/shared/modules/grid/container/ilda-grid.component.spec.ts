import { TestBed, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { StoreModule } from '@ngrx/store';
import { Http, BaseRequestOptions } from '@angular/http';
import { IldaGridComponent } from './ilda-grid.component';
import  gridInfoReducer from '../store/grid-info.reducers';
import { Observable } from 'rxjs/Observable';
import { GridInfo } from '../grid-info';
import { GridActions } from '../store/grid.actions';
import { AppState } from '../../../store/reducers';
import { Store }  from '@ngrx/store';
import { IldaHttpService } from '../../../services/http.service';

class MockIldaHttpService {
}

describe('Component: IldaGrid', () => {

  let component: IldaGridComponent;
  let store: Store<AppState>;

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [StoreModule.provideStore(gridInfoReducer)],
      providers: [IldaGridComponent,
        {provide: Http,
          useFactory: (back, options) => {
            return new Http(back, options);
          }, deps: [MockBackend, BaseRequestOptions]
        },
        MockBackend,
        BaseRequestOptions,
        {provide: IldaHttpService, useClass: MockIldaHttpService}]})
  );

  beforeEach(inject([IldaGridComponent, Store, Http, MockBackend], (comp, stor) => {
    component = comp;
    store = stor;
  }));

  it('should init grid', () => {
    let grid = {
      addEventListener: (a, b) => {
      }
    };
    spyOn(grid, 'addEventListener');

    component.data = Observable.from([1]);

    let result = {
      _embedded: {
        values: 'test_values',
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
        totalPages: 3,
        totalElements: 30,
        number: 0
      },
      info: {
        prop: 'prop',
        selected: 'url'
      }
    };

    let test = Observable.from([result]);

    component.gridInfo = test.map(res => new GridInfo(res['first'], res['next'], res['prev'], res['last'],
      res['current'], res['prop'], res['totalPages'], res['currentPage'],
      res['totalElements'], res['firstElement'], res['lastElement'], res['pagination'], res['empty'], res['values'], res['selected']
    ));

    component.gridReady(grid);

    expect(component.grid.addEventListener.calls.argsFor(0)).toEqual(['selected-items-changed', jasmine.any(Function)]);
    expect(component.dataSubscription).not.toBeNull();
    expect(component.gridInfoSubscription).not.toBeNull();
    expect(component.gridSubscription).not.toBeNull();
  });

  it('should get first page', () => {
    spyOn(store, 'dispatch');

    let gInfo: GridInfo = new GridInfo();
    gInfo.first = 'first_link';
    gInfo.prop = 'prop';
    component.info = gInfo;

    component.first();

    expect(store.dispatch).toHaveBeenCalledWith({
      type: GridActions.FIRST,
      payload: gInfo
    });
  });

  it('should get previous page', () => {
    spyOn(store, 'dispatch');

    let gInfo: GridInfo = new GridInfo();
    gInfo.prev = 'prev_link';
    gInfo.prop = 'prop';

    component.info = gInfo;

    component.prev();

    expect(store.dispatch).toHaveBeenCalledWith({
      type: GridActions.PREV,
      payload: gInfo
    });
  });

  it('should get next page', () => {
    spyOn(store, 'dispatch');

    let gInfo: GridInfo = new GridInfo();
    gInfo.next = 'next_link';
    gInfo.prop = 'prop';

    component.info = gInfo;

    component.next();

    expect(store.dispatch).toHaveBeenCalledWith({
      type: GridActions.NEXT,
      payload: gInfo
    });
  });

  it('should get last page', () => {
    spyOn(store, 'dispatch');

    let gInfo: GridInfo = new GridInfo();
    gInfo.last = 'last_link';
    gInfo.prop = 'prop';

    component.info = gInfo;

    component.last();

    expect(store.dispatch).toHaveBeenCalledWith({
      type: GridActions.LAST,
      payload: gInfo
    });
  });

  it('should emit event onSelect - 1 selected', () => {
    let item = {selectedIndex: 1};
    component.grid = {selection: {selected: () => [1]}, getItem: (index, fn) => fn(null, item)};
    component.info = new GridInfo();
    component.info.selected = 3;
    spyOn(component.grid, 'getItem').and.callThrough();
    spyOn(store, 'dispatch').and.returnValue('dispatched');

    component.onSelect();

    expect(store.dispatch).toHaveBeenCalledWith(GridActions.selectSuccessful(item));
    expect(component.grid.getItem).toHaveBeenCalled();
  });

  it('should emit event onSelect - 2 selected', () => {
    let item = {selectedIndex: 1};
    component.grid = {selection: {selected: () => [1, 2]}, getItem: (index, fn) => fn(null, item)};
    component.info = new GridInfo();
    component.info.selected = 3;
    spyOn(component.grid, 'getItem').and.callThrough();
    spyOn(store, 'dispatch').and.returnValue('dispatched');

    component.onSelect();

    expect(store.dispatch).toHaveBeenCalledWith(GridActions.unselectSuccessful(null));
    expect(component.grid.getItem).not.toHaveBeenCalled();
  });

  it('should emit event onSelect - 0 selected', () => {
    let item = {selectedIndex: 1};
    component.grid = {selection: {selected: () => []}, getItem: (index, fn) => fn(null, item)};
    component.info = new GridInfo();
    component.info.selected = 3;
    spyOn(component.grid, 'getItem').and.callThrough();
    spyOn(store, 'dispatch').and.returnValue('dispatched');

    component.onSelect();

    expect(store.dispatch).toHaveBeenCalledWith(GridActions.unselectSuccessful(null));
    expect(component.grid.getItem).not.toHaveBeenCalled();
  });

  it('should emit ADD event', () => {
    spyOn(component.add, 'emit').and.returnValue('add');
    let gInfo: GridInfo = new GridInfo();
    gInfo.next = 'next_link';
    gInfo.prop = 'prop';
    component.onAdd();

    expect(component.add.emit).toHaveBeenCalledWith({});
  });

  it('should emit UPDATE event', () => {
    spyOn(component.update, 'emit').and.returnValue('update');
    let gInfo: GridInfo = new GridInfo();
    gInfo.selected = 'item';
    component.info = gInfo;

    component.onUpdate();

    expect(component.update.emit).toHaveBeenCalledWith('item');
  });

  it('should emit dispatch DELETE action', () => {

    spyOn(store, 'dispatch');

    let gInfo: GridInfo = new GridInfo();
    gInfo.current = 'current_link';
    gInfo.prop = 'prop';

    component.info = gInfo;

    component.onConfirm();

    expect(store.dispatch).toHaveBeenCalledWith({
      type: GridActions.DELETE_ITEM,
      payload: gInfo
    });

  });

  it('should emit dispatch CANCEL action', () => {

    spyOn(store, 'dispatch');

    component.onCancel();

    expect(store.dispatch).toHaveBeenCalledWith({
      type: GridActions.CANCEL_DELETE
    });

  });

  it('should emit dispatch CONFIRM action', () => {

    spyOn(store, 'dispatch');

    component.onDelete();

    expect(store.dispatch).toHaveBeenCalledWith({
      type: GridActions.CONFIRM_DELETE
    });

  });

  it('should emit dispatch REFRESH action', () => {

    spyOn(store, 'dispatch');

    let gInfo: GridInfo = new GridInfo();
    gInfo.current = 'current_link';
    gInfo.prop = 'prop';

    component.info = gInfo;

    component.refresh();

    expect(store.dispatch).toHaveBeenCalledWith({
      type: GridActions.REFRESH_DATA,
      payload: gInfo
    });
  });

  it('should emit search event', () => {
    spyOn(component.openSearchPanel, 'emit').and.returnValue('emitted');

    component.search();

    expect(component.openSearchPanel.emit).toHaveBeenCalledWith({});
  });

  it('should sort data - Simple case', () => {
    component.info = new GridInfo();
    component.info.current = 'localhost/api/grid';
    component.grid = {
      sortOrder: [{column: 1, direction: 'ASC'}, {column: 2, direction: 'DESC'}],
      columns: [{name: 'ID'}, {name: 'Info'}, {name: 'dateEffet'}]
    };
    spyOn(store, 'dispatch').and.returnValue('dispatched');

    component.onSort();

    let expectedUrl = 'localhost/api/grid?&sort=Info,ASC&sort=dateEffet,DESC';
    expect(store.dispatch).toHaveBeenCalledWith(GridActions.sort({link: expectedUrl, prop: component.info.prop}));
  });

  it('should sort data - With page', () => {
    component.info = new GridInfo();
    component.info.current = 'localhost/api/grid?page=2';
    component.grid = {
      sortOrder: [{column: 1, direction: 'ASC'}],
      columns: [{name: 'ID'}, {name: 'Info'}, {name: 'dateEffet'}]
    };
    spyOn(store, 'dispatch').and.returnValue('dispatched');

    component.onSort();

    let expectedUrl = 'localhost/api/grid?&sort=Info,ASC';
    expect(store.dispatch).toHaveBeenCalledWith(GridActions.sort({link: expectedUrl, prop: component.info.prop}));
  });

  it('should sort data - With sort', () => {
    component.info = new GridInfo();
    component.info.current = 'localhost/api/grid?sort=ID,DESC';
    component.grid = {
      sortOrder: [{column: 1, direction: 'ASC'}],
      columns: [{name: 'ID'}, {name: 'Info'}, {name: 'dateEffet'}]
    };
    spyOn(store, 'dispatch').and.returnValue('dispatched');

    component.onSort();

    let expectedUrl = 'localhost/api/grid?&sort=Info,ASC';
    expect(store.dispatch).toHaveBeenCalledWith(GridActions.sort({link: expectedUrl, prop: component.info.prop}));
  });

  it('should destroy correctly', () => {
    component.dataSubscription = Observable.from([1]).subscribe();
    spyOn(component.dataSubscription, 'unsubscribe').and.returnValue('unsubscribe');
    component.gridSubscription = Observable.from([1]).subscribe();
    spyOn(component.gridSubscription, 'unsubscribe').and.returnValue('unsubscribe');
    component.gridInfoSubscription = Observable.from([1]).subscribe();
    spyOn(component.gridInfoSubscription, 'unsubscribe').and.returnValue('unsubscribe');

    component.ngOnDestroy();

    expect(component.dataSubscription.unsubscribe).toHaveBeenCalled();
    expect(component.gridSubscription.unsubscribe).toHaveBeenCalled();
    expect(component.gridInfoSubscription.unsubscribe).toHaveBeenCalled();
  });

  it('should change page - Without page in url', () => {
    component.info = new GridInfo();
    component.info.current = 'url_link';
    component.info.prop = 'prop';
    component.info.totalPages = 10;

    spyOn(store, 'dispatch');

    component.onChangePage(2);

    let expectedUrl = 'url_link?&page=2';
    expect(store.dispatch).toHaveBeenCalledWith(GridActions.goto(expectedUrl, 'prop'));
  });

  it('should change page - With page > totalPages', () => {
    component.info = new GridInfo();
    component.info.current = 'url_link';
    component.info.prop = 'prop';
    component.info.totalPages = 10;

    spyOn(store, 'dispatch');

    component.onChangePage(20);

    let expectedUrl = 'url_link?&page=10';
    expect(store.dispatch).toHaveBeenCalledWith(GridActions.goto(expectedUrl, 'prop'));
  });

  it('should change page - With page', () => {
    component.info = new GridInfo();
    component.info.current = 'url_link?page=7';
    component.info.prop = 'prop';
    component.info.totalPages = 10;

    spyOn(store, 'dispatch');

    component.onChangePage(5);

    let expectedUrl = 'url_link?page=5';
    expect(store.dispatch).toHaveBeenCalledWith(GridActions.goto(expectedUrl, 'prop'));
  });

  it('should change page - With page and other param', () => {
    component.info = new GridInfo();
    component.info.current = 'url_link?other_param=other&page=7';
    component.info.prop = 'prop';
    component.info.totalPages = 10;

    spyOn(store, 'dispatch');

    component.onChangePage(5);

    let expectedUrl = 'url_link?other_param=other&page=5';
    expect(store.dispatch).toHaveBeenCalledWith(GridActions.goto(expectedUrl, 'prop'));
  });

  it('should change entries - Without param in url', () => {
    component.info = new GridInfo();
    component.info.current = 'url_link';
    component.info.prop = 'prop';

    spyOn(store, 'dispatch');

    component.onChangeEntries(10);

    let expectedUrl = 'url_link?&size=10';
    expect(store.dispatch).toHaveBeenCalledWith(GridActions.showEntries(expectedUrl, 'prop'));
  });

  it('should change entries - With param in url', () => {
    component.info = new GridInfo();
    component.info.current = 'url_link?param=param&page=2&size=4';
    component.info.prop = 'prop';

    spyOn(store, 'dispatch');

    component.onChangeEntries(10);

    let expectedUrl = 'url_link?param=param&&size=10';
    expect(store.dispatch).toHaveBeenCalledWith(GridActions.showEntries(expectedUrl, 'prop'));
  });

});
