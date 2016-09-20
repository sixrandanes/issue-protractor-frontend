/**
 * Informations concernant le composant grille
 */
export class GridInfo {

  constructor(public first: string = null,
              public next: string = null,
              public prev: string = null,
              public last: string = null,
              public current: string = null,
              public prop: string = null,
              public totalPages: number = null,
              public currentPage: number = null,
              public totalElements: number = null,
              public firstElement: number = null,
              public lastElement: number = null,
              public pagination: boolean = null,
              public empty: boolean = null,
              public values: Object[] = null,
              public selected: any = null,
              public selectedIndex: number = null,
              public confirm = false,
              public size: number = null) {
  }
}
