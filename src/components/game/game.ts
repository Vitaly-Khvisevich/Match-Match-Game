import { delay } from '../../shared/delay';
import { BaseComponent } from '../base-component';
import { Card } from './cards-field/card/card';
import { CardsField } from './cards-field/cards-field';
import { PROGRAM_DATA, GAME_SETTINGS, RESULT_DATA } from '../game_settings';
import { pauseWatch } from './timer';

export class Game extends BaseComponent {
  cover = document.getElementsByClassName('cover');

  registration = document.getElementsByClassName('registration-cont');

  private matched_cards = [] as Array<Card>;

  private cardsField!: CardsField;

  private activeCard?: Card;

  private isAnimation = false;

  private number_of_coincidences = 0;

  create(): void {
    super.create('div', ['game']);
    this.cardsField = new CardsField();
    this.cardsField.create();
    this.element.appendChild(this.cardsField.element);
  }

  newGame(images: string[]): void {
    this.cardsField.clear();
    const cards = images
      .concat(images)
      .map((url) => new Card(url))
      .sort(() => Math.random() - 0.5);

    cards.forEach((card) => {
      card.element.addEventListener('click', () => this.cardHandler(card));
    });

    this.cardsField.addCards(cards);
  }

  private async cardHandler(card: Card) {
    if (this.matched_cards.includes(card)) return;
    if (this.isAnimation) return;
    this.isAnimation = true;
    await card.flipToFront();

    if (!this.activeCard) {
      this.activeCard = card;
      this.isAnimation = false;
      return;
    }
    if (card === this.activeCard) {
      this.isAnimation = false;
    } else {
      if (this.activeCard.image !== card.image) {
        RESULT_DATA.number_of_comparisons++;
        RESULT_DATA.number_of_errors++;
        this.AddClass(card, 'red_indicator');
        await delay(PROGRAM_DATA.FLIP_DELAY * 1000);
        await Promise.all([this.activeCard.flipToBack(), card.flipToBack()]);
        this.RemoveClass(card, 'red_indicator');
      } else {
        this.matched_cards.push(this.activeCard);
        this.matched_cards.push(card);
        RESULT_DATA.number_of_comparisons++;
        this.number_of_coincidences++;
        this.AddClass(card, 'green_indicator');
        if (this.number_of_coincidences === (GAME_SETTINGS.Difficulty * GAME_SETTINGS.Difficulty) / 2) {
          pauseWatch();
          Game.CalculatingTheResult();
          this.cover[0].classList.remove('not_visible');
          this.registration[0].classList.remove('not_visible');
        }
      }
      this.activeCard = undefined;
      this.isAnimation = false;
    }
  }

  private AddClass(card: Card, card_class: string): void {
    if (this.activeCard !== undefined) {
      this.activeCard.element.children[0].children[0].classList.add(card_class);
      card.element.children[0].children[0].classList.add(card_class);
      if (card_class === 'red_indicator') {
        this.activeCard.element.children[0].children[0].children[1].classList.remove('not_exist');
        card.element.children[0].children[0].children[1].classList.remove('not_exist');
      } else if (card_class === 'green_indicator') {
        this.activeCard.element.children[0].children[0].children[0].classList.remove('not_exist');
        card.element.children[0].children[0].children[0].classList.remove('not_exist');
      }
    }
  }

  private RemoveClass(card: Card, card_class: string): void {
    if (this.activeCard !== undefined) {
      this.activeCard.element.children[0].children[0].classList.remove(card_class);
      card.element.children[0].children[0].classList.remove(card_class);
      this.activeCard.element.children[0].children[0].children[1].classList.add('not_exist');
      card.element.children[0].children[0].children[1].classList.add('not_exist');
    }
  }

  static CalculatingTheResult(): void {
    const result = document.getElementsByClassName('result');
    let seconds = 0;
    seconds += Number(RESULT_DATA.UTCHours) * 3600;
    RESULT_DATA.UTCHours = '00';
    seconds += Number(RESULT_DATA.UTCMinutes) * 60;
    RESULT_DATA.UTCMinutes = '00';
    seconds += Number(RESULT_DATA.UTCSeconds);
    RESULT_DATA.UTCSeconds = '00';
    if (Number(RESULT_DATA.UTCMilliseconds) > 50) seconds++;
    RESULT_DATA.UTCMilliseconds = '00';
    RESULT_DATA.result = (RESULT_DATA.number_of_comparisons - RESULT_DATA.number_of_errors) * 100 - seconds * 10;
    if (RESULT_DATA.result < 0) RESULT_DATA.result = 0;
    result[0].textContent = `${RESULT_DATA.result}`;
  }
}
