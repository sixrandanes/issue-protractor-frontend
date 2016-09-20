import { OnDestroy, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/Rx';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AppState } from '../../../store/reducers';
import { GridInfo } from '../grid-info';
import { GridActions } from '../store/grid.actions';

/**
 * Smart component de la table
 */
@Component({
  moduleId: module.id,
  selector: 'ilda-grid',
  templateUrl: 'ilda-grid.component.html'
})
export class IldaGridComponent implements OnDestroy {

  @Input() data: any;
  @Input() titre: any;
  @Input() frozenColumns: any;
  @Input() searchable: boolean = true;

  @Output() selected = new EventEmitter();
  @Output() add = new EventEmitter();
  @Output() update = new EventEmitter();
  @Output() delete = new EventEmitter();

  @Output() openSearchPanel = new EventEmitter();

  grid: any; // Grille
  info: GridInfo;

  gridInfo: Observable<GridInfo>;
  dataSubscription: Subscription;
  gridSubscription: Subscription;
  gridInfoSubscription: Subscription;

  @ViewChild('vaadin-grid') vaadin: any;

  /**
   * @param store Gestion de l'état de la gille
   */
  constructor(private store: Store<AppState>) {
    this.gridInfo = store.select(state => state.gridInfo);
  }

  /**
   * Méthode déclenchée dès que la grille est chargée
   * @param grid element correspondant à l'affichage de la grille
   */
  gridReady(grid) {
    this.grid = grid;
    this.grid.addEventListener('selected-items-changed', () => this.onSelect());

    if (!this.data) {
      throw new Error('[Grid]: data must be not null');
    }

    this.dataSubscription = this.data
      .distinctUntilChanged()
      .subscribe(res => this.store.dispatch(GridActions.init(res)));

    this.gridInfoSubscription = this.gridInfo
      .distinctUntilChanged()
      .subscribe(res => {
        if (res && res.values) {
          this.info = res;
          if (this.info.selected === null) {
            this.grid.selection.deselect(this.info.selectedIndex);
          }
        }
      });

    this.gridSubscription = this.gridInfo
      .map(res => res.values)
      .distinctUntilChanged()
      .subscribe(res => {
        if (res) {
          this.grid.items = res;
          this.grid.visibleRows = res.length;
          this.grid.addEventListener('sort-order-changed', () => this.onSort());
        }
      });
  }

  /**
   * Méthode de refresh de la table
   */
  refresh() {
    this.store.dispatch(GridActions.refreshData(this.info));
  }

  /**
   * Méthode de pagination première page
   */
  first() {
    this.store.dispatch(GridActions.first(this.info));
  }

  /**
   * Méthode de pagination dernière page
   */
  last() {
    this.store.dispatch(GridActions.last(this.info));
  }

  /**
   * Méthode de pagination page précédente
   */
  prev() {
    this.store.dispatch(GridActions.previous(this.info));
  }

  /**
   * Méthlode de pagination page suivante
   */
  next() {
    this.store.dispatch(GridActions.next(this.info));
  }

  /**
   * Action 'Ajouter'
   */
  onAdd() {
    this.add.emit({});
  }

  /**
   * Action 'Update'
   */
  onUpdate() {
    this.update.emit(this.info.selected);
  }

  /**
   * Action 'Delete'
   */
  onDelete() {
    this.store.dispatch(GridActions.confirmDelete());
  }

  /**
   * Action 'Cancel'
   */
  onCancel() {
    this.store.dispatch(GridActions.cancelDelete());
  }

  /**
   * Action 'Search'
   */
  search() {
    this.openSearchPanel.emit({});
  }

  /**
   * Action 'Confirm Delete'
   */
  onConfirm() {
    this.store.dispatch(GridActions.deleteItem(this.info));
  }

  /**
   * Méthode de tri associé à l'évènement de tri
   * @returns {function} Fonction de tri
   */
  onSort() {

    let sortBy = '';

    let current: string = this.info.current.indexOf('page=') !== -1 ?
      this.info.current.split('page=')[0] : this.info.current.split('sort=')[0];

    if (current.indexOf('?') === -1) {
      current += '?';
    }

    this.grid.sortOrder.forEach(e => {
        let idx = e.column;
        sortBy += `&sort=${this.grid.columns[idx].name},${e.direction}`;
      }
    );

    current += sortBy;

    this.store.dispatch(GridActions.sort({link: current, prop: this.info.prop}));
  }

  /**
   * Méthode de sélection
   * @returns {function} Fonction de sélection
   */
  onSelect() {
    let selected = this.grid.selection.selected();

    if (selected.length === 1) {
      this.grid.getItem(selected[0], (error, item) => {
        if (!error) {
          item.selectedIndex = selected[0];
          this.store.dispatch(GridActions.selectSuccessful(item));
        }
      });
    } else if (selected.length !== 1 && this.info && this.info.selected) {
      this.store.dispatch(GridActions.unselectSuccessful(null));
    }
  }

  /**
   * Méthode changement de page manuelle
   * @param page numéro de page
   */
  onChangePage(page) {

    let linkTo = this.info.current;

    if (page > this.info.totalPages) {
      page = this.info.totalPages;
    }

    if (linkTo.indexOf('?') === -1) {
      linkTo += `?`;
    }

    if (linkTo.indexOf('page=') === -1) {
      linkTo += `&page=${page}`;
    } else {
      linkTo = linkTo.replace(/page=\d*/, `page=${page}`);
    }

    this.store.dispatch(GridActions.goto(linkTo, this.info.prop));
  }

  /**
   * Methide changement nombre d'enregistrement
   * @param size nombre d'éléments affichés par la grille
   */
  onChangeEntries(size) {
    if (this.info) {

      let linkTo = this.info.current;

      if (linkTo.indexOf('?') === -1) {
        linkTo += `?`;
      }

      linkTo = linkTo.replace(/page=\d*/, '');

      if (linkTo.indexOf('size=') === -1) {
        linkTo += `&size=${size}`;
      } else {
        linkTo = linkTo.replace(/size=\d*/, `size=${size}`);
      }

      this.store.dispatch(GridActions.showEntries(linkTo, this.info.prop));
    }
  }

  /**
   * Unsubscribe on destroy
   */
  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
    this.gridSubscription.unsubscribe();
    this.gridInfoSubscription.unsubscribe();
  }
}
