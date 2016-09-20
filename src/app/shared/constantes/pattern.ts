/**
 * Classe regroupant les patterns susceptible d'être utilisés
 */
export class Pattern {

    public static LETTER_ONLY_PATTERN: string = '^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._\s-]+$';
    public static NUMBER_ONLY_PATTERN: string = '^[0-9]+$';
    public static ROMAN_NUMBER_ONLY_PATTERN: string = '^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$';
    public static TAUX_DEVISE: string = '[0-9]{1,4}.{0,1},{0,1}[0-9]{0,5}';
    public static NUMERO_CHAPITRE: string = '[0-9]{2}';
}
