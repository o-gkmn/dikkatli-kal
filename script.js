var startTimerButton = document.getElementById("StartTimerButton");
var stopTimerButton = document.getElementById("StopTimerButton");
var timerTime = document.getElementById("TimerTime");

var whour = document.getElementById("whour");
var wminute = document.getElementById("wminute");
var wsecond = document.getElementById("wsecond");

var whourValue = whour.value;
var wminuteValue = wminute.value;
var wsecondValue = wsecond.value;

whour.addEventListener("onchange", () => whourValue = whour.value);
wminute.addEventListener("onchange", () => wminuteValue = wminute.value);
wsecond.addEventListener("onchange", () => wsecondValue = wsecond.value);

var deadline = new Date();

var deadlineHours = Math.floor((deadline % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) + 3 + parseInt(whourValue);
var deadlineMinutes = Math.floor((deadline % (1000 * 60 * 60)) / (1000 * 60)) + parseInt(wminuteValue);
var deadlineSeconds = Math.floor((deadline % (1000 * 60)) / 1000) + parseInt(wsecondValue);

whour.addEventListener("onchange", ()=> {

});

deadline.setHours(deadlineHours, deadlineMinutes, deadlineSeconds);

var flag = false;

startTimerButton.addEventListener("click", () => {
    var interval = setInterval(timer, 1000);
    function timer() {
        var currentTime = new Date();
        var distance = deadline - currentTime;
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        timerTime.innerHTML = hours + " : " + minutes + " : " + seconds;
        if ((hours == 0 && minutes == 0 && seconds == 0 )|| flag) {
            clearInterval(interval);
        }
        flag = false;
    }
});

function stopTimer(){
    flag = true;
}