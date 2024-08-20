import projects from "./newProject";
import Project from "./newProject";

const content = document.querySelector('.content');
const main = document.querySelector('.main');

export function populateMain(){

    main.textContent = "";
    projects.study.forEach(project => {
        const title = project.title;
        const description = project.description;
        const date = project.date;
        const priority = project.priority;

        const todo = document.createElement('div');
        const todo_title = document.createElement('div');
        const todo_description = document.createElement('div');
        const todo_date = document.createElement('div');
        const todo_priority = document.createElement('div');

        todo.classList.add('todo');
        todo.classList.add('priority-'+priority);
        todo_title.classList.add('todo_title');
        todo_description.classList.add('todo_description');
        todo_date.classList.add('todo_date');
        todo_priority.classList.add('todo_priority');

        todo_title.innerHTML = title;
        todo_description.innerHTML = description;
        todo_date.innerHTML = date;
        todo_priority.innerHTML = priority;

        main.appendChild(todo);
        todo.appendChild(todo_title);
        todo.appendChild(todo_description);
        todo.appendChild(todo_date);
        todo.appendChild(todo_priority);
        
    });

}