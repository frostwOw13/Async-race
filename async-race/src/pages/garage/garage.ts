import { Page } from '../page';
import './garage.scss';

interface RenderCar {
  id: number,
  name: string,
  color: string,
  isEngineStarted: boolean
}

export class Garage extends Page {
  constructor(className: string) {
    super(className);
  }

  private renderGarage(cars: RenderCar[]): string {
    const garageHTML = `
      <h1>Garage (number all cars)</h1>
      <h2>Page (page cars)</h2>
      <ul class='garage'>
        ${cars.map((car) => {`
          <li>${this.renderCar(car)}</li>
        `}).join('')}
      </ul>
    `;
    return garageHTML;
  }

  private renderCarImage(color: string): string {
    const carImageHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="256" height="256">
        <g id="_13-car" data-name="13-car" style="fill:${color}">
          <g id="glyph">
            <path d="M120,236a52,52,0,1,0,52,52A52.059,52.059,0,0,0,120,236Zm0,76a24,24,0,1,1,24-24A24,24,0,0,1,120,312Z"/>
            <path d="M408,236a52,52,0,1,0,52,52A52.059,52.059,0,0,0,408,236Zm0,76a24,24,0,1,1,24-24A24,24,0,0,1,408,312Z"/>
            <path d="M477.4,193.04,384,176l-79.515-65.975A44.109,44.109,0,0,0,276.526,100H159.38a43.785,43.785,0,0,0-34.359,16.514L74.232,176H40A36.04,36.04,0,0,0,4,212v44a44.049,44.049,0,0,0,44,44h9.145a64,64,0,1,1,125.71,0h162.29a64,64,0,1,1,125.71,0H472a36.04,36.04,0,0,0,36-36V228.632A35.791,35.791,0,0,0,477.4,193.04ZM180,164a12,12,0,0,1-12,12H115.245a6,6,0,0,1-4.563-9.9l34.916-40.9A12,12,0,0,1,154.724,121H168a12,12,0,0,1,12,12Zm60,56H224a12,12,0,0,1,0-24h16a12,12,0,0,1,0,24Zm94.479-43.706-114.507-.266a12,12,0,0,1-11.972-12V133a12,12,0,0,1,12-12h57.548a12,12,0,0,1,7.433,2.58l53.228,42A6,6,0,0,1,334.479,176.294Z"/>
          </g>
        </g>
      </svg>
    `;
    return carImageHTML;
  }

  private renderCar({ id, name, color, isEngineStarted }: RenderCar): string {
    const carHTML = `
      <div class='general-buttons>
        <button class='btn select-btn' id='select-car-${id}'>Select</button>
        <button class='btn remove-btn' id='remove-car-${id}'>Remove</button>
        <span class='car-name'>${name}</span>
      </div>
      <div class='road'>
        <div class='launch-pad'>
          <div class='control-panel'>
            <button class='icon start-engine-btn' id='start-engine-car-${id} ${isEngineStarted ? 'disabled' : ''}'>start</button>
            <button class='icon stop-engine-btn' id='stop-engine-car-${id} ${isEngineStarted ? 'disabled' : ''}'>stop</button>
          </div>
          <div class='car' id='car-${id}'>
            ${this.renderCarImage(color)}
          </div>
        </div>
        <div class='finish' id='finish-${id}'>🏁</div>
      </div>
    `;

    return carHTML;
  }

  public renderPage(cars: RenderCar[]): HTMLElement {
    const html = `
      <div class='garage-view'>
        <div>
          <form class='form' id='create'>
            <input class='input' id='create-name' name='name' type='text'>
            <input class='color' id='create-color' name='color' type='color' value='#FFFFFF'>
            <button class='btn' type=''submit'>Create</button>
          </form>
          <form class='form' id='update'>
            <input class='input' id='update-name' name='name' type='text'>
            <input class='color' id='update-color' name='color' type='color' value='#FFFFFF'>
            <button class='btn' type=''submit'>Update</button>
          </form>
        </div>
        <div class='race-control'>
          <button class='button race-button' id='race'>Race</button>
          <button class='button reset-button' id='reset'>Reset</button>
          <button class='button generator-button' id='generator'>Generate cars</button>
        </div>
        <div id='garage'>
          ${this.renderGarage(cars)}
        </div>
      </div>
    `;
    this.container.innerHTML = html;
    return this.container;
  }
}