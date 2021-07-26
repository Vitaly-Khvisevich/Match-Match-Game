import './card.scss';
import { BaseComponent } from '../../../base-component';
import { GAME_SETTINGS } from '../../../game_settings';

const FLIP_CLASS = 'flipped';

export class Card extends BaseComponent {
  constructor(readonly image: string) {
    super();
    this.create_card();
  }

  create_card(): void {
    super.create('div', ['card-container']);
    const dif = GAME_SETTINGS.Difficulty === 6 ? 'six_by_six' : 'four_by_four';
    this.element.innerHTML = `
    <div class="card ${dif}">
      <div class="card_indicator">
      <img class="true_ansver not_exist" src='./true_ansver.svg'></img>
      <img class="false_ansver not_exist" src='./false_ansver.svg'></img>
      </div>
      <div class="card__front" style="background-image: url('./images/${this.image}')" url></div>
      <div class="card__back"></div>
    </div>`;
  }

  flipToBack(): Promise<void> {
    return this.flip(true);
  }

  flipToFront(): Promise<void> {
    return this.flip();
  }

  private flip(isFront = false): Promise<void> {
    return new Promise((resolve) => {
      this.element.classList.toggle(FLIP_CLASS, isFront);
      this.element.addEventListener('transitionend', () => resolve(), {
        once: true,
      });
    });
  }
}
