import { Page } from '../page';
import './winners.scss';

export class Winners extends Page {
  constructor(className: string) {
    super(className);
  }

  private createHeaderTitle(title: string) {
    const headerTitle = document.createElement('h2');
    headerTitle.className = 'winners-title';
    headerTitle.innerText = title;
    return headerTitle;
  }

  public render(): HTMLElement {
    const headerTitle = this.createHeaderTitle('Winners')
    this.container.append(headerTitle);
    return this.container;
  }
}
