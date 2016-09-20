import { labels } from '../constantes/libelles';
import { isEnCours, isTermine } from './date-effet';

const FORMAT = labels.FORMAT_DATE;

describe('Utils: Date effet', () => {

    it('should test isEnCours on null', () => {
        // Given
        let dateEffet = null;
        // When
        let res = isEnCours(dateEffet);
        // Expect
        expect(res).toEqual(false);
    });

    it('should test isEnCours on bad format', () => {
        // Given
        let dateEffet = 'toto';
        // When
        let res = isEnCours(dateEffet);
        // Expect
        expect(res).toEqual(false);
    });

    it('should test isEnCours on after', () => {
        // Given
        let dateEffet = moment().add(2, 'days').format(FORMAT);
        // When
        let res = isEnCours(dateEffet);
        // Expect
        expect(res).toEqual(false);
    });

    it('should test isEnCours on before', () => {
        // Given
        let dateEffet = moment().subtract(2, 'days').format(FORMAT);
        // When
        let res = isEnCours(dateEffet);
        // Expect
        expect(res).toEqual(true);
    });

    it('should test isTermine on null', () => {
        // Given
        let dateEffet = null;
        // When
        let res = isTermine(dateEffet);
        // Expect
        expect(res).toEqual(false);
    });

    it('should test isTermine on bad format', () => {
        // Given
        let dateEffet = 'toto';
        // When
        let res = isTermine(dateEffet);
        // Expect
        expect(res).toEqual(false);
    });

    it('should test isTermine on after', () => {
        // Given
        let dateEffet = moment().add(2, 'days').format(FORMAT);
        // When
        let res = isTermine(dateEffet);
        // Expect
        expect(res).toEqual(false);
    });

    it('should test isTermine on before', () => {
        // Given
        let dateEffet = moment().subtract(2, 'days').format(FORMAT);
        // When
        let res = isTermine(dateEffet);
        // Expect
        expect(res).toEqual(true);
    });

});
