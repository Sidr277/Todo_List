//Model
//If localStorage has a todos array, then use it 
//Otherwise use default array.
let todos;

//Retrieve localStorage
const s = JSON.parse(localStorage.getItem('todos'));
//Check if it's an array
if (Array.isArray(s)) {
  todos = s;
} else {
  todos = [{
    title: "Meditate",
    duedate: '14-02-2023',
    id: 'id1'
  }, {
    title: "Code",
    duedate: '12-02-2023',
    id: 'id2'
  }, {
    title: "Eat",
    duedate: '15-03-2023',
    id: 'id3'
  }];
}


//Create a todo
function createToDo(title, duedate) {
  const id = '' + new Date().getTime();

  todos.push({
    title: title,
    duedate: duedate,
    id: id
  });

  saveTodos();
}
//Delete a todo
function removeToDo(idToDelete) {
  todos = todos.filter(function (todo) {
    //If the id of this todo matches idToDelete,return false,
    //else return true.
    if (todo.id === idToDelete) {
      return false;
    } else {
      return true;
    }
  });

  saveTodos();
}

//Save
function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

//Controller
function Addtodo() {
  const textbox = document.getElementById('todo-title');
  const title = textbox.value;
  const date = document.getElementById('Date-picker');
  const task_date = date.value;

  createToDo(title, task_date);

  render();
}

function deleteTodo(event) {
  const deleteButton = event.target;
  const idToDelete = deleteButton.id;

  removeToDo(idToDelete);

  render();
}

//View
function render() {
  //Reset our list.
  document.getElementById("todo-list").innerHTML = '';

  todos.forEach(function (todo) {
    const elementTask = document.createElement('div');
    elementTask.innerText = todo.title;
    elementTask.classList.add('task');

    const elementDate = document.createElement('div');
    elementDate.innerText = todo.duedate;
    elementDate.classList.add('Deadline');

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.classList.add('delete_button');
    deleteButton.style = 'margin-left:12px;';
    deleteButton.onclick = deleteTodo;
    deleteButton.id = todo.id;
    const Del=document.createElement('div');
    Del.appendChild(deleteButton);
    Del.classList.add('Delete-button');
    
    const entry=document.createElement('div');
    entry.appendChild(elementTask);
    entry.appendChild(elementDate);
    entry.appendChild(Del);
    entry.classList.add('Entry');

    const todolist = document.getElementById("todo-list");
    todolist.appendChild(entry);

    const b = document.createElement('br');
    todolist.appendChild(b);
  });
}

