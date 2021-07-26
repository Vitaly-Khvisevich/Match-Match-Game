import { BaseComponent } from '../../../base-component';
import './records.scss';
import { OBJECTS } from '../../../game_settings';

export class Records extends BaseComponent {
  create(): void {
    super.create('div', ['records']);
    const title = document.createElement('h6');
    title.className = 'title';
    title.textContent = 'Best players';
    this.element.appendChild(title);
    this.getAndDisplayNotes(OBJECTS.database);
  }

  createBestUser(
    fullname: string,
    user_email: string,
    user_photo_src: string,
    score: string
  ): void {
    const DivElement = document.createElement('div');
    DivElement.className = 'bestuser_cont';
    this.element.appendChild(DivElement);

    const UserCont = document.createElement('div');
    UserCont.className = 'user_cont';
    DivElement.appendChild(UserCont);

    const UserScope = document.createElement('div');
    UserScope.className = 'user_scope';
    DivElement.appendChild(UserScope);

    const UserPhoto = document.createElement('img');
    UserPhoto.src = user_photo_src;
    UserPhoto.alt = `${fullname.split(' ').join('_')}_pic`;
    UserPhoto.className = 'best_user_photo';
    UserCont.appendChild(UserPhoto);

    const UserInfo = document.createElement('div');
    UserInfo.className = 'user_info';
    UserCont.appendChild(UserInfo);

    const UserName = document.createElement('p');
    UserName.className = 'user_name';
    UserName.textContent = fullname;
    UserInfo.appendChild(UserName);

    const email = document.createElement('p');
    email.className = 'email';
    email.textContent = user_email;
    UserInfo.appendChild(email);

    const ScopeTitle = document.createElement('p');
    ScopeTitle.className = 'scope_title';
    ScopeTitle.textContent = 'Scope:';
    UserScope.appendChild(ScopeTitle);

    const scope = document.createElement('p');
    scope.className = 'scope';
    scope.textContent = score;
    UserScope.appendChild(scope);
  }

  getAndDisplayNotes = (db: IDBDatabase): void => {
    const tx = db.transaction(['game_data'], 'readonly');
    const store = tx.objectStore('game_data');
    const req = store.openCursor();
    const allNotes = [] as Array<Record<string, string>>;
    const promise = new Promise<Array<Record<string, string>>>((resolve) => {
      req.onsuccess = () => {
        const cursor = req.result;
        if (cursor != null) {
          allNotes.push(cursor.value);
          cursor.continue();
        } else resolve(allNotes);
      };
    });
    promise.then((value: Array<Record<string, string>>) => {
      const sortedArray = [] as Array<Record<string, string>>;
      while (value.length > 0) {
        let max = 0;
        let index = 0;
        for (let i = 0; i < value.length; i++) {
          if (Number(value[i].Result) >= max) {
            max = Number(value[i].Result);
            index = i;
          }
        }
        sortedArray.push(value[index]);
        value.splice(index, 1);
      }
      if (sortedArray.length > 10) {
        sortedArray.splice(10);
      }
      sortedArray.forEach((element: Record<string, string>) => {
        this.data_processing(element);
      });
    });
  };

  data_processing(element: Record<string, string>): void {
    let photo = '';
    if (element.Photo === '0') {
      photo = './avatar.svg';
    } else photo = element.Photo;
    const fullname = `${element.Name} ${element.Surname}`;
    this.createBestUser(fullname, element.Email, photo, element.Result);
  }
}
