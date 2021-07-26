import { BaseComponent } from '../components/base-component';
import './cover.scss';

export class Cover extends BaseComponent {
  create(): HTMLElement {
    super.create('div', ['cover']);
    this.element.classList.add('not_visible');
    return this.element;
  }
}
