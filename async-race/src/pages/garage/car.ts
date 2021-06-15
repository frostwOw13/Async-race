import { BodyCar } from '../../shared/interfaces';
import { Message } from './message/message';
import { Api } from '../../shared/api';

export class Car {
  private api: Api;

  constructor() {
    this.api = new Api();
  }

  static async addCar(name: string, color: string): Promise<void> {
    await Api.createCar({ name, color });
  }

  static async updateCar(id: string, body: BodyCar): Promise<void> {
    await Api.updateCar(id, body);
  }

  static async deleteCar(id: string): Promise<void> {
    await Api.deleteCar(id);
    await Api.deleteWinner(id);
  }

  static async start(id: string): Promise<number> {
    const params = await Api.startEngine(id);
    const time = Math.round(params.distance / params.velocity);
    return time;
  }

  static async stop(id: string): Promise<void> {
    await Api.stopEngine(id);
  }

  static async messageWinner(car: BodyCar, time: number): Promise<void> {
    const message = new Message('winner');
    message.render(car.name, time);
  }
}
