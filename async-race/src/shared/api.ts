import {
  Winner,
  GetWinnersReturn,
  SaveWinners,
  GetWinners,
  GetCarsReturn,
  BodyCar,
  CarSpeed,
  WinnerInfo,
} from './interfaces';

import { garage, winners, engine } from './constants';

export class Api {
  static async getWinners({
    page,
    limit = 10,
  }: GetWinners): Promise<GetWinnersReturn> {
    const response = await fetch(`${winners}?_page=${page}&_limit=${limit}&_sort=time`);
    const items = await response.json();

    return {
      items: await Promise.all<Winner>(items.map(async (winner: Winner) => ({ ...winner, car: await Api.getCar(String(winner.id)) }))),
      count: response.headers.get('X-Total-Count'),
    };
  }

  static async getCars(page: number, limit: number): Promise<GetCarsReturn> {
    const response = await fetch(`${garage}?_page=${page}&_limit=${limit}`);

    return {
      items: await response.json(),
      count: response.headers.get('X-Total-Count'),
    };
  }

  static async getCar(id: string): Promise<BodyCar> {
    const car = await (await fetch(`${garage}/${id}`)).json();
    return car;
  }

  static async createCar(body: { [key: string]: unknown }): Promise<void> {
    return (await fetch(garage, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })).json();
  }

  static async deleteCar(id: string): Promise<void> {
    (await fetch(`${garage}/${id}`, { method: 'DELETE' })).json();
  }

  static async updateCar(id: string, body: BodyCar): Promise<void> {
    (await fetch(`${garage}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })).json();
  }

  static async startEngine(id: string): Promise<CarSpeed> {
    return (await fetch(`${engine}?id=${id}&status=started`)).json();
  }

  static async stopEngine(id: string): Promise<void> {
    (await fetch(`${engine}?id=${id}&status=stopped`)).json();
  }

  static async drive(id: string): Promise<{ [key: string]: boolean }> {
    const res = await fetch(`${engine}?id=${id}&status=drive`).catch();
    return res.status !== 200 ? { success: false } : { ...(await res.json()) };
  }

  static async getWinner(id: number): Promise<WinnerInfo> {
    return (await fetch(`${winners}/${id}`)).json();
  }

  static async deleteWinner(id: string): Promise<void> {
    (await fetch(`${winners}/${id}`, { method: 'DELETE' })).json();
  }

  static async saveWinner({ id, time }: SaveWinners): Promise<void> {
    const winnerStatus = await Api.getWinnersStatus(id);

    if (winnerStatus === 404) {
      await Api.createWinner({
        id,
        wins: 1,
        time,
      });
    } else {
      const winner = await Api.getWinner(id);
      await Api.updateWinner(id, {
        id,
        wins: winner.wins + 1,
        time: time < winner.time ? time : winner.time,
      });
    }
  }

  static async getWinnersStatus(id: number): Promise<number> {
    return (await fetch(`${winners}/${id}`)).status;
  }

  static async createWinner(body: { [key: string]: unknown }): Promise<void> {
    (await fetch(winners, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })).json();
  }

  static async updateWinner(id: number, body: { [key: string]: unknown }): Promise<void> {
    (await fetch(`${winners}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })).json();
  }
}
