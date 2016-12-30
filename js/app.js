var Quiz = {
  questions: [
    {
      text: "The Norn revere the Spirits of the Wild. Which one of these animals is NOT a spirit they revere?",
      choices: ["Eagle", "Ox", "Raven", "Owl"],
      correctAnswer: 3
    },
    {
      text: "Their technology eventually led to inventing the printing press, which in turn helped establish the widespread use of the New Krytan language.",
      choices: ["Asura", "Charr", "Humans", "Norn"],
      correctAnswer: 1
    },
    {
      text: "The Human government is supported by it’s armies. Which branch of their military is the largest?",
      choices: ["The Royal Army", "The Ministry Guard", "The Shining Blade", "The Seraph"],
      correctAnswer: 3,
    },
    {
      text: "It’s said that a Sylvari’s personality can be determined by the cycle they wake in. Which cycle “gives birth” to Sylvari who are skilled fighters and prefer action over words?",
      choices: ["Cycle of Dawn", "Cycle of Noon", "Cycle of Dusk", "Cycle of Night"],
      correctAnswer: 1,
    },
    {
      text: "Which goddess is often depicted as a young, tall, and slender woman rising over the ground on huge feathered wings?",
      choices: ["Dwayna", "Lyssa", "Kormir", "Melandru"],
      correctAnswer: 0,
    },
    {
      text: "A demigod in life, which god or goddess was the child of Dwayna and a human sculptor?",
      choices: ["Grenth", "Kormir", "Balthazar", "Melandru"],
      correctAnswer: 0
    },
    {
      text: "Balthazar is the god of war, fire, and challenge. The statues of him often depict him with a great sword and what two animals at his feet?",
      choices: ["Wolves", "Hounds", "Drakehounds", "Dire Wolves"],
      correctAnswer: 1
    },
    {
      text: "Which Warmaster, following the commands of Abaddon, nearly sank the world into darkness?",
      choices: ["Morgahn", "Varesh", "Kahyet", "Casana"],
      correctAnswer: 1,
    },
    {
      text: "The bloodline of the Ascalonian King can be tracked back to who?",
      choices: ["King Doric", "King Thorn", "Turai Ossa", "Lord Faren"],
      correctAnswer: 0,
    },
    {
      text: "What was the location where Prince Rurik met his untimely demise while trying to save his people?",
      choices: ["Ruins of Surmia", "The Frost Gate", "Abaddon's Mouth", "Iron Mines of Moladune"],
      correctAnswer: 1,
    }
  ],
  score: 0,
  currentQuestionIndex: 0,
  currentPage: 'start',
  lastAnswerCorrect: false,
};

function choiceTemplate (choice, index) {
  var choiceTemplate = 
  '<li>' +
    '<input type="radio" name="user-answer" value="' + index + '" required>' +
    '<label>' + choice + '</label>' +
  '</li>';
  return choiceTemplate;
}

function checkCurrentPage() {
  switch (state.currentPage) {
    case 'start':
      $('.start').show();
      break;
    case 'question':
      $('.start').hide();
      $('.feedback').hide();
      resetQuestionPage();
      displayQuestion();
      $('.question').show();
      break;
    case 'feedback':
      $('.question').hide();
      resetFeedbackPage();
      displayFeedback();
      $('.feedback').show();
      break;
    case 'results':
      $('.feedback').hide();
      displayResults();
      $('.results').show();
      break;
    default:
      break;
  }
}

function displayQuestion() {
  var temp = (state.currentQuestionIndex + 1) + '/' + (state.questions.length);
  $('.question-count').append(temp);
  var qt = state.questions[state.currentQuestionIndex].text;
  $('.question-text').append(qt);
  var i = 0;
  while (i < state.questions[state.currentQuestionIndex].choices.length) {
    var c = state.questions[state.currentQuestionIndex].choices[i];
    
    $('.choices').append(choiceTemplate(c, i));
    i++;
  }
}

function resetQuestionPage() {
  $('.question-count').text('');
  $('.question-text').text('');
  $('.choices').children().remove();
}

function displayFeedback() {
  var header, txt = 'Current score:' + state.score + '/' + state.questions.length;
  switch (state.lastAnswerCorrect) {
    case true:
      header = 'Correct';
      break;
    case false:
      header = 'Incorrect';
      break;
  }

  $('.feedback-header').append(header);
  $('.feedback-text').append(txt);
}

function resetFeedbackPage() {
  $('.feedback-header').text('');
  $('.feedback-text').text('');
}

function displayResults() {
  var fin = 'Final score:' + state.score + '/' + state.questions.length;
  $('.results-text').append(fin);
}

function resetResultsPage() {
  $('.results-text').text('');
}

var state = Object.create(Quiz);
checkCurrentPage();

// start quiz
$("button.begin").click(function(event) {
  event.preventDefault();
  state.currentPage = 'question';
  checkCurrentPage();
  
  
});

// submit answer to question
$("form[name='current-question']").submit(function(event) {
  event.preventDefault();
  // get the choice index chosen as the answer
  var answer = $("input[name='user-answer']:checked").val();
  if (answer == state.questions[state.currentQuestionIndex].correctAnswer) {
    state.lastAnswerCorrect = true;
    state.score++;
  } else {
    state.lastAnswerCorrect = false;
  }
  state.currentQuestionIndex++;
  state.currentPage = 'feedback';
  checkCurrentPage();
});

// restart
$(".restart-game").click(function(event){
  event.preventDefault();
  resetResultsPage();
  state.score = 0;
  state.currentQuestionIndex = 0;
  state.currentPage = 'start';
  $('.question').hide();
  $('.feedback').hide();
  $('.results').hide();
  checkCurrentPage();
});

$(".next").click(function(event) {
  if (state.currentQuestionIndex < state.questions.length) {
    state.currentPage = 'question';
    checkCurrentPage();
  } else {
    state.currentPage = 'results';
    checkCurrentPage();
  }
});
