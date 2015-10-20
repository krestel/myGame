// Jill Rhoads

var questionObject = {
    questionString: "A, B, C eller D?",
    questionAnswers: ["A", "B", "C", "D"],
    correctAnswer: 3
}

// questionObject Array
var qObjArr = [{
        questionString: "A, B, C eller D?",
        questionAnswers: ["A", "B", "C", "D"],
        correctAnswer: 3
    }, {
        questionString: "1, 2, 3 eller 4?",
        questionAnswers: ["1", "2", "3", "4"],
        correctAnswer: 1
    }
                  ]
$(document).ready(function () {


//    var questionObject = {
        //        questionString: "A, B, C eller D?",
        //        questionAnswers: ["A", "B", "C", "D"],
        //        correctAnswer: 3
        //    }
        //
        //    // questionObject Array
        //    var qObjArr = [{
        //            questionString: "A, B, C eller D?",
        //            questionAnswers: ["A", "B", "C", "D"],
        //            correctAnswer: 3
        //    }, {
        //            questionString: "1, 2, 3 eller 4?",
        //            questionAnswers: ["1", "2", "3", "4"],
        //            correctAnswer: 1
        //    }
        //                  ]
    // showQuestion(questionObject);
    //createClickEvent(questionObject);
    //changeBlocks(questionObject);
});



function showQuestion(options) {
    // print out the question itself
    $("#questionText").html(options.questionString);

    // Create options html
    var length = options.questionAnswers.length;

    for (i = 0; i < length; i++) {
        // creates for each possible answer: <div id="optX" class="box">Answer</div>
        var optionsHtml = document.createElement("div");
        optionsHtml.innerHTML = options.questionAnswers[i];
        optionsHtml.setAttribute("class", "box");
        optionsHtml.setAttribute("id", "opt" + (i + 1));
        $("#options").append(optionsHtml);

        // bind function to clicking on block
        //$("#opt" + (i + 1)).click(myLog());

        $("#options").append("\n"); // seems to keep the boxes from touching each other

    }
}

function myLog() {
    console.log("aj");
}

function changeBlocks(options) {

    var length = options.questionAnswers.length;

    for (i = 0; i < length; i++) {

        $("#opt1").click(function () {
            $("#opt1").fadeTo("slow", 0.4);
            $("#opt2").fadeTo("slow", 0.4);
            $("#opt3").fadeTo("slow", 0.4);
            $("#opt4").fadeTo("slow", 0.4);
        });
    }
}
