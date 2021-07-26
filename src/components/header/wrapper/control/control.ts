import { BaseButton } from '../../../base-button';
import { BaseComponent } from '../../../base-component';
import './control.scss';
import { GAME_SETTINGS } from '../../../game_settings';

export class Control extends BaseComponent {
  private button!: BaseButton;

  create(): void {
    super.create('div', ['header_user']);
    if (GAME_SETTINGS.is_run === false) {
      this.button = new BaseButton();
      this.button.create_button('Start game', '#game');
    } else {
      this.button = new BaseButton();
      this.button.create_button('Stop game', '#stop');
    }
    this.element.appendChild(this.button.element);
  }
}
