import * as moment_ from 'moment';
const moment: moment.MomentStatic = (<any>moment_)['default'] || moment_;

import  StatutPeriode, * as fromStatutPeriode  from './periode';

describe('Util: Statut Periode', () => {

    let avantHier =  moment().subtract(1, 'days').format('DD/MM/YYYY');
    let hier = moment().subtract(1, 'days').format('DD/MM/YYYY');
    let aujourdhui = moment().format('DD/MM/YYYY');
    let demain = moment().add(1, 'days').format('DD/MM/YYYY');
    let apresDemain = moment().add(2, 'days').format('DD/MM/YYYY');

    it('should get Futur dateEffet demain', () => {
        // When
        let enCours = fromStatutPeriode.getPeriode(demain);

        // expect
        expect(enCours).toEqual(StatutPeriode.Future);
    });

    it('should get Futur dateEffet demain et dateFinEffet apresDemain', () => {
        // When
        let enCours = fromStatutPeriode.getPeriode(demain, apresDemain);

        // expect
        expect(enCours).toEqual(StatutPeriode.Future);
    });

    it('should get EnCours dateEffet hier and dateFinEffet demain', () => {
        // When
        let enCours = fromStatutPeriode.getPeriode(hier, demain);

        // expect
        expect(enCours).toEqual(StatutPeriode.EnCours);
    });

    it('should get EnCours dateEffet hier et pas date fin effet', () => {
        // When
        let enCours = fromStatutPeriode.getPeriode(hier);

        // expect
        expect(enCours).toEqual(StatutPeriode.EnCours);
    });

    it('should get EnCours dateEffet aujourdhui et pas date fin effet', () => {
        // When
        let enCours = fromStatutPeriode.getPeriode(aujourdhui);

        // expect
        expect(enCours).toEqual(StatutPeriode.EnCours);
    });

    it('should get EnCours dateEffet aujourdhui et date fin effet demain', () => {
        // When
        let enCours = fromStatutPeriode.getPeriode(aujourdhui, demain);

        // expect
        expect(enCours).toEqual(StatutPeriode.EnCours);
    });

    it('should get EnCours dateEffet hier et date fin effet aujourdhui', () => {
        // When
        let enCours = fromStatutPeriode.getPeriode(hier, aujourdhui);

        // expect
        expect(enCours).toEqual(StatutPeriode.Passee);
    });

    it('should get Termine dateEffet avant hier et date fin effet hier', () => {
        // When
        let enCours = fromStatutPeriode.getPeriode(avantHier, hier);

        // expect
        expect(enCours).toEqual(StatutPeriode.Passee);
    });
});
