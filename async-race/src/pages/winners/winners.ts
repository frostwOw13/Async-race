import { getWinners } from '../../shared/api';
import { BodyCar, Winner } from '../../shared/constants';
import { Garage } from '../garage/page/garage';
import './winners.scss';

export class Winners {
  private container: HTMLElement;
  private garage: Garage;

  constructor(className: string) {
    this.container = document.createElement('div');
    this.container.className = className;
    this.garage = new Garage('garage');
  }

  private async renderWinners(page: number = 1, limit: number = 10): Promise<void> {
    const { items, count } = await getWinners({ page, limit });

    const winnersHTML = `
      <h1>Winners (${count})</h1>
      <h2>Page #${page}</h2>
      <table class='table' cellspacing='0' border='0' cellpadding='0'>
        <thead>
          <th>Number</th>
          <th>Car</th>
          <th>Name</th>
          <th>Wins</th>
          <th>Best time (seconds)</th>
        </thead>
        <tbody>
          ${items.map((winner, index) => `
            <tr>
              <td>${index + 1}</td>
              <td>${this.garage.renderCarImage(winner.car.color)}</td>
              <td>${winner.car.name}</td>
              <td>${winner.wins}</td>
              <td>${winner.time}</td>
            </tr>
            `).join('')}
        </tbody>
      </table>
    `;
    this.container.innerHTML = winnersHTML;
  }

  public render(): HTMLElement {
    this.renderWinners();
    return this.container;
  }
}
