import './winners.scss';

export class Winners {
  private container: HTMLElement;

  constructor(className: string) {
    this.container = document.createElement('div');
    this.container.className = className;
  }

  private renderWinners(): string {
    const winnersHTML = `
      <h1>Winners (winners number)</h1>
      <h2>Page (page winners)</h2>
      <table class='table' cellspacing='0' border='0' cellpadding='0'>
        <thead>
        <th>Number</th>
        <th>Car</th>
        <th>Name</th>
        <th class='table-button table-wins'></th>
        </thead>
      </table>
    `;
    return winnersHTML;
  }

  public render(): HTMLElement {
    return this.container;
  }
}
