import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

// Ce service centralise les erreurs de validation sur des contrôles et génère le message d'erreur adéquat.
@Injectable()
export class ValidationMessageService {

  // 3 messages d'erreur communs, 1 sous forme de chaine et 2 autres sous forme de fonction
  // Tous sont statiques et peuvent être utilisés dans les tests.
  public static MESSAGE_REQUIRED: string = 'Champ obligatoire';
  public static MESSAGE_MINLENGTH = (errorMessages: string[]) => { return `Le champ doit contenir au moins ${errorMessages[0]} caractères`; };
  public static MESSAGE_MAXLENGTH = (errorMessages: string[]) => {
    return `Le champ ne doit pas contenir plus de ${errorMessages[0]} caractères`;
  };
  public static MESSAGE_SELECT = (errorMessages: string[]) => `${errorMessages[0]}`;
  public static MESSAGE_TOGGLE = (errorMessages: string[]) => `${errorMessages[0]}`;
  public static MESSAGE_RADIO = (errorMessages: string[]) => `${errorMessages[0]}`;
  public static MESSAGE_EMAIL: string = `Email incorrect`;
  public static MESSAGE_TEL = (errorMessages: string[]) => `Format attendu : ${errorMessages[0]}`;
  public static MESSAGE_NUMBER_ONLY = 'Ce champ ne peut contenir que des caractères numériques';
  public static MESSAGE_ROMAN_NUMBER_ONLY = 'Ne peut contenir que des nombres romains valides';
  public static MESSAGE_COMBO = 'Champ invalide';

  constructor() {}

  // La fonction message reçoit en entrée un tableau d'IldaValidator (nom, fonction de validation, tableau de messages)
  // Ainsi que le contrôle pour lequel on veut voir apparaître un message
  message(validators: any[], control: AbstractControl): string {
    return "";
  }

  isControlDirty(ctrl: AbstractControl) {
    return ctrl.dirty;
  }

}
