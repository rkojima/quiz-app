/*
Users start on a screen where they can click a button to start the  quiz.

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
        corrrectAnswer: "Greg Maddux"
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
        $('.quiz').removeClass('hidden');
}

function compareAnswer(state) {
    //would not putting in this as parameter be ok?

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

function generateHTML(questionBank, state) {
    var currQuestion = questionBank[state.questionNumber];
    var html = "";
    currQuestion.choices.forEach(function(choice) {
        html += '<label><input type="radio" value="' + choice + ' name="multiple" class="choice">' + choice + '<br></label>';
    });
    return html;
}

$(document).ready(function() {
    $('.start-button').click(unhideQuiz);
    shuffle(questionBank);
    //generate first question
    $('.choice').on('click', disableRadio);
    $('.choice').on('click', checked);
    $('.choice').on('click', function(event) {
        var test = $('input[name=multiple]:checked').val();
        console.log($("#answer-1").text());
    });
    //keep tab on score
    //clicks Next, then generates next question
});