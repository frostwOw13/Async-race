import { Car } from './pages/garage/car';
import { Garage } from './pages/garage/page/garage';
import { Header } from './pages/static/header/header';
import { Winners } from './pages/winners/winners';
import { MAX_CARS_ON_PAGE, PageIds } from './shared/constants';
import { getCar, getCars } from './shared/api';
import { Animation } from './components/animation';
import { RenderCar } from './shared/constants';
import { Pagination } from './pages/static/pagination';
import { Listener } from './shared/listener';

export class App {
  private container: HTMLElement = document.body;
  private header: Header;
  private car: Car;
  private garagePage: Garage;
  private winnersPage: Winners;
  private animation: Animation;
  private currentPage: number;
  private pagination: Pagination;
  private listener: Listener;

  constructor() {
    this.header = new Header('header', 'header');
    this.garagePage = new Garage('garage');
    this.winnersPage = new Winners('winners');
    this.pagination = new Pagination('div', 'page-buttons');
    this.listener = new Listener();
    this.car = new Car();
    this.animation = new Animation();
    this.currentPage = 1;
  }

  public async init() {
    this.container.append(this.header.render());
    const { items, count } = await getCars(this.currentPage, MAX_CARS_ON_PAGE);
    this.container.append(this.garagePage.render(items, count ? count : '', this.currentPage));
    this.container.append(this.pagination.render());
    this.enableRouteChange();
    this.listen();
  }

  private async renderNewPage(idPage: string): Promise<void> {
    this.container.innerHTML = '';
    this.container.append(this.header.render());

    if (idPage === PageIds.GaragePage) {
      const { items, count } = await getCars(this.currentPage, MAX_CARS_ON_PAGE);
      this.container.append(this.garagePage.render(items, count ? count : '', this.currentPage));
    } else if (idPage === PageIds.WinnersPage) {
      this.container.append(this.winnersPage.render());
    }
    this.container.append(this.pagination.render());
  }

  private async renderNewGarage() {
    const garage = document.getElementById('garage');
    const garageView = document.querySelector('.garage-view');

    garage?.remove();
    const { items, count } = await getCars(this.currentPage, MAX_CARS_ON_PAGE);
    if (count) {
      garageView?.insertAdjacentHTML('beforeend', this.garagePage.renderGarage(items, count, this.currentPage));
    }
  }

  private enableRouteChange() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      this.renderNewPage(hash);
    });
  }

  private listen() {
    window.addEventListener('click', async (event) => {
      const eventTarget = <HTMLButtonElement>event.target;

      if (eventTarget.id === 'create-submit') {
        this.listener.createCar();
      }

      if (eventTarget.className === 'btn remove-btn') {
        this.listener.removeCar(eventTarget, this.currentPage);
        this.renderNewGarage();
      }

      if (eventTarget.className === 'btn select-btn') {
        this.listener.selectCar(eventTarget).then(() => this.renderNewGarage());
      }

      if (eventTarget.className === 'start-engine-btn') {
        this.listener.startEngine(eventTarget);
      }

      if (eventTarget.className === 'stop-engine-btn') {
        this.listener.stopEngine(eventTarget);
      }

      if (eventTarget.id === 'race') {
        this.listener.raceAllCars(eventTarget, this.currentPage);
      }

      if (eventTarget.id === 'reset') {
        this.listener.stopAllCars(eventTarget, this.currentPage)
      }

      if (eventTarget.id === 'generator') {
        this.listener.generateCars(this.currentPage);
        this.renderNewGarage();
      }

      if (eventTarget.id === 'prev') {
        if (this.currentPage > 1) {
          this.currentPage -= 1;
          const { items, count } = await getCars(this.currentPage, MAX_CARS_ON_PAGE);
          this.garagePage.renderGarage(items, count ? count : '', this.currentPage);
          this.renderNewGarage();
        }
      }

      if (eventTarget.id === 'next') {
        const { items, count } = await getCars(this.currentPage, MAX_CARS_ON_PAGE);
        if (count && Number(count) / (MAX_CARS_ON_PAGE * this.currentPage) > 1) {
          this.currentPage += 1;
          if (items) {
            this.garagePage.renderGarage(items, count ? count : '', this.currentPage);
            this.renderNewGarage();
          }
        }
      }
    });
  }
}
