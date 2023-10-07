const WORK_TIME = 25;
const SHORT_BREAK_TIME = 5;
const LONG_BREAK_TIME = 15;

class Pomodoro {
  started = false
  goalTime = 0
  minutes = 0
  seconds = 0
  width = 0
  fillerIncrement = 0
  interval = null
  minutesDom = null
  secondsDom = null
  fillerDom = null
  browserWidth = window.visualViewport.width
  elapsedTime = 0
  status = 'idle'
  workRounds = 0
  buttons

  constructor() {
    var self = this;
    this.minutesDom = document.querySelector('#minutes');
    this.secondsDom = document.querySelector('#seconds');
    this.fillerDom = document.querySelector('#filler');
    this.fillerDom.style.width = '0px';
    this.interval = setInterval(function () {
      self.intervalCallback.apply(self);
    }, 1000);
    document.querySelector('#work').addEventListener('click', function () {
      self.startWork.apply(self);
    });
    document.querySelector('#shortBreak').addEventListener('click', function () {
      self.startShortBreak.apply(self);
    });
    document.querySelector('#longBreak').addEventListener('click', function () {
      self.startLongBreak.apply(self);
    });
    document.querySelector('#reset').addEventListener('click', function () {
      self.resetTimer.apply(self);
    });
    window.visualViewport.addEventListener('resize', function () {
      self.browserWidth = window.visualViewport.width;
    });
    this.buttons = document.querySelectorAll('.button');

    this.buttons.forEach((button) => {
      button.addEventListener('click', (e) => {
        this.setActiveButton(e.target);
      });
    });
  }

  setActiveButton(button) {
    this.buttons.forEach((btn) => {
      btn.classList.remove('active');
    });
    button.classList.add('active');
  }

  resetVariables(mins, secs, started) {
    this.elapsedTime = 0;
    this.minutes = mins;
    this.seconds = secs;
    this.started = started;
    this.width = 0;
    this.goalTime = mins * 60 + secs;
  }

  startWork() {
    this.resetVariables(WORK_TIME, 0, true);
    this.status = 'work';
    this.workRounds++;
  }

  startShortBreak() {
    this.resetVariables(SHORT_BREAK_TIME, 0, true);
    this.status = 'shortBreak';
  }

  startLongBreak() {
    this.resetVariables(LONG_BREAK_TIME, 0, true);
    this.status = 'longBreak';
    this.workRounds = 0;
  }

  resetTimer() {
    this.resetVariables(WORK_TIME, 0, false);
    this.updateDom();
    this.status = 'idle';
  }

  toDoubleDigit(num) {
    if (num < 10) {
      return "0" + parseInt(num, 10);
    }
    return num;
  }

  updateDom() {
    this.minutesDom.innerHTML = this.toDoubleDigit(this.minutes);
    this.secondsDom.innerHTML = this.toDoubleDigit(this.seconds);
    this.elapsedTime++;
    this.width = (this.elapsedTime / this.goalTime) * this.browserWidth;
    this.fillerDom.style.width = this.width + 'px';
  }

  intervalCallback() {
    if (!this.started) return false;
    if (this.seconds == 0) {
      if (this.minutes == 0) {
        this.timerComplete();
        return;
      }
      this.seconds = 59;
      this.minutes--;
    } else {
      this.seconds--;
    }
    this.updateDom();
  };

  timerComplete() {
    this.width = 0;
    switch (this.status) {
      case 'work':
        if (this.workRounds / 4 === 1) {
          this.startLongBreak();
          break;
        }
        this.startShortBreak();
        break;
      case 'shortBreak':
        this.startWork();
        break;
      case 'longBreak':
        this.startWork();
        break;
    }
    this.setActiveButton(document.querySelector(`#${this.status}`));

    this.fillerDom.classList.add('blink');
  }
}

export default Pomodoro;
