import { Pays } from '../pays';

import { Action } from '@ngrx/store';
import { PaysActions } from './pays.actions';

export type PaysListState = Pays[];

const initialState: PaysListState = [];

/**
 * Pays Reducers permettant de determiner le nouvel etat à persister
 * @param state
 * @param action
 * @returns {any}
 */
export default function (state = initialState, action: Action): PaysListState {
  switch (action.type) {
    case PaysActions.LOAD_PAYS_SUCCESS: {
      return action.payload;
    }
    case PaysActions.SEARCH_PAYS_SUCCESS: {
      return action.payload;
    }
    default:
      return state;
  }
};
