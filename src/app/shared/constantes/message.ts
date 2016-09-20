/**
 * Message
 */

export const SUCCESS = 'SUCCESS';
export const SUCCESS_AND_REDIRECTION = 'SUCCESS_AND_REDIRECTION';
export const SUCCESS_DELETE = 'SUCCESS_DELETE';
export const ERROR = 'ERROR';

export class Message {
  constructor(public messageType = '',
              public error: any = null,
              public redirection: string = null) {}
}
