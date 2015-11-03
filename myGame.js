// Jill Rhoads

//var qObjArr = [{
//        "questionString": "A, B, C eller D?",
//        "questionAnswers": ["A", "B", "C", "D"],
//        "correctAnswer": 3
//        },
//    {
//        "questionString": "1, 2, 3, eller 4?",
//        "questionAnswers": ["1", "2", "3", "4"],
//        "correctAnswer": 1
//
//        }]

var qObjArr;
var qObj;
var pointsCorrect = 0;
var myTime;
var goToNextQ = true;

// TODO: 
// - Still having problems with timing of questions
// - need to do function documentation
// - Put all functions in .ready so that they aren't global and conflict with other future javascript files


$(document).ready(function () {
    getQuestions();
})

function getQuestions() {
    $.ajax({
        url: 'questions.json',
        type: 'get',
        dataType: 'json',
        cache: false,
        success: function (data) {
            qObjArr = data; // sets the returning data to the global var qObjArr
            // From: https://learn.jquery.com/ajax/
            //  Because the request is asynchronous, the rest of your code continues to execute while the request is being processed, so it's imperative that a callback be used to handle the response.
        },
        async: false // a really bad call here, but I can't get around it atm
    });

    qObj = qObjArr.shift();
    showQuestion(qObj);
}


// creates the HTML for the question
function showQuestion(dataObj) {
    goToNextQ = false;

    // first part is debugging code that tells me which function I am in...
    console.log(arguments.callee.toString().match(/function ([^\(]+)/)[1] + ": goToNextQ is set to " + goToNextQ);

    // print out the question itself
    $("#questionText").html(dataObj.questionString);

    $("#options").html(""); //clearing out any old options still left

    for (i = 0; i < dataObj.questionAnswers.length; i++) {

        // creates for each possible answer: <div id="optX" class="box">Answer</div>
        var optionsHtml = document.createElement("div");
        optionsHtml.innerHTML = dataObj.questionAnswers[i];
        optionsHtml.setAttribute("class", "box");
        optionsHtml.setAttribute("id", "opt" + (i + 1));
        $("#options").append(optionsHtml);
        $("#options").append("\n"); // seems to keep the boxes from touching each other

        // bind a click to the option
        $("#opt" + (i + 1)).on("click", fadeBoxes);
    }

    myTime = setTimeout(countdown, 3000);
}

function countdown() {
    console.log("Times up");
    showCorrectAns();
}


// fade all the boxes except the one you clicked on
function fadeBoxes(e) {
    // first part is debugging code that tells me which function I am in...
    console.log(arguments.callee.toString().match(/function ([^\(]+)/)[1] + ": goToNextQ is set to " + goToNextQ);

    clearTimeout(myTime); // stop the question timer

    var length = qObj.questionAnswers.length;

    for (var i = 0; i <= length; i++) {
        if (e.target.id != ("opt" + i)) {
            $("#opt" + i).fadeTo("slow", 0.4);
        }
    };

    myTime = setTimeout(showCorrectAns, 3000, e);
}

function showCorrectAns(e) {
    // first part is debugging code that tells me which function I am in...
    console.log("BEGIN: " + arguments.callee.toString().match(/function ([^\(]+)/)[1] + ": goToNextQ is set to " + goToNextQ);

    try {
        if (e.target.id == ("opt" + qObj.correctAnswer)) { //should really use a try/catch here - the user may not have chosen anything
            if (!goToNextQ) {
                pointsCorrect++;
            }
        }
    } catch (err) {} //the user may never have clicked anything

    var length = qObj.questionAnswers.length;

    // change the incorrect boxes color to red and fade into background
    for (var i = 0; i <= length; i++) {
        if (i != qObj.correctAnswer) {
            $("#opt" + i).fadeTo(800, 0.2);
            $("#opt" + i).animate({
                backgroundColor: 'red'
            });

        }
    };

    // change the correct answer to green and let it fade forward
    $("#opt" + qObj.correctAnswer).animate({
        backgroundColor: '#47DC4C'
    });
    $("#opt" + qObj.correctAnswer).fadeTo(800, 1);

    console.log("Points: " + pointsCorrect);

    goToNextQ = true;

    // first part is debugging code that tells me which function I am in...
    console.log("BEGIN: " + arguments.callee.toString().match(/function ([^\(]+)/)[1] + ": goToNextQ is set to " + goToNextQ);

    if (qObjArr.length) {
        qObj = qObjArr.shift();
        showQuestion(qObj);
    } else {
        console.log("----- END OF GAME -----")
    }

    myTime = setTimeout(showCorrectAns, 3000);
}