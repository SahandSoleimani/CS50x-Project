document.addEventListener('DOMContentLoaded', (event) => {
    const startBtn = document.querySelector('.start-btn');
    const popupInfo = document.querySelector('.popup-info');
    const exitBtn = document.querySelector('.exit-btn');
    const main = document.querySelector('.main');
    const continueBtn = document.querySelector('.continue-btn');
    const quizSection = document.querySelector('.quiz-section');
    const quizBox = document.querySelector('.quiz-box');
    const resultBox = document.querySelector('.result-box');
    const goHomeBtn = document.querySelector('.goHome-btn');
    const nextBtn = document.querySelector('.next-btn');
    const optionList = document.querySelector('.option-list');

    let questionCount = 0;
    let questionNumb = 1;
    let userScore = 0;

    console.log("Elements:");
    console.log("startBtn:", startBtn);
    console.log("popupInfo:", popupInfo);
    console.log("exitBtn:", exitBtn);
    console.log("main:", main);
    console.log("continueBtn:", continueBtn);
    console.log("quizSection:", quizSection);
    console.log("quizBox:", quizBox);
    console.log("resultBox:", resultBox);
    console.log("goHomeBtn:", goHomeBtn);
    console.log("nextBtn:", nextBtn);
    console.log("optionList:", optionList);

    if (startBtn) {
        startBtn.onclick = () => {
            popupInfo.classList.add('active');
            main.classList.add('active');
        };
    } else {
        console.error('startBtn not found');
    }

    if (exitBtn) {
        exitBtn.onclick = () => {
            popupInfo.classList.remove('active');
            main.classList.remove('active');
        };
    } else {
        console.error('exitBtn not found');
    }

    if (continueBtn) {
        continueBtn.onclick = () => {
            quizSection.classList.add('active');
            popupInfo.classList.remove('active');
            main.classList.remove('active');
            quizBox.classList.add('active');

            showQuestions(0);
            questionCounter(1);
            headerScore();
        };
    } else {
        console.error('continueBtn not found');
    }

    if (goHomeBtn) {
        goHomeBtn.onclick = () => {
            quizSection.classList.remove('active');
            nextBtn.classList.remove('active');
            resultBox.classList.remove('active');

            questionCount = 0;
            questionNumb = 1;
            userScore = 0;
            showQuestions(questionCount);
            questionCounter(questionNumb);
        };
    } else {
        console.error('goHomeBtn not found');
    }

    if (nextBtn) {
        nextBtn.onclick = () => {
            if (questionCount < questions.length - 1) {
                questionCount++;
                showQuestions(questionCount);

                questionNumb++;
                questionCounter(questionNumb);

                nextBtn.classList.remove('active');
            } else {
                showResultBox();
            }
        };
    } else {
        console.error('nextBtn not found');
    }

    function showQuestions(index) {
        const questionText = document.querySelector('.question-text');
        if (!questionText) {
            console.error('questionText not found');
            return;
        }
        questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

        let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
                         <div class="option"><span>${questions[index].options[1]}</span></div>
                         <div class="option"><span>${questions[index].options[2]}</span></div>
                         <div class="option"><span>${questions[index].options[3]}</span></div>`;

        optionList.innerHTML = optionTag;

        const option = document.querySelectorAll('.option');
        for (let i = 0; i < option.length; i++) {
            option[i].setAttribute('onclick', 'optionSelected(this)');
        }
    }

    function optionSelected(answer) {
        let userAnswer = answer.textContent;
        let correctAnswer = questions[questionCount].answer;
        let allOptions = optionList.children.length;

        if (userAnswer == correctAnswer) {
            answer.classList.add('correct');
            userScore += 1;
            headerScore();
        } else {
            answer.classList.add('incorrect');
            for (let i = 0; i < allOptions; i++) {
                if (optionList.children[i].textContent == correctAnswer) {
                    optionList.children[i].setAttribute('class', 'option correct');
                }
            }
        }

        for (let i = 0; i < allOptions; i++) {
            optionList.children[i].classList.add('disabled');
        }

        nextBtn.classList.add('active');
    }

    function questionCounter(index) {
        const questionTotal = document.querySelector('.question-total');
        if (!questionTotal) {
            console.error('questionTotal not found');
            return;
        }
        questionTotal.textContent = `${index} of ${questions.length} Questions`;
    }

    function headerScore() {
        const headerScoreText = document.querySelector('.header-score');
        if (!headerScoreText) {
            console.error('headerScoreText not found');
            return;
        }
        headerScoreText.textContent = `Score: ${userScore} / ${questions.length}`;
    }

    function showResultBox() {
        quizBox.classList.remove('active');
        resultBox.classList.add('active');

        const scoreText = document.querySelector('.score-text');
        if (!scoreText) {
            console.error('scoreText not found');
            return;
        }
        scoreText.textContent = `Your Score: ${userScore} out of ${questions.length}`;

        const circularProgress = document.querySelector('.circular-progress');
        const progressValue = document.querySelector('.progress-value');
        if (!circularProgress || !progressValue) {
            console.error('circularProgress or progressValue not found');
            return;
        }
        let progressStartValue = -1;
        let progressEndValue = (userScore / questions.length) * 100;
        let speed = 20;

        let progress = setInterval(() => {
            progressStartValue++;

            progressValue.textContent = `${progressStartValue}%`;
            circularProgress.style.background = `conic-gradient(rgb(29, 97, 47) ${progressStartValue * 3.6}deg, rgba(255, 255, 255, .1) 0deg)`;

            if (progressStartValue == progressEndValue) {
                clearInterval(progress);
            }
        }, speed);
    }
});
