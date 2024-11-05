// List of survey questions (can be expanded)
const questions = [
    "What is your favorite color?",
    "How do you prefer to spend your weekends?",
    "What is your favorite book?",
    "What motivates you to work hard?",
    "What is your dream vacation destination?",
    "What kind of music do you like?",
    "Do you prefer working from home or the office?",
    "How often do you exercise?",
    "What is the best advice you have ever received?",
    "What type of food do you enjoy the most?"
];

// Load random 5 questions when the page loads
window.onload = function() {
    const selectedQuestions = getRandomQuestions(5);
    displayQuestions(selectedQuestions);
};

// Function to get N random questions
function getRandomQuestions(num) {
    let randomQuestions = [];
    let selectedIndices = new Set();
    while (randomQuestions.length < num) {
        let randomIndex = Math.floor(Math.random() * questions.length);
        if (!selectedIndices.has(randomIndex)) {
            selectedIndices.add(randomIndex);
            randomQuestions.push(questions[randomIndex]);
        }
    }
    return randomQuestions;
}

// Function to display questions on the page
function displayQuestions(questions) {
    const surveyContainer = document.getElementById('surveyQuestions');
    questions.forEach((question, index) => {
        const questionElement = document.createElement('div');
        questionElement.classList.add('question');
        questionElement.innerHTML = `
            <label for="question-${index}">${question}</label>
            <input type="text" id="question-${index}" name="question-${index}" required>
        `;
        surveyContainer.appendChild(questionElement);
    });
}

// Handle form submission
document.getElementById('surveyForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const responses = {};
    let allAnswered = true;

    // Collect responses from the form
    for (let i = 0; i < 5; i++) {
        const questionResponse = document.getElementById(`question-${i}`).value;
        if (!questionResponse) {
            allAnswered = false;
            break;
        }
        responses[`question-${i}`] = questionResponse;
    }

    // Check if all questions are answered
    if (allAnswered) {
        // Save responses in localStorage
        localStorage.setItem('surveyResponses', JSON.stringify(responses));

        // Show thank you message and hide the survey form
        document.querySelector('.survey-container').style.display = 'none';
        document.getElementById('thankYouMessage').style.display = 'block';
    } else {
        alert('Please answer all the questions!');
    }
});

