import { Animation } from '../components/animation';
import { Car } from '../pages/garage/car';
import { Garage } from '../pages/garage/page/garage';
import { getCar, getCars } from './api';
import { carBrands, carModels, randomColor, MAX_CARS_ON_PAGE, RenderCar } from './constants';

export class Listener {
  private car: Car;
  private garagePage: Garage;
  private animation: Animation;

  constructor() {
    this.car = new Car();
    this.garagePage = new Garage('garage');
    this.animation = new Animation;
  }

  private updateCarListener(id: string): Promise<void> {
    return new Promise((resolve) => {
      const form = document.getElementById('update');
      form?.addEventListener('submit', async (event) => {
        event.preventDefault();
        const updateName = <HTMLInputElement>(document.getElementById('update-name'));
        const updateColor = <HTMLInputElement>(document.getElementById('update-color'));
        let currentCar = await getCar(id);

        let car = {
          name: updateName.value ? updateName.value : currentCar.name,
          color: updateColor.value,
        };
        resolve(this.car.updateCar(id, car));
      });
    });
  }

  public createCar(): void {
    const createName = <HTMLInputElement>(document.getElementById('create-name'));
    const createColor = <HTMLInputElement>(document.getElementById('create-color'));
    const name = createName.value;
    const color = createColor.value;
    if (name && color) this.car.addCar(name, color);
  }

  public async removeCar(element: HTMLElement, currentPage: number): Promise<void> {
    const id = element.id.split('-')[2];
    this.car.deleteCar(id);
    const { items, count } = await getCars(currentPage, MAX_CARS_ON_PAGE);
    if (count) this.garagePage.renderGarage(items, count, currentPage);
  }

  public selectCar(element: HTMLElement): Promise<void> {
    return new Promise((resolve) => {
      const updateName = <HTMLInputElement>(document.getElementById('update-name'));
      const updateColor = <HTMLInputElement>(document.getElementById('update-color'));
      const updateSubmit = <HTMLButtonElement>(document.getElementById('update-submit'));
      updateName.disabled = false;
      updateColor.disabled = false;
      updateSubmit.disabled = false;
      const id = element.id.split('-')[2];
      resolve(this.updateCarListener(id).then(() => {
        updateName.value = '';
        updateColor.value = '#ffffff';
        updateName.disabled = true;
        updateColor.disabled = true;
        updateSubmit.disabled = true;
      }));
    })
  }

  public async startEngine(startButton: HTMLButtonElement): Promise<void> {
    const id = startButton.id.split('-')[3];
    const stopButton = <HTMLInputElement>(document.getElementById(`stop-engine-car-${id}`));
    const time = await this.car.start(id);
    const car = document.getElementById(`car-${id}`);
    const flag = document.getElementById(`finish-${id}`);

    startButton.disabled = true;
    stopButton.disabled = false;

    if (car && flag) this.animation.startAnimation(car, time, id, flag);
  }

  public async stopEngine(stopButton: HTMLButtonElement): Promise<void> {
    const id = stopButton.id.split('-')[3];
    const startButton = <HTMLInputElement>(document.getElementById(`start-engine-car-${id}`));
    const car = document.getElementById(`car-${id}`);

    stopButton.disabled = true;
    startButton.disabled = false;

    this.car.stop(id);
    if (car) car.style.transform = `translateX(0)`;
    if (this.animation.animation) window.cancelAnimationFrame(this.animation.animation);
  }

  public async raceAllCars(raceButton: HTMLButtonElement, currentPage: number): Promise<void> {
    const resetButton = <HTMLButtonElement>document.getElementById('reset');
    raceButton.disabled = true;
    resetButton.disabled = false;

    const { items } = await getCars(currentPage, MAX_CARS_ON_PAGE);
    items.forEach(async (car: RenderCar) => {
      const carHTML = document.getElementById(`car-${car.id}`);
      const flagHTML = document.getElementById(`finish-${car.id}`);
      const time = await this.car.start(car.id.toString());

      if (carHTML && flagHTML) {
        this.animation.startAnimation(carHTML, time, car.id.toString(), flagHTML);
      }
    });
  }

  public async stopAllCars(resetButton: HTMLButtonElement, currentPage: number): Promise<void> {
    const raceButton = <HTMLButtonElement>document.getElementById('race');
    resetButton.disabled = true;
    raceButton.disabled = false;

    const { items } = await getCars(currentPage, MAX_CARS_ON_PAGE);
    items.forEach((car: RenderCar) => {
      const carHTML = document.getElementById(`car-${car.id}`);

      this.car.stop(car.id.toString());
      if (carHTML) carHTML.style.transform = `translateX(0)`;
      if (this.animation.animation) window.cancelAnimationFrame(this.animation.animation);
    });
  }

  public async generateCars(currentPage: number): Promise<void> {
    let countCars = 0;

    while (countCars < 100) {
      countCars++;
      const carBrand = carBrands[Math.round(Math.random() * carBrands.length)];
      const carModel = carModels[Math.round(Math.random() * carModels.length)];
      const name = `${carBrand} ${carModel}`;
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += randomColor.split('')[Math.round(Math.random() * 16)];
      }

      if (name && color) this.car.addCar(name, color);
    }
    const { items, count } = await getCars(currentPage, MAX_CARS_ON_PAGE);
    if (count) this.garagePage.renderGarage(items, count, currentPage);
  }

  public async prevPage(currentPage: number): Promise<void> {
    if (currentPage > 1) {
      currentPage -= 1;
      const { items, count } = await getCars(currentPage, MAX_CARS_ON_PAGE);
      if (count) this.garagePage.renderGarage(items, count, currentPage);
    }
  }
}
