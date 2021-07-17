import { Render } from './pages/render';
import { Header } from './pages/static/header/header';
import { Winners } from './pages/winners/winners';
import { Api } from './shared/api';
import { MAX_CARS_ON_PAGE, MAX_WINNERS_ON_PAGE, PageIds } from './shared/constants';
import { Listener } from './shared/listener';

export class App {
  private container: HTMLElement = document.body;

  private render: Render;

  private header: Header;

  private winnersPage: Winners;

  private currentPage: number;

  private listener: Listener;

  constructor() {
    this.render = new Render();
    this.header = new Header('header', 'header');
    this.winnersPage = new Winners('winners');
    this.listener = new Listener();
    this.currentPage = 1;
  }

  public async init(): Promise<void> {
    this.container.append(this.header.render());
    const { items, count } = await Api.getCars(this.currentPage, MAX_CARS_ON_PAGE);
    if (count) this.container.append(Render.garagePage(items, count, this.currentPage));
    this.enableRouteChange();
    this.listen();
  }

  private async renderNewPage(idPage: string): Promise<void> {
    this.container.innerHTML = '';
    this.container.append(this.header.render());

    if (idPage === PageIds.GaragePage) {
      const { items, count } = await Api.getCars(this.currentPage, MAX_CARS_ON_PAGE);
      if (count) this.container.append(Render.garagePage(items, count, this.currentPage));
    } else if (idPage === PageIds.WinnersPage) {
      this.container.append(await this.render.winnersPage());
    }
  }

  private async renderNewGarage() {
    const garage = document.getElementById('garage');
    const garageView = document.querySelector('.garage-view');

    garage?.remove();
    const { items, count } = await Api.getCars(this.currentPage, MAX_CARS_ON_PAGE);
    if (count) {
      garageView?.insertAdjacentHTML('beforeend', Render.garageContainer(items, count, this.currentPage));
    }
  }

  private enableRouteChange() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      this.currentPage = 1;
      this.renderNewPage(hash);
    });
  }

  private listen() {
    window.addEventListener('click', async (event) => {
      const eventTarget = <HTMLButtonElement>event.target;

      switch (eventTarget.id) {
        case 'create-submit':
          Listener.createCar();
          break;

        case 'race':
          this.listener.raceAllCars(eventTarget, this.currentPage);
          break;

        case 'reset':
          this.listener.stopAllCars(eventTarget, this.currentPage);
          break;

        case 'generator':
          Listener.generateCars(this.currentPage);
          this.renderNewGarage();
          break;

        case 'prev':
          if (this.currentPage > 1) {
            this.currentPage -= 1;
            const { items, count } = await Api.getCars(this.currentPage, MAX_CARS_ON_PAGE);
            if (count) Render.garageContainer(items, count, this.currentPage);
            this.winnersPage.renderWinners(this.currentPage, MAX_WINNERS_ON_PAGE);
            this.renderNewGarage();
          }
          break;

        case 'next': {
          const { items, count } = await Api.getCars(this.currentPage, MAX_CARS_ON_PAGE);

          if (count && Number(count) / (MAX_CARS_ON_PAGE * this.currentPage) > 1) {
            this.currentPage += 1;
            if (items) {
              if (count) Render.garageContainer(items, count, this.currentPage);
              this.winnersPage.renderWinners(this.currentPage, MAX_WINNERS_ON_PAGE);
              this.renderNewGarage();
            }
          }
          break;
        }

        default:
          break;
      }
    });

    window.addEventListener('click', async (event) => {
      const eventTarget = <HTMLButtonElement>event.target;

      switch (eventTarget.className) {
        case 'btn remove-btn':
          Listener.removeCar(eventTarget, this.currentPage);
          this.renderNewGarage();
          break;

        case 'btn select-btn':
          Listener.selectCar(eventTarget).then(() => this.renderNewGarage());
          break;

        case 'btn-engine start-engine-btn':
          this.listener.startEngine(eventTarget);
          break;

        case 'btn-engine stop-engine-btn':
          this.listener.stopEngine(eventTarget);
          break;

        default:
          break;
      }
    });
  }
}
