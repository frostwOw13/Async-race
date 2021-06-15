import './message.scss';

export class Message {
  public container: HTMLElement;

  constructor(className: string) {
    this.container = document.createElement('div');
    this.container.className = className;
  }

  public render(name: string, time: number): void {
    this.container.innerHTML = `
      <p class='winner-title'>The ${name} is winner with ${(time / 1000).toFixed(2)}s</p>
    `;
    this.container.classList.add('active');
    document.body.appendChild(this.container);
  }
}
