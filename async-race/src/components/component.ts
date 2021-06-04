export abstract class Component {
  protected container: HTMLElement;

  constructor(tagName: string = 'div', className: string = '') {
    this.container = document.createElement(tagName);
    this.container.className = className;
  }

  public render(): HTMLElement {
    return this.container;
  }
}
