import { Component, Output, ElementRef, Input, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { labels } from '../../../constantes';

@Component({
  moduleId: module.id,
  selector: 'ilda-grid-component',
  templateUrl: 'grid.component.html',
  styleUrls: ['grid.component.css']
})
export class GridComponent implements AfterViewInit {

  @Output() gridReady = new EventEmitter();
  @Output() clickFirst = new EventEmitter();
  @Output() clickPrev = new EventEmitter();
  @Output() clickNext = new EventEmitter();
  @Output() clickLast = new EventEmitter();

  @Output() clickAdd = new EventEmitter();
  @Output() clickUpdate = new EventEmitter();
  @Output() clickDelete = new EventEmitter();
  @Output() clickCancel = new EventEmitter();
  @Output() clickConfirm = new EventEmitter();
  @Output() clickRefresh = new EventEmitter();
  @Output() clickSearch = new EventEmitter();

  @Output() clickPage = new EventEmitter();
  @Output() clickEntries = new EventEmitter();

  @ViewChild('grid') grid: ElementRef;

  @Input() gridInfo;
  @Input() titre;
  @Input() totalPages;
  @Input() frozenColumns;
  // Par defaut, le bouton recherche est visible sur la grille
  @Input() searchable: boolean = true;

  @ViewChild('combo') combo: ElementRef;

  currentPage: number;

  labels = labels;

  constructor() {
  }

  /**
   * Emission d un evenement gridReady quand la grille est prete
   */
  ngAfterViewInit() {
    this.gridReady.emit(this.grid.nativeElement);
  }

  /**
   * Récupération de la liste des éléments de recherche par l'url de recherche effectué
   * Amélioration : les champs sont les champs techniques et non les libelles
   * @param urlRechercheCourante
   * @returns {Array}
   */
  listFieldsFromUrlRecherche(urlRechercheCourante: string) {
    let filtres = [];
    if (urlRechercheCourante && urlRechercheCourante.split('?')[1]) {
      filtres = urlRechercheCourante.split('?')[1].split('&')
        .filter(this.excludeSortFieldAndFieldNotSearched)
        .map(x => x.replace('=', ' : '));
    }
    return filtres;
  }

  /**
   * L'élément sort est exclu du tableau
   * @param element
   * @returns {boolean}
   */
  excludeSortFieldAndFieldNotSearched(element) {
    const position = element.indexOf('=') + 1;
    return !element.includes('sort') && !element.includes('size') && !element.includes('page') && position !== element.length;
  }

  /**
   * Emission evenement changement de page
   * @param event valeur de la nouvelle page
   */
  changePage(event) {
    this.clickPage.emit(event.target.value);
    this.saveLastValue(event);
  }

  /**
   * Emission evenement changement nombre enregistrement dans la grille
   * @param event
   */
  showEntries(event) {
    this.clickEntries.emit(event.detail.value);
  }

  /**
   * Reastaure la derniere valeur de la page sur focus out
   * @param event focus out du input
   */
  restoreLastValue(event) {
    event.target.value = this.currentPage;
  }

  /**
   * Sauvegarde valeur de l'input sur focus
   * @param event focus du input
   */
  saveLastValue(event) {
    if (event.target.value > this.totalPages) {
      this.currentPage = this.totalPages;
    } else if (event.target.value < 1) {
      this.currentPage = 1;
    } else {
      this.currentPage = event.target.value;
    }
  }
}
