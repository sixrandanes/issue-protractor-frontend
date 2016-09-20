import { Action } from '@ngrx/store';
import { PaysInfo } from '../pays-info';
import { PaysActions } from './pays.actions';
import { Pays } from '../pays';
import { getPeriode } from '../../../../shared/utils';
import { TITLE_MODIFICATION } from '../pays-info';

export type PaysState = PaysInfo;

/**
 * Pays Reducers permettant de determiner le nouvel etat à persister
 * @param state
 * @param action
 * @returns {any}
 */
export default function (state, action: Action): PaysState {
  switch (action.type) {
    case PaysActions.INIT_PAYS:
    {
      return buildState();
    }
    case PaysActions.GET_PAYS_SUCCESS:
    {
      return buildState(action.payload);
    }
    default:
      return state;
  }
};

/**
 * Construction du nouvel Etat
 * @param payload
 * @returns {PaysInfo}
 */
function buildState(payload = null): PaysInfo {
  let newState: PaysInfo;

  if (!payload) {
    newState = new PaysInfo();
  } else {
    let body = JSON.parse(payload._body);
    let etag = payload.headers.get('ETag') || payload.headers.get('Etag');

    const title = TITLE_MODIFICATION + body.code3;
    const pays = new Pays(body.code2, body.code3, body.designation, body.dateEffet, body.dateFinEffet,
       body.dateCre, body.dateMaj, body.auteurCre, body.auteurMaj);

    newState = new PaysInfo(title,
      'EDIT',
      body._links.self.href,
      getPeriode(pays.dateEffet, pays.dateFinEffet),
      etag,
      pays);
  }

  return newState;
}
