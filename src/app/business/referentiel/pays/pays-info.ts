import { Pays } from './pays';
import { Mode } from './../../../shared/constantes';
import Periode  from '../../../shared/utils';

export const TITLE_CREATION = 'Création d\'un  pays';
export const TITLE_MODIFICATION = 'Modification d\'un pays ';
/**
 * Classe PaysInfo
 */
export class PaysInfo {

  /**
   *
   * @param {String} title : titre de l'écran pays
   * @param {Mode} mode : Mode associé (CREATE | EDIT)
   * @param {String} resource : En modification, resource du pays à modifier
   * @param {String} periode : Passée, en cours ou futur
   * @param {String}  etag : En modification, ETAG de la resource
   * @param {Pays} pays : En modification, pays utilisé
   */
  constructor(public title = TITLE_CREATION,
              public mode: Mode = 'CREATE',
              public resource = '',
              public periode = Periode.Future,
              public etag = '',
              public pays = new Pays()) {
  }
}
