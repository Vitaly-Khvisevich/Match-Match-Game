import { BaseComponent } from '../base-component';
import { BodyWrapper } from './wrapper/bodywrapper';

export class App extends BaseComponent {
  static flag = 'about';

  static addflag(arg0: string): void {
    App.flag = arg0;
  }

  private body_wrapper!: BodyWrapper;

  constructor(private readonly rootElement: HTMLElement) {
    super();
  }

  create(): void {
    super.create('div', ['app']);
    this.rootElement.appendChild(this.element);

    const Timer = document.createElement('h2');
    Timer.className = 'watch';
    Timer.classList.add('not_visible');
    Timer.textContent = '00:00:00.00';
    this.element.appendChild(Timer);

    this.body_wrapper = new BodyWrapper();
    this.body_wrapper.create_wrapper(App.flag);
    this.element.appendChild(this.body_wrapper.element);
  }
}
