const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const startBtn = document.querySelector('.startBtn');
const timer = document.querySelector('.timer');



//Make an array of objectss that stores question, choices of question & answer
const quiz =[
    {
        question:"Q. Which is the capital of Gujrat?",
        choices: ["Surat","Ahemdabad","Gandhinagar","Varodha"],
        answer :"Ahemdabad"
    },
    {
        question:"Q. Which of the following is not a JavaScript data type?",
        choices: ["string","boolean","object","float"],
        answer :"float"
    },
    {
        question:"Q. What is our purpose in this world?",
        choices: ["to eat & sleep","to live disiplined life","to enjoy only","to famous without work"],
        answer :"to live disiplined life"
    },
    {
        question:"Q. Which is the capital of Gujrat?",
        choices: ["Surat","Ahemedabad","Gandhinagar","Varodha"],
        answer :"Ahemdabad"
    },
];

//Making Variables
let currentQuestionIndex =0;
let score = 0;
let quizOver = false;
let timeleft =15;
let timerID = null;

//Arrow Function to Show Questions
const showQuestions =() =>{  
    const questionDetails =quiz[currentQuestionIndex]; 
    questionBox.textContent = questionDetails.question;

    choicesBox.textContent = " ";
    for(let i=0; i<questionDetails.choices.length;i++){
        const currentChoices = questionDetails.choices[i];
        const choiceDiv = document.createElement('div');
        choiceDiv.textContent = currentChoices;
        choiceDiv.classList.add('choice');
        choicesBox.appendChild(choiceDiv);

        choiceDiv.addEventListener('click',()=>{
            if(choiceDiv.classList.contains('selected')){
                choiceDiv.classList.remove('selected');
            }
            else{
                choiceDiv.classList.add('selected');
            }
        });
    }

    if(currentQuestionIndex<quiz.length){
        startTimer();
    }
}

//Function to check answers
const checkAnswer =() =>{
    const selectedChoice =document.querySelector('.choice.selected');
    if(selectedChoice.textContent === quiz[currentQuestionIndex].answer){
        //alert("Correct Answer!");
        displayAlert("Correct Answer!");
        score++;
    }
    else{
        //alert("Wrong Answer!");
        displayAlert(`Wrong Answer! ${quiz[currentQuestionIndex].answer} is the Correct Answer`);
    }
    timeleft =15;
    currentQuestionIndex++;
    if(currentQuestionIndex < quiz.length){
        showQuestions();
   }
   else{
    showScore();
    stopTimer();
   }
}

//Function to show score
const showScore = () =>{
    questionBox.textContent=" ";
    choicesBox.textContent =" ";
     scoreCard.textContent = `You Scored ${score} out of ${quiz.length}!`;
     displayAlert("You have completed the Quiz");
     nextBtn.textContent ="Play Again"; 
      quizOver = "true";
      timer.style.display ="none";
}

//Function to Show Alert
const displayAlert =(msg) =>{
    alert.textContent = msg;
    setTimeout(()=>{
       alert.style.display = "none";
    },2000);
}

//Function to Start Timer
const startTimer =() =>{
    clearInterval(timerID); //Check for any exist timer
    timer.textContent = timeleft;

    const countDown =()=>{
        timeleft--;
        timer.textContent = timeleft;
        if(timeleft === 0){
          const confirmUser = confirm ("Time Up!!! Do you want to play the quiz again");
          if(confirmUser){
            timeleft = 15;
            startQuiz();
          }
          else{
            startBtn.style.display ="block";
            container.style.display ="none";
            return;
          }
        }
    }
   timerID = setInterval(countDown,1000);
}

//Function to Stop Timer
const stopTimer=() =>{
    clearInterval(timerID);
}

//Function to shuffle question
const shuffleQuestion = () =>{
    for(let i=quiz.length-1; i>0; i--){
        const j = Math.floor(Math.random() *(i+1));
        [quiz[i], quiz[j]] =[quiz[j], quiz[i]];
    }
    currentQuestionIndex =0;
    showQuestions();
}

//Function to Start Quiz
const startQuiz =() =>{
    timeleft = 15;
    timer.style.display ="flex";
    showQuestions();
}

// Adding Event Listener to Start Button
startBtn.addEventListener('click', ()=>{
     startBtn.style.display = "none";
     container.style.display = "block";
     startQuiz();
    });



nextBtn.addEventListener('click', ()=>{
    const selectedChoice = document.querySelector('.choice.selected');
    if(!selectedChoice && nextBtn.textContent === "Next" ){
        //alert("Select your answer");
        displayAlert("Select your answer");
        return;
    }
    if(quizOver){
        nextBtn.textContent = "Next";
        scoreCard.textContent =" ";
        currentQuestionIndex = 0;
        quizOver = false;
        score = 0;
        startQuiz();
    }
    else{
    checkAnswer();
    }
});

const settings = [
    {
        "description": "Enable automatic GitHub authentication for Git commands within VS Code using the **github.gitAuthentication** setting.",
        "details": {
            "key": "github.gitAuthentication",
            "value": true
        }
    },
    {
        "type": "setting",
        "description": "Enable automatic repository detection using the **git.autoRepositoryDetection** setting.",
        "details": {
            "key": "git.autoRepositoryDetection",
            "value": "true"
        }
    },
    {
        "type": "setting",
        "description": "Enable the integrated Git credential helper using the **git.useIntegratedAskPass** setting.",
        "details": {
            "key": "git.useIntegratedAskPass",
            "value": true
        }
    },
    {
        "type": "command",
        "description": "Use the **Git: Clone** command to clone a repository.",
        "details": {
            "key": "git.clone"
        }
    }
];