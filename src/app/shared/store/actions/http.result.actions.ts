import { Action } from '@ngrx/store';

export class HttpResultActions {

  static HTTP_REQUEST_SUCCESSFUL = '[MESSAGE] request success';
  static httpRequestSuccessful(): Action {
    return {
      type: HttpResultActions.HTTP_REQUEST_SUCCESSFUL
    };
  }

  static HTTP_REQUEST_SUCCESSFUL_AND_REDIRECTION = '[MESSAGE] request success and redirection';
  static httpRequestSuccessfulAndRedirection(redirection: string): Action {
    return {
      type: HttpResultActions.HTTP_REQUEST_SUCCESSFUL_AND_REDIRECTION,
      payload: redirection
    };
  }

  static HTTP_REQUEST_SUCCESSFUL_DELETE = '[MESSAGE] request delete success';
  static httpRequestSuccessfulDelete(): Action {
    return {
      type: HttpResultActions.HTTP_REQUEST_SUCCESSFUL_DELETE
    };
  }

  static HTTP_REQUEST_ERROR= '[MESSAGE]  REQUEST ERRROR';
  static httpRequestError(erreur): Action {
    return {
      type: HttpResultActions.HTTP_REQUEST_ERROR,
      payload: erreur
    };
  }

  static RESET= '[MESSAGE]  REQUEST RESET';
  static httpReset(): Action {
    return {
      type: HttpResultActions.RESET
    };
  }
}
