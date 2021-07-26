import { BaseComponent } from '../../../../base-component';
import './list.scss';
import { OBJECTS } from '../../../../game_settings';

export class List extends BaseComponent {
  private about_game!: string;

  private bast_score!: string;

  private game_setting!: string;

  create(): void {
    super.create('ul', ['header__list']);
    this.about_game = List.build_link('about.svg', 'About Game', '#about');
    this.bast_score = List.build_link('best.svg', 'Bast Score', '#best');
    this.game_setting = List.build_link(
      'setting.svg',
      'Game Setting',
      '#settings'
    );
    this.element.innerHTML =
      this.about_game + this.bast_score + this.game_setting;
  }

  static build_link(img: string, name: string, cach: string): string {
    if (OBJECTS.activeEl === cach)
      return List.create_link(img, name, cach, 'active');
    return List.create_link(img, name, cach);
  }

  static create_link(
    pic_name: string,
    title: string,
    link = 'index.html',
    active = ''
  ): string {
    return `
    <li class="header__item">
      <a class="item_link" href=${link}>
        <div class="container ${active}">
          <img src=./${pic_name} alt="item_pic" class="item_pic">
          <p class="item__title" >${title}</p>
        </div>
      </a>
    </li>
    `;
  }
}
