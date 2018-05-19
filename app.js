const pomodoroModel = (function() {
    let breakTime = 5;
    let sessionTime = 25;

    let minutes = 0;
    let secondes = 0;

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
        },
        getCurrentTime: function() {
            return {
                min: minutes,
                sec: secondes
            };
        },
        setCurrentTime: function(min, sec) {
            minutes = min;
            secondes = sec;
        }
    };
})();

const pomodoroView = (function() {
    const elmIds = {
        minutes: document.getElementById('min'),
        secondes: document.getElementById('sec'),
        playPause: document.getElementById('control'),
        reset: document.getElementById('reset'),

        break: document.getElementById('break-minutes'),
        breakPluse: document.getElementById('break-plus'),
        breakMinus: document.getElementById('break-minus'),

        session: document.getElementById('session-minutes'),
        sessionPluse: document.getElementById('session-plus'),
        sessionMinus: document.getElementById('session-minus')
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
        },
        renderCurrentTime: function(min, sec) {
            elmIds.minutes.innerText = min < 10 ? '0' + min : min;
            elmIds.secondes.innerText = sec < 10 ? '0' + sec : sec;
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
        if (model.getSessionTime() < 60 && countDown.type !== 'session') {
            model.setSessionTime('add');
            view.renderSessionTime(model.getSessionTime());
            if (countDown.type === 'inactive' && !countDown.running) {
                updateCurrentTime();
            }
        }
    });

    view.dom().sessionMinus.addEventListener('click', function() {
        // Decrease session time
        if (model.getSessionTime() > 25 && countDown.type !== 'session') {
            model.setSessionTime('subtract');
            view.renderSessionTime(model.getSessionTime());
            if (countDown.type === 'inactive' && !countDown.running) {
                updateCurrentTime();
            }
        }
    });

    const updateCurrentTime = function() {
        model.setCurrentTime(model.getSessionTime(), 0);
        view.renderCurrentTime(
            model.getCurrentTime().min,
            model.getCurrentTime().sec
        );
    };

    const play = function() {
        countDown.play();
        countDown.running = true;
        if (countDown.type === 'inactive') {
            countDown.type = 'session';
        }
    };

    const pause = function() {
        countDown.pause();
        countDown.running = false;
    };

    const reset = function() {
        countDown.pause();
        countDown.running = false;
        countDown.type = 'inactive';
        updateCurrentTime();
    };

    const countDown = {
        running: false,
        type: 'inactive',
        newCounter: null,
        watch: function() {
            if (
                model.getCurrentTime().min === 0 &&
                model.getCurrentTime().sec === 0
            ) {
                if (countDown.type === 'session') {
                    model.setCurrentTime(model.getBreakTime() - 1, 59);
                    countDown.type = 'break';
                } else if (countDown.type === 'break') {
                    reset();
                }
            } else if (model.getCurrentTime().sec === 0) {
                model.setCurrentTime(model.getCurrentTime().min - 1, 59);
            } else {
                model.setCurrentTime(
                    model.getCurrentTime().min,
                    model.getCurrentTime().sec - 1
                );
            }

            view.renderCurrentTime(
                model.getCurrentTime().min,
                model.getCurrentTime().sec
            );
        },
        play: function() {
            this.newCounter = setInterval(this.watch, 1000);
        },
        pause: function() {
            clearInterval(this.newCounter);
        }
    };

    return {
        init: function() {
            reset();
            view.renderBreakTime(model.getBreakTime());
            view.renderSessionTime(model.getSessionTime());
        }
    };
})(pomodoroModel, pomodoroView);

pomodoroContorller.init();
