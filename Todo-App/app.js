// selectors
const todoInput = document.querySelector('.todo-input'); //input field
const todoButton = document.querySelector('.todo-button'); //+button
const todoList = document.querySelector('.todo-list'); //ul
const filterOption = document.querySelector('.filter-todo'); //select  element

// event-listeners
document.addEventListener('DOMContentLoaded',getTodos); //local-storage get todo
todoButton.addEventListener('click',addTodo); //adding todo-div inside ul
todoList.addEventListener('click',deleteCheck); //removing ul
filterOption.addEventListener('click',filterTodo); //filtering todo



// functions

function addTodo(event){
    // Prevent form from submitting
    event.preventDefault();

    // Todo Div
    
    const todoDiv=document.createElement('div');
    todoDiv.classList.add("todo");
    //  create li

    const newTodo = document.createElement('li');
    newTodo.innerText= todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    // ADD TODO TO LOCAL STORAGE

    saveLocalTodos(todoInput.value);

    // check mark button

    const completedButton = document.createElement('button');
    completedButton.innerHTML='<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);
   
    // trash mark button

    const trashButton = document.createElement('button');
    trashButton.innerHTML='<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    // append to list

    todoList.appendChild(todoDiv);

    // clear todo input value
    todoInput.value= "";
    
}

function deleteCheck(e){

    // delete todo
    const item = e.target;
    if(item.classList[0]=== 'trash-btn'){
        const todo = item.parentElement;
        // Animation
        todo.classList.add('fall');
        //DElete from local-storAge
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function () {
            todo.remove();
            
        });
        
    }

    // CHECK MARK
    if (item.classList[0]==='complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle("completed");

    }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
      switch (e.target.value) {
          case "all":
              todo.style.display='flex';
              break;
        
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display= 'flex';
                }else{
                    todo.style.display='none';
                }
                break;

            case "uncompleted":
                if (!todo.classList.contains('completed')) {
                   todo.style.display= 'flex'; 
                }else{
                    todo.style.display='none';
                }
                break;
          default:
              break;
      }  
    });
}

function saveLocalTodos(todo){
    // check
    let todos;
    if (localStorage.getItem('todos')===null) {
        todos=[];
        
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos));
}


function getTodos() {
   // check
   let todos;
   if (localStorage.getItem('todos')===null) {
       todos=[];
       
   }else{
       todos = JSON.parse(localStorage.getItem('todos'));
   }
   
   todos.forEach(function(todo){
    // Todo Div
    
    const todoDiv=document.createElement('div');
    todoDiv.classList.add("todo");
    //  create li

    const newTodo = document.createElement('li');
    newTodo.innerText= todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    
    // check mark button

    const completedButton = document.createElement('button');
    completedButton.innerHTML='<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);
   
    // trash mark button

    const trashButton = document.createElement('button');
    trashButton.innerHTML='<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    // append to list

    todoList.appendChild(todoDiv);

   });
}

function removeLocalTodos(todo){
    // check
   let todos;
   if (localStorage.getItem('todos')===null) {
       todos=[];
       
   }else{
       todos = JSON.parse(localStorage.getItem('todos'));
   }
   const todoIndex= todo.children[0].innerText;
   todos.splice(todos.indexOf(todoIndex),1);
   localStorage.setItem('todos',JSON.stringify(todos));
}