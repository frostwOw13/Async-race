import { Car } from './pages/garage/car';
import { Garage } from "./pages/garage/page/garage";
import { Header } from './pages/header/header';
import { Winners } from './pages/winners/winners';
import { BodyCar, PageIds } from './shared/constants';
import { createCar, deleteCar, deleteWinner, getCar, getCars } from './shared/api';

export class App {
  private container: HTMLElement = document.body;
  private header: Header;
  private initialPage: string = 'garage';
  private car: Car;
  private garagePage: Garage;
  private winnersPage: Winners;

  constructor() {
    this.header = new Header('header', 'header');
    this.garagePage = new Garage('garage');
    this.winnersPage = new Winners('winners');
    this.car = new Car();
  }

  public async renderNewPage(idPage: string): Promise<void> {
    this.container.innerHTML = '';
    this.container.append(this.header.render());

    if (idPage === PageIds.GaragePage) {
      const { items, count } = await getCars(1, 7);
      this.container.append(this.garagePage.render(items, count ? count : ''));
    } else if (idPage === PageIds.WinnersPage) {
      this.container.append(this.winnersPage.render());
    }
  }

  private enableRouteChange() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      this.renderNewPage(hash);
    })
  }

  private listener() {
    window.addEventListener('click', async (event) => {
      const eventTarget = (<HTMLButtonElement>event.target);

      if (eventTarget.id === 'create-submit') {
        const createName = <HTMLInputElement>document.getElementById('create-name');
        const createColor = <HTMLInputElement>document.getElementById('create-color');
        const name = createName.value;
        const color = createColor.value;
        if (name && color) this.car.addCar(name, color);
      }

      if (eventTarget.className === 'btn remove-btn') {
        const id = eventTarget.id.split('-')[2];
        this.car.deleteCar(id);
        const { items, count } = await getCars(1, 7);
        this.garagePage.renderGarage(items, count ? count : '');
        this.renderNewPage('garage');
      }

      if (eventTarget.className === 'btn select-btn') {
        const updateName = <HTMLInputElement>document.getElementById('update-name');
        const updateColor = <HTMLInputElement>document.getElementById('update-color');
        const updateSubmit = <HTMLButtonElement>document.getElementById('update-submit');
        updateName.disabled = false;
        updateColor.disabled = false;
        updateSubmit.disabled = false;
        const id = eventTarget.id.split('-')[2];
        this.updateCarListener(id);
      }

      if (eventTarget.className === 'start-engine-btn') {
        const id = eventTarget.id.split('-')[3];
        const time = await this.car.start(id);
        const car = document.getElementById(`car-${id}`);
        const width = document.querySelector('.road')?.clientWidth;

        if (car && width) {
          car.style.transition = `linear ${time}s`
          car.style.transform = `translateX(${width - 60}px)`;
        }
      }

      if (eventTarget.className === 'stop-engine-btn') {
        const id = eventTarget.id.split('-')[3];
        this.car.stop(id);
        const car = document.getElementById(`car-${id}`);
        if (car) {
          car.style.transition = `0s`
          car.style.transform = `translateX(0)`;
        }
      }
    });
  }

  private updateCarListener(id: string) {
    const form = document.getElementById('update');
    form?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const updateName = <HTMLInputElement>document.getElementById('update-name');
      const updateColor = <HTMLInputElement>document.getElementById('update-color');
      let currentCar = await getCar(id);

      let car = {
        name: updateName.value ? updateName.value : currentCar.name,
        color: updateColor.value
      }
      this.car.updateCar(id, car);

      const { items, count } = await getCars(1, 7);
      this.garagePage.renderGarage(items, count ? count : '');
      this.renderNewPage('garage');
    })
  }

  public run() {
    this.renderNewPage(this.initialPage);
    this.enableRouteChange();
    this.listener();
  }
}
