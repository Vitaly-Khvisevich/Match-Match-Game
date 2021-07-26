import { BaseComponent } from '../../base-component';
import { Logo } from './Logo/logo';
import './wrapper.scss';
import { Navigation } from './navigation/navigation';
import { Control } from './control/control';

export class Wrapper extends BaseComponent {
  private logo!: Logo;

  private navigation!: Navigation;

  private control!: Control;

  private panel!: [Logo, Navigation, Control];

  create(): void {
    super.create('div', ['wrapper']);
    this.logo = new Logo();
    this.logo.create();
    this.navigation = new Navigation();
    this.navigation.create();
    this.control = new Control();
    this.control.create();
    this.element.appendChild(this.control.element);
    this.panel = [this.logo, this.navigation, this.control];
    this.createPanel(this.panel);
  }

  createPanel(panel: [Logo, Navigation, Control]): void {
    panel.forEach((part) => this.element.appendChild(part.element));
  }
}
