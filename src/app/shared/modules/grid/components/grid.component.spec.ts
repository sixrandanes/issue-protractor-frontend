import { TestBed, inject } from '@angular/core/testing';

import { GridComponent } from './grid.component';

describe('Component: IldaGrid', () => {

  let component: GridComponent;

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [GridComponent]
    })
  );

  beforeEach(inject([GridComponent], (comp) => {
    component = comp;
  }));

  it('should exclude when no search ', () => {

    const array = 'test=';
    const res = component.excludeSortFieldAndFieldNotSearched(array);

    expect(res).toBeFalsy();
  });

  it('should exclude sort', () => {

    const array = 'sort=test';
    const res = component.excludeSortFieldAndFieldNotSearched(array);

    expect(res).toBeFalsy();
  });

  it('should not exclude a search', () => {

    const array = 'toto=test';

    const res = component.excludeSortFieldAndFieldNotSearched(array);
    expect(res).toBeTruthy();
  });

  it('should not display anything', () => {

    const url = 'with_params?code=&designation=&date=&sort=code,asc';

    const res = component.listFieldsFromUrlRecherche(url);
    expect(res).toEqual([]);
  });

  it('should not display anything2', () => {

    const url = 'with_params?code=&designation=&date=&sort=code,asc&page=2&size=5';

    const res = component.listFieldsFromUrlRecherche(url);
    expect(res).toEqual([]);
  });

  it('should display label', () => {

    const url = 'with_params?code=toto&designation=titi&date=&sort=code,asc';

    const res = component.listFieldsFromUrlRecherche(url);
    expect(res).toEqual(['code : toto', 'designation : titi']);
  });

  it('should display anything', () => {

    const url = null;

    const res = component.listFieldsFromUrlRecherche(url);
    expect(res).toEqual([]);
  });

  it('should display anything2', () => {

    const url = '';

    const res = component.listFieldsFromUrlRecherche(url);
    expect(res).toEqual([]);
  });

  it('should emit change page and save current', () => {
    spyOn(component.clickPage, 'emit');
    spyOn(component, 'saveLastValue');

    const event = {target : { value: '1'}};
    component.changePage(event);

    expect(component.clickPage.emit).toHaveBeenCalledWith('1');
    expect(component.saveLastValue).toHaveBeenCalledWith(event);
  });

  it('should emit change entries', () => {
    spyOn(component.clickEntries, 'emit');

    const event = {detail : { value: '10'}};
    component.showEntries(event);

    expect(component.clickEntries.emit).toHaveBeenCalledWith('10');
  });

  it('should restore last value', () => {
    component.currentPage = 1;

    let event = {target : { value: 10}};
    component.restoreLastValue(event);

    expect(event.target.value).toEqual(1);
  });

  it('should save current number page', () => {
    component.totalPages = 10;
    let event = {target : { value: 8}};
    component.saveLastValue(event);

    expect(component.currentPage).toEqual(8);
  });

  it('should save last number page', () => {
    component.totalPages = 10;
    let event = {target : { value: 18}};
    component.saveLastValue(event);

    expect(component.currentPage).toEqual(10);
  });

  it('should save first number page', () => {
    let event = {target : { value: 0}};
    component.saveLastValue(event);

    expect(component.currentPage).toEqual(1);
  });
});
