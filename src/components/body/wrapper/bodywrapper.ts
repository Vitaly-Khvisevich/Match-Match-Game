import { BaseComponent } from '../../base-component';
import { Game } from '../../game/game';
import { ImageCategoryModel } from '../../models/image-category-models';
import { About } from './about/about';
import { Records } from './records/records';
import { Settings } from './settings/settings';
import './style.scss';
import { setcategories, GAME_SETTINGS, OBJECTS } from '../../game_settings';
import { backtimer } from '../../game/timer';

export class BodyWrapper extends BaseComponent {
  private staps_game: About | undefined;

  private game: Game | undefined;

  private settings: Settings | undefined;

  private records: Records | undefined;

  constructor() {
    super();
    BodyWrapper.loading_data();
  }

  create_wrapper(flag: string): void {
    super.create('div', ['wrapper_body']);
    if (flag === 'game' && GAME_SETTINGS.Difficulty === 6) {
      this.element.classList.add('wrapper_six_by_six');
    } else {
      this.element.classList.add('wrapper_four_by_four');
    }

    if (flag === 'about') {
      this.staps_game = new About();
      this.staps_game.create();
      this.element.appendChild(this.staps_game.element);
    } else if (flag === 'game') {
      backtimer();
      this.game = new Game();
      this.game.create();
      this.start(OBJECTS.categories);
      this.element.appendChild(this.game.element);
    } else if (flag === 'settings') {
      this.settings = new Settings();
      this.settings.create();
      this.element.appendChild(this.settings.element);
    } else if (flag === 'best') {
      this.records = new Records();
      this.records.create();
      this.element.appendChild(this.records.element);
    }
  }

  static async loading_data(): Promise<void> {
    const res = await fetch('./images.json');
    const categories: ImageCategoryModel[] = await res.json();
    setcategories(categories);
  }

  async start(categories: ImageCategoryModel[]): Promise<void> {
    if (this.game !== undefined) {
      const CurrentCategorie = categories[GAME_SETTINGS.Game_cards];
      let images = CurrentCategorie.images.map(
        (name) => `${CurrentCategorie.category}/${name}`
      );
      if (images.length !== GAME_SETTINGS.Difficulty) {
        images = images.splice(
          0,
          (GAME_SETTINGS.Difficulty * GAME_SETTINGS.Difficulty) / 2
        );
      }
      this.game.newGame(images);
    }
  }
}
