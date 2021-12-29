/* find the elements  ref: page 8*/

/* start button*/
const startBtn = document.getElementById("start");

const adminBtn = document.getElementById("admin"); 
/* the element that hve the question-card class*/
const cardEle = document.getElementsByClassName("question-card");

/* the question title*/
const qTitleEle = document.getElementById("question");
/* the element with id of answers*/
const choicesEle = document.getElementById("answers");
/* the next button*/
const nextBtn = document.getElementById("next");

let userName = 'Anonymous';

let currentQuestion, qIndex, score = 0, points = 10, maxPoints;

let questions = [];
let answerIndex;

/* function called when clicking on the start button*/

function getQuestions() {
    let ajax = new XMLHttpRequest();
    ajax.open("GET", "questions_api.php");
    ajax.send();
    ajax.onreadystatechange = function () {
        if (ajax.status === 200 && ajax.readyState === 4) {
            if (ajax.responseText.length > 0) {
                questions = JSON.parse(ajax.responseText);
                console.log(questions);
                maxPoints = 10 * questions.length;
                createQuestion();
            }
        }
    }
}

function getAdminPage(){
    let ajax = new XMLHttpRequest();
    ajax.open("GET", "admin.php"); 
    ajax.send(); 
    ajax.onreadystatechange = function(){
        if(ajax.status === 200 && ajax.readyState === 4){
            console.log(ajax.response); 
            let obj = ajax.responseText; 
            let form = document.createElement("div");
            // form = obj
            
            document.querySelector(".name-card").classList.add("hide");
            adminBtn.style.display = 'none'; 
            let card = document.querySelector(".card");
            card.classList.remove("hide"); 
            card.innerHTML = obj; 
        }
    }; 
}
function start() {
    let nameCard = document.querySelector(".name-card");
    nameCard.classList.add("hide");
    nameCard.classList.remove("question-card");
    if (nameCard.lastElementChild.value != "") {
        userName = nameCard.lastElementChild.value;
    }

    /* show the questions card cardEle*/
    for (let i = 0; i < cardEle.length; i += 1) {
        cardEle[i].style.display = 'block';
    };
    /* hide the start button*/
    startBtn.style.display = 'none';
    adminBtn.style.display = 'none';
    /* set the maximum points a user can get for solving all the questions*/

    console.log('start function called');
    getQuestions();

}

function sendQuestion(){
    let ajax = new XMLHttpRequest();
    ajax.open("POST", "admin.php", true); 
    ajax.send(); 
    ajax.onreadystatechange = function(){
        if(ajax.status === 200 && ajax.readyState === 4){
            let card = document.querySelector(".card");
            card.innerHTML = ajax.responseText; 
        }
    }
}

function createQuestion() {
    console.log('Creating question');
    /* randomly select a question from the questions array*/
    /* qIndex is the index of the question in the array*/
    qIndex = Math.floor(Math.random() * questions.length);
    console.log(qIndex);
    console.log(questions);
    currentQuestion = questions[qIndex];
    questions.splice(qIndex, 1);
    console.log(currentQuestion);
    qTitleEle.innerHTML = currentQuestion.text;  /* fill the question title ref: slide 14*/

    /* remove the div that wraps all the answer buttons*/
    choicesEle.removeChild(choicesEle.firstElementChild); /*ref: slide 15 and 23*/

    /* create a new div to wrap the choices*/
    let wrapper = document.createElement("div");
    wrapper.id = currentQuestion.id;
    /* add all the choices to this wrapper*/
    let choices = currentQuestion.choices;
    console.log(typeof choices);
    answerIndex = 1;
    Object.keys(choices).forEach(choice => {
        wrapper.appendChild(createChoice(choices[choice]));
    });
    /* add the wrapper to the choicesEle*/
    choicesEle.appendChild(wrapper);
    /* remove the selected question from the questions array so that it will not be shown again*/

    // questions
}

/* function to create a button for each choice*/
function createChoice(choice) {
    console.log('creating choice', choice);
    /* create a button element*/
    let element = document.createElement("button");
    element.classList.add("btn");
    element.innerText = choice;
    /* create a data-correct attribute for the correct answer button*/
    console.log('we came here!', answerIndex);
    element.id = answerIndex++;

    /* add click event handler.*/
    element.addEventListener('click', answer);
    return element;
}
/* function to handle the click on an answer button*/
function answer(source) {
    const src = source.srcElement;
    console.log('user choose ', src);
    const obj = {
        id: currentQuestion.id,
        answer: src.id
    };
    console.log('src.id', src.id);
    var json = JSON.stringify(obj);
    console.log('json string:', json);
    var ajax = new XMLHttpRequest();

    ajax.open("POST", "questions_api.php", true);
    ajax.send(json);
    ajax.onreadystatechange = function () {
        if (ajax.status === 200 && ajax.readyState === 4) {
            console.log('ajax response', ajax.responseText);
            var answer = JSON.parse(ajax.responseText);
            console.log('the answer is', answer);
            if (answer === true) {
                src.classList.add("correct");
                cardEle[0].classList.add("correct");
                /* update the user score*/
                score += points;
            }
            else {
                src.classList.add("incorrect");
                cardEle[0].classList.add("incorrect");
            }
        }

    }
    proceed();
}
/* function called after the click of an answer button*/
function proceed() {
    /* disable the buttons so the user can't change his answer*/
    disableChoices();
    /* then show the next button to move to next question*/
    setTimeout(showNext, 1000);
}

/* function to disable the choices buttons*/
function disableChoices() {
    console.log('disabling the choices');
    /* find all choices buttons*/
    const choicesBtns = document.querySelectorAll("button:not(.hide)");
    choicesBtns.forEach(btn => {
        /* remove the click event handler so the button does nothing when clicked*/
        btn.removeEventListener("click", answer);
    });
}

/* function to show the next button*/
function showNext() {
    cardEle[0].classList.remove("correct");
    cardEle[0].classList.remove("incorrect");
    if (questions.length > 0) {
        /* remove the hide class from the nextBtn*/
        console.log('Show next button');
        /* remove the 'correct' and the 'incorrect' classes from the cardEle*/
        
        nextBtn.classList.remove("hide");
    }
    else {
        /* show the score*/
        console.log('calculating score');
        document.getElementsByName("scoreMessage")[0].innerHTML = `Done! your score is ${score} / ${maxPoints}`;
        console.log('sending score to database'); 
        sendScore(); 
        

    }
}

function sendScore(){
    const obj = {
        user: userName, 
        score: score 
    }; 
    let ajax = new XMLHttpRequest(); 
        ajax.open("POST", "scores_api.php", true); 
        ajax.send(JSON.stringify(obj)); 
        ajax.onreadystatechange = function(){
            console.log("here 2 readystate"); 
            if(ajax.status === 200 && ajax.readyState === 4){
                console.log("here 3"); 
                var response = JSON.parse(ajax.responseText); 
                if(response){
                   console.log("displaying all scores"); 
                   displayScores(); 
                }
            }
        };
}

function displayScores() {
    const table = document.querySelector(".table");
    const card = document.querySelector(".card");
    let ajax2 = new XMLHttpRequest();
    ajax2.open("GET", "scores_api.php");
    ajax2.send();
    ajax2.onreadystatechange = function () {
        if (ajax2.status === 200 && ajax2.readyState === 4) {
            let allscores = JSON.parse(ajax2.responseText);
            document.querySelector(".card").innerHTML = '';
            console.log(allscores);  
            table.classList.remove("hide"); 
            console.log(table); 
            // table.appendChild("")
            for(var i = 0; i<allscores.length; i++){
                var newRow = document.createElement("tr"); 
                var userData = document.createElement("td"); 
                var userScore = document.createElement("td"); 
                userData.innerHTML = allscores[i].user;
                userScore.innerHTML = allscores[i].score; 
                newRow.appendChild(userData); 
                newRow.appendChild(userScore);
                table.appendChild(newRow); 
            }
            card.appendChild(table);
            //document.createElement("table");
              

        }
    };
}

/* function called when clicking on next button*/
function goNext() {
    /* hide the next button*/
    nextBtn.classList.add("hide")
    /* create a new question*/
    createQuestion();
}

