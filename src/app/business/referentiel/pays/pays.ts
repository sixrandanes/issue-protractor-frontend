import { Validators } from '@angular/forms';

export class Pays {

  /**
   * constructor
   * @param {String} code2
   * @param {String} code3
   * @param {String} designation
   * @param {String} dateEffet
   * @param {String} dateFinEffet
   * @param {String} dateCre
   * @param {String} dateMaj
   * @param {String} auteurCre
   * @param {String} auteurMaj
   */
  constructor(public code2 = '',
              public code3 = '',
              public designation = '',
              public dateEffet = '',
              public dateFinEffet = '',
              public dateCre = '',
              public dateMaj = '',
              public auteurCre = '',
              public auteurMaj = '') {
  }

}
