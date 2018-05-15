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
    
})();


const pomodoroContorller = (function(model, view) {

})(pomodoroModel, pomodoroView);