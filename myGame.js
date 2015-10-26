// Jill Rhoads
var qObjArr = [{
        "questionString": "A, B, C eller D?",
        "questionAnswers": ["A", "B", "C", "D"],
        "correctAnswer": 3
        },
    {
        "questionString": "1, 2, 3, eller 4?",
        "questionAnswers": ["1", "2", "3", "4"],
        "correctAnswer": 1

        }]

var qObj = ""; // a temporary object to make the code more readable

var pointsCorrect = 0;

var myTime;

$(document).ready(function () {

    //while (qObjArr.length) {
    qObj = qObjArr.shift(); // set the object to a question
    qObj = qObjArr.shift();
    showQuestion(qObj);

    // console.log("end of game")
});


// creates the HTML for the question
function showQuestion(dataObj) {
    // print out the question itself
    $("#questionText").html(dataObj.questionString);

    // Create the multiple choice options html
    var length = dataObj.questionAnswers.length;

    for (i = 0; i < length; i++) {

        // creates for each possible answer: <div id="optX" class="box">Answer</div>
        var optionsHtml = document.createElement("div");
        optionsHtml.innerHTML = dataObj.questionAnswers[i];
        optionsHtml.setAttribute("class", "box");
        optionsHtml.setAttribute("id", "opt" + (i + 1));
        $("#options").append(optionsHtml);

        $("#options").append("\n"); // seems to keep the boxes from touching each other

        // bind a click to something
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
    clearTimeout(myTime); // stop the question timer

    var length = qObj.questionAnswers.length;

    for (var i = 0; i <= length; i++) {
        if (e.target.id != ("opt" + i)) {
            $("#opt" + i).fadeTo("slow", 0.4);
        }
    };

    setTimeout(showCorrectAns, 3000, e);
}

function showCorrectAns(e) {

    try {
        if (e.target.id == ("opt" + qObj.correctAnswer)) { //should really use a try/catch here - the user may not have chosen anything
            pointsCorrect++;
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
        backgroundColor: 'green'
    });
    $("#opt" + qObj.correctAnswer).fadeTo(800, 1);

    console.log("Points: " + pointsCorrect)
}