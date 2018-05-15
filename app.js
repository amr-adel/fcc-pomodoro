const pomodoroModel = (function () {

    let breakTime = 5;
    let sessionTime = 25;

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
            type === 'add' ? sessionTime++ : sessionTime--;
        },
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
        sessionMinus: document.getElementById('session-minus'),
    }

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
    };

})();


const pomodoroContorller = (function(model, view) {

    view.dom().playPause.addEventListener('click', function() {
        // Play/Pause action
        console.log('Play');
    });

    view.dom().reset.addEventListener('click', function () {
        // Reset timer
        console.log('Reset');
    });

    view.dom().breakPluse.addEventListener('click', function () {
        // Increase break time
        if (model.getBreakTime() < 15) {
            model.setBreakTime('add');
            view.renderBreakTime(model.getBreakTime());
        }
    })

    view.dom().breakMinus.addEventListener('click', function () {
        // Decrease break time
        if (model.getBreakTime() > 5) {
            model.setBreakTime('subtract');
            view.renderBreakTime(model.getBreakTime());
        }
    });

    view.dom().sessionPluse.addEventListener('click', function () {
        // Increase session time
        if (model.getSessionTime() < 60) {
            model.setSessionTime('add');
            view.renderSessionTime(model.getSessionTime());
        }
    });

    view.dom().sessionMinus.addEventListener('click', function () {
        // Decrease session time
        if (model.getSessionTime() > 25) {
            model.setSessionTime('subtract');
            view.renderSessionTime(model.getSessionTime());
        }
        
    });

})(pomodoroModel, pomodoroView);