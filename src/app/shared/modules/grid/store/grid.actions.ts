import { Action } from '@ngrx/store';
import { GridInfo } from '../grid-info';

export class GridActions {

  static INIT = '[GRID] Init element';
  static init(payload): Action {
    return {
      type: GridActions.INIT,
      payload: payload
    };
  }

  static INIT_SUCCESSFUL = '[GRID] Init element successful';
  static initSuccessful(payload): Action {
    return {
      type: GridActions.INIT_SUCCESSFUL,
      payload: payload
    };
  }

  static FIRST = '[GRID] First element';
  static first(info: GridInfo): Action {
    return {
      type: GridActions.FIRST,
      payload: info
    };
  }

  static FIRST_SUCCESSFUL = '[GRID] First element successful';
  static firstSuccessful(data): Action {
    return {
      type: GridActions.FIRST_SUCCESSFUL,
      payload: data
    };
  }

  static LAST = '[GRID] Last element';
  static last(info: GridInfo): Action {
    return {
      type: GridActions.LAST,
      payload: info
    };
  }

  static LAST_SUCCESSFUL = '[GRID] Last element successful';
  static lastSuccessful(data): Action {
    return {
      type: GridActions.LAST_SUCCESSFUL,
      payload: data
    };
  }

  static PREV= '[GRID] Previous element';
  static previous(info: GridInfo): Action {
    return {
      type: GridActions.PREV,
      payload: info
    };
  }

  static PREV_SUCCESSFUL = '[GRID] Previous element successful';
  static previousSuccessful(data): Action {
    return {
      type: GridActions.PREV_SUCCESSFUL,
      payload: data
    };
  }

  static NEXT= '[GRID] Next element';
  static next(info: GridInfo): Action {
    return {
      type: GridActions.NEXT,
      payload: info
    };
  }

  static NEXT_SUCCESSFUL = '[GRID] Next element successful';
  static nextSuccessful(data): Action {
    return {
      type: GridActions.NEXT_SUCCESSFUL,
      payload: data
    };
  }

  static SORT= '[GRID] Sort elements';
  static sort(search): Action {
    return {
      type: GridActions.SORT,
      payload: search
    };
  }

  static SORT_SUCCESSFUL = '[GRID] Sort elements successful';
  static sortSuccessful(data): Action {
    return {
      type: GridActions.SORT_SUCCESSFUL,
      payload: data
    };
  }

  static SELECT_SUCCESSFUL= '[GRID] Select element successful';
  static selectSuccessful(data): Action {
    return {
      type: GridActions.SELECT_SUCCESSFUL,
      payload: data
    };
  }

  static UNSELECT_SUCCESSFUL= '[GRID] Unselect element successful';
  static unselectSuccessful(data): Action {
    return {
      type: GridActions.UNSELECT_SUCCESSFUL,
      payload: data
    };
  }

  static CONFIRM_DELETE= '[GRID] Confirm delete element';
  static confirmDelete(): Action {
    return {
      type: GridActions.CONFIRM_DELETE
    };
  }

  static CANCEL_DELETE= '[GRID] Cancel delete element';
  static cancelDelete(): Action {
    return {
      type: GridActions.CANCEL_DELETE
    };
  }

  static REFRESH_DATA= '[GRID] Refresh';
  static refreshData(info): Action {
    return {
      type: GridActions.REFRESH_DATA,
      payload: info
    };
  }

  static REFRESH_SUCCESSFUL= '[GRID] Refresh element successful';
  static refreshSuccessful(data): Action {
    return {
      type: GridActions.REFRESH_SUCCESSFUL,
      payload: data
    };
  }

  static REFRESH_DATA_AFTER_DELETE = '[GRID] Refresh After Delete';
  static refreshDataAfterDelete(info): Action {
    return {
      type: GridActions.REFRESH_DATA_AFTER_DELETE,
      payload: info
    };
  }

  static REFRESH_AFTER_DELETE_SUCCESSFUL = '[GRID] Refresh After Delete successful';
  static refreshAfterDeleteSuccessful(data): Action {
    return {
      type: GridActions.REFRESH_AFTER_DELETE_SUCCESSFUL,
      payload: data
    };
  }

  static DELETE_ITEM= '[GRID] Delete Item';
  static deleteItem(info): Action {
    return {
      type: GridActions.DELETE_ITEM,
      payload: info
    };
  }

  static GOTO= '[GRID] Go to page';
  static goto(link: string, prop: string): Action {
    return {
      type: GridActions.GOTO,
      payload: {link: link, prop: prop}
    };
  }

  static GOTO_SUCCESSFUL = '[GRID] Next element successful';
  static gotoSuccessful(data): Action {
    return {
      type: GridActions.GOTO_SUCCESSFUL,
      payload: data
    };
  }

  static SHOW_ENTRIES = '[GRID] Show entries';
  static showEntries(link: string, prop: string): Action {
    return {
      type: GridActions.SHOW_ENTRIES,
      payload: {link: link, prop: prop}
    };
  }

  static SHOW_ENTRIES_SUCCESSFUL = '[GRID] Show entries successful';
  static showEntriesSuccessful(data): Action {
    return {
      type: GridActions.SHOW_ENTRIES_SUCCESSFUL,
      payload: data
    };
  }
}
