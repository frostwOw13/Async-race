export abstract class Page {
  protected container: HTMLElement;

  static TextObject = {
    GarageButtonText: 'to garage',
    WinnersButtonText: 'to winners'
  }

  constructor(className: string) {
    this.container = document.createElement('div');
    this.container.className = className;
  }

  public render() {
    return this.container;
  }
}
