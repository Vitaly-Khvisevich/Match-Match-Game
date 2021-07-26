import './style.scss';
import { App } from './components/body/app';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { Router } from './components/router';
import { Registration } from './registration-user/registration';
import { Cover } from './cover/cover';
import { OBJECTS } from './components/game_settings';

function createScope(
  store: IDBObjectStore,
  result: number,
  name: string,
  surname: string,
  email: string,
  photo: string
) {
  const note = {
    Result: result,
    Name: name,
    Surname: surname,
    Email: email,
    Photo: photo,
  };
  store.add(note);
}

function createdatabase() {
  const dbReq = indexedDB.open('Vitaly-Khvisevich', 1);
  let db: IDBDatabase;
  dbReq.onupgradeneeded = (e) => {
    db = dbReq.result;
    db.createObjectStore('game_data', { autoIncrement: true });
    OBJECTS.database = db;
    const curentTarget = e.target as IDBOpenDBRequest;
    const tr = curentTarget.transaction;
    if (tr !== null) {
      const store = tr.objectStore('game_data');
      createScope(store, 300, 'Влад', 'Испалов', 'IspalV@mail.ru', '0');
      createScope(store, 270, 'Ivan', 'Stor', 'IvanS@yandex.ru', '0');
      createScope(store, 230, 'Anna', 'Krus', 'AK@mail.ru', '0');
      createScope(store, 215, 'Юля', 'Ромова', 'liska@gmail.ru', '0');
      createScope(store, 197, 'Стас', 'Громов', 'Grom@mail.ru', '0');
      createScope(store, 195, 'Vitaly', 'Main', 'ViMa@mail.ru', '0');
      createScope(store, 150, 'Семен', 'Городецкий', 'Sumrak@mail.ru', '0');
      createScope(store, 120, 'James', 'Bond', '007@gmail.ru', '0');
      createScope(store, 105, 'Kate', 'Stamenova', 'KakeS@mail.ru', '0');
      createScope(store, 70, 'Владимир', 'Путин', 'PyVl@mail.ru', '0');
    }
  };
  dbReq.onsuccess = () => {
    db = dbReq.result;
    OBJECTS.database = db;
  };
}

window.onload = () => {
  createdatabase();
  const appElement = document.body;
  if (!appElement) throw Error('App root element not found');

  const head = new Header();
  const headElement = head.create();
  appElement.appendChild(headElement);

  const app = new App(appElement);
  app.create();

  const footer = new Footer();
  const futerElement = footer.create();
  appElement.appendChild(futerElement);

  const registration = new Registration();
  const registrationElement = registration.create();
  appElement.appendChild(registrationElement);

  const cover = new Cover();
  const coverElement = cover.create();
  appElement.appendChild(coverElement);
};

window.onpopstate = () => {
  const rout = new Router();
  rout.create(window.location.hash);
};
