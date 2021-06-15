import { Api } from '../shared/api';

export class Animation {
  public animation: number;

  private api: Api;

  constructor() {
    this.animation = 0;
    this.api = new Api();
  }

  public async startAnimation(car: HTMLElement, animationTime: number, id: string, flag: HTMLElement): Promise<{ [key: string]: unknown; } | undefined> {
    const distance = Math.floor(Animation.getDistance(car, flag) + 100);

    let start = 0;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const time = timestamp - start;
      const passed = Math.round(time * (distance / animationTime));
      car.style.transform = `translateX(${Math.min(passed, distance)}px)`;

      if (passed < distance) this.animation = window.requestAnimationFrame(step);
    };

    this.animation = window.requestAnimationFrame(step);
    const { success } = await Api.drive(id);
    if (!success) cancelAnimationFrame(this.animation);
    return { success, id, animationTime };
  }

  static getElementPosition(element: HTMLElement): { [key: string]: number } {
    const {
      top,
      left,
      width,
      height,
    } = element.getBoundingClientRect();
    return {
      x: left + width / 2,
      y: top + height / 2,
    };
  }

  static getDistance(a: HTMLElement, b: HTMLElement): number {
    const aPosition = Animation.getElementPosition(a);
    const bPosition = Animation.getElementPosition(b);

    return Math.hypot(aPosition.x - bPosition.x + 40, aPosition.y - bPosition.y);
  }
}
