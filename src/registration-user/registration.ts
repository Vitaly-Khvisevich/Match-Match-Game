import { BaseComponent } from '../components/base-component';
import './registration.scss';
import { OBJECTS, RESULT_DATA } from '../components/game_settings';

const button = document.getElementsByClassName('button-victory');
export class Registration extends BaseComponent {
  create(): HTMLElement {
    super.create('div', ['registration-cont']);
    this.element.classList.add('not_visible');
    const RegForm = document.createElement('div');
    Registration.addElementShortCode(
      RegForm,
      'registration-form',
      this.element
    );
    const victory = document.createElement('div');
    Registration.addElementShortCode(victory, 'victory-cont', RegForm);

    const title = document.createElement('p');
    title.textContent = 'Victory';
    Registration.addElementShortCode(title, 'victory-title', victory);

    const ImgCont = document.createElement('div');
    Registration.addElementShortCode(ImgCont, 'ImgCont', RegForm);

    const UserPic = document.createElement('img');
    UserPic.src = './add_user.svg';
    ImgCont.appendChild(UserPic);

    const ScopeCont = document.createElement('div');
    Registration.addElementShortCode(ScopeCont, 'scope-cont', RegForm);

    const ResulTtitle = document.createElement('p');
    ResulTtitle.textContent = 'Your result is: ';
    Registration.addElementShortCode(ResulTtitle, 'result-title', ScopeCont);

    const Resul = document.createElement('p');
    Resul.textContent = 'result';
    Registration.addElementShortCode(Resul, 'result', ScopeCont);

    const QuestionsCont = document.createElement('div');
    Registration.addElementShortCode(QuestionsCont, 'questions-cont', RegForm);

    const questions = document.createElement('p');
    questions.textContent =
      'If you want to add a result to the high score table, please register.';
    Registration.addElementShortCode(questions, 'questions', QuestionsCont);

    const FormCont = document.createElement('div');
    Registration.addElementShortCode(FormCont, 'form-cont', RegForm);

    Registration.create_form(RegForm);
    return this.element;
  }

  static create_form(master_element: HTMLDivElement): void {
    const form = document.createElement('form');
    form.noValidate = true;
    Registration.addElementShortCode(form, 'form-active', master_element);

    const nameError = document.createElement('span');
    const InputName = document.createElement('input');
    Registration.createNameBox(form, InputName, nameError);

    const surnameError = document.createElement('span');
    const InputSurname = document.createElement('input');
    Registration.createSurnameBox(form, InputSurname, surnameError);

    const emailError = document.createElement('span');
    const InputEmail = document.createElement('input');
    Registration.createMailBox(form, InputEmail, emailError);

    const InputPhoto = document.createElement('input');
    Registration.createPhotoBox(form, InputPhoto);

    const ButtonSubmit = document.createElement('input');
    ButtonSubmit.addEventListener('mousedown', () => {
      Registration.validate(
        InputName,
        InputSurname,
        InputEmail,
        InputPhoto,
        nameError,
        surnameError,
        emailError
      );
    });
    Registration.shortCode(ButtonSubmit, 'button', 'button-victory');
    ButtonSubmit.value = 'Add user';
    form.appendChild(ButtonSubmit);

    const ButtonCansel = document.createElement('input');
    ButtonCansel.addEventListener('mousedown', () => {
      window.location.hash = '#about';
    });
    Registration.shortCode(ButtonCansel, 'button', 'cansel-victory');
    ButtonCansel.value = 'Cansel';
    form.appendChild(ButtonCansel);
  }

  static remove_error(Input: HTMLInputElement, span: HTMLSpanElement): void {
    Input.classList.remove('input-invalid');
    span.textContent = '';
    button[0].removeAttribute('disabled');
  }

  static validate(
    InputName: HTMLInputElement,
    InputSurname: HTMLInputElement,
    InputEmail: HTMLInputElement,
    InputPhoto: HTMLInputElement,
    nameError: HTMLSpanElement,
    surnameError: HTMLSpanElement,
    emailError: HTMLSpanElement
  ): void {
    const promis = new Promise((resolve) => {
      if (InputPhoto.files !== null && InputPhoto.files.length > 0) {
        resolve(Registration.convert_photo(InputPhoto.files[0]));
      } else resolve('0');
    });
    promis.then((value) => {
      const photo = value;
      let Name = Registration.no_empty(InputName, nameError);
      let Surname = Registration.no_empty(InputSurname, surnameError);
      let Email = Registration.no_empty(InputEmail, emailError);
      if (Name === true && Surname === true && Email === true) {
        Name = Registration.no_number(InputName, nameError);
        Surname = Registration.no_number(InputSurname, surnameError);
        Email = Registration.valid_email(InputEmail, emailError);
        if (Name === true && Surname === true && Email === true) {
          Name = Registration.no_sumbol(InputName, nameError);
          Surname = Registration.no_sumbol(InputSurname, surnameError);
          if (Name === true && Surname === true && Email === true) {
            if (
              InputName.value.length +
                InputSurname.value.length +
                InputEmail.value.length +
                2 <
              30
            ) {
              const tx = OBJECTS.database.transaction(
                ['game_data'],
                'readwrite'
              );
              const store = tx.objectStore('game_data');
              const note = {
                Result: RESULT_DATA.result,
                Name: InputName.value,
                Surname: InputSurname.value,
                Email: InputEmail.value,
                Photo: photo,
              };
              store.add(note);
              window.location.hash = '#best';
            } else {
              surnameError.textContent =
                'Your credentials exceed 30 characters';
              button[0].setAttribute('disabled', 'false');
            }
          }
        }
      }
    });
  }

  static convert_photo(photo: File): unknown {
    const file = photo;
    const reader = new FileReader();
    const promise = new Promise((resolve) => {
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(file);
    });
    return promise.then((value) => {
      return value;
    });
  }

  static no_empty(Input: HTMLInputElement, span: HTMLSpanElement): boolean {
    if (Input.value === '') {
      Input.classList.add('input-invalid');
      span.textContent = 'This field must not be empty';
      button[0].setAttribute('disabled', 'false');
      return false;
    }
    return true;
  }

  static no_number(Input: HTMLInputElement, span: HTMLSpanElement): boolean {
    const regexp = /[\p{Nd}]/gu;
    if (regexp.test(Input.value)) {
      Input.classList.add('input-invalid');
      span.textContent = 'This field must not contain numbers';
      button[0].setAttribute('disabled', 'false');
      return false;
    }
    return true;
  }

  static valid_email(Input: HTMLInputElement, span: HTMLSpanElement): boolean {
    const regexp =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (!regexp.test(Input.value)) {
      Input.classList.add('input-invalid');
      span.textContent = 'Check the correctness of the email address';
      button[0].setAttribute('disabled', 'false');
      return false;
    }
    return true;
  }

  static no_sumbol(Input: HTMLInputElement, span: HTMLSpanElement): boolean {
    const regexp = /[+*/\-!$=#@:;?>_"~^)('`<,.—%|]/g;
    if (regexp.test(Input.value)) {
      Input.classList.add('input-invalid');
      span.textContent = `Invalid characters: ~ ! @ #$ % * () _- + = |:; " ' > < , . ? / ^`;
      button[0].setAttribute('disabled', 'false');
      return false;
    }
    return true;
  }

  static shortCode(
    element: HTMLInputElement,
    type: string,
    className: string
  ): void {
    element.type = type;
    element.className = className;
  }

  static addElementShortCode(
    element: HTMLElement,
    className: string,
    parent: HTMLElement
  ): void {
    element.className = className;
    parent.appendChild(element);
  }

  static createSurnameBox(
    form: HTMLFormElement,
    InputSurname: HTMLInputElement,
    surnameError: HTMLSpanElement
  ): void {
    surnameError.className = 'surname-error';
    surnameError.classList.add('error');
    form.appendChild(surnameError);
    form.appendChild(document.createElement('br'));
    const LabelSurname = document.createElement('label');
    LabelSurname.className = 'label-surname';
    LabelSurname.textContent = 'Surname:';
    form.appendChild(LabelSurname);
    InputSurname.addEventListener('input', () =>
      Registration.remove_error(InputSurname, surnameError)
    );
    Registration.shortCode(InputSurname, 'text', 'input-surname');
    InputSurname.id = 'surname';
    form.appendChild(InputSurname);
    form.appendChild(document.createElement('br'));
  }

  static createNameBox(
    form: HTMLFormElement,
    InputName: HTMLInputElement,
    nameError: HTMLSpanElement
  ): void {
    nameError.className = 'name-error';
    nameError.classList.add('error');
    form.appendChild(nameError);
    form.appendChild(document.createElement('br'));
    const LabelName = document.createElement('label');
    LabelName.className = 'label-name';
    LabelName.textContent = 'Name:';
    form.appendChild(LabelName);
    InputName.addEventListener('input', () =>
      Registration.remove_error(InputName, nameError)
    );
    Registration.shortCode(InputName, 'text', 'input-name');
    InputName.id = 'name';
    form.appendChild(InputName);
    form.appendChild(document.createElement('br'));
  }

  static createMailBox(
    form: HTMLFormElement,
    InputEmail: HTMLInputElement,
    emailError: HTMLSpanElement
  ): void {
    emailError.className = 'email-error';
    emailError.classList.add('error');
    form.appendChild(emailError);
    form.appendChild(document.createElement('br'));
    const LabelEmail = document.createElement('label');
    LabelEmail.className = 'label-email';
    LabelEmail.textContent = 'Email:';
    form.appendChild(LabelEmail);
    InputEmail.addEventListener('input', () =>
      Registration.remove_error(InputEmail, emailError)
    );
    Registration.shortCode(InputEmail, 'text', 'input-email');
    InputEmail.id = 'email';
    form.appendChild(InputEmail);
    form.appendChild(document.createElement('br'));
  }

  static createPhotoBox(
    form: HTMLFormElement,
    InputPhoto: HTMLInputElement
  ): void {
    const LabelPhoto = document.createElement('label');
    LabelPhoto.className = 'label-photo';
    LabelPhoto.textContent = 'Photo:';
    form.appendChild(LabelPhoto);
    Registration.shortCode(InputPhoto, 'file', 'input-photo');
    InputPhoto.name = 'photo';
    InputPhoto.accept = 'image/*,image/jpeg';
    form.appendChild(InputPhoto);
    form.appendChild(document.createElement('br'));
  }
}
