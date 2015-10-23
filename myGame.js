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

var currentQuestion = 0;

$(document).ready(function () {
    console.log("starting");
    currentQuestion++;

    showQuestion(qObjArr[currentQuestion]);

    console.log("done");
    // showQuestion(questionObject);
    //createClickEvent(questionObject);
    //changeBlocks(questionObject);
});



function showQuestion(dataObj) {
    // print out the question itself
    $("#questionText").html(dataObj.questionString);

    // Create options html
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
}

// fade all the boxes except the one you clicked on
function fadeBoxes(e) {
    var length = qObjArr[currentQuestion].questionAnswers.length;

    for (var i = 0; i <= length; i++) {
        if (e.target.id != ("opt" + i)) {
            $("#opt" + i).fadeTo("slow", 0.4);
        }
    };
}

// gah..can't get the opts to be equal to one another
//if (e.target.id != ("opt" + qObjArr[currentQuestion].correctAnswer)) {
