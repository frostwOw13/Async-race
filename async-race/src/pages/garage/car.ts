import { createCar, deleteCar, startEngine, stopEngine, updateCar } from '../../shared/api';
import { BodyCar } from '../../shared/constants';
import './car.scss'
import { Message } from './message/message';

export class Car {
  public async addCar(name: string, color: string) {
    const newCar = await createCar({ name, color });
  }

  public async updateCar(id: string, body: BodyCar) {
    const updatedCar = await updateCar(id, body);
    console.log(updatedCar);
  }

  public async deleteCar(id: string) {
    const deletedCar = await deleteCar(id);
  }

  public async start(id: string) {
    const params = await startEngine(id);
    const time = Math.round(params.distance / params.velocity);
    return time;
  }

  public async stop(id: string) {
    await stopEngine(id);
  }

  public async messageWinner(car: BodyCar, time: number) {
    const message = new Message('winner');
    message.render(car.name, time);
  }
}
