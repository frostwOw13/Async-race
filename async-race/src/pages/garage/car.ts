import { createCar, deleteCar, deleteWinner, startEngine, stopEngine, updateCar } from '../../shared/api';
import { BodyCar } from '../../shared/constants';
import { Message } from './message/message';

export class Car {
  public async addCar(name: string, color: string) {
    await createCar({ name, color });
  }

  public async updateCar(id: string, body: BodyCar) {
    await updateCar(id, body);
  }

  public async deleteCar(id: string) {
    await deleteCar(id);
    await deleteWinner(id);
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
