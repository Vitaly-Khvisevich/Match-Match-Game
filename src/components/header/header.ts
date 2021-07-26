import { BaseComponent } from '../base-component';
import { Wrapper } from './wrapper/wrapper';
import './header.scss';

export class Header extends BaseComponent {
  private wrapper!: Wrapper;

  create(): HTMLElement {
    super.create('header', ['header']);
    this.wrapper = new Wrapper();
    this.wrapper.create();
    this.element.appendChild(this.wrapper.element);
    return this.element;
  }
}
