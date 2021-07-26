import './cards-field.scss';
import { BaseComponent } from '../../base-component';
import { Card } from './card/card';
import { PROGRAM_DATA } from '../../game_settings';
import { startWatch } from '../timer';

export class CardsField extends BaseComponent {
  private cards: Card[] = [];

  create(): void {
    super.create('div', ['cards-field']);
  }

  clear(): void {
    this.cards = [];
    this.element.innerHTML = '';
  }

  addCards(cards: Card[]): void {
    this.cards = cards;
    this.cards.forEach((card) => this.element.appendChild(card.element));
    setTimeout(() => {
      this.cards.forEach((card) => card.flipToBack());
      startWatch();
    }, PROGRAM_DATA.CardShowTime * 1000);
  }
}
