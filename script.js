/*
    #  #                                #  #


##########  #########  ##########  ##       ##  ###########
##########	########   ##########  ##       ##  ##       ##
##	    ##       ##    ##          ##       ##  ##       ##
##	    ##      ##     ##   #####  ##       ##  ###########
##	    ##     ##      ##   #####  ##       ##  ####
##	    ##    ##       ##      ##  ##       ##  ##  ##
##########   ########  ##########  ###########  ##   ##
##########  #########  ##########  ###########  ##     ######################
*/

var startTimerButton = document.getElementById("StartTimerButton");
var stopTimerButton = document.getElementById("StopTimerButton");

var timertime = document.getElementById("TimerTime");
var puanText = document.getElementById("Puan");

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
var puan = 0;

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
    if (decreasedTurnCount == 0) {
        alert("TUR SAYINI TAMAMLADIN +50");
        puan += 50;
        puanText.innerHTML = puan;
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

stopTimerButton.addEventListener("click", () => puan-=10);

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
            puan += 50/(turnCount*2);
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


whour.addEventListener("change", () => {
    if(decreasedTurnCount != turnCount){
        puan -= 10;
    }
    setBreakTimeOrWorkingTime();
});
wminute.addEventListener("change", () => {
    if(decreasedTurnCount != turnCount){
        puan -= 10;
    }
    setBreakTimeOrWorkingTime();
});
wsecond.addEventListener("change", () => {
    if(decreasedTurnCount != turnCount){
        puan -= 10;
    }
    setBreakTimeOrWorkingTime();
});
bhour.addEventListener("change", () => {
    if(decreasedTurnCount != turnCount){
        puan -= 10;
    }
    setBreakTimeOrWorkingTime();
});
bminute.addEventListener("change", () => {
    if(decreasedTurnCount != turnCount){
        puan -= 10;
    }
    setBreakTimeOrWorkingTime();
});
bsecond.addEventListener("change", () => {
    if(decreasedTurnCount != turnCount){
        puan -= 10;
    }
    setBreakTimeOrWorkingTime();
});
loopCount.addEventListener("change", () => {
    if(decreasedTurnCount != turnCount){
        puan -= 10;
    }
    decreasedTurnCount = parseInt(loopCount.value) - (turnCount - decreasedTurnCount) 
    turnCount = parseInt(loopCount.value);
});