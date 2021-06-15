import { RenderCar } from '../../../shared/interfaces';
import './garage.scss';

export class Garage {
  private container: HTMLElement;

  constructor(className: string) {
    this.container = document.createElement('div');
    this.container.className = className;
  }

  static renderGarage(cars: RenderCar[], count: string, page: number): string {
    const garageHTML = `
      <div id='garage'>
        <h1 class='garage-title'>Garage (${count})</h1>
        <h2 class='garage-title'>Page #${page}</h2>
        <ul class='garage-cars'>
          ${cars.map((car) => `
            <li class="garage__item">${Garage.renderCar(car)}</li>
          `).join('')}
        </ul>
      </div>
    `;
    return garageHTML;
  }

  static renderCarImage(color: string): string {
    const carImageHTML = `
      <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
      width="120px" height="45px" viewBox="50 50 494.111 260" style="enable-background:new 0 0 494.111 494.111;"
      xml:space="preserve">
        <g>
          <g style="fill:${color}">
            <path d="M478.805,289.625l-1.787-11.565l-0.729-0.854c-39.942-46.729-75.231-49.125-88.508-50.028
              c-1.318-0.092-2.789-0.188-3.526-0.305c-5.903-4.679-29.575-9.914-35.142-9.914c-0.016,0-0.024,0-0.04,0
              c-1.88,0.126-3.903,0.753-6.027,1.412c-4.496,1.397-10.095,2.683-14.627,0.579c-9.666-4.48-30.978-4.614-33.378-4.614
              l-20.738,5.063c-17.29-6.264-47.346-20.021-55.804-23.918v-8.157l-1.811-1.154c-3.635-2.309-7.418-3.48-11.267-3.48
              c-8.854,0-15.408,6.201-18.149,9.329c-7.881-0.19-36.542,0.339-63.776,17.711c-18.698,11.94-26.158,15.244-28.812,16.164
              l-0.269-0.357l-0.248,0.072l-2.883-3.17c4.807-1.487,8.323-5.915,8.323-11.205v-6.869c0-6.494-5.284-11.775-11.776-11.775H65.253
              c-3.857,0-7.253,1.894-9.408,4.757c-1.575-2.164-4.496-4.27-10.219-4.27c-4.35,0-8.871-0.102-13.259-0.195
              c-4.209-0.096-8.299-0.188-12.002-0.188c-9.077,0-20.366,0-20.366,7.251v50.407l25.026,6.188v-5.021
              c0-18.971,19.61-23.429,20.444-23.618l1.453-0.314l0.877-1.176c0.509-0.683,1.491-2.065,2.607-3.791l4.771,14.084l-27.042,7.7
              l4.53,42.718l2.234,0.865c1.495,0.577,22.792,8.772,43.527,15.4c-1.653-1.715-3.144-3.57-4.454-5.57
              c-1.05-1.603-1.956-3.306-2.755-5.062c-2.198-4.829-3.5-10.143-3.5-15.785c0-21.099,17.168-38.267,38.271-38.267
              c21.101,0,38.269,17.168,38.269,38.267c0,10.167-4.052,19.364-10.54,26.233c-1.415,1.49-2.972,2.809-4.604,4.055
              c-2.1,1.611-4.346,3.014-6.759,4.164c32.759-1.295,167.665-3.471,240.792-4.521c0.561-0.008,1.242-0.016,1.879-0.016
              c-1.519-1.206-2.973-2.453-4.3-3.871c-1.142-1.223-2.224-2.509-3.206-3.88c-4.484-6.264-7.181-13.886-7.181-22.165
              c0-21.099,17.172-38.267,38.271-38.267c21.096,0,38.271,17.168,38.271,38.267c0,8.479-2.854,16.246-7.538,22.586
              c-0.998,1.362-2.04,2.681-3.21,3.896c-1.367,1.418-2.901,2.665-4.465,3.863c15.657,0.2,32.14,0.396,45.801,0.396
              c16.375,0,25.772-0.276,29.539-0.85c4.408-0.673,6.785-2.492,7.062-5.39C494.238,299.54,494.602,295.601,478.805,289.625z"/>
            <path style="fill:#222" d="M107.537,307.238c4.599-0.232,8.893-1.503,12.738-3.583c9.548-5.13,16.126-15.1,16.126-26.686
              c0-16.774-13.644-30.42-30.421-30.42c-16.777,0-30.42,13.646-30.42,30.42c0,7.515,2.839,14.307,7.363,19.625
              c2.166,2.54,4.711,4.716,7.598,6.432c4.544,2.709,9.791,4.364,15.458,4.364C106.513,307.406,107.008,307.266,107.537,307.238z"/>
            <path style="fill:#222" d="M388.594,307.406c1.118,0,2.191-0.217,3.282-0.337c4.231-0.46,8.171-1.755,11.697-3.774
              c1.916-1.103,3.719-2.377,5.358-3.855c6.146-5.566,10.082-13.529,10.082-22.453c0-16.783-13.645-30.421-30.42-30.421
              s-30.421,13.638-30.421,30.421c0,8.691,3.711,16.498,9.582,22.049c1.595,1.502,3.374,2.805,5.262,3.939
              c3.435,2.071,7.281,3.434,11.421,4.011C385.817,307.166,387.167,307.406,388.594,307.406z"/>
          </g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
      </svg>
    `;
    return carImageHTML;
  }

  static renderCar({
    id,
    name,
    color,
    isEngineStarted,
  }: RenderCar): string {
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

  public render(cars: RenderCar[], count: string, page: number): HTMLElement {
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
    this.container.innerHTML = html;
    return this.container;
  }
}
