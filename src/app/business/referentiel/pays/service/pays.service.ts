import { Store } from '@ngrx/store';
import { Http, URLSearchParams } from '@angular/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Pays } from '../pays';
import { CrudService } from './../../../../shared/services/crud.service';
import { environment } from '../../../../environment';
import { AppState } from '../../../../shared/store/reducers';
import processResponse from '../../../../shared/crud/process.http-response';

const REPOSITORY = 'pays';
const BASE_URL = `${environment.API_ENDPOINT}/${REPOSITORY}`;

/**
 * Service d'accès aux Pays
 */
@Injectable()
export class PaysService extends CrudService<Pays> {

  http: Http;
  pays: Observable<any>;

  constructor(@Inject(Http) http: Http, private store: Store<AppState>) {
    super();
    this.http = http;
  }

  /**
   * Recherche détaillée d'un pays
   * @param code2 Code2 du pays
   * @param code3 Code3 du pays
   * @param designation Désignation du pays
   * @param date une date comprise dans la période d'effet
   */
  public searchWithParams(code2 = '', code3 = '', designation = '', date = ''): Observable<any> {
    let params = new URLSearchParams();
    params.set('code2', code2);
    params.set('code3', code3);
    params.set('designation', designation);
    params.set('date', date);

    return this.getHttp().get(this.getBaseUrl() + '/search/with_params', {search: params})
      .map(res => processResponse(res, 'pays'))
      .catch(this.handleError);
  }

  /**
   * Base de l'URL pour accéder aux Pays
   * @returns {string} Base de l'URL pour accéder aux Pays
   */
  public getBaseUrl() {
    return BASE_URL;
  }

  /**
   * Store des Pays
   * @returns {Object} Strore<Pays[]>
   */
  public getStore() {
    return this.store;
  }

  /**
   * Accès au helper HTTP d'Angular
   * @returns {Object} Helper HTTP d'Angular
   */
  public getHttp() {
    return this.http;
  }

  /**
   * Repository Pays
   * @returns {string}
   */
  public getRepository() {
    return REPOSITORY;
  }
}
