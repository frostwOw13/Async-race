import { buttons } from '../../../shared/constants';
import { Component } from '../../../components/component';

export class Header extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  private renderPageButtons(): void {
    this.container.innerHTML = '';
    const pageButtons = document.createElement('div');
    buttons.forEach((button) => {
      const buttonHTML = document.createElement('a');
      buttonHTML.href = `#${button.id}`;
      buttonHTML.innerText = button.text;
      pageButtons.append(buttonHTML);
    });
    this.container.append(pageButtons);
  }

  public render(): HTMLElement {
    this.renderPageButtons();
    return this.container;
  }
}
