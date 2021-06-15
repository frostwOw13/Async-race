import { Garage } from './pages/garage/page/garage';
import { Header } from './pages/static/header/header';
import { Winners } from './pages/winners/winners';
import { Api } from './shared/api';
import { MAX_CARS_ON_PAGE, MAX_WINNERS_ON_PAGE, PageIds } from './shared/constants';
import { Listener } from './shared/listener';

export class App {
  private container: HTMLElement = document.body;

  private header: Header;

  private garagePage: Garage;

  private winnersPage: Winners;

  private currentPage: number;

  private listener: Listener;

  constructor() {
    this.header = new Header('header', 'header');
    this.garagePage = new Garage('garage');
    this.winnersPage = new Winners('winners');
    this.listener = new Listener();
    this.currentPage = 1;
  }

  public async init(): Promise<void> {
    this.container.append(this.header.render());
    const { items, count } = await Api.getCars(this.currentPage, MAX_CARS_ON_PAGE);
    if (count) this.container.append(this.garagePage.render(items, count, this.currentPage));
    this.enableRouteChange();
    this.listen();
  }

  private async renderNewPage(idPage: string): Promise<void> {
    this.container.innerHTML = '';
    this.container.append(this.header.render());

    if (idPage === PageIds.GaragePage) {
      const { items, count } = await Api.getCars(this.currentPage, MAX_CARS_ON_PAGE);
      if (count) this.container.append(this.garagePage.render(items, count, this.currentPage));
    } else if (idPage === PageIds.WinnersPage) {
      this.container.append(this.winnersPage.render());
    }
  }

  private async renderNewGarage() {
    const garage = document.getElementById('garage');
    const garageView = document.querySelector('.garage-view');

    garage?.remove();
    const { items, count } = await Api.getCars(this.currentPage, MAX_CARS_ON_PAGE);
    if (count) {
      garageView?.insertAdjacentHTML('beforeend', Garage.renderGarage(items, count, this.currentPage));
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

      if (eventTarget.id === 'create-submit') {
        Listener.createCar();
      }

      if (eventTarget.className === 'btn remove-btn') {
        Listener.removeCar(eventTarget, this.currentPage);
        this.renderNewGarage();
      }

      if (eventTarget.className === 'btn select-btn') {
        Listener.selectCar(eventTarget).then(() => this.renderNewGarage());
      }

      if (eventTarget.className === 'btn-engine start-engine-btn') {
        this.listener.startEngine(eventTarget);
      }

      if (eventTarget.className === 'btn-engine stop-engine-btn') {
        this.listener.stopEngine(eventTarget);
      }

      if (eventTarget.id === 'race') {
        this.listener.raceAllCars(eventTarget, this.currentPage);
      }

      if (eventTarget.id === 'reset') {
        this.listener.stopAllCars(eventTarget, this.currentPage);
      }

      if (eventTarget.id === 'generator') {
        Listener.generateCars(this.currentPage);
        this.renderNewGarage();
      }

      if (eventTarget.id === 'prev') {
        if (this.currentPage > 1) {
          this.currentPage -= 1;
          const { items, count } = await Api.getCars(this.currentPage, MAX_CARS_ON_PAGE);
          if (count) Garage.renderGarage(items, count, this.currentPage);
          this.winnersPage.renderWinners(this.currentPage, MAX_WINNERS_ON_PAGE);
          this.renderNewGarage();
        }
      }

      if (eventTarget.id === 'next') {
        const { items, count } = await Api.getCars(this.currentPage, MAX_CARS_ON_PAGE);
        if (count && Number(count) / (MAX_CARS_ON_PAGE * this.currentPage) > 1) {
          this.currentPage += 1;
          if (items) {
            if (count) Garage.renderGarage(items, count, this.currentPage);
            this.winnersPage.renderWinners(this.currentPage, MAX_WINNERS_ON_PAGE);
            this.renderNewGarage();
          }
        }
      }
    });
  }
}
