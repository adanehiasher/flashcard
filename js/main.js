const questionsList = document.querySelector('#questions-list')
const addQuestionBtn = document.querySelector('.show-btn');
const closeBtn = document.querySelector('.close-btn');

const questionInput = document.querySelector('#question-input');
const answerInput = document.querySelector('#answer-input');
const submitBtn = document.querySelector('.submitBtn');


addQuestionBtn.addEventListener('click', function (){
    document.querySelector('.question-card').classList.add('showItem')
})

closeBtn.addEventListener('click', function (){
    document.querySelector('.question-card').classList.remove('showItem')
})

function clearFields (){
    questionInput.value = " "
    answerInput.value = " "
}

let addToLocalStorage = function (){
    window.localStorage.clear();
    localStorage.setItem('Questions', JSON.stringify(array))
}

function createCard (e){
    e.preventDefault()
    let newCard = new card(questionInput.value, answerInput.value)
    array.push(newCard)
    addToLocalStorage()
    questionsList.innerHTML += `<div class="col-md-4">
        <!--Template for card data-->
        <div class="card card-body flashcard my-3">
            <h4 class="text-capitalize">${questionInput.value}</h4>
            <a href="#" class="text-capitalize my-3 show-answer">show/hide answer</a>
            <h5 class="answer mb-3">${answerInput.value}</h5>
            <div class="flashcard-btn d-flex justify-content-between">
            <a href="#" id="edit-flashcard" class=" btn my-1 edit-flashcard text-uppercase" data-id="">edit</a>
            <a href="#" id="delete-flashcard" class=" btn my-1 delete-flashcard text-uppercase">delete</a>
        </div> 
    </div>`
    clearFields()
    const showAnswer = document.querySelectorAll('.show-answer')
    showAnswer.forEach( (ans) => {
        ans.addEventListener('click', (e) => {
            let index = e.target.nextElementSibling
            index.classList.toggle('showItem')
        })
    })
    const deleteCard = document.querySelectorAll('.delete-flashcard')
    deleteCard.forEach( (c) => {
        c.addEventListener('click', (e) => {
            questionsList.removeChild(e.target.parentElement.parentElement.parentElement)
        })
    })
}

class card {
    constructor (question, answer){
        this.question = question;
        this.answer = answer;
    }
}

let array = []

submitBtn.addEventListener('click', createCard)

window.addEventListener('load', function(){
    let savedQuestions = localStorage.getItem('Questions')
    // console.log(JSON.parse(savedQuestions))
    if(addToLocalStorage){
        let parsedQuestions = JSON.parse(savedQuestions);
        parsedQuestions.forEach(function(question){
            displayQuestion(question);
        })   
    }
})

function displayQuestion(question){
    questionsList.innerHTML += `<div class="col-md-4">
        <!--Template for card data-->
        <div class="card card-body flashcard my-3">
            <h4 class="text-capitalize">${question['question']}</h4>
            <a href="#" class="text-capitalize my-3 show-answer">show/hide answer</a>
            <h5 class="answer mb-3">${question['answer']}</h5>
            <div class="flashcard-btn d-flex justify-content-between">
            <a href="#" id="edit-flashcard" class=" btn my-1 edit-flashcard text-uppercase" data-id="">edit</a>
            <a href="#" id="delete-flashcard" class=" btn my-1 delete-flashcard text-uppercase">delete</a>
        </div> 
    </div>`
}


