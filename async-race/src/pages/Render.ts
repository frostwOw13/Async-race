import { MAX_WINNERS_ON_PAGE } from '../shared/constants';
import { CarModel } from '../shared/interfaces';
import { Garage } from './garage/page/garage';
import { Winners } from './winners/winners';

export class Render {
  private winners: Winners;

  constructor() {
    this.winners = new Winners('winners');
  }

  static garagePage(cars: CarModel[], count: string, page: number): HTMLElement {
    const html = `
      <div class='garage-view'>
        <div class='garage-forms'>
          <form class='form' id='create'>
            <input class='input' id='create-name' name='name' type='text'>
            <input class='color' id='create-color' name='color' type='color' value='#FFFFFF'>
            <button class='btn' id='create-submit'>Create</button>
          </form>
          <form class='form' id='update'>
            <input disabled class='input' id='update-name' name='name' type='text'>
            <input disabled class='color' id='update-color' name='color' type='color' value='#FFFFFF'>
            <button disabled class='btn' id='update-submit' href='#'>Update</button>
          </form>
        </div>
        <div class='race-control'>
          <button class='btn race-button' id='race'>Race</button>
          <button class='btn reset-button' id='reset'>Reset</button>
          <button class='btn generator-button' id='generator'>Generate cars</button>
        </div>
        ${Garage.renderGarage(cars, count, page)}
      </div>
      <div class='pagination'>
        <button class='btn garage-btn' id='prev'>Previous</button>
        <button class='btn garage-btn' id='next'>Next</button>
      </div>
    `;
    const garagePageHTML = document.createElement('div');
    garagePageHTML.className = 'garage';
    garagePageHTML.innerHTML = html;
    return garagePageHTML;
  }

  public async winnersPage(): Promise<HTMLElement> {
    const winnersPageHTML = await this.winners.renderWinners(1, MAX_WINNERS_ON_PAGE);
    return winnersPageHTML;
  }
}
