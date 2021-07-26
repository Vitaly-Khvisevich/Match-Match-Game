import { BaseComponent } from '../../../base-component';
import { List } from './list/list';
import './navigation.scss';

export class Navigation extends BaseComponent {
  private list!: List;

  create(): void {
    super.create('nav', ['header__nav']);
    this.list = new List();
    this.list.create();
    this.element.appendChild(this.list.element);
  }
}
