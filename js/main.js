//shorten query statements
const todoList = document.querySelector('.todo-list'); 
const postItem = document.getElementById('addItem');
//create memory for todo list

let todos = [];

//acitvate button
postItem.addEventListener('click', postNewItem);

function postNewItem() {
    const item = {
        id: new Date().getTime(),
        text: "",
        complete: false
    }

    todos.unshift(item);

    const { todoItemEl, todoInputEl, checkboxEl, deleteIconEl } = CreateTodoElement(item);

    todoList.prepend(todoItemEl);

    todoInputEl.focus();

    // Checkbox: toggle logic completed and disables the textarea
    checkboxEl.addEventListener("change", () => {
        item.complete = checkboxEl.checked;

        if (item.complete) {
            todoInputEl.classList.add("completed"); // apply completed only to textarea
            todoInputEl.setAttribute("disabled", true); // lock edits
        } else {
            todoInputEl.classList.remove("completed"); // remove completed from textarea
            todoInputEl.removeAttribute("disabled"); // allows editing
        }
    });

    // trash can removes the entire row
    deleteIconEl.addEventListener("click", () => {
        todoList.removeChild(todoItemEl);
        todos = todos.filter(t => t.id !== item.id);
    });
}

function CreateTodoElement(item) {
    const todoItemEl = document.createElement("div");
    todoItemEl.classList.add("todo-item");

    const checkboxEl = document.createElement("input");
    checkboxEl.type = "checkbox";
    checkboxEl.checked = item.complete;

    const todoInputEl = document.createElement("textarea");
    todoInputEl.classList.add("todoItem");
    todoInputEl.value = item.text;

    const iconsEl = document.createElement("section");
    iconsEl.classList.add("icons");

    const deleteIconEl = document.createElement("i");
    deleteIconEl.classList.add("fa-solid", "fa-trash");

    iconsEl.appendChild(deleteIconEl);

    todoItemEl.appendChild(checkboxEl);
    todoItemEl.appendChild(todoInputEl);
    todoItemEl.appendChild(iconsEl);

    return { todoItemEl, todoInputEl, checkboxEl, deleteIconEl }; 
}
