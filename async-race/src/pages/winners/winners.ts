import { Page } from '../page';
import './winners.scss';

export class Winners extends Page {
  constructor(className: string) {
    super(className);
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
