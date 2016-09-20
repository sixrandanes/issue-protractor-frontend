/**
 * Centralisation des messages
 * @type {Array}
 */
export const messages = {
    FIELD_REQUIRED: 'Ce champ est obligatoire',
    SUCCESSFULL_MESSAGE: 'Données enregistrées avec succès',
    SUPPRESSION_OK: 'Données supprimées avec succès',
    /* HTTP Error 412 */
    HTTP_PRECONDITION_FAILURE_412: 'Impossible de mettre à jour cette donnée : la version de cette donnée est obsolète',
    /* HTTP Error 404 */
    HTTP_NOT_FOUND_404: 'La resource n\'est pas disponible',
    /* HTTP Error 403 */
    HTTP_ACCESS_DENY_403: 'Vous n\'avez pas les droits d\'accès.',
    SUPPRESSION_MESSAGE: 'Voulez-vous supprimer cet élément ?',
    UPPERCASE_MANDATORY: 'Le champ doit être en majuscule',
    TAUX_FORMAT: 'Le taux doit avoir le format suivant : 4 chiffres avant la virgule et 5 chiffres après la virgule',
    NUMERO_CHAPITRE: 'Le numéro du chapitre doit être un chiffre compris entre 01 et 99',
};
