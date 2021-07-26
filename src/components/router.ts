import { Header } from './header/header';
import { App } from './body/app';
import { Footer } from './footer/footer';
import { GAME_SETTINGS, OBJECTS } from './game_settings';
import { resetWatch } from './game/timer';
import { Registration } from '../registration-user/registration';
import { Cover } from '../cover/cover';

export class Router {
  private currentRouteName!: string;

  private routing!: { name: string; component: () => void }[];

  private appElement = document.body;

  create(hash: string): void {
    this.currentRouteName = hash.slice(1);
    this.routing = [
      {
        name: 'about',
        component: () => {
          App.addflag('about');
          GAME_SETTINGS.is_run = false;
          OBJECTS.activeEl = '#about';
          this.removeChild();
          this.addAppandFooter();
        },
      },
      {
        name: 'best',
        component: () => {
          App.addflag('best');
          GAME_SETTINGS.is_run = false;
          OBJECTS.activeEl = '#best';
          this.removeChild();
          this.addAppandFooter();
        },
      },
      {
        name: 'settings',
        component: () => {
          App.addflag('settings');
          GAME_SETTINGS.is_run = false;
          OBJECTS.activeEl = '#settings';
          this.removeChild();
          this.addAppandFooter();
        },
      },
      {
        name: 'game',
        component: () => {
          App.addflag('game');
          GAME_SETTINGS.is_run = true;
          OBJECTS.activeEl = '';
          this.removeChild();
          this.addAppandFooter();
        },
      },
      {
        name: 'stop',
        component: () => {
          App.addflag('about');
          resetWatch();
          GAME_SETTINGS.is_run = false;
          OBJECTS.activeEl = '#about';
          this.removeChild();
          this.addAppandFooter();
        },
      },
    ];
    Router.findElement(this.currentRouteName, this.routing);
  }

  static findElement(
    currentRouteName: string,
    routing: { name: string; component: () => void }[]
  ): void {
    const currentRoute = routing.find((p) => p.name === currentRouteName);
    if (currentRoute !== undefined) currentRoute.component();
  }

  removeChild(): void {
    this.appElement.removeChild(this.appElement.children[4]);
    this.appElement.removeChild(this.appElement.children[3]);
    this.appElement.removeChild(this.appElement.children[2]);
    this.appElement.removeChild(this.appElement.children[1]);
    this.appElement.removeChild(this.appElement.children[0]);
  }

  addAppandFooter(): void {
    const head = new Header();
    const headElement = head.create();
    this.appElement.appendChild(headElement);

    const app = new App(this.appElement);
    app.create();

    const footer = new Footer();
    const futerElement = footer.create();
    this.appElement.appendChild(futerElement);

    const registration = new Registration();
    const registrationElement = registration.create();
    this.appElement.appendChild(registrationElement);

    const cover = new Cover();
    const coverElement = cover.create();
    this.appElement.appendChild(coverElement);
  }
}
