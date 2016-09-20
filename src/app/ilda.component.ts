import { Component, OnInit } from '@angular/core';
import { environment } from './environment';
import { IldaHttpService } from './shared/services/http.service';

const DATE_BUILD = `${environment.DATE_BUILD}`;

/**
 * Composant père fournissant également les services transversaux :
 * IldaHttpService
 */
@Component({
  moduleId: module.id,
  selector: 'ilda-app',
  templateUrl: 'ilda.component.html',
  styleUrls: ['ilda.component.css']
})
export class IldaAppComponent implements OnInit {

  // Affichage de la date du build
  date = DATE_BUILD;

  constructor(private ildaHttpService: IldaHttpService) {}

  ngOnInit() {
    // Affichage de la date en mode production
    if (environment.production) {
        this.date = this.date.substring(7, this.date.length - 1);
    }
  }
}
