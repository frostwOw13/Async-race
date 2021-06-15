import { Garage } from '../garage/page/garage';
import { Api } from '../../shared/api';
import { MAX_WINNERS_ON_PAGE } from '../../shared/constants';
import './winners.scss';

export class Winners {
  private container: HTMLElement;

  constructor(className: string) {
    this.container = document.createElement('div');
    this.container.className = className;
  }

  public async renderWinners(page: number, limit: number): Promise<void> {
    const { items, count } = await Api.getWinners({ page, limit });

    const winnersHTML = `
      <h1 class='winners-title'>Winners (${count})</h1>
      <h2 class='winners-title'>Page #${page}</h2>
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
              <td>${`${page === 1 ? '' : page - 1}${index + 1}`}</td>
              <td>${Garage.renderCarImage(winner.car.color)}</td>
              <td>${winner.car.name}</td>
              <td>${winner.wins}</td>
              <td>${winner.time}</td>
            </tr>
            `).join('')}
        </tbody>
      </table>
      <div class='pagination'>
        <button class='btn winners-btn' id='prev'>Previous</button>
        <button class='btn winners-btn' id='next'>Next</button>
      </div>
    `;
    this.container.innerHTML = winnersHTML;
  }

  public render(): HTMLElement {
    this.renderWinners(1, MAX_WINNERS_ON_PAGE);
    return this.container;
  }
}
