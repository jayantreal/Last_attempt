let todoInput = document.querySelector(".todo-input");
let addTodobutton=document.querySelector(".add-todo");
let todolist = document.querySelector(".todos-list")


function addtodo(){
    let todo= todoInput.value;
    
    if(todo){
        let listitem = document.createElement("li");
        listitem.classList.add("todo-item");

        let ptag = document.createElement("p");
        ptag.classList.add("todo");
        ptag.innerHTML=todo;

        let deletebutton = document.createElement("button");
        deletebutton.classList.add("delete-task");
        deletebutton.innerHTML="Delete";

        deletebutton.addEventListener("click", function() {
            listitem.remove();
        });

        listitem.append(ptag);
        listitem.append(deletebutton);
        todolist.append(listitem);
        todoInput.value = "";
    }
}

addTodobutton.addEventListener("click", function(){ 
addtodo();
})

todo.addEventListener("keypress",function(e){
    if(e.key=="Enter"){
        addtodo();
    }
})
