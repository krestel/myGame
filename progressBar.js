// Proof of concept for a progress bar showing how much time the user has to answer the question

var debug = false;

$(document).ready(function () {
    debug = true;
    //for (i = 100; i >= 0; i -= 10) {
    //  if (debug) console.log("width: " + i + "%");
    changeProgressBar(100);
    setTimeout(myTick, 1000);
    changeProgressBar(90);
    setTimeout(myTick, 1000);
    changeProgressBar(80);

    //}
});

function myTick() {
    if (debug) console.log("Tick");
}

function changeProgressBar(num) {
    $(".progress").css("visibility", "visible");
    $(".progress-bar-info").css({
        "width": (num + "%"),

    });
    // setTimeout(myTick, 1000);
}



//http://stackoverflow.com/questions/14910762/javascript-countdown-with-twitter-bootstrap-progress-bar

//    <div class="progress-bar progress-bar-info progress-bar-striped active" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width:60%">
//         Time ticking
//    </div>
//    <div class="progress-bar progress-bar-warning progress-bar-striped active" role="progressbar" style="width:30%">
//         Warning
//    </div>
//    <div class="progress-bar progress-bar-danger progress-bar-striped active" role="progressbar" style="width:10%">
//         Danger
//    </div>