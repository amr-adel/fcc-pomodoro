const pomodoroModel = (function () {

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
        }
    };

})();


const pomodoroContorller = (function(model, view) {

    view.dom().playPause.addEventListener('click', function() {
        // Play/Pause action
    });

    view.dom().reset.addEventListener('click', function () {
        // Reset timer
    });

    view.dom().breakPluse.addEventListener('click', function () {
        // Increase break time
    })

    view.dom().breakMinus.addEventListener('click', function () {
        // Decrease break time
    });

    view.dom().sessionPluse.addEventListener('click', function () {
        // Increase session time
    });

    view.dom().sessionMinus.addEventListener('click', function () {
        // Decrease session time
    });

})(pomodoroModel, pomodoroView);