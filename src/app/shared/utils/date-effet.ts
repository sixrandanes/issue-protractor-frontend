import { labels } from '../constantes/libelles';
import * as moment_ from 'moment';

const FORMAT = labels.FORMAT_DATE;
const moment: moment.MomentStatic = (<any>moment_)['default'] || moment_;
/**
 * Fonction qui détermine si l'entite est en cours : dateEffet <= date du jour
 * @deprecated utiliser la méthode getStatutPeriode de l'utilitaire statut-periode
 * @param dateEffet de l'entite
 * @returns {boolean}
 */
export function isEnCours(dateEffet: string): boolean {
    let res = false;
    if (dateEffet) {
        res = moment(dateEffet, FORMAT).isValid()
            && !moment(dateEffet, FORMAT).isAfter(moment());
    }
    return res;
};

/**
 * Fonction qui détermine si l'entité n'est plus d'actualité : dateFinEffet <= date du jour
 * @deprecated utiliser la méthode getStatutPeriode de l'utilitaire statut-periode
 * @param dateFinEffet
 * @returns {boolean}
 */
export function isTermine(dateFinEffet: string): boolean {
    let res = false;
    if (dateFinEffet) {
        res = moment(dateFinEffet, FORMAT).isValid()
            && !moment(dateFinEffet, FORMAT).isAfter(moment());
    }
    return res;
};
