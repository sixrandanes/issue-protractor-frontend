import '@ngrx/core/add/operator/select';
import { compose } from '@ngrx/core/compose';
import { combineReducers } from '@ngrx/store';

import HttpResponseReducer, * as fromHttpResponse from './http.response.reducers';
import paysReducer, * as fromPaysList from './../../../business/referentiel/pays/store/pays-list.reducers';
import paysDetailReducer, * as fromPays from './../../../business/referentiel/pays/store/pays.reducers';
import gridInfoReducer, * as fromGrid from '../../modules/grid/store/grid-info.reducers';



export interface AppState {
    httpResponse: fromHttpResponse.MessageState;
    gridInfo: fromGrid.GridInfoState;
    pays: fromPaysList.PaysListState;
    paysDetail: fromPays.PaysState;
}

export default compose(combineReducers)({
    httpResponse: HttpResponseReducer,
    gridInfo: gridInfoReducer,

    pays: paysReducer,
    paysDetail: paysDetailReducer
});
