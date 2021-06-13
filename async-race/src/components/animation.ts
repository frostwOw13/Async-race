import { drive, getCars } from '../shared/api';
import { MAX_CARS_ON_PAGE, RaceBodyCar } from '../shared/constants';

export class Animation {
  public animation: number;

  constructor() {
    this.animation = 0;
  }

  public async startAnimation(car: HTMLElement, animationTime: number, id: string, flag: HTMLElement) {
    const distance = Math.floor(this.getDistance(car!, flag!) + 100);

    let start: number = 0;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const time = timestamp - start;
      const passed = Math.round(time * (distance / animationTime));
      car.style.transform = `translateX(${Math.min(passed, distance)}px)`;

      if (passed < distance) this.animation = window.requestAnimationFrame(step);
    }

    this.animation = window.requestAnimationFrame(step);
    const { success } = await drive(id);
    if (!success) cancelAnimationFrame(this.animation);
    if (success) return { success, id, animationTime }
  }

  private getElementPosition(element: HTMLElement) {
    const { top, left, width, height } = element.getBoundingClientRect();
    return {
      x: left + width / 2,
      y: top + height / 2
    };
  }

  private getDistance(a: HTMLElement, b: HTMLElement) {
    const aPosition = this.getElementPosition(a);
    const bPosition = this.getElementPosition(b);

    return Math.hypot(aPosition.x - bPosition.x + 40, aPosition.y - bPosition.y);
  }
}
