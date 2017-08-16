import { PROJECTNAMEPage } from './app.po';

describe('project-name App', () => {
  let page: PROJECTNAMEPage;

  beforeEach(() => {
    page = new PROJECTNAMEPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
