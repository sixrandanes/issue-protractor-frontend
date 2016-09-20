import { ChangeDetectionStrategy, Component, Input, OnInit, Output, EventEmitter, ElementRef, Renderer, ViewChild } from '@angular/core';
import { labels } from '../../../../../shared/constantes';

/**
 * ilda-pays-list
 *
 * Dumb Component permettant de gerer l'affichage de la liste des pays
 */
@Component({
  moduleId: module.id,
  selector: 'ilda-pays-list',
  templateUrl: 'pays-list.component.html',
  styleUrls: ['pays-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaysListComponent implements OnInit {

  labels: Object = labels;

  @Input() pays;

  @Output() itemsList = new EventEmitter();

  @ViewChild('paysDrawerPanel') drawer: ElementRef;

  constructor(private renderer: Renderer) {}

  /**
   * onInit
   */
  ngOnInit() {
    this.itemsList.emit({});
  }

  /**
   * Rafraichissement des données de la liste
   */
  refresh(): void {
    this.itemsList.emit({});
  }

}
