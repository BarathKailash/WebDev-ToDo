//selectors
const todoinput=document.querySelector(".todo-input");
const todobutton=document.querySelector(".todo-button");
const todolist=document.querySelector(".todo-list");
const filteroption=document.querySelector(".filter-todo");

//event listeners
document.addEventListener("DOMContentLoaded",getTodos);
todobutton.addEventListener("click",addtodo);
todolist.addEventListener("click", deletecheck);
filteroption.addEventListener("click", filtertodo);



//functions
function addtodo(event){
    event.preventDefault();

    const tododiv=document.createElement("div");
    tododiv.classList.add("todo");

    const newtodo=document.createElement("li");
    newtodo.innerText=todoinput.value;
    newtodo.classList.add("todo-item");
    tododiv.appendChild(newtodo);


    saveLocalTodos(todoinput.value);

    const completedbutton=document.createElement("button");
    completedbutton.innerHTML='<i class="fas fa-check"></i>';
    completedbutton.classList.add("complete-btn");
    tododiv.appendChild(completedbutton);

    const trashbutton=document.createElement("button");
    trashbutton.innerHTML='<i class="fas fa-trash"></i>';
    trashbutton.classList.add("trash-btn");
    tododiv.appendChild(trashbutton);

    todolist.appendChild(tododiv);

    todoinput.value="";

}    

function deletecheck(e) {
    const item=e.target;

    if(item.classList[0] === "trash-btn"){
        const todo=item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function(){
            todo.remove();
        });
    
    }


    if(item.classList[0] === "complete-btn") {
        const todo=item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filtertodo (e){
    const todos=todolist.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display="flex";   
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display="flex";                
                }   
                else{
                    todo.style.display="none";
                }
                break;
            case "uncompleted":
                 if(!todo.classList.contains("completed")){
                     todo.style.display="flex";
                 }
                 else{
                      todo.style.display="none";
                  }
                  break;

        }
    });
}


function saveLocalTodos(todo) {
    let todos;
    if(localStorage.getItem("todos") === null)  {
        todos=[];        
    }else {
        todos=JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

function getTodos() {
    

    let todos;
    if(localStorage.getItem("todos") === null)  {
        todos=[];        
    }else {
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo){

        const tododiv=document.createElement("div");
    tododiv.classList.add("todo");

    const newtodo=document.createElement("li");
    newtodo.innerText=todo;
    newtodo.classList.add("todo-item");
    tododiv.appendChild(newtodo);


   

    const completedbutton=document.createElement("button");
    completedbutton.innerHTML='<i class="fas fa-check"></i>';
    completedbutton.classList.add("complete-btn");
    tododiv.appendChild(completedbutton);

    const trashbutton=document.createElement("button");
    trashbutton.innerHTML='<i class="fas fa-trash"></i>';
    trashbutton.classList.add("trash-btn");
    tododiv.appendChild(trashbutton);

    todolist.appendChild(tododiv);
    });
}

function removeLocalTodos(todo) {

    let todos;
    if(localStorage.getItem("todos") === null)  {
        todos=[];        
    }else {
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex=todo.children[0].innerText;
    todos.splice(todos.todoIndex,1);
    localStorage.setItem("todos",JSON.stringify(todos));



}