import { Action } from '@ngrx/store';
import { GridInfo } from '../grid-info';
import { GridActions } from './grid.actions';

export type GridInfoState = GridInfo;

const initialState: GridInfo = {
  first: '',
  next: '',
  prev: '',
  last: '',
  current: '',
  prop: '',
  totalPages: 0,
  currentPage: 0,
  totalElements: 0,
  firstElement: 0,
  lastElement: 0,
  pagination: true,
  empty: true,
  values: [],
  selected: null,
  selectedIndex: -1,
  confirm: false,
  size: 10
};

export default function (state = initialState, action: Action): GridInfoState {
  switch (action.type) {
    case GridActions.INIT_SUCCESSFUL:
      return buildState(action.payload);
    case GridActions.FIRST_SUCCESSFUL:
      return buildState(action.payload);
    case GridActions.PREV_SUCCESSFUL:
      return buildState(action.payload);
    case GridActions.NEXT_SUCCESSFUL:
      return buildState(action.payload);
    case GridActions.GOTO_SUCCESSFUL:
      return buildState(action.payload);
    case GridActions.SHOW_ENTRIES_SUCCESSFUL:
      return buildState(action.payload);
    case GridActions.LAST_SUCCESSFUL:
      return buildState(action.payload);
    case GridActions.SORT_SUCCESSFUL:
      return buildState(action.payload);
    case GridActions.SELECT_SUCCESSFUL:
      // Copie de l'état précédent, avec champ 'selected' renseigné
      let newStateSelected = Object.assign(new GridInfo(), state);
      newStateSelected.selected = action.payload;
      newStateSelected.confirm = false;
      newStateSelected.selectedIndex = action.payload.selectedIndex;
      return newStateSelected;
    case GridActions.UNSELECT_SUCCESSFUL:
      // Copie de l'état précédent, avec champ 'selected' remis à null
      let newStateDeselected = Object.assign(new GridInfo(), state);
      newStateDeselected.selected = null;
      newStateDeselected.confirm = false;
      return newStateDeselected;
    case GridActions.CONFIRM_DELETE:
      let newStateConfirm = Object.assign(new GridInfo(), state);
      newStateConfirm.confirm = true;
      return newStateConfirm;
    case GridActions.CANCEL_DELETE:
      let newStateCancel = Object.assign(new GridInfo(), state);
      newStateCancel.confirm = false;
      return newStateCancel;
    case GridActions.REFRESH_SUCCESSFUL:
      return buildState(action.payload);
    case GridActions.REFRESH_AFTER_DELETE_SUCCESSFUL:
      return buildState(action.payload);
    default:
      return state;
  }
};

function buildState(payload): GridInfo {
  let newState: GridInfo = new GridInfo();
  if (payload && payload._links) {

    // Links
    if (payload._links.first) {
      newState.first = payload._links.first.href;
    }
    if (payload._links.next) {
      newState.next = payload._links.next.href;
    }
    if (payload._links.prev) {
      newState.prev = payload._links.prev.href;
    }
    if (payload._links.last) {
      newState.last = payload._links.last.href;
    }
    newState.current = payload._links.self.href;
    // Pages
    newState.pagination = (payload.page.totalPages > 1 );
    newState.empty = (payload.page.totalElements === 0 );
    newState.totalPages = payload.page.totalPages;
    // Pagination SDR commence à 0
    newState.currentPage = payload.page.number + 1;
    newState.totalElements = payload.page.totalElements;
    newState.size = payload.page.size;

    newState.firstElement = (payload.page.number * payload.page.size) + 1;
    newState.lastElement = (payload.page.number * payload.page.size) + payload.page.size > newState.totalElements ?
      newState.totalElements : (payload.page.number * payload.page.size) + payload.page.size;
    // Propriete
    newState.prop = payload.info.prop;
    // Datas
    newState.values = payload._embedded.values;
  }
  return newState;
}
