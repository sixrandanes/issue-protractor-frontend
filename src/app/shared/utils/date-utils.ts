import { labels } from '../constantes/libelles';

const FORMAT = labels.FORMAT_DATE;
/**
 * Fonction de test de la validité de la date
 * @param date la date
 * @returns {boolean} true si la date est valide, false sinon
 */
export function isValidDate(date: string): boolean {
    return (date && date.length > 0) ? (moment(date, FORMAT, true).isValid()) : false;
};
