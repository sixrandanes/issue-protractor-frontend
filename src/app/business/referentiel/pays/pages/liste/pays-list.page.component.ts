import { labels } from '../../../../../shared/constantes';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PaysActions } from '../../store';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../shared/store/reducers';

/**
 * ilda-pays-list
 *
 * Smart Component
 */
@Component({
  moduleId: module.id,
  templateUrl: 'pays-list.page.component.html'
})
export class PaysListPageComponent {

  pays: Observable<{}>;

  labels: Object = labels;

  constructor(private router: Router,
              private store: Store<AppState>) {

    this.pays = store.select(state => state.pays);
  }

  /**
   * Récuperation de la liste des pays
   */
  liste() {
    // line to comment to make tests pass or fails
    // if this method is commented, the http query is never done, and the test is OK
    // if this method is uncommented, the http query is done, but the test fails because of a timeout (as if protractor never detects the http return)
    this.search();
  }


  /**
   * Recherche avec paramètres
   * @param {Object} event
   */
  search() {

    this.store.dispatch(PaysActions.searchPays({code2: '', code3: '', designation: '', date: ''}));
  }
}
