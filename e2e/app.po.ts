export class IldaPage {
  navigateTo() {
    return browser.get('/#pays');
  }

  getParagraphText() {
    return element(by.id('test')).getText();
  }
}
