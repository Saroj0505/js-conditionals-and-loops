const quizData = [
    {
        question: "What does HTML stand for",
        options: [
            "Hypertext Markup Language",
            "Hyper Transfer Markup Language",
            "Hypertext Machine Language",
            "Hyperlink and Text Markup Language",

        ],
        correct: 0,// Index of the correct answer in the options array
    },
    {
        question: "Which HTML element is used to define the structure of an HTML document?",
        options: [
            "<header>",
            "<article>",
            "<body>",
            "<format>",

        ],
        correct: 2,
    },
        {
        question: "What does the href attribute in the anchor (<a>) tag specify?",
        options: [
            "The link's destination URL",
            "The link's text color",
            "The link's font size",
            "The link's background color",

        ],
        correct: 0,
    },
    {
        question: "Which HTML tag is used for creating an ordered list?",
        options: [
            "<ol>",
            "<ul>",
            "<li>",
            "<dl>",

        ],
        correct: 0,
    },
    {
        question: "What does the HTML <meta> tag do?",
        options: [
            "Defines a block of text",
            "Specifies metadata about the document",
            "Embeds an image in the document",
            "Creates a line break in the document",

        ],
        correct: 1,
    },
    {
        question: "Which CSS property is used to change the text color of an element?",
        options: [
            "text-style",
            "font-color",
            "text-color",
            "color",

        ],
        correct: 3,
    },
    {
        question: "How can you center an element horizontally in CSS?",
        options: [
            "margin: 0 auto",
            "align: center",
            "text-align: center;",
            "padding: auto;",

        ],
        correct: 0,
    },
    {
        question: "Which CSS selector is used to select all elements with the class example?",
        options: [
            "#example",
            ".example",
            "example:",
            "*example",

        ],
        correct: 1,
    },
    {
        question: "What does CSS stand for?",
        options: [
            "Cascading Style Sheet",
            "Computer Style Sheet",
            "Colorful Style Sheet",
            "Creative Style Sheet",

        ],
        correct: 0,
    },
    {
        question: "How can you link an external CSS file to an HTML document?",
        options: [
            `<link rel="stylesheet" type="text/css" href="styles.css">`,
            `<style src="styles.css">`,
            `<css href="styles.css">`,
            `<link type="text/css" src="styles.css">`,

        ],
        correct: 0,
    },
    {
        question: `What does the "typeof" operator in JavaScript return for an array?`,
        options: [
            "array",
            "object",
            "number",
            "string",

        ],
        correct: 1,
    },
    {
        question: "How do you declare a variable in JavaScript?",
        options: [
            "var myVar;",
            "let myVar;",
            "const myVar;",
            "All of the above",

        ],
        correct: 3,
    },
    {
        question: "What does the "===" operator in JavaScript do?",
        options: [
            "Compares two values for equality without type conversion",
            "Assigns a value to a variable",
            "Compares two values for equality with type conversion",
            "Compares two values for inequality",

        ],
        correct: 0,
    },
    {
        question: "What is the DOM in JavaScript?",
        options: [
            "Document Object Model",
            "Data Object Model",
            "Document Order Model",
            "Document Output Model",

        ],
        correct: 0,
    },
    {
        question: "What function is used in JavaScript to print content to the browser's console?",
        options: [
            "console.log()",
            "print()",
            "display()",
            "log()",

        ],
        correct: 0,
    },

]
const quizContainer = document.querySelector('#quiz');
const summaryContainer = document.querySelector('#summary'); // Added this line
const answerElements = document.querySelectorAll('.answer');
const [questionElement, option_1, option_2, option_3, option_4] = document.querySelectorAll(
    '#question, #option_1, #option_2, #option_3, #option_4'
);
const submitButton = document.querySelector('#submit');
const timerElement = document.getElementById('timer');

let currentQuiz = 0;
let score = 0;
let timer;

function shuffleQuestions() {
    for (let i = quizData.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [quizData[i], quizData[j]] = [quizData[j], quizData[i]];
    }
}
shuffleQuestions();

function loadQuiz() {
    const { question, options } = quizData[currentQuiz];

    questionElement.innerText = `${currentQuiz + 1}. ${question}`;

    options.forEach((option, index) => {
        window[`option_${index + 1}`].innerText = option;
    });

    startTimer(); // Start the timer for each question
}

function startTimer() {
    let timeRemaining = 20; // Set your desired time limit per question
    timerElement.innerText = `Time: ${timeRemaining}`;

    timer = setInterval(() => {
        timeRemaining--;
        timerElement.innerText = `Time: ${timeRemaining}`;

        if (timeRemaining < 0) {
            clearInterval(timer);
            handleTimeout();
        }
    }, 1000);
}

function handleTimeout() {
    currentQuiz++;
    if (currentQuiz < quizData.length) {
        deselectedAnswers();
        loadQuiz();
    } else {
        endQuiz();
    }
}

function getSelectedOption() {
    let selectedOptionIndex = -1;

    answerElements.forEach((currOption, index) => {
        if (currOption.checked) {
            selectedOptionIndex = index;
        }
    });

    return selectedOptionIndex;
}

function deselectedAnswers() {
    answerElements.forEach((curElem) => (curElem.checked = false));

}

submitButton.addEventListener('click', () => {
    clearInterval(timer);
    const selectedOptionIndex = getSelectedOption();

    if (selectedOptionIndex === quizData[currentQuiz].correct) {
        score += 1;
    }

    currentQuiz++;

    if (currentQuiz < quizData.length) {
        deselectedAnswers();
        loadQuiz();
    } else {
        endQuiz();
    }
});

function endQuiz() {
    let feedbackMessage = '';

    if (score === quizData.length) {
        feedbackMessage = "Excellent! You got all the questions right.";
    } else if (score >= quizData.length / 2) {
        feedbackMessage = "Good job! You did well, but there's room for improvement.";
    } else {
        feedbackMessage = "Needs improvement. Keep practicing!";
    }
    quizContainer.innerHTML = `
        <div class="result">
            <h2>Your Score: ${score}/${quizData.length} Correct Answers</h2>
            <p>Congratulations on completing the quiz!</p>
            <button class="reload-button" onclick="location.reload()">Play Again</button>
            <button class="reload-button" onclick="showSummary()">Show Summary</button>
        </div>
    `;
}

function showSummary() {
    clearInterval(timer);
    quizContainer.style.display = 'none';
    summaryContainer.style.display = 'block';

    let summaryHTML = '<h2>Quiz Summary</h2>';
    
    for (let i = 0; i < quizData.length; i++) {
        const { question, options, correct } = quizData[i];
        const userAnswer = getUserAnswer(i);

        summaryHTML += `
            <div class="question-summary">
                <p><strong>${i + 1}. ${question}</strong></p>
                <p>Your Answer: ${options[userAnswer]}</p>
                <p>Correct Answer: ${options[correct]}</p>
            </div>
        `;
    }

    summaryHTML += `<p>Your Score: ${score}/${quizData.length} Correct Answers</p>`;
    summaryHTML += `<button class="reload-button" onclick="location.reload()">Play Again</button>`;

    summaryContainer.innerHTML = summaryHTML;
}

function getUserAnswer(questionIndex) {
    const answerElements = document.querySelectorAll('.answer');
    for (let i = 0; i < answerElements.length; i++) {
        if (answerElements[i].checked) {
            return i;
        }
    }
    return -1; // If the user did not answer the question
}

// Initial load of the first question
loadQuiz();