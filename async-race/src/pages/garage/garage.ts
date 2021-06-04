import { Page } from '../page';
import './garage.scss';

export class Garage extends Page {
  constructor(className: string) {
    super(className);
  }

  private createHeaderTitle(title: string) {
    const headerTitle = document.createElement('h2');
    headerTitle.className = 'garage-title';
    headerTitle.innerText = title;
    return headerTitle;
  }

  public render(): HTMLElement {
    const headerTitle = this.createHeaderTitle('Garage')
    this.container.append(headerTitle);
    return this.container;
  }
}
