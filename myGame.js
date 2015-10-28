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


var qObjArr = [];

$(document).ready(function () {

            qObjArr = getQuestions();

            var qObj = ""; // a temporary object to make the code more readable

            var pointsCorrect = 0;


            var myTime;

            //while (qObjArr.length) {
            qObj = qObjArr.shift(); // set the object to a question
            qObj = qObjArr.shift();
            showQuestion(qObj);

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

                        console.log(JSON.parse(xmlhttp.responseText)[0]);
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


                // console.log("end of game")
            });


        //function returnQuestions(response) {
        //    questionObject = JSON.parse(response);
        //    //console.log(localQuestionObject[0].questionString);
        //}


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
                backgroundColor: '#47DC4C'
            });
            $("#opt" + qObj.correctAnswer).fadeTo(800, 1);

            console.log("Points: " + pointsCorrect)
        }