import { Component } from '../../components/component';

export class Pagination extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  private renderPageButtons(): void {
    this.container.innerHTML = '';
    const paginationHTML = `
      <div class='pagination'>
        <button class='page-btn' id='prev'>Previous</button>
        <button class='page-btn' id='next'>Next</button>
      </div>
    `;
    this.container.innerHTML = paginationHTML;
  }

  public render(): HTMLElement {
    this.renderPageButtons();
    return this.container;
  }
}
