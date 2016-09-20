import { Store } from '@ngrx/store';
import { Http, Headers, URLSearchParams, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { AppState } from '../store/reducers';
const HEADER = {headers: new Headers({'Content-Type': 'application/json'})};
import processResponse from '../crud/process.http-response';

/**
 * Factorisation des services CRUD
 */
export abstract class CrudService<T> {

  constructor() {}

  /**
   * Base de l'URL du service
   */
  protected abstract getBaseUrl(): string;

  /**
   * Repository
   */
  protected abstract getRepository(): string;

  /**
   * Store des entités
   */
  protected abstract getStore(): Store<AppState>;

  /**
   * Service HTTP d'Angular
   */
  protected abstract getHttp(): Http;

  /**
   * Chargement de l'ensemble des entités
   */
  public loadItems(): Observable<T[]> {

    return this.getHttp().get(this.getBaseUrl())
      .map(res => processResponse(res, this.getRepository()))
      .catch(this.handleError);
  }

  /**
   * Chargement d'une resource particulière
   * @param resource
   * @returns {any}
   */
  public loadItem(resource: string): Observable<any> {
    return this.getHttp().get(resource);
  }

  /**
   * Création d'une entité
   * @param item Entité à créer
   */
  public addItem(item: T): Observable<Response> {
    return this.getHttp().post(this.getBaseUrl(), JSON.stringify(item), HEADER);
  }

  /**
   * Mise à jour d'une entité
   * @param resource URL de l'entité
   * @param payload Données de l'entité
   * @param etag Etag de l'entité
   */
  public updateItem(resource: string, payload: T, etag: string): Observable<Response> {
    const HEADER_WITH_ETAG = {headers: new Headers({'Content-Type': 'application/json', 'If-Match': etag})};
    return this.getHttp().put(resource, JSON.stringify(payload), HEADER_WITH_ETAG);
  }

  /**
   * Suppression d'une entité
   * @param resource URL de l'entité
   */
  public deleteItem(resource: string): Observable<Response> {
    return this.getHttp().delete(resource)
      .catch(this.handleError);
  }

  /**
   * Recherche détaillée de d'un ecran referentiel type
   * @param code Critère de recherche 'Code'
   * @param designation Critère de recherche 'Désignation'
   * @param date une date comprise dans la période d'effet
   */
  public searchWithParams(code = '', designation = '', date = ''): Observable<Response> {
    let params = new URLSearchParams();
    params.set('code', code);
    params.set('designation', designation);
    params.set('date', date);

    return this.getHttp().get(this.getBaseUrl() + '/search/with_params', {search: params})
      .map(res => processResponse(res, this.getRepository()));
  }

  /**
   * Recherche détaillée
   * @param searchParam est un objet contenant les critères de recherche
   */
  public searchWithObjParam(searchParam): Observable<any> {
    let params = new URLSearchParams();
    Object.keys(searchParam).forEach(key => params.set(key, searchParam[key]));

    return this.getHttp().get(this.getBaseUrl() + '/search/with_params', {search: params})
      .map(res => processResponse(res, this.getRepository()))
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

  /**
   *
   * @param linkToItems
   * @returns {Promise<ErrorObservable>|Promise<T>}
   */
  public loadChildItems(linkToItems: string) {
    return this.getHttp().get(linkToItems)
      .map(res => processResponse(res, this.getRepository()))
      .catch(this.handleError);
  }
}
