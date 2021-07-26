import { BaseComponent } from '../base-component';

export class Footer extends BaseComponent {
  create(): HTMLElement {
    super.create('footer', ['footer']);
    this.element.textContent = 'RS Scool RS2021Q1 2021';
    return this.element;
  }
}
