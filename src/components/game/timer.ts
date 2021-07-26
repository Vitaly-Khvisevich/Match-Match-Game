import { PROGRAM_DATA, RESULT_DATA } from '../game_settings';

const watch = document.getElementsByClassName('watch');
let milliseconds = 0;
let timer: NodeJS.Timeout;

export const startWatch = (): void => {
  watch[0].classList.remove('paused');
  clearInterval(timer);
  timer = setInterval(() => {
    milliseconds += 10;
    const dateTimer = new Date(milliseconds);
    RESULT_DATA.UTCHours = `0${dateTimer.getUTCHours()}`.slice(-2);
    RESULT_DATA.UTCMinutes = `0${dateTimer.getUTCMinutes()}`.slice(-2);
    RESULT_DATA.UTCSeconds = `0${dateTimer.getUTCSeconds()}`.slice(-2);
    RESULT_DATA.UTCMilliseconds = `0${dateTimer.getUTCMilliseconds()}`.slice(
      -3,
      -1
    );
    watch[0].innerHTML = `
    ${RESULT_DATA.UTCHours}:${RESULT_DATA.UTCMinutes}:${RESULT_DATA.UTCSeconds}:${RESULT_DATA.UTCMilliseconds}`;
  }, 10);
};

export const pauseWatch = (): void => {
  watch[0].classList.add('paused');

  clearInterval(timer);
};

export const resetWatch = (): void => {
  watch[0].classList.add('paused');
  clearInterval(timer);
  milliseconds = 0;
  watch[0].innerHTML = '00:00:00:00';
};

export const backtimer = (): void => {
  let ShowTime = PROGRAM_DATA.CardShowTime;
  watch[0].classList.remove('not_visible');
  setInterval(() => {
    const seconds = `0${ShowTime - 1}`.slice(-2);
    if (ShowTime <= 0) {
      clearInterval();
    } else {
      const strTimer = `00:00:${seconds}:00`;
      watch[0].innerHTML = strTimer;
    }
    --ShowTime; // Уменьшаем таймер
  }, 1000);
};
