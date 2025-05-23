// --- Quiz Data ---
const questions = [
    {
        question: "Do you use unique passwords for each of your important accounts?",
        options: ["Always", "Sometimes", "Rarely", "Never"],
        scores: [12.5, 8, 4, 0],
        recommendation: "Use unique passwords for each account. Consider a password manager."
    },
    {
        question: "Do you enable two-factor authentication (2FA) where available?",
        options: ["Always", "Sometimes", "Rarely", "Never"],
        scores: [12.5, 8, 4, 0],
        recommendation: "Enable 2FA on all important accounts for extra security."
    },
    {
        question: "How often do you update your devices and software?",
        options: ["Immediately", "Within a week", "Occasionally", "Rarely/Never"],
        scores: [12.5, 8, 4, 0],
        recommendation: "Keep your devices and software updated to patch security vulnerabilities."
    },
    {
        question: "Do you recognize phishing attempts and avoid suspicious links/emails?",
        options: ["Always", "Most of the time", "Sometimes", "Rarely"],
        scores: [12.5, 8, 4, 0],
        recommendation: "Be vigilant about phishing. Double-check links and sender addresses."
    },
    {
        question: "Do you back up important data regularly?",
        options: ["Yes, automatically", "Yes, manually", "Occasionally", "Never"],
        scores: [12.5, 8, 4, 0],
        recommendation: "Set up automatic backups for your important files."
    },
    {
        question: "Do you use antivirus or endpoint protection software?",
        options: ["Always", "Sometimes", "Rarely", "Never"],
        scores: [12.5, 8, 4, 0],
        recommendation: "Use reputable antivirus software and keep it updated."
    },
    {
        question: "Are your social media profiles set to private or restricted?",
        options: ["All private", "Most private", "Some private", "All public"],
        scores: [12.5, 8, 4, 0],
        recommendation: "Review your social media privacy settings and restrict public access."
    },
    {
        question: "Do you use secure Wi-Fi and avoid public Wi-Fi for sensitive activities?",
        options: ["Always", "Most of the time", "Sometimes", "Never"],
        scores: [12.5, 8, 4, 0],
        recommendation: "Avoid public Wi-Fi for sensitive tasks or use a VPN."
    }
];

let currentQuestion = 0;
let userAnswers = new Array(questions.length).fill(null);

// --- DOM Elements ---
const introductionSection = document.getElementById('introduction');
const quizSection = document.getElementById('quiz');
const resultsSection = document.getElementById('results');
const startQuizBtn = document.getElementById('startQuizBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submitBtn');
const restartBtn = document.getElementById('restartBtn');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const wellnessForm = document.getElementById('wellnessForm');
const overallStatus = document.getElementById('overallStatus');
const finalScore = document.getElementById('finalScore');
const recommendationList = document.getElementById('recommendationList');

// --- Functions ---
function showSection(section) {
    introductionSection.classList.add('hidden');
    quizSection.classList.add('hidden');
    resultsSection.classList.add('hidden');
    section.classList.remove('hidden');
}

function renderQuestion(index) {
    const q = questions[index];
    // Only render the question and options, not the navigation buttons!
    const optionsHtml = q.options.map((opt, i) => `
        <label class="option-label">
            <input type="radio" name="question" value="${i}" ${userAnswers[index] === i ? 'checked' : ''} required>
            ${opt}
        </label>
    `).join('');
    // Place question/options in a container
    let questionBlock = document.getElementById('questionBlock');
    if (!questionBlock) {
        questionBlock = document.createElement('div');
        questionBlock.id = 'questionBlock';
        wellnessForm.prepend(questionBlock);
    }
    questionBlock.innerHTML = `
        <h3>${q.question}</h3>
        <div class="options-group">${optionsHtml}</div>
    `;

    // Update progress
    progressBar.style.width = `${((index + 1) / questions.length) * 100}%`;
    progressText.textContent = `Question ${index + 1} of ${questions.length}`;

    // Update navigation buttons
    prevBtn.classList.toggle('hidden', index === 0);
    nextBtn.classList.toggle('hidden', index === questions.length - 1);
    submitBtn.classList.toggle('hidden', index !== questions.length - 1);
}

function saveAnswer() {
    const radios = wellnessForm.querySelectorAll('input[name="question"]');
    let selected = null;
    radios.forEach(radio => {
        if (radio.checked) selected = parseInt(radio.value);
    });
    if (selected === null) {
        alert("Please select an answer to continue.");
        return false;
    }
    userAnswers[currentQuestion] = selected;
    return true;
}

function handlePrev() {
    if (currentQuestion > 0) {
        currentQuestion--;
        renderQuestion(currentQuestion);
    }
}

function handleNext() {
    if (saveAnswer()) {
        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            renderQuestion(currentQuestion);
        }
    }
}

function handleSubmit(e) {
    e.preventDefault();
    if (saveAnswer()) {
        showResults();
    }
}

function showResults() {
    // Calculate score
    let score = 0;
    let recs = [];
    for (let i = 0; i < questions.length; i++) {
        const ans = userAnswers[i];
        if (ans !== null) {
            score += questions[i].scores[ans];
            if (ans > 1) recs.push(questions[i].recommendation);
        } else {
            recs.push(questions[i].recommendation);
        }
    }
    // Status
    let status = '';
    if (score >= 90) status = '<span style="color:green">Excellent</span>';
    else if (score >= 70) status = '<span style="color:orange">Good</span>';
    else status = '<span style="color:red">Needs Improvement</span>';

    overallStatus.innerHTML = status;
    finalScore.textContent = Math.round(score);

    // Recommendations
    if (recs.length === 0) {
        recommendationList.innerHTML = `<p>Great job! Keep up your strong cybersecurity habits.</p>`;
    } else {
        recommendationList.innerHTML = `<ul>${[...new Set(recs)].map(r => `<li>${r}</li>`).join('')}</ul>`;
    }

    showSection(resultsSection);
}

function restartQuiz() {
    currentQuestion = 0;
    userAnswers = new Array(questions.length).fill(null);
    showSection(introductionSection);
}

// --- Event Listeners ---
if (startQuizBtn) {
    startQuizBtn.addEventListener('click', function () {
        showSection(quizSection);
        currentQuestion = 0;
        renderQuestion(currentQuestion);
    });
}
if (prevBtn) prevBtn.addEventListener('click', handlePrev);
if (nextBtn) nextBtn.addEventListener('click', handleNext);
if (submitBtn) wellnessForm.addEventListener('submit', handleSubmit);
if (restartBtn) restartBtn.addEventListener('click', restartQuiz);

// On page load, show intro
showSection(introductionSection);
