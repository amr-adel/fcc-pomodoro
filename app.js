const pomodoroModel = (function() {
    let breakTime = 3;
    let sessionTime = 5;

    return {
        getBreakTime: function() {
            return breakTime;
        },
        setBreakTime: function(type) {
            type === 'add' ? breakTime++ : breakTime--;
        },
        getSessionTime: function() {
            return sessionTime;
        },
        setSessionTime: function(type) {
            type === 'add' ? (sessionTime += 5) : (sessionTime -= 5);
        }
    };
})();

const pomodoroView = (function() {
    const elmIds = {
        minutes: document.getElementById('min'),
        secondes: document.getElementById('sec'),
        playPause: document.getElementById('control'),
        reset: document.getElementById('reset'),
        timerType: document.getElementById('timer-type'),
        timerIcon: document.getElementById('icon'),
        progressCircle: document.getElementById('progress-circle'),

        break: document.getElementById('break-minutes'),
        breakPluse: document.getElementById('break-plus'),
        breakMinus: document.getElementById('break-minus'),

        session: document.getElementById('session-minutes'),
        sessionPluse: document.getElementById('session-plus'),
        sessionMinus: document.getElementById('session-minus')
    };

    let circleMax = 0;

    const updateCircle = function(current) {
        if ((current * 100) % circleMax === 0) {
            if (current * 100 / circleMax <= 50) {
                elmIds.progressCircle.setAttribute(
                    'class',
                    `progress-circle p${current * 100 / circleMax}`
                );
            } else {
                elmIds.progressCircle.setAttribute(
                    'class',
                    `progress-circle over50 p${current * 100 / circleMax}`
                );
            }
            // console.log(current * 100 / circleMax);
        }
    };

    return {
        dom: function() {
            return elmIds;
        },
        renderBreakTime: function(value) {
            elmIds.break.innerText = value;
        },
        renderSessionTime: function(value) {
            elmIds.session.innerText = value;
            this.setCircleMax(value);
        },
        setCircleMax: function(max) {
            circleMax = max * 60;
            // console.log(circleMax);
        },
        renderCurrentTime: function(min, sec) {
            elmIds.minutes.innerText = min < 10 ? '0' + min : min;
            elmIds.secondes.innerText = sec < 10 ? '0' + sec : sec;
            updateCircle(min * 60 + sec);
        },
        init: function(current, breakTime, sessionTime) {
            elmIds.timerType.innerText = '';
            elmIds.timerIcon.setAttribute('xlink:href', 'icons.svg#icon-play');
            this.renderCurrentTime(current.min, current.sec);
            this.renderBreakTime(breakTime);
            this.renderSessionTime(sessionTime);
        }
    };
})();

const pomodoroContorller = (function(model, view) {
    view.dom().playPause.addEventListener('click', function() {
        // Play/Pause action
        !countDown.running ? play() : pause();
    });

    view.dom().reset.addEventListener('click', function() {
        // Reset timer
        reset();
    });

    view.dom().breakPluse.addEventListener('click', function() {
        // Increase break time
        if (model.getBreakTime() < 15 && countDown.type !== 'break') {
            model.setBreakTime('add');
            view.renderBreakTime(model.getBreakTime());
        }
    });

    view.dom().breakMinus.addEventListener('click', function() {
        // Decrease break time
        if (model.getBreakTime() > 5 && countDown.type !== 'break') {
            model.setBreakTime('subtract');
            view.renderBreakTime(model.getBreakTime());
        }
    });

    view.dom().sessionPluse.addEventListener('click', function() {
        // Increase session time
        if (model.getSessionTime() < 60 && countDown.type === 'inactive') {
            model.setSessionTime('add');
            view.renderSessionTime(model.getSessionTime());
            resetCurrentTime();
        }
    });

    view.dom().sessionMinus.addEventListener('click', function() {
        // Decrease session time
        if (model.getSessionTime() > 25 && countDown.type === 'inactive') {
            model.setSessionTime('subtract');
            view.renderSessionTime(model.getSessionTime());
            resetCurrentTime();
        }
    });

    const resetCurrentTime = function() {
        countDown.currentTime.min = model.getSessionTime();
        countDown.currentTime.sec = 0;
        view.renderCurrentTime(
            countDown.currentTime.min,
            countDown.currentTime.sec
        );
    };

    const play = function() {
        countDown.play();
        countDown.running = true;
        if (countDown.type === 'inactive') {
            countDown.type = 'session';
            view.dom().timerType.innerText = countDown.type;
        }
        view.dom().timerIcon.setAttribute('xlink:href', 'icons.svg#icon-pause');
    };

    const pause = function() {
        countDown.pause();
        countDown.running = false;
        view.dom().timerIcon.setAttribute('xlink:href', 'icons.svg#icon-play');
    };

    const reset = function() {
        pause();
        resetCurrentTime();
        countDown.type = 'inactive';
        view.init(
            countDown.currentTime,
            model.getBreakTime(),
            model.getSessionTime()
        );
    };

    const countDown = {
        running: false,
        type: 'inactive',
        newCounter: null,
        currentTime: {
            min: 0,
            sec: 0
        },
        watch: function() {
            if (
                countDown.currentTime.min === 0 &&
                countDown.currentTime.sec === 0
            ) {
                if (countDown.type === 'session') {
                    countDown.currentTime.min = model.getBreakTime() - 1;
                    countDown.currentTime.sec = 59;

                    countDown.type = 'break';
                    view.dom().timerType.innerText = countDown.type;
                    view.setCircleMax(model.getBreakTime());
                } else if (countDown.type === 'break') {
                    reset();
                }
            } else if (countDown.currentTime.sec === 0) {
                countDown.currentTime.min--;
                countDown.currentTime.sec = 59;
            } else {
                countDown.currentTime.sec--;
            }

            view.renderCurrentTime(
                countDown.currentTime.min,
                countDown.currentTime.sec
            );
        },
        play: function() {
            this.newCounter = setInterval(this.watch, 100);
        },
        pause: function() {
            clearInterval(this.newCounter);
        }
    };

    return {
        init: function() {
            reset();
        }
    };
})(pomodoroModel, pomodoroView);

pomodoroContorller.init();
