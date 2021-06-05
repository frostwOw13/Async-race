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
    window.addEventListener('click', (event) => {
      const eventTarget = (<HTMLButtonElement>event.target);
      if (eventTarget.id === 'create-submit') {
        const createName = <HTMLInputElement>document.getElementById('create-name');
        const createColor = <HTMLInputElement>document.getElementById('create-color');
        const createSubmit = <HTMLButtonElement>document.getElementById('create-submit');
        const name = createName.value;
        const color = createColor.value;
        createName.disabled = false;
        createColor.disabled = false;
        createSubmit.disabled = false;
        this.car.addCar(name, color);
      }

      if (eventTarget.id === 'update-submit') {
        const updateName = <HTMLInputElement>document.getElementById('update-name');
        const updateColor = <HTMLInputElement>document.getElementById('update-color');
        const updateSubmit = <HTMLButtonElement>document.getElementById('update-submit');
        let car = {
          name: updateName.value,
          color: updateColor.value
        }
        updateName.disabled = false;
        updateColor.disabled = false;
        updateSubmit.disabled = false;
        // this.car.updateCar(id, car)
      }
    })
  }

  public run() {
    this.renderNewPage(this.initialPage);
    this.enableRouteChange();
    this.listener();
  }
}
