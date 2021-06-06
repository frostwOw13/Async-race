import { Car } from './pages/garage/car';
import { Garage } from "./pages/garage/page/garage";
import { Header } from './pages/header/header';
import { Winners } from './pages/winners/winners';
import { PageIds } from './shared/constants';
import { getCar, getCars } from './shared/api';
import { Animation } from './components/animation';
import { RenderCar } from './shared/constants';

export class App {
  private container: HTMLElement = document.body;
  private header: Header;
  private initialPage: string = 'garage';
  private car: Car;
  private garagePage: Garage;
  private winnersPage: Winners;
  private animation: Animation;

  constructor() {
    this.header = new Header('header', 'header');
    this.garagePage = new Garage('garage');
    this.winnersPage = new Winners('winners');
    this.car = new Car();
    this.animation = new Animation();
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
        eventTarget.disabled = true;
        const stopButton = <HTMLInputElement>document.querySelector('.stop-engine-btn')
        stopButton.disabled = false;
        const id = eventTarget.id.split('-')[3];
        const time = await this.car.start(id);
        const car = document.getElementById(`car-${id}`);
        const flag = document.getElementById(`finish-${id}`);

        if (car && flag) {
          this.animation.startAnimation(car, time, id, flag);
        }
      }

      if (eventTarget.className === 'stop-engine-btn') {
        eventTarget.disabled = true;
        const startButton = <HTMLInputElement>document.querySelector('.start-engine-btn')
        startButton.disabled = false;
        const id = eventTarget.id.split('-')[3];
        this.car.stop(id);
        const car = document.getElementById(`car-${id}`);
        if (car) {
          car.style.transform = `translateX(0)`;
        }
        if (this.animation.animation) window.cancelAnimationFrame(this.animation.animation);
      }

      if (eventTarget.id === 'race') {
        eventTarget.disabled = true;
        const resetButton = <HTMLButtonElement>document.getElementById('reset');
        resetButton.disabled = false;
        const { items } = await getCars(1, 7);
        items.forEach(async (car: RenderCar) => {
          const carHTML = document.getElementById(`car-${car.id}`);
          const flagHTML = document.getElementById(`finish-${car.id}`);
          const time = await this.car.start(car.id.toString());

          if (carHTML && flagHTML) {
            this.animation.startAnimation(carHTML, time, car.id.toString(), flagHTML);
          }
        });
      }

      if (eventTarget.id === 'reset') {
        eventTarget.disabled = true;
        const raceButton = <HTMLButtonElement>document.getElementById('race');
        raceButton.disabled = false;

        const { items } = await getCars(1, 7);
        items.forEach((car: RenderCar) => {
          this.car.stop(car.id.toString());
          const carHTML = document.getElementById(`car-${car.id}`)
          if (carHTML) carHTML.style.transform = `translateX(0)`;
          if (this.animation.animation) window.cancelAnimationFrame(this.animation.animation)
        });
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
