import { BaseComponent } from './base-component';

export class BaseButton extends BaseComponent {
  create_button(name: string, href = '#'): void {
    super.create('a', ['button']);
    this.element.textContent = name;
    this.element.setAttribute('href', href);
  }
}
