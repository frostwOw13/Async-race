import { buttons } from '../../../shared/constants';
import { Component } from '../../../components/component';
import './header.scss';

export class Header extends Component {
  private renderPageButtons(): void {
    this.container.innerHTML = '';
    const pageButtons = document.createElement('div');
    pageButtons.className = 'header-panel';
    buttons.forEach((button) => {
      const buttonHTML = document.createElement('a');
      buttonHTML.href = `#${button.id}`;
      buttonHTML.innerText = button.text;
      buttonHTML.className = 'button';
      pageButtons.append(buttonHTML);
    });
    this.container.append(pageButtons);
  }

  public render(): HTMLElement {
    this.renderPageButtons();
    return this.container;
  }
}
