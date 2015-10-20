// Jill Rhoads
$(document).ready(function () {

    questionObjectArr = getQuestions();



    console.log(questionObjectArr);

    //    var questionObject = {
    //        questionString: "A, B, C eller D?",
    //        questionAnswers: ["A", "B", "C", "D"],
    //        correctAnswer: 3
    //    }

    //showQuestion(questionObject);
    //createClickEvent(questionObject);
    //changeBlocks(questionObject);
});

// gets data from .json file 
function getQuestions() {

    // Get the questions
    var xmlhttp = new XMLHttpRequest();
    //var url = "http://127.0.0.1:63391/questions.json" // localhost for brackets 
    var url = "questions.json";

    // Setting up the call to get the .json file that has all the info about the questions
    // This is really a framework called AJAX at work here
    xmlhttp.onreadystatechange = function () { // http://www.w3schools.com/ajax/ajax_xmlhttprequest_onreadystatechange.asp
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            //myFunction(xmlhttp.responseText); // responseText: the response text as a string
            return xmlhttp.responseText;
            //console.log(xmlhttp.responseText);
            //            questionObjectArr = JSON.parse(xmlhttp.responseText);
            //            console.log(questionObjectArr[0].questionString);

            console.log("json file loaded");
        } else if (xmlhttp.status == 404) {
            console.log("ERROR: json file not found");
        }
    }

    xmlhttp.open("GET", url, true); // a simple GET request 
    xmlhttp.send(); // Sends the above request to the server

    //    return xmlhttp.responseText;

}

//function returnQuestions(response) {
//    questionObject = JSON.parse(response);
//    //console.log(localQuestionObject[0].questionString);
//}

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
