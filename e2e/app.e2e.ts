import { IldaPage } from './app.po';

describe('ilda App', function() {
  let page: IldaPage;

  beforeEach(() => {
    page = new IldaPage();
  });

  it('should get text bayonne', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('bayonne');
  });
});
