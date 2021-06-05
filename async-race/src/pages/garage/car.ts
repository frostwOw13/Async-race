import { createCar, deleteCar, deleteWinner, drive, getCar, startEngine, stopEngine } from '../../shared/api';
import { BodyCar } from '../../shared/constants';

export class Car {
  constructor() {

  }

  public async addCar(name: string, color: string) {
    const newCar = await createCar({ name: 'lada vesta', color: 'green' });
    console.log(newCar);
  }

  public async updateCar(id: string, body: BodyCar) {
    const updateCar = await this.updateCar(id, body);
    console.log(updateCar);
  }
}
