// Ne pas modifier l'ordre des statuts
// pour pouvoir utiliser les opérateurs < et >
// Passee = 0, EnCours = 1, Future = 2
enum Periode { Passee, EnCours, Future}

export default Periode;

/**
 * Fonction qui détermine si date <= date du jour
 * @param maDate de l'entite
 * @returns {boolean}
 */
function nowIsAfter(maDate: string): boolean {
  return maDate && moment(maDate, 'DD/MM/YYYY').isValid() && !moment(maDate, 'DD/MM/YYYY').isAfter(moment());
};

/**
 * Fonction qui détermine si le statut de l'entité est futur, en cours, ou terminé
 * @param dateEffet
 * @param dateFinEffet
 * @returns {StatutPeriode}
 */
export function getPeriode(dateEffet: string, dateFinEffet?: string): Periode {
  let statutRetour = Periode.Future;

  // Si c'est après la date d'effet, ce n'est déjà plus le futur
  if (nowIsAfter(dateEffet)) {
    statutRetour = Periode.EnCours;
  }

  // Si c'est après la date de fin d'effet ce n'est plus en cours
  if (dateFinEffet) {
    if (nowIsAfter(dateFinEffet)) {
      statutRetour = Periode.Passee;
    }
  }

  return statutRetour;
};
