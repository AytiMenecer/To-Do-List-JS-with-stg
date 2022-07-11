const form_add = document.getElementById('form_add');
const form_input = document.querySelector('.input');
const todo_list_items = document.querySelectorAll('.todo_list_item');
const todo_list = document.getElementById('todo-list');
const delete_btn = document.querySelectorAll('.delete-btn');

eventListener()

function eventListener() {
    form_add.addEventListener('submit', formValidation);
    document.addEventListener('DOMContentLoaded', keepUI);
    todo_list.addEventListener('click', removeItem);
}

function formValidation(e) {
    let input_value = form_input.value.trim();

    if (input_value === '') {
        alert('Please add a task');
    } else {
        add_todo_str(input_value);
        addUI(input_value);
    }

    e.preventDefault();
}

function addUI(paramsTodo) {

    todo_list.innerHTML += `
        <li class="todo_list_item">
            <b>${paramsTodo}</b>
            <span class="delete-btn">X</span>
        </li>
    `
    form_input.value = '';
}

function get_todo_str() {
    let todos;

    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    return todos
}

function add_todo_str(paramsTodo) {
    let todos = get_todo_str()
    todos.push(paramsTodo)
    localStorage.setItem('todos', JSON.stringify(todos))
    return todos
}

function keepUI() {
    get_todo_str().forEach(strItem => {
        addUI(strItem)
    });
}

function removeItem(e) {
    let targetSpace = e.target;
    if (targetSpace.className === "delete-btn") {
        targetSpace.parentElement.remove();
        deleteTodoItem(e);
    }

}

function deleteTodoItem(e) {
    let targetSpace = e.target;
    let todos = get_todo_str();
    todos.forEach((listItem, index) => {
        if (targetSpace.previousElementSibling.textContent === listItem) {
            todos.splice(index, 1)
        }
        localStorage.setItem('todos', JSON.stringify(todos))
    })
}