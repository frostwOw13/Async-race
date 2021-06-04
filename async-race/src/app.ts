import { Garage } from "./pages/garage/garage";
import { Header } from './pages/header/header';
import { Page } from './pages/page';
import { Winners } from './pages/winners/winners';

export const enum PageIds {
  GaragePage  ='garage',
  WinnersPage = 'winners'
}

export class App {
  private static container: HTMLElement = document.body;
  private static defaultPageId: string = 'current-page';
  private header: Header;
  private initialPage: string = 'garage';

  constructor() {
    this.header = new Header('header', 'header');
  }

  static renderNewPage(idPage: string): void {
    const currentPageHTML = document.querySelector(`.${App.defaultPageId}`);

    if (currentPageHTML) {
      currentPageHTML.remove();
    }

    let page: Page | null = null;

    if (idPage === PageIds.GaragePage) {
      page = new Garage(idPage);
    } else if (idPage === PageIds.WinnersPage) {
      page = new Winners(idPage);
    }

    if (page) {
      const pageHTML = page.render();
      pageHTML.className = App.defaultPageId;
      App.container.append(pageHTML);
    }
  }

  private enableRouteChange() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      App.renderNewPage(hash);
    })
  }

  public run() {
    App.container.append(this.header.render());
    App.renderNewPage(this.initialPage);
    this.enableRouteChange();
  }
}
