import { Animation } from '../components/animation';
import { Car } from '../pages/garage/car';
import { Garage } from '../pages/garage/page/garage';
import { RenderCar } from './interfaces';
import { Api } from './api';
import {
  carBrands,
  carModels,
  randomColor,
  MAX_CARS_ON_PAGE,
  AMOUNT_OF_CARS_FROM_GENERATOR,
} from './constants';

export class Listener {
  private animation: Animation;

  constructor() {
    this.animation = new Animation();
  }

  static updateCarListener(id: string): Promise<void> {
    return new Promise((resolve) => {
      const form = document.getElementById('update');
      form?.addEventListener('submit', async (event) => {
        event.preventDefault();
        const updateName = <HTMLInputElement>(document.getElementById('update-name'));
        const updateColor = <HTMLInputElement>(document.getElementById('update-color'));
        const currentCar = await Api.getCar(id);

        const car = {
          name: updateName.value ? updateName.value : currentCar.name,
          color: updateColor.value,
        };
        resolve(Car.updateCar(id, car));
      });
    });
  }

  static createCar(): void {
    const createName = <HTMLInputElement>(document.getElementById('create-name'));
    const createColor = <HTMLInputElement>(document.getElementById('create-color'));
    const name = createName.value;
    const color = createColor.value;
    if (name && color) Car.addCar(name, color);
  }

  static async removeCar(element: HTMLElement, currentPage: number): Promise<void> {
    const id = element.id.split('-')[2];
    Car.deleteCar(id);
    const { items, count } = await Api.getCars(currentPage, MAX_CARS_ON_PAGE);
    if (count) Garage.renderGarage(items, count, currentPage);
  }

  static selectCar(element: HTMLElement): Promise<void> {
    return new Promise((resolve) => {
      const updateName = <HTMLInputElement>(document.getElementById('update-name'));
      const updateColor = <HTMLInputElement>(document.getElementById('update-color'));
      const updateSubmit = <HTMLButtonElement>(document.getElementById('update-submit'));
      updateName.disabled = false;
      updateColor.disabled = false;
      updateSubmit.disabled = false;
      const id = element.id.split('-')[2];
      resolve(Listener.updateCarListener(id).then(() => {
        updateName.value = '';
        updateColor.value = '#ffffff';
        updateName.disabled = true;
        updateColor.disabled = true;
        updateSubmit.disabled = true;
      }));
    });
  }

  public async startEngine(startButton: HTMLButtonElement): Promise<void> {
    const id = startButton.id.split('-')[3];
    const stopButton = <HTMLInputElement>(document.getElementById(`stop-engine-car-${id}`));
    const time = await Car.start(id);
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

    Car.stop(id);
    if (car) car.style.transform = 'translateX(0)';
    if (this.animation.animation) window.cancelAnimationFrame(this.animation.animation);
  }

  public async raceAllCars(raceButton: HTMLButtonElement, currentPage: number): Promise<void> {
    const resetButton = <HTMLButtonElement>document.getElementById('reset');
    let winner: { [key: string]: unknown } | undefined;
    let firstWinner = false;
    raceButton.disabled = true;
    resetButton.disabled = false;

    const { items } = await Api.getCars(currentPage, MAX_CARS_ON_PAGE);
    items.forEach(async (car: RenderCar) => {
      const carHTML = document.getElementById(`car-${car.id}`);
      const flagHTML = document.getElementById(`finish-${car.id}`);
      const timeWinner = await Car.start(car.id.toString());

      if (carHTML && flagHTML) {
        winner = await this.animation.startAnimation(carHTML, timeWinner, car.id.toString(), flagHTML);
        if (winner?.success) {
          if (!firstWinner) {
            firstWinner = true;
            const carWinner = await Api.getCar(String(winner.id));
            Car.messageWinner(carWinner, Number(winner.animationTime));

            const id = Number(winner.id);
            const time = Number((Number(winner.animationTime) / 1000).toFixed(2));
            Api.saveWinner({ id, time });
          }
        }
      }
    });
  }

  public async stopAllCars(resetButton: HTMLButtonElement, currentPage: number): Promise<void> {
    const raceButton = <HTMLButtonElement>document.getElementById('race');
    const winnerMessage = document.querySelector('.winner');
    winnerMessage?.remove();
    resetButton.disabled = true;
    raceButton.disabled = false;

    const { items } = await Api.getCars(currentPage, MAX_CARS_ON_PAGE);
    items.forEach((car: RenderCar) => {
      const carHTML = document.getElementById(`car-${car.id}`);

      Car.stop(car.id.toString());
      if (carHTML) carHTML.style.transform = 'translateX(0)';
      if (this.animation.animation) window.cancelAnimationFrame(this.animation.animation);
    });
  }

  static async generateCars(currentPage: number): Promise<void> {
    let countCars = 0;

    while (countCars < AMOUNT_OF_CARS_FROM_GENERATOR) {
      countCars++;
      const carBrand = carBrands[Math.floor(Math.random() * carBrands.length)];
      const carModel = carModels[Math.floor(Math.random() * carModels.length)];
      const name = `${carBrand} ${carModel}`;
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += randomColor.split('')[Math.floor(Math.random() * randomColor.length)];
      }

      if (name && color) Car.addCar(name, color);
    }
    const { items, count } = await Api.getCars(currentPage, MAX_CARS_ON_PAGE);
    if (count) Garage.renderGarage(items, count, currentPage);
  }
}
