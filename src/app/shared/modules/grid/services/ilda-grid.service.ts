import { Store } from '@ngrx/store';
import { Http } from '@angular/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GridInfo } from '../grid-info';
import processResponse from '../../../crud/process.http-response';

/**
 * Service d'accès aux données
 */
@Injectable()
export class IldaGridService {
  http: Http;
  store: Store<GridInfo>;

  constructor(@Inject(Http) http: Http, store: Store<GridInfo>) {
    this.http = http;
    this.store = store;
  }

  /**
   * Appel méthode avec pagination SDR
   * @param link lien avec pagination
   * @param property Entite sur laquelle on veut récupérer les données
   * @returns {Observable<R>} Observable retour du get
   */
  public loadData(link: string, property: string): Observable<any> {
    return this.http.get(link)
      .map(res => processResponse(res, property))
      .catch(this.handleError);
  }

  /**
   * Appel de la méthode de tri SDR
   * @param sort
   * @returns {Observable<any>} Observable retour du get
   */
  public sortData(sort: any): Observable<any> {
    return this.http.get(sort.link)
      .map(res => processResponse(res, sort.prop))
      .catch(this.handleError);
  }

  /**
   * Appel de la méthode refresh
   * @param info Etat de la Grid
   * @returns {Observable<any>} Observable retour du get
   */
  public refreshData(info: GridInfo): Observable<any> {
    return this.http.get(info.current)
      .map(res => processResponse(res, info.prop))
      .catch(this.handleError);
  }

  /**
   * Appel de la méthode de refresh apres un delete
   * @param info Etat de la Grid
   * @returns {Observable<any>} Observable retour du get
   */
  public refreshDataAfterDelete(info: GridInfo): Observable<any> {
    // si il reste un seul element sur la page et qu'il y'a plus d'une page, on bascule sur la page précédente
    const resource = info.values.length === 1 && info.currentPage !== 1 ? info.prev : info.current;

    return this.http.get(resource)
      .map(res => processResponse(res, info.prop))
      .catch(this.handleError);
  }

  /**
   * Suppression d'une entité de la grille
   * @param resource URL de l'entité
   */
  public deleteItem(resource: string): Observable<any> {
    return this.http.delete(resource)
      .catch(this.handleError);
  }

  /**
   * Gestion des erreurs
   * @param error
   * @returns {ErrorObservable}
   */
  protected handleError(error: any) {
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg, error); // log to console instead
    return Observable.throw(error);
  }
}
