/*
Users start on a screen where they can click a button to start the quiz.

Once the game is started, the user should be prompted through a series of at least 5 multiple choice questions which they can answer. Questions are to be asked one after another, and the user should only be able to view one question at a time.

Users should not be able to skip questions.

When viewing an individual question, the user should also be able to see which question they're on (for instance, "7 out of 10") and their current score ("5 correct, 2 incorrect").

When a user submits an answer to a question, they should first get feedback on if their answer was correct or not. If it's incorrect, they should be shown the correct answer. Then they should be moved along to the next question.

After the user has completed the final question, they should be shown their overall score (in other words, how many questions they got right out of the total questions asked) and be able to start a new game.
*/

/*
Need to disable radio buttons after chosen
Need "Next" button to lead to next question
Need to show correct answer if wrong
*/

"use strict";

var state = {
    questionNumber: 0, //what question the user is on, zero indexed.
    userCorrect: 0, //increases by one when user gets answer correct
    userIncorrect: 0, //increases by one when user gets answer incorrect
};

var questionBank = [
    {
        question: "When was baseball created?",
        choices: ["Debatable", "1839", "1907", "1864"],
        correctAnswer: "Debatable"
    },
    {
        question: "Who has the highest career WAR?",
        choices: ["Mickey Mantle", "Mike Trout", "Babe Ruth", "Cy Young"],
        correctAnswer: "Babe Ruth"
    },
    {
        question: "What does the baseball acronym WAR stand for?",
        choices: ["We Are Right", "Walk Average w/ Runners", "With All Risks", "Wins Above Replacement"],
        correctAnswer: "Wins Above Replacement"
    },
    {
        question: "What does wOBA stand for?",
        choices: ["Wins On Ball Average", "Weighted On Ball Average", "Weighted On Base Average", "Weighted On Ball Assist"],
        correctAnswer: "Weighted On Base Average"
    },
    {
        question: "Which is the oldest team in baseball?",
        choices: ["St. Louis Cardinals", "Cincinnati Reds", "Philedelphia Philles", "Atlanta Braves"],
        correctAnswer: "Atlanta Braves"
    },
    {
        question: "Who hit the \"Shot Heard 'Round the World\"?",
        choices: ["Bobby Thomson", "Albert Pujols", "Jose Bautista", "Stan Musial"],
        correctAnswer: "Bobby Thomson"
    },
    {
        question: "Which team has the second highest win-loss percentage?",
        choices: ["Boston Red Sox", "St. Louis Cardinals", "Los Angeles Dodgers", "San Francisco Giants"],
        correctAnswer: "San Francisco Giants"
    },
    {
        question: "Who has the most Gold Glove Awards?",
        choices: ["Ivan Rodriguez", "Ozzie Smith", "Roberto Clemente", "Greg Maddux"],
        correctAnswer: "Greg Maddux"
    },
    {
        question: "Who has the highest batting average in a season?",
        choices: ["Ty Cobb", "Hugh Duffy", "Ted Williams", "Babe Ruth"],
        correctAnswer: "Hugh Duffy"
    },
    {
        question: "Which manager has the most wins?",
        choices: ["Lou Piniella", "Bruce Bochy", "Connie Mack", "Joe McCarthy"],
        correctAnswer: "Connie Mack"
    },
];

//shuffle questionBank array by: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

//questionBank[state.questionNumber];


function unhideQuiz() { //hide .start-box and show .quiz
    $('.start-box').addClass('hidden');
    $('.final-score-page').addClass('hidden');
    $('.quiz').removeClass('hidden');
}

function hideQuiz() {
    $('.quiz').addClass('hidden');
}

function compareAnswer(state, questionBank, choice) {
    var whichQuestion = questionBank[state.questionNumber]; //the question they're on
    //console.log(choice);
    //console.log(whichQuestion.correctAnswer);
    if (whichQuestion.correctAnswer === choice) {
        state.userCorrect += 1;
        //console.log('correct');
    } 
    else {
        state.userIncorrect += 1;
        unhideCorrectAnswer(state);
        //console.log("incorrect");
    }
}

function unhideCorrectAnswer(state) {
    $('.correct-answer-prompt').removeClass('hidden');
}

function checked() {
    $(this).attr('checked', true);
}


function disableRadio() {
    $('input[type=radio]').attr('disabled', true);
}

function enableRadio() {
    $('input[type=radio]').attr('disabled', false);
}

function generateHTML(questionBank, state, element) {
    //Should be used when "Next" button is clicked
    var currQuestion = questionBank[state.questionNumber];
    //console.log(currQuestion);
    var html = "";
    html += '<h1 class="question-number">Question ' + (state.questionNumber + 1) + ' of 10</h1>';
    html += '<h2 class="question-content">' + currQuestion.question + '</h2>';
    html += '<form class="multiple-choice">';

    currQuestion.choices.forEach(function(choice) {
        html += '<label><input type="radio" value="' + choice + '" name="multiple" class="choice" required>' + choice + '<br></label>';
    });
    html += '<input type="submit" value="Next"></form>';
    //console.log(html);//FIXED: looked like I forgot end quotation marks for each value
    html += '<p class="correct-answer-prompt hidden">The correct answer is: ' + currQuestion.correctAnswer + '</span></p>';
    return element.html(html);
}

function generateScoreHTML(state, element) {
    var score = '<p class="quiz-score">' + state.userCorrect + ' correct, ' + state.userIncorrect + ' incorrect</p>';
    return element.html(score);
}

function reset() {
    state.userCorrect = 0;
    state.userIncorrect = 0;
    state.questionNumber = 0;
    generateScoreHTML(state, $('.quiz-info'));
}

function finalScore(state, element) {
    $('.final-score-page').removeClass('hidden');
    //console.log('test');
    var final = '<p> Your final score was: ' + state.userCorrect + ' out of 10.<br><input type="button" value="Restart?">';
    return element.html(final);
}

function restart() {
    reset();
    shuffle(questionBank);
    generateHTML(questionBank, state, $('.question-and-choices'));        
}

$(document).ready(function() {
    console.log('test');
    reset();
    shuffle(questionBank);
    //console.log(questionBank);
    generateHTML(questionBank, state, $('.question-and-choices'));
    $('.start-button').click(unhideQuiz);
     //@TODO generate first question
    $('.question-and-choices').on('click', '.choice', disableRadio);
    $('.question-and-choices').on('click', '.choice', checked);
    $('.question-and-choices').on('click', '.choice', function(event) {
        var userChoice = $('input[name="multiple"]:checked').val();
        //console.log(userChoice);
        compareAnswer(state, questionBank, userChoice);
        //console.log(state);
        //console.log(userChoice); checking if value of userChoice actually came out\
        generateScoreHTML(state, $('.quiz-info'));
    });
    $('.question-and-choices').on('submit', 'form', function(event) {//use submit instead of click because click doesn't validate form
        event.preventDefault();
        if (state.questionNumber === 9) {
            hideQuiz();
            finalScore(state, $('.final-score-page'));
        }
        else {
            state.questionNumber += 1;
            generateHTML(questionBank, state, $('.question-and-choices'));
            //console.log(questionBank[state.questionNumber]);
            //console.log(state.userCorrect);
        }
        //Needs event delegation
    });
    $('.final-score-page').on('click', 'input[value="Restart?"]', function(event) {
        //console.log('test'); FIXED weird bug where if you do all 10 questions, then it'll go straight to the start page, which means that it basically refreshed itself. 
        unhideQuiz();
        restart();
    });
    //keep tab on score
    //clicks Next, then generates next question
});