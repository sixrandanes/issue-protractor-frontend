import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Message, SUCCESS, SUCCESS_AND_REDIRECTION, ERROR, SUCCESS_DELETE } from '../constantes/message';
import { AppState } from '../store/reducers';

/**
 * service IldaHttp
 * Dumb Component gerant l'affichage et les actions de creation/Modification relatifs au referentiel devises
 */
@Injectable()
export class IldaHttpService  {

  httpResponse$: Observable<Message>;
  httpResponseSubscription: Subscription;

  /**
   * @param router
   * @param store
   */
  constructor(private router: Router,
              private store: Store<AppState>) {

    this.init();
  }

  /**
   * initialisation du service en dehors du constructeur
   * cela facilite les tests
   */
  init() {
    this.httpResponse$ = this.store.select(state => state.httpResponse);

    this.httpResponseSubscription = this.httpResponse$.subscribe(
      httpResponse => {
        if (httpResponse) {
          if (httpResponse.messageType === SUCCESS ) {
            this.success();
            return;
          }
          if (httpResponse.messageType === SUCCESS_AND_REDIRECTION ) {
            this.success();
            this.redirection(httpResponse.redirection);
            return;
          }
          if (httpResponse.messageType === SUCCESS_DELETE ) {
            this.successDelete();
            return;
          }
          if (httpResponse.messageType === ERROR ) {
            return;
          }
        }
      }
    );
  }

  /**
   * Lors d'une {creation|modification}, gestion du success
   */
  success() {

  }

  /**
   * Lors d'une {creation|modification}, gestion du success
   */
  redirection(redirectTo: string) {
    if (redirectTo) {
      this.router.navigate(['/' + redirectTo]);
      return;
    }
    throw new Error('Erreur redirection : le path ne doit pas etre null');
  }

  /**
   * Lors d'une {suppression}, gestion du sucess
   */
  successDelete() {
  }

}
