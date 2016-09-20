import { Action } from '@ngrx/store';
import { GridActions } from './grid.actions';
import { GridInfo } from '../grid-info';

describe('Actions: Grid', () => {

  let actionReturned: Action;

  beforeEach(() => {
  });

  it('should Init element', () => {
    actionReturned = GridActions.init({test: 'test'});
    expect(actionReturned.type).toEqual(GridActions.INIT);
    expect(actionReturned.payload).toEqual({test: 'test'});
  });

  it('should Init element successful', () => {
    actionReturned = GridActions.initSuccessful({test: 'test'});
    expect(actionReturned.type).toEqual(GridActions.INIT_SUCCESSFUL);
    expect(actionReturned.payload).toEqual({test: 'test'});
  });

  it('should go to First element', () => {
    let gridInfo = new GridInfo('first', 'next', 'previous', 'last');
    actionReturned = GridActions.first(gridInfo);
    expect(actionReturned.type).toEqual(GridActions.FIRST);
    expect(actionReturned.payload).toEqual(gridInfo);
  });

  it('should go to First element - successful', () => {
    actionReturned = GridActions.firstSuccessful({data: 'data'});
    expect(actionReturned.type).toEqual(GridActions.FIRST_SUCCESSFUL);
    expect(actionReturned.payload).toEqual({data: 'data'});
  });

  it('should go to Last element', () => {
    let gridInfo = new GridInfo('first', 'next', 'previous', 'last');
    actionReturned = GridActions.last(gridInfo);
    expect(actionReturned.type).toEqual(GridActions.LAST);
    expect(actionReturned.payload).toEqual(gridInfo);
  });

  it('should go to Last element - successful', () => {
    actionReturned = GridActions.lastSuccessful({data: 'data'});
    expect(actionReturned.type).toEqual(GridActions.LAST_SUCCESSFUL);
    expect(actionReturned.payload).toEqual({data: 'data'});
  });

  it('should go to Previous element', () => {
    let gridInfo = new GridInfo('first', 'next', 'previous', 'last');
    actionReturned = GridActions.previous(gridInfo);
    expect(actionReturned.type).toEqual(GridActions.PREV);
    expect(actionReturned.payload).toEqual(gridInfo);
  });

  it('should go to Previous element - successful', () => {
    actionReturned = GridActions.previousSuccessful({data: 'data'});
    expect(actionReturned.type).toEqual(GridActions.PREV_SUCCESSFUL);
    expect(actionReturned.payload).toEqual({data: 'data'});
  });

  it('should go to Next element', () => {
    let gridInfo = new GridInfo('first', 'next', 'previous', 'last');
    actionReturned = GridActions.next(gridInfo);
    expect(actionReturned.type).toEqual(GridActions.NEXT);
    expect(actionReturned.payload).toEqual(gridInfo);
  });

  it('should go to Next element - successful', () => {
    actionReturned = GridActions.nextSuccessful({data: 'data'});
    expect(actionReturned.type).toEqual(GridActions.NEXT_SUCCESSFUL);
    expect(actionReturned.payload).toEqual({data: 'data'});
  });

  it('should Sort element', () => {
    actionReturned = GridActions.sort({search: 'params'});
    expect(actionReturned.type).toEqual(GridActions.SORT);
    expect(actionReturned.payload).toEqual({search: 'params'});
  });

  it('should Sort elements - successful', () => {
    actionReturned = GridActions.sortSuccessful({data: 'data'});
    expect(actionReturned.type).toEqual(GridActions.SORT_SUCCESSFUL);
    expect(actionReturned.payload).toEqual({data: 'data'});
  });

  it('should Select element - successful', () => {
    actionReturned = GridActions.selectSuccessful({data: 'data'});
    expect(actionReturned.type).toEqual(GridActions.SELECT_SUCCESSFUL);
    expect(actionReturned.payload).toEqual({data: 'data'});
  });

  it('should unselect element - successful', () => {
    actionReturned = GridActions.unselectSuccessful({data: 'data'});
    expect(actionReturned.type).toEqual(GridActions.UNSELECT_SUCCESSFUL);
    expect(actionReturned.payload).toEqual({data: 'data'});
  });

  it('should Confirm delete element', () => {
    actionReturned = GridActions.confirmDelete();
    expect(actionReturned.type).toEqual(GridActions.CONFIRM_DELETE);
    expect(actionReturned.payload).toBeUndefined();
  });

  it('should Cancel delete element', () => {
    actionReturned = GridActions.cancelDelete();
    expect(actionReturned.type).toEqual(GridActions.CANCEL_DELETE);
    expect(actionReturned.payload).toBeUndefined();
  });

  it('should Refresh elements', () => {
    actionReturned = GridActions.refreshData({data: 'data'});
    expect(actionReturned.type).toEqual(GridActions.REFRESH_DATA);
    expect(actionReturned.payload).toEqual({data: 'data'});
  });

  it('should Refresh element - successful', () => {
    actionReturned = GridActions.refreshSuccessful({data: 'data'});
    expect(actionReturned.type).toEqual(GridActions.REFRESH_SUCCESSFUL);
    expect(actionReturned.payload).toEqual({data: 'data'});
  });

  it('should Refresh After Delete', () => {
    actionReturned = GridActions.refreshDataAfterDelete({data: 'data'});
    expect(actionReturned.type).toEqual(GridActions.REFRESH_DATA_AFTER_DELETE);
    expect(actionReturned.payload).toEqual({data: 'data'});
  });

  it('should Refresh After Delete - successful', () => {
    actionReturned = GridActions.refreshAfterDeleteSuccessful({data: 'data'});
    expect(actionReturned.type).toEqual(GridActions.REFRESH_AFTER_DELETE_SUCCESSFUL);
    expect(actionReturned.payload).toEqual({data: 'data'});
  });

  it('should Delete Item', () => {
    actionReturned = GridActions.deleteItem({data: 'data'});
    expect(actionReturned.type).toEqual(GridActions.DELETE_ITEM);
    expect(actionReturned.payload).toEqual({data: 'data'});
  });

  it('should Goto page', () => {
    actionReturned = GridActions.goto('link', 'prop');
    expect(actionReturned.type).toEqual(GridActions.GOTO);
    expect(actionReturned.payload).toEqual({link: 'link', prop: 'prop'});
  });

  it('should Goto page - successful', () => {
    actionReturned = GridActions.gotoSuccessful('data');
    expect(actionReturned.type).toEqual(GridActions.GOTO_SUCCESSFUL);
    expect(actionReturned.payload).toEqual('data');
  });

  it('should Show entries page', () => {
    actionReturned = GridActions.showEntries('link', 'prop');
    expect(actionReturned.type).toEqual(GridActions.SHOW_ENTRIES);
    expect(actionReturned.payload).toEqual({link: 'link', prop: 'prop'});
  });

  it('should Show entries page - successful', () => {
    actionReturned = GridActions.showEntriesSuccessful('data');
    expect(actionReturned.type).toEqual(GridActions.SHOW_ENTRIES_SUCCESSFUL);
    expect(actionReturned.payload).toEqual('data');
  });

});
