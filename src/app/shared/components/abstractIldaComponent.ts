/**
 * Created by ILDA on 20/06/16.
 */

import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { ValidationMessageService } from '../services/validation-message.service';
/**
 * Factorisation du code commun aux components
 */
export abstract class AbstractIldaComponent {

  constructor(private validationMessage: ValidationMessageService) {}

  /**
   * Indicateur de validité d'un AbstractControl
   * @param form FormGroup racine (formulaire de la page)
   * @param field Nom du champ
   * @param path Chemin jusqu'au field
   * @returns {boolean} True si valide
   */
  invalid(form: FormGroup, field: string, path: string[] = null) {
    // Note : tant que le champ n'est pas dirty, il est valide
    if (path) {
      let groupForm = form.get(path);
      return groupForm.dirty && !groupForm.get(field).valid;
    } else {
      let formCtrl: FormControl = form.get(field) as FormControl;
      return formCtrl.dirty && !formCtrl.valid;
    }
  }

  /**
   * Cette méthode renvoit un message d'erreur sur le champs fourni en entrée
   * @param form Formulaire racine
   * @param entity Entité vérifiée
   * @param field Champ vérifié
   * @param path Chemin pour arriver jusqu'au champ
   * @returns {string} Message d'erreur
   */
  errorMessage(form: FormGroup, entity: any, field: string, path: string[] = []): string {
    return "";
  }

  /**
   * Reset d'un AbstractControl
   * @param control AbstractControl
   */
  resetAbstractControl(control: AbstractControl) {
    if (control instanceof FormGroup) {
      this.resetFormGroup(control);
    } else if (control instanceof FormControl) {
      this.resetFormControl(control);
    }
  }

  /**
   * Reset d'un FormGroup. Tous les Controls fils seront resetés égalements
   * @param formG FormGroup
   */
  resetFormGroup(formG: FormGroup) {
    formG['_touched'] = false;
    formG['_dirty'] = false;
    formG['_pristine'] = true;

    for (let ctrl in formG.controls) {
      if (formG.controls.hasOwnProperty(ctrl)) {
        this.resetAbstractControl(formG.controls[ctrl]);
      }
    }
  }

  /**
   * Reset d'une FormControl. Valeur par défaut à null
   * @param formC FormControl
   */
  resetFormControl(formC: FormControl) {
    // Note : on fait deux fois le updateValue(null) pour contourner le problème du DatePciker qui refait un updateValue('')
    formC.setValue(null);
    formC['_touched'] = false;
    formC['_dirty'] = false;
    formC['_pristine'] = true;
    formC.setValue(null);
    formC['_touched'] = false;
    formC['_dirty'] = false;
    formC['_pristine'] = true;
  }
}
