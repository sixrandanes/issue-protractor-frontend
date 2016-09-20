/**
 * Méthode qui permet de retravailler la reponse http fournie par le backend, de manière à ce que cette dernière puisse
 * s'intégrer avec le mécanisme de la datatable (qui attends le tableau de résultats ds _embedded.values)
 * @param res : la réponse http
 * @param property : le nom du repository
 * @returns {any}
 */
export default function(res: any, property: string): any {
  let body = res.json();
  const array = body['_embedded'][property];
  delete body['_embedded'][property];
  body['_embedded']['values'] = array;
  body['_embedded']['values'] = array;
  body['info'] = {prop : property};
  return body;
}
