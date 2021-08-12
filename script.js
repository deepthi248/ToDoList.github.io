//getting dom elements 
const form = document.getElementById('form');
const input = document.getElementById('input');
const todosUl = document.getElementById('todos');

//getting the slider elements 

/*const slider_container = document.querySelector("slider-container");*/
const sliderContainer = document.getElementById("slide_container");
const right_slide = document.getElementById('right-slide');
const downButton = document.getElementById('down-button');
const slide_length = right_slide.querySelectorAll('div').length;



let activeSlideIndex = 0;


downButton.addEventListener('click', () => changeSlideDown("down"));

const changeSlideDown = (direction) => {
    const sliderheight = sliderContainer.clientHeight;
    if (direction === "down") {
        activeSlideIndex++;
        if (activeSlideIndex > slide_length - 1) {
            activeSlideIndex = 0;
        }
    }
    right_slide.style.transform = `translateY(-${activeSlideIndex*sliderheight}px)`

};



//check the local storage 

const todos = JSON.parse(localStorage.getItem('todos'));
if (todos) {
    todos.forEach(todo => addtoDo(todo));
}

//getting the input value

form.addEventListener('submit', (e) => {
    e.preventDefault(); //removing the default functionality of the Dom
    addtoDo();
});

function addtoDo(toDo) {
    let todoText = input.value; //getting the value from user input

    if (toDo) {
        todoText = toDo.text;
    }

    if (todoText) {
        //create list elememt 
        const todoElement = document.createElement('li');

        if (toDo && toDo.completed)
            todoElement.classList.add('completed');
        //adding the list text to the input by user
        todoElement.innerText = todoText;
        //appending child --list item
        todosUl.appendChild(todoElement);


        todoElement.addEventListener('click', () => {
            todoElement.classList.toggle('completed');
            updateLS();
        });


        todoElement.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            todoElement.remove();
            updateLS();
        });

        input.value = "";
        updateLS();
    }


}

function updateLS() {
    todoElement = document.querySelectorAll('li');
    const todosLs = [];

    todoElement.forEach(todoElement => {
        todosLs.push({
            text: todoElement.innerText,
            completed: todoElement.classList.contains('completed')
        })
    });

    localStorage.setItem('todosLs', JSON.stringify((todosLs)));
}