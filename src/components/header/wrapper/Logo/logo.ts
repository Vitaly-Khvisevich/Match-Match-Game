import { BaseComponent } from '../../../base-component';

export class Logo extends BaseComponent {
  private src_img = './header_logo.jpg';

  private href = '#about';

  create(): void {
    super.create('div', ['header__logo']);
    /* Создаем элемент Logo с изображением */
    this.element.innerHTML = `
    <a href=${this.href} class="header__logo-link">
      <img src=${this.src_img} alt="logo_footer" class="header__logo-pic">
    </a>
    `;
  }

  /* При необходимости меняем изображение */
  shange_pic(src_img: string): void {
    this.src_img = src_img;
  }
}
