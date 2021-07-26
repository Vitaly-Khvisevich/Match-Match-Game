import { BaseComponent } from '../../../base-component';
import './style.scss';

export class About extends BaseComponent {
  private staps!: Array<Record<string, string>>;

  private summ!: string;

  create(): void {
    super.create('div', ['stap_container']);
    this.summ = '<h6 class="about_title">How to play?</h6>';
    this.staps = [
      {
        number_src: 'number-1.jpg',
        description:
          'Configure your game settings or use the default settings for the game.',
        img_src: 'shape-between-two.jpg',
      },
      {
        number_src: 'number-2.jpg',
        description:
          'Start you new game! Remember card positions and match it before times up.',
        img_src: 'game_prosess.jpg',
      },
      {
        number_src: 'number-3.jpg',
        description: 'Register a user to record your highscore.',
        img_src: 'Create_user.jpg',
      },
    ];

    this.staps.forEach((stap) => {
      const part = About.createStap(
        stap.number_src,
        stap.description,
        stap.img_src
      );
      this.summ += part;
    });
    this.element.innerHTML = this.summ;
  }

  static createStap(
    number_src: string,
    description: string,
    img_src: string
  ): string {
    return `
    <div class="stap">
      <div class="left">
        <img class="number" src="./${number_src}" alt="number">
        <p class="stap_description">${description}</p>
      </div>
      <div class="right">
        <img class="pic" src="./${img_src}" alt="pic">
      </div>
    </div>
    `;
  }
}
