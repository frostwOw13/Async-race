import { PageIds } from '../../app';
import { Component } from '../../components/component';

const buttons = [
  {
    id: PageIds.GaragePage,
    text: 'to garage'
  },
  {
    id: PageIds.WinnersPage,
    text: 'to winners'
  }
]

export class Header extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  private renderPageButtons(): void {
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
