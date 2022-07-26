
//referencias al HTML
const addTodoForm = document.querySelector('.addTodo')
const titleTodo = document.querySelector('#title')
const taskList = document.querySelector('.taskList')
const titleTodoTimer = document.querySelector('.titleTodo')
const timerRef = document.querySelector('.timer')

let todos = []
let timer = null;
let time = 0;
let timeBreak = 0;
let timerBreak = null;

function renderView() {

    let html = todos.map(todo => {
        return `<div class="todo">
                    ${todo.inProgress ? '<button class="btnInProgress">In progress</button>' : `<button data-id=${todo.id} id="btnStartTodo">start</button`}
                    <h3> ${todo.title} </h3>
                </div>`
    })

    html = html.join('')
    taskList.innerHTML = html;

    const btnStartTodo = document.querySelectorAll('#btnStartTodo')
    btnStartTodo.forEach(btnStart => {
        btnStart.addEventListener('click', (e) => {
            if (!timer) {
                let idElement = e.target.getAttribute('data-id');
                let item = todos.find((todo) => todo.id === idElement)
                item.inProgress = true;
                startButtonHandler(item);
                renderView();
            } else {
                alert('Ya hay una tarea en proceso')
            }

        })
    })
}


function renderTime() {
    let minutes = parseInt(time / 60);
    let seconds = parseInt(time % 60);
    timerRef.innerHTML = `<h2> ${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds} </h2>`;
}

function handlerTimeBreak() {
    timeBreak--;

    if (timeBreak === 0) {
        clearInterval(timerBreak)
    }

    let minutes = parseInt(timeBreak / 60);
    let seconds = parseInt(timeBreak % 60);
    timerRef.innerHTML = `<h2> ${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds} </h2>`;
}

function timeOfBreak() {
    titleTodoTimer.textContent = 'break time';
    timeBreak = 10 * 30;

    timerBreak = setInterval(() => {
        handlerTimeBreak();
    }, 1000);
}

function handlerTime(current) {
    time--;
    renderTime();

    if (time === 0) {
        clearInterval(timer)
        titleTodoTimer.textContent = '';
        let todo = todos.find(item => item.id === current)
        todo.inProgress = false;
        timer = null;
        renderView();
        timeOfBreak();
    }
}

function startButtonHandler({ title, id }) {
    let current = id;
    titleTodoTimer.textContent = title;

    time = 25 * 60;
    timer = setInterval(() => {
        handlerTime(current)
    }, 1000);
}


function addTodo(todoName) {

    const newTodo = {
        id: crypto.randomUUID(),
        title: todoName,
        completed: false,
        inProgress: false,
    }

    todos.push(newTodo)
    renderView();
}

addTodoForm.addEventListener('click', (e) => {
    e.preventDefault()
    addTodo(titleTodo.value);
    titleTodo.value = ''
})