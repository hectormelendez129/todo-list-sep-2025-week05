
//shorten the query
const todoList = document.querySelector('.todo-list'); 
const postItem = document.getElementById('addItem');

// Create list
let todos = [];

// Activate buttons
postItem.addEventListener('click', postNewItem);

function postNewItem() {
    const item = {
        id: new Date().getTime(),
        text: "",
        complete: false
    }

    todos.unshift(item);

    const { todoItemEl, todoInputEl, checkboxEl, editIconEl, deleteIconEl } = CreateTodoElement(item);

    // Add to DOM
    todoList.prepend(todoItemEl);

    // Enable editing new item immediately
    todoInputEl.removeAttribute("disabled");
    todoInputEl.focus();

    // Checkbox toggle complete
    checkboxEl.addEventListener("change", () => {
        item.complete = checkboxEl.checked;
        todoInputEl.classList.toggle("completed", item.complete);
    });

    // Edit button
    editIconEl.addEventListener("click", () => {
        if (todoInputEl.disabled) {
            todoInputEl.removeAttribute("disabled");
            todoInputEl.focus();
        } else {
            todoInputEl.setAttribute("disabled", true);
            item.text = todoInputEl.value; // save changes
        }
    });

    // Delete button
    deleteIconEl.addEventListener("click", () => {
        todoList.removeChild(todoItemEl);
        todos = todos.filter(t => t.id !== item.id); // remove from array
    });
}

function CreateTodoElement(item) {
    // main container
    const todoItemEl = document.createElement("div");
    todoItemEl.classList.add("todo-item");

    // checkbox
    const checkboxEl = document.createElement("input");
    checkboxEl.type = "checkbox";
    checkboxEl.checked = item.complete;

    // textarea
    const todoInputEl = document.createElement("textarea");
    todoInputEl.classList.add("todoItem");
    todoInputEl.value = item.text;
    todoInputEl.setAttribute("disabled", true);

    // icons
    const iconsEl = document.createElement("section");
    iconsEl.classList.add("icons");

    const editIconEl = document.createElement("i");
    editIconEl.classList.add("fa-solid", "fa-pencil");

    const deleteIconEl = document.createElement("i");
    deleteIconEl.classList.add("fa-solid", "fa-trash");

    // append
    iconsEl.appendChild(editIconEl);
    iconsEl.appendChild(deleteIconEl);

    todoItemEl.appendChild(checkboxEl);
    todoItemEl.appendChild(todoInputEl);
    todoItemEl.appendChild(iconsEl);

    return { todoItemEl, todoInputEl, checkboxEl, editIconEl, deleteIconEl };
}
