import { MAX_WINNERS_ON_PAGE } from '../shared/constants';
import { CarModel } from '../shared/interfaces';
import { Garage } from './garage/page/garage';
import { Winners } from './winners/winners';

export class Render {
  private winners: Winners;

  constructor() {
    this.winners = new Winners('winners');
  }

  static garageCar({
    id,
    name,
    color,
    isEngineStarted,
  }: CarModel): string {
    const carHTML = `
      <div class='general-buttons'>
        <button class='btn select-btn' id='select-car-${id}'>Select</button>
        <button class='btn remove-btn' id='remove-car-${id}'>Remove</button>
        <span class='car-name'>${name}</span>
      </div>
      <div class='road'>
        <div class='launch-pad'>
          <div class='control-panel'>
            <button class='btn-engine start-engine-btn' id='start-engine-car-${id}${isEngineStarted ? 'disabled' : ''}'>A</button>
            <button disabled class='btn-engine stop-engine-btn' id='stop-engine-car-${id}${isEngineStarted ? 'disabled' : ''}'>B</button>
          </div>
          <div class='car' id='car-${id}'>
            ${Garage.renderCarImage(color)}
          </div>
        </div>
        <div class='finish' id='finish-${id}'>🏁</div>
      </div>
    `;
    return carHTML;
  }

  static garageContainer(cars: CarModel[], count: string, page: number): string {
    const garageHTML = `
      <div id='garage'>
        <h1 class='garage-title'>Garage (${count})</h1>
        <h2 class='garage-title'>Page #${page}</h2>
        <ul class='garage-cars'>
          ${cars.map((car) => `
            <li class="garage__item">${Render.garageCar(car)}</li>
          `).join('')}
        </ul>
      </div>
    `;
    return garageHTML;
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
        ${Render.garageContainer(cars, count, page)}
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
