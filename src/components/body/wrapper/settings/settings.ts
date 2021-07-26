import { BaseComponent } from '../../../base-component';
import './settings.scss';
import { PROGRAM_DATA, GAME_SETTINGS } from '../../../game_settings';

export class Settings extends BaseComponent {
  create(): void {
    super.create('div', ['settings']);
    const title = document.createElement('h6');
    title.className = 'title';
    title.textContent = 'Game setting';
    this.element.appendChild(title);
    this.createSetting(
      'Game cards',
      'game cards type',
      PROGRAM_DATA.categories
    );
    this.createSetting('Difficulty', 'game type', PROGRAM_DATA.game_tupe);
  }

  createSetting(
    title_name: string,
    prompt: string,
    options: Array<string>
  ): void {
    const DivElement = document.createElement('div');
    DivElement.className = 'select_cont';
    this.element.appendChild(DivElement);

    const SettingTitle = document.createElement('p');
    SettingTitle.className = 'select_title';
    SettingTitle.textContent = title_name;
    DivElement.appendChild(SettingTitle);

    const SelectSetting = document.createElement('select');
    SelectSetting.className = 'select_choise';
    SelectSetting.name = title_name;
    SelectSetting.addEventListener('change', (event) => {
      if ((<HTMLInputElement>event.target).value !== '') {
        if (title_name === 'Game cards')
          GAME_SETTINGS.Game_cards = Number(
            (<HTMLInputElement>event.target).value
          );
        else {
          GAME_SETTINGS.Difficulty = Number(
            PROGRAM_DATA.game_tupe[
              Number((<HTMLInputElement>event.target).value)
            ].split('x')[0]
          );
        }
      }
    });
    DivElement.appendChild(SelectSetting);
    const defoult = document.createElement('option');
    defoult.value = '';
    defoult.textContent = `select ${prompt}.`;
    SelectSetting.appendChild(defoult);

    options.forEach((el: string, index: number) => {
      const elem = document.createElement('option');
      elem.value = `${index}`;
      elem.textContent = el;
      SelectSetting.appendChild(elem);
    });
  }
}
