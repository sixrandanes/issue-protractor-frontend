import { Action } from '@ngrx/store';
import { HttpResultActions } from '../actions/http.result.actions';
import { Message, SUCCESS, SUCCESS_AND_REDIRECTION, SUCCESS_DELETE, ERROR } from '../../constantes/message';

export type MessageState = Message;

const initialState: MessageState = new Message();

/**
 * Unites Reducers permettant de determiner le nouvel etat à persister
 * @param state
 * @param action
 * @returns {any}
 */
export default function (state = initialState, action: Action): MessageState {
  switch (action.type) {
    case HttpResultActions.HTTP_REQUEST_SUCCESSFUL: {
      return new Message(SUCCESS);
    }
    case HttpResultActions.HTTP_REQUEST_SUCCESSFUL_AND_REDIRECTION: {
      return new Message(SUCCESS_AND_REDIRECTION, null, action.payload );
    }
    case HttpResultActions.HTTP_REQUEST_SUCCESSFUL_DELETE: {
      return new Message(SUCCESS_DELETE);
    }
    case HttpResultActions.HTTP_REQUEST_ERROR: {
      const error = action.payload;
      return new Message(ERROR, error);
    }
    case HttpResultActions.RESET: {
      return new Message();
    }
    default:
      return state;
  }
};
