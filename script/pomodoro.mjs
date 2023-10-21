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

  constructor() {
    var self = this;
    this.minutesDom = document.querySelector('#minutes');
    this.secondsDom = document.querySelector('#seconds');
    this.fillerDom = document.querySelector('#filler');
    this.fillerDom.style.width = '0px';
    this.interval = setInterval(function () {
      self.intervalCallback.apply(self);
    }, 1000);
    document.querySelector('#work').onclick = function () {
      self.startWork.apply(self);
    };
    document.querySelector('#shortBreak').onclick = function () {
      self.startShortBreak.apply(self);
    };
    document.querySelector('#longBreak').onclick = function () {
      self.startLongBreak.apply(self);
    };
    document.querySelector('#reset').onclick = function () {
      self.resetTimer.apply(self);
    };
    window.visualViewport.addEventListener('resize', function () {
      self.browserWidth = window.visualViewport.width;
    });

    const buttons = document.querySelectorAll('.button');
    buttons.forEach((button) => {
      button.addEventListener('click', (e) => {
        const btns = document.querySelectorAll('.button');
        btns.forEach((btn) => {
          btn.classList.remove('active');
        });
        e.target.classList.add('active');
      });
    });
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
    this.resetVariables(25, 0, true);
  }

  startShortBreak() {
    this.resetVariables(5, 0, true);
  }

  startLongBreak() {
    this.resetVariables(15, 0, true);
  }

  resetTimer() {
    this.resetVariables(25, 0, false);
    this.updateDom();
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
    this.started = false;
    this.width = 0;
  }
}

export default Pomodoro;

function randombg(){
  var random= Math.floor(Math.random() * 6) + 0;
  var bigSize = ["url('http://placehold.it/300&text=banner1')",
                 "url('http://placehold.it/300&text=banner2')",
                 "url('http://placehold.it/300&text=banner3')",
                 "url('http://placehold.it/300&text=banner4')",
                 "url('http://placehold.it/300&text=banner5')",
                 "url('http://placehold.it/300&text=banner6')"];
  document.getElementById("random").style.backgroundImage=bigSize[random];
}