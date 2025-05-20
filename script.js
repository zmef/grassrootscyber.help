// Define your questions with options, values, and associated recommendations
const questions = [
    {
        id: 'q1',
        category: 'Identity & Access Management',
        question: 'Do you use unique, strong passwords (12+ characters, mix of types) for each of your online accounts?',
        options: [
            { text: 'Yes, for all critical accounts (email, banking, etc.)', value: 3, score: 25 },
            { text: 'For some, but not all critical accounts', value: 2, score: 10 },
            { text: 'No, I often reuse passwords or use simple ones', value: 1, score: 0 }
        ],
        recommendations: {
            2: "Implement a **password manager** (e.g., LastPass, Bitwarden) to generate and store unique, strong passwords for *all* your accounts. Start with your most important ones.",
            1: "You are at **high risk** due to password reuse/weakness. Immediately change critical passwords and begin using a password manager. Avoid common words or personal info."
        }
    },
    {
        id: 'q2',
        category: 'Identity & Access Management',
        question: 'Is Multi-Factor Authentication (MFA/2FA) enabled on your primary email, banking, and social media accounts?',
        options: [
            { text: 'Yes, for all critical accounts (email, banking, social media)', value: 3, score: 25 },
            { text: 'For some, but not all critical accounts', value: 2, score: 15 },
            { text: 'No, or I don\'t know what MFA is', value: 1, score: 0 }
        ],
        recommendations: {
            2: "Enable **Multi-Factor Authentication (MFA)** on *all* critical online accounts (email, banking, social media, shopping sites). SMS-based MFA is better than nothing, but authenticator apps (e.g., Google Authenticator, Authy) are more secure.",
            1: "MFA (also known as 2FA) adds a vital layer of security. Even if your password is stolen, your account remains secure. Learn about it and enable it everywhere possible."
        }
    },
    {
        id: 'q3',
        category: 'Device & Software Security',
        question: 'How often do you update your operating system (Windows, macOS, Linux, Android, iOS) and major applications (web browser, antivirus, etc.)?',
        options: [
            { text: 'Automatically, as soon as updates are available', value: 3, score: 25 },
            { text: 'Regularly (e.g., weekly/monthly), but not always immediately', value: 2, score: 15 },
            { text: 'Rarely or never', value: 1, score: 0 }
        ],
        recommendations: {
            2: "Set your operating system and applications to update **automatically** whenever possible. This ensures you receive critical security patches promptly.",
            1: "**Outdated software is a major cybersecurity vulnerability.** Attackers exploit known flaws. Prioritize updating your OS, browser, and antivirus software immediately."
        }
    },
    {
        id: 'q4',
        category: 'Data Protection & Privacy',
        question: 'Do you regularly back up your important data (documents, photos, videos) from your devices?',
        options: [
            { text: 'Yes, using both cloud services and/or external drives consistently', value: 3, score: 25 },
            { text: 'Sometimes, but not consistently or only one method', value: 2, score: 10 },
            { text: 'No, I don\'t back up my data', value: 1, score: 0 }
        ],
        recommendations: {
            2: "Establish a consistent **data backup routine**. Use the **3-2-1 rule**: 3 copies of your data, on 2 different media, with 1 copy offsite (e.g., cloud storage).",
            1: "Without backups, you risk losing all your important data to hardware failure, theft, ransomware, or accidental deletion. **Start backing up immediately!**"
        }
    },
    {
        id: 'q5',
        category: 'Online Habits & Awareness',
        question: 'How do you typically handle suspicious emails or messages (phishing attempts)?',
        options: [
            { text: 'I ignore them, delete them, and never click links or download attachments', value: 3, score: 25 },
            { text: 'I\'m careful, but sometimes I might open them if they look convincing', value: 2, score: 10 },
            { text: 'I often click links or open attachments to see what they are', value: 1, score: 0 }
        ],
        recommendations: {
            2: "Always be **skeptical** of unexpected emails/messages, especially those asking for personal info or offering urgent deals. Verify sender identity through official channels.",
            1: "**Clicking suspicious links or opening attachments is very risky.** It can lead to malware infection or credential theft. Learn to identify phishing signs and never interact with suspicious messages."
        }
    },
    {
        id: 'q6',
        category: 'Device & Software Security',
        question: 'Do you use antivirus software on your computer, and is it kept up-to-date?',
        options: [
            { text: 'Yes, I have reputable antivirus software that updates automatically', value: 3, score: 25 },
            { text: 'I have it, but I don\'t check if it\'s updated regularly', value: 2, score: 10 },
            { text: 'No, I don\'t use antivirus software', value: 1, score: 0 }
        ],
        recommendations: {
            2: "Ensure your **antivirus software** is configured to update its definitions automatically. This keeps it effective against the latest threats.",
            1: "Antivirus software is essential for protecting against malware. **Install a reputable solution** and keep it active and updated. Windows Defender is a good start for Windows users."
        }
    },
    {
        id: 'q7',
        category: 'Data Protection & Privacy',
        question: 'How do you handle privacy settings on social media and other online accounts?',
        options: [
            { text: 'I regularly review and tighten my privacy settings to limit data sharing', value: 3, score: 25 },
            { text: 'I\'ve adjusted some, but not thoroughly or recently', value: 2, score: 10 },
            { text: 'I rarely or never check my privacy settings', value: 1, score: 0 }
        ],
        recommendations: {
            2: "Make it a habit to regularly review **privacy settings** on social media, apps, and services. Limit what personal information is publicly visible.",
            1: "Your online privacy is crucial. Take time to explore and tighten your privacy settings on all platforms. **Assume anything you post could become public.**"
        }
    },
    {
        id: 'q8',
        category: 'Online Habits & Awareness',
        question: 'When using public Wi-Fi (e.g., at a coffee shop or airport), how do you protect your data?',
        options: [
            { text: 'I only connect via a Virtual Private Network (VPN) and avoid sensitive transactions', value: 3, score: 25 },
            { text: 'I\'m careful about what I access, but don\'t always use a VPN', value: 2, score: 10 },
            { text: 'I connect freely and perform sensitive actions (banking, shopping)', value: 1, score: 0 }
        ],
        recommendations: {
            2: "Using a **VPN encrypts your internet traffic**, protecting your data on public Wi-Fi. Always use one for sensitive activities on unsecured networks.",
            1: "**Public Wi-Fi is inherently insecure.** Avoid banking, shopping, or logging into sensitive accounts without a VPN. Assume your traffic can be monitored."
        }
    }
];

let currentQuestionIndex = 0;
const userAnswers = {}; // Store user's selected value for each question
const maxOverallScore = questions.length * 25; // Max score if all questions get max points

// DOM Elements
const introSection = document.getElementById('introduction');
const quizSection = document.getElementById('quiz');
const resultsSection = document.getElementById('results'); // Corrected global variable
const startQuizBtn = document.getElementById('startQuizBtn');
const wellnessForm = document.getElementById('wellnessForm');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submitBtn'); // Ensure this is correctly referenced
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const overallStatusSpan = document.getElementById('overallStatus');
const finalScoreSpan = document.getElementById('finalScore');
const maxScoreSpan = document.getElementById('maxScore');
const categoryBreakdownDiv = document.getElementById('categoryBreakdown');
const recommendationListDiv = document.getElementById('recommendationList');
const restartBtn = document.getElementById('restartBtn');
const printReportBtn = document.getElementById('printReportBtn');


// --- Functions ---

function showSection(sectionId) {
    console.log(`Showing section: ${sectionId}`); // Debugging
    introSection.classList.add('hidden');
    quizSection.classList.add('hidden');
    resultsSection.classList.add('hidden');

    document.getElementById(sectionId).classList.remove('hidden');
}

function loadQuestion() {
    const qData = questions[currentQuestionIndex];
    if (!qData) {
        console.error("No question data found for index:", currentQuestionIndex);
        return;
    }

    let questionHtml = `
        <div class="question-container">
            <label>${currentQuestionIndex + 1}. ${qData.question}</label>
    `;

    qData.options.forEach(option => {
        // Check if answer already exists in userAnswers to pre-select
        const checked = userAnswers[qData.id] === String(option.value) ? 'checked' : '';
        questionHtml += `
            <div class="question-option">
                <input type="radio" id="${qData.id}_${option.value}" name="${qData.id}" value="${option.value}" ${checked} required>
                <label for="${qData.id}_${option.value}">${option.text}</label>
            </div>
        `;
    });
    questionHtml += `</div>`;
    wellnessForm.innerHTML = questionHtml;

    // Update progress bar and text
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
    progressText.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;

    // Update button visibility
    prevBtn.classList.toggle('hidden', currentQuestionIndex === 0);
    // The "Next" button should be hidden on the *last* question
    nextBtn.classList.toggle('hidden', currentQuestionIndex === questions.length - 1);
    // The "Submit" button should *only* be visible on the last question
    submitBtn.classList.toggle('hidden', currentQuestionIndex !== questions.length - 1);

    // Add event listener for radio button changes to store current answer
    // This captures answers immediately when selected, useful for navigation
    document.querySelectorAll(`input[name="${qData.id}"]`).forEach(radio => {
        radio.addEventListener('change', (event) => {
            userAnswers[qData.id] = event.target.value;
            console.log(`Answer for ${qData.id} saved: ${event.target.value}`); // Debugging
        });
    });
}

function moveToNextQuestion() {
    const currentQuestionId = questions[currentQuestionIndex].id;
    const selectedOption = document.querySelector(`input[name="${currentQuestionId}"]:checked`);

    if (!selectedOption) {
        alert('Please select an answer before proceeding.');
        return;
    }

    userAnswers[currentQuestionId] = selectedOption.value; // Save the selected value before moving
    console.log(`Moving to next question. Saved answer for ${currentQuestionId}: ${userAnswers[currentQuestionId]}`); // Debugging

    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    }
}

function moveToPreviousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
}

function calculateCategoryScores() {
    const categoryScores = {};
    const categoryMaxScores = {};

    // Initialize category scores and max scores
    const uniqueCategories = new Set(questions.map(q => q.category));
    uniqueCategories.forEach(category => {
        categoryScores[category] = 0;
        categoryMaxScores[category] = 0;
    });

    // Calculate actual scores for each category
    questions.forEach(q => {
        const userAnswerValue = userAnswers[q.id];
        const selectedOption = q.options.find(opt => String(opt.value) === userAnswerValue);
        if (selectedOption) {
            categoryScores[q.category] += selectedOption.score;
        }
        categoryMaxScores[q.category] += 25; // Each question is worth max 25 points
    });

    return { categoryScores, categoryMaxScores };
}


function getStatusClass(score, maxScore) {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) {
        return "status-good";
    } else if (percentage >= 50) {
        return "status-needs-improvement";
    } else {
        return "status-at-risk";
    }
}

function getStatusText(score, maxScore) {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) {
        return "Good";
    } else if (percentage >= 50) {
        return "Needs Improvement";
    } else {
        return "At Risk";
    }
}


function generateReport() {
    console.log("Generating report..."); // Debugging: Check if this function is called
    let totalScore = 0;
    const applicableRecommendations = [];

    questions.forEach(q => {
        const userAnswerValue = userAnswers[q.id];
        const selectedOption = q.options.find(opt => String(opt.value) === userAnswerValue);

        if (selectedOption) {
            totalScore += selectedOption.score;
            // Add recommendation if the selected option triggers one
            if (q.recommendations[userAnswerValue]) {
                applicableRecommendations.push({
                    category: q.category, // Include category for context in recommendations
                    questionText: q.question, // The full question text
                    recommendation: q.recommendations[userAnswerValue]
                });
            }
        }
    });

    // Overall Status
    const overallStatusClass = getStatusClass(totalScore, maxOverallScore);
    overallStatusSpan.textContent = getStatusText(totalScore, maxOverallScore);
    overallStatusSpan.className = `status-indicator ${overallStatusClass}`;
    finalScoreSpan.textContent = totalScore;
    maxScoreSpan.textContent = maxOverallScore;

    // Category Breakdown
    const { categoryScores, categoryMaxScores } = calculateCategoryScores();
    categoryBreakdownDiv.innerHTML = ''; // Clear previous breakdown

    for (const category in categoryScores) {
        const score = categoryScores[category];
        const max = categoryMaxScores[category];
        const statusClass = getStatusClass(score, max);
        const statusText = getStatusText(score, max);

        const categoryItem = document.createElement('div');
        categoryItem.className = 'category-item';
        categoryItem.innerHTML = `
            <h4><i class="fas fa-sitemap"></i> ${category}</h4>
            <p>Score: ${score} / ${max}</p>
            <span class="status-indicator ${statusClass}">${statusText}</span>
        `;
        categoryBreakdownDiv.appendChild(categoryItem);
    }


    // Recommendations
    recommendationListDiv.innerHTML = ''; // Clear previous recommendations
    if (applicableRecommendations.length === 0) {
        recommendationListDiv.innerHTML = '<p>Great job! You\'re doing well in all key areas and have no specific recommendations based on your answers.</p>';
    } else {
        applicableRecommendations.forEach(rec => {
            const div = document.createElement('div');
            div.className = 'recommendation-item';
            div.innerHTML = `
                <p><strong>Category:</strong> ${rec.category}</p>
                <p><strong>Question:</strong> ${rec.questionText}</p>
                <p><strong>Recommendation:</strong> ${rec.recommendation}</p>
            `;
            recommendationListDiv.appendChild(div);
        });
    }

    showSection('results');
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top of results
    console.log("Report generated and displayed."); // Debugging
}

function resetQuiz() {
    console.log("Resetting quiz..."); // Debugging
    currentQuestionIndex = 0;
    for (const key in userAnswers) {
        delete userAnswers[key]; // Clear stored answers
    }
    wellnessForm.reset(); // Reset form selections
    showSection('introduction');
}

function printReport() {
    console.log("Printing report..."); // Debugging
    window.print();
}

// --- Event Listeners ---

startQuizBtn.addEventListener('click', () => {
    console.log("Start Quiz button clicked."); // Debugging
    showSection('quiz');
    loadQuestion();
});

nextBtn.addEventListener('click', moveToNextQuestion);
prevBtn.addEventListener('click', moveToPreviousQuestion);

wellnessForm.addEventListener('submit', function(event) {
    console.log("Form submit event triggered."); // Debugging: Check if this is seen
    event.preventDefault(); // Prevent default form submission

    const currentQuestionId = questions[currentQuestionIndex].id;
    const selectedOption = document.querySelector(`input[name="${currentQuestionId}"]:checked`);

    if (!selectedOption) {
        alert('Please select an answer before getting your report.');
        console.log("No option selected for current question, preventing report generation."); // Debugging
        return;
    }
    userAnswers[currentQuestionId] = selectedOption.value; // Save the last answer
    console.log(`Last answer for ${currentQuestionId} saved: ${userAnswers[currentQuestionId]}`); // Debugging
    generateReport();
});

restartBtn.addEventListener('click', resetQuiz);
printReportBtn.addEventListener('click', printReport);


// Initial load
showSection('introduction');
