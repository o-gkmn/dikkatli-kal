var startTimerButton = document.getElementById("StartTimerButton");

var timertime = document.getElementById("TimerTime");

var whour = document.getElementById("whour");
var wminute = document.getElementById("wminute");
var wsecond = document.getElementById("wsecond");

var bhour = document.getElementById("bhour");
var bminute = document.getElementById("bminute");
var bsecond = document.getElementById("bsecond");

var loopCount = document.getElementById("loopCount");

var flag = false;
var workingFlag = true;
var turnCount = parseInt(loopCount.value);
var decreasedTurnCount = parseInt(loopCount.value);

var duehour = parseInt(whour.value);
var dueminute = parseInt(wminute.value);
var duesecond = parseInt(wsecond.value);

var duetime = new Date(0, 0, 0, duehour, dueminute, duesecond);
var targettime = new Date(0, 0, 0, 0, 0, 0);
var diff = duetime - targettime;

displayCounter(duehour, dueminute, duesecond);

function setBreakTime() {
    duehour = parseInt(bhour.value);
    dueminute = parseInt(bminute.value);
    duesecond = parseInt(bsecond.value);
}

function setWorkingTime() {
    duehour = parseInt(whour.value);
    dueminute = parseInt(wminute.value);
    duesecond = parseInt(wsecond.value);
}

function reCalculateDuetime() {
    duetime.setHours(duehour, dueminute, duesecond);
    diff = duetime - targettime;
    displayCounter(duehour, dueminute, duesecond);
}

function isBreakTimeOrWorkingTime() {
    workingFlag = !workingFlag;
    setBreakTimeOrWorkingTime();
}

function setBreakTimeOrWorkingTime() {
    if (workingFlag) {
        setWorkingTime();
        reCalculateDuetime();
    } else {
        setBreakTime();
        reCalculateDuetime();
    }
}

function isTurnsCompleted() {
    console.log("turncount" + turnCount);
    console.log("decreasedTurnCount" + decreasedTurnCount);
    if (decreasedTurnCount == 0) {
        alert("başarılı");
    }
}

function displayCounter(hours, minutes, seconds) {
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    timertime.innerHTML = hours + " : " + minutes + " : " + seconds;
}

function stopTimer() {
    flag = true;
}

startTimerButton.addEventListener("click", () => {
    var interval = setInterval(timer, 1000);
    function timer() {
        if (flag) {
            clearInterval(interval);
        }
        if (diff == 0) {
            clearInterval(interval);
            isBreakTimeOrWorkingTime();
            decreasedTurnCount -= 0.5;
            isTurnsCompleted();
            return;
        }

        diff = diff - 1000;

        var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((diff % (1000 * 60)) / 1000);

        displayCounter(hours, minutes, seconds);

        flag = false;
    }
});

whour.addEventListener("change", () => setBreakTimeOrWorkingTime());
wminute.addEventListener("change", () => setBreakTimeOrWorkingTime());
wsecond.addEventListener("change", () => setBreakTimeOrWorkingTime());
bhour.addEventListener("change", () => setBreakTimeOrWorkingTime());
bminute.addEventListener("change", () => setBreakTimeOrWorkingTime());
bsecond.addEventListener("change", () => setBreakTimeOrWorkingTime());
loopCount.addEventListener("change", () => { 
    decreasedTurnCount = parseInt(loopCount.value) - (turnCount - decreasedTurnCount) 
    turnCount = parseInt(loopCount.value);
});