import { isToday, parseISO, startOfWeek, endOfWeek, isWithinInterval, format } from "date-fns";

const projects = JSON.parse(localStorage.getItem('todos')) || {
    "Study": [],
    "Work": []
}

function populateStorage() {
    localStorage.setItem("todos", JSON.stringify(projects));
}

export function loadStorage() {
    const storedProjects = localStorage.getItem("todos");

    if (storedProjects) {
        try {
            Object.assign(projects, JSON.parse(storedProjects));
        } catch (error) {
            console.error("Failed to parse projects from localStorage:", error);
        }
    }
}

const projectForm = document.querySelector('form');
let currentFolder = Object.keys(projects)[0];
let folder = 'Todo'

export default class Project {
    constructor(title, description, date, priority) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.priority = priority;
    }

    static isFutureDate(date) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        return new Date(date) > today;
    }

    static addTodo(title, description, date, priority) {
        const currentProject = projects[currentFolder];

        if (!currentProject) {
            console.error(`The folder "${currentProject}" does not exist.`)
            return
        }

        // Validate the date
        if (!this.isFutureDate(date)) {
            alert("Please Enter a Valid Date.");
            return;
        }

        const newTodo = new Project(title, description, date, priority);
        currentProject.push(newTodo);
        populateStorage();
        console.log(projects);
    }

}

projectForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const dialog = document.querySelector('.overlay');
    console.log(folder);

    if (folder.toLowerCase() === 'project') {
        const title = document.getElementById('title').value;
        projects[title] = [];
        populateStorage();
        createFolder();
        projectForm.reset();
        dialog.classList.remove('active'); 1;


        const folderKeys = Object.keys(projects);
        if (folderKeys.length === 1) {
            currentFolder = folderKeys[0];

            console.log(`Current folder set to: ${currentFolder}`);
        }
        selectedFolder();
        console.log(projects)
    } else {
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const date = document.getElementById('date').value;
        const priority = document.querySelector(`input[name="priority"]:checked`).value;

        Project.addTodo(title, description, date, priority);
        populateMain(currentFolder);
        projectForm.reset();
        dialog.classList.remove('active'); 1;
    }
})

export function selectedFolder() {
    const ul_list = document.querySelectorAll('li[class=folder]');
    const allFolders = document.querySelectorAll('li');

    allFolders.forEach(list => {
        list.addEventListener('click', () => {
            // Remove 'selected_folder' from all parent elements
            allFolders.forEach(list => {
                const parent = list.closest('.sidebar_container');
                const parent2 = list.closest('.home_container');

                if (parent) {
                    parent.classList.remove('selected_folder');
                } else {
                    parent2.classList.remove('selected_folder');
                }
            });
            // Add 'selected_folder' to the clicked element's parent
            const clickedParent = list.closest('.sidebar_container');
            const clickedParent2 = list.closest('.home_container');
            if (clickedParent) {
                clickedParent.classList.add('selected_folder');
            } else {
                clickedParent2.classList.add('selected_folder');
            }
        });
    });

    ul_list.forEach(list => {
        list.addEventListener('click', () => {
            isHomeView = false;
            currentFolder = list.innerHTML.trim();  // Trim the currentFolder

            if (currentFolder === 'Today') {
                populateToday();
            } else if (currentFolder === 'This Week') {
                populateWeek();
            } else {
                populateMain(currentFolder);
            }

            console.log(`Current folder is ${currentFolder}`);
        });
    });
};


console.log(projects)

export function createFolder() {
    const folder = document.querySelector('.sidebar_folders');
    const sidebar_title = document.createElement('div');
    sidebar_title.classList.add('sidebar_title')
    sidebar_title.innerHTML = 'Projects';
    folder.textContent = ""
    folder.appendChild(sidebar_title);

    Object.keys(projects).forEach(key => {
        const sidebar_container = document.createElement('div');
        const sidebar_folder = document.createElement('li');
        const delete_folder = document.createElement('span');

        sidebar_container.classList.add('sidebar_container')
        sidebar_folder.classList.add(`folder`);
        delete_folder.classList.add('delete_folder');

        sidebar_folder.innerHTML = key;
        delete_folder.innerHTML = 'x';

        folder.appendChild(sidebar_container);
        sidebar_container.appendChild(sidebar_folder);
        sidebar_container.appendChild(delete_folder)
    });

    attachDeleteListeners();
}

export function populateMain(currentFolder) {
    const main = document.querySelector('.main');
    main.textContent = "";
    const selectedFolder = projects[currentFolder];
    mainDivs(selectedFolder, currentFolder);
    add_todo()
}

function mainDivs(folder, currentFolder) {
    const selectedFolder = folder
    const main = document.querySelector('.main');

    selectedFolder.forEach((project, index) => {
        const { title, description, date, priority } = project;

        const todo = document.createElement('div');
        const todo_title = document.createElement('div');
        const todo_description = document.createElement('div');
        const todo_date = document.createElement('div');
        const todo_priority = document.createElement('div');
        const todo_delete = document.createElement('i');
        const todo_details = document.createElement('button');
        const left = document.createElement('div');
        const right = document.createElement('div');
        const checkbox = document.createElement('input');

        todo.classList.add('todo');
        todo.classList.add('priority-' + priority);
        todo_title.classList.add('todo_title');
        todo_description.classList.add('todo_description');
        todo_date.classList.add('todo_date');
        todo_priority.classList.add('todo_priority');
        todo_details.classList.add('detailsBtn');
        todo_delete.classList.add('todo_delete');
        todo_delete.classList.add('fa-solid');
        todo_delete.classList.add('fa-trash-can');
        left.classList.add('left_panel');
        right.classList.add('right_panel')
        checkbox.setAttribute('type', 'checkbox');
        checkbox.classList.add('checkbox');

        todo_title.innerHTML = title;
        todo_date.innerHTML = date;
        todo_delete.innerHTML = ''
        todo_details.innerHTML = 'Details'

        main.appendChild(todo);
        todo.appendChild(left);
        todo.appendChild(right);
        left.appendChild(checkbox);
        left.appendChild(todo_title);
        right.appendChild(todo_date);
        right.appendChild(todo_details)
        right.appendChild(todo_delete);

        todo_details.addEventListener('click', () => {
            const details = document.querySelector('.details');

            const detailsTitle = document.querySelector('.details_title')
            const detailsProject = document.querySelector('.details_projectValue');
            const detailsPriority = document.querySelector('.details_priorityValue');
            const detailsDate = document.querySelector('.details_dateValue');
            const detailsDescription = document.querySelector('.details_descriptionValue');

            detailsTitle.innerHTML = title;
            detailsProject.innerHTML = currentFolder;
            detailsPriority.innerHTML = priority;
            detailsDate.innerHTML = date;
            detailsDescription.innerHTML = description;

            details.classList.add('active');
        })

        todo_delete.addEventListener('click', () => {
            todoDelete(index, currentFolder);
            populateStorage()
        })
    });


}

function add_todo() {
    const main = document.querySelector('.main');
    const overlay = document.querySelector('.overlay');
    const add_todo = document.createElement('button');

    add_todo.classList.add('add_todo')
    add_todo.setAttribute('type', 'button');
    add_todo.innerHTML = '<span>+</span> Add Task';
    main.appendChild(add_todo);

    document.querySelector('.add_todo').addEventListener('click', () => {
        populateForm();
        overlay.classList.add('active');
        console.log(projects);
    })

    folder = 'todo'
}

let isHomeView = false;

export function populateHome() {
    isHomeView = true;

    const main = document.querySelector('.main');
    main.textContent = "";

    Object.keys(projects).forEach(key => {
        mainDivs(projects[key], key);
    });

}

export function populateForm() {
    populateTodo();

}

function populateTodo() {
    const prio = ['low', 'medium', 'high'];
    const content = document.querySelector('.add_content');
    const sidebar = document.querySelector('.sidebar');
    content.innerHTML = "";
    sidebar.innerHTML = "";

    const title = document.createElement('input');
    const description = document.createElement('textarea');
    const dateDiv = document.createElement('div');
    const dateLabel = document.createElement('label');
    const date = document.createElement('input');
    const prioWrapper = document.createElement('div');
    const prioDiv = document.createElement('div');
    const priority = document.createElement('input');
    const button = document.createElement('button');
    const fileName = document.createElement('div');

    title.setAttribute('id', 'title');
    title.setAttribute('maxlength', '15');
    title.setAttribute('required', "")
    description.setAttribute('id', 'description');
    description.setAttribute('maxlength', '100');
    date.setAttribute('id', 'date');
    date.setAttribute('required', "")
    prioDiv.classList.add('prio_container');
    button.setAttribute('id', 'submitBtn');
    prioWrapper.classList.add('prio_wrapper');
    fileName.classList.add('fileName');



    title.setAttribute('type', 'text');
    date.setAttribute('type', 'date');
    button.setAttribute('type', 'text');
    button.setAttribute('type', 'submit');

    title.placeholder = 'Title: Pay Bills'
    description.placeholder = 'Description'
    priority.placeholder = 'Priority'
    dateLabel.innerHTML = 'Due Date: '
    fileName.innerHTML = 'Todo'

    button.innerHTML = 'Submit';

    for (let i = 0; i < prio.length; i++) {
        const prioBtn = document.createElement('input');
        const prioLabel = document.createElement('label');

        prioBtn.setAttribute('type', 'radio');
        prioBtn.setAttribute('id', prio[i]);
        prioBtn.setAttribute('name', 'priority');
        prioBtn.setAttribute('value', prio[i]);
        prioBtn.setAttribute('required', "");

        prioLabel.setAttribute('for', prio[i]);
        prioLabel.setAttribute('id', `prio_${prio[i]}`)

        prioBtn.innerHTML = prio[i];
        prioLabel.innerHTML = prio[i];

        prioDiv.appendChild(prioBtn);
        prioDiv.appendChild(prioLabel);
    }
    sidebar.appendChild(fileName);
    content.appendChild(title);
    content.appendChild(description);
    content.appendChild(dateDiv);
    dateDiv.appendChild(dateLabel);
    dateDiv.appendChild(date);
    content.appendChild(prioWrapper)
    prioWrapper.appendChild(prioDiv);
    prioWrapper.appendChild(button);
}

export function populateProject() {
    const content = document.querySelector('.add_content');
    const sidebar = document.querySelector('.sidebar');
    content.innerHTML = "";
    sidebar.innerHTML = "";

    const fileName = document.createElement('div')
    fileName.classList.add('fileName')

    const title = document.createElement('input');
    const button = document.createElement('button');

    title.setAttribute('id', 'title');
    title.setAttribute('maxlength', '15');
    title.setAttribute('required', "");
    button.setAttribute('id', 'submitBtn');

    title.setAttribute('type', 'text');
    button.setAttribute('type', 'submit');

    title.placeholder = 'Title...';
    button.innerHTML = 'Create project';
    fileName.innerHTML = "Project"

    content.appendChild(title);
    content.appendChild(button);
    sidebar.appendChild(fileName)

    folder = 'project'
}

function todoDelete(index, currentFolder) {
    if (currentFolder === 'This Week') {
        // Find the original folder and index of the todo within the `projects` structure
        const originalTodo = thisWeekTodos[index];

        for (let folder in projects) {
            const folderTodos = projects[folder];
            const todoIndex = folderTodos.indexOf(originalTodo);
            if (todoIndex > -1) {
                folderTodos.splice(todoIndex, 1); // Remove the todo from the original folder
                break;
            }
        }

        // Rebuild the filtered list for the week and refresh the view
        weekListItems();
        populateWeek();
    } else {
        const currentProject = projects[currentFolder];
        if (currentProject) {
            currentProject.splice(index, 1);
        }

        // Refresh the view based on the current folder
        if (currentFolder === "Today") {
            populateToday();
        } else if (currentFolder === "This Week") {
            populateWeek();
        } else {
            populateMain(currentFolder);
        }
    }
}

export function projectDelete(key) {
    delete projects[key];
    populateStorage()

}

export function attachDeleteListeners() {
    const deleteButtons = document.querySelectorAll('.delete_folder');

    deleteButtons.forEach(item => {
        item.addEventListener('click', () => {
            const key = item.previousSibling.innerHTML;

            if (confirm(`Are you sure you want to delete the project "${key}"?`)) {
                const wasCurrentFolder = key === currentFolder; // Check if it's the current folder

                projectDelete(key);
                createFolder();
                selectedFolder();

                // If the deleted folder was the current folder, update currentFolder and UI
                if (wasCurrentFolder) {
                    currentFolder = Object.keys(projects)[0] || ""; // Select the first available folder or clear currentFolder
                    if (currentFolder) {
                        populateMain(currentFolder); // Populate the first folder if available
                    } else {
                        document.querySelector('.main').textContent = ""; // Clear the main content if no folders remain
                    }
                } else {
                    populateMain(currentFolder); // Refresh the view if a different folder was deleted
                }
            }
        });
    });
}

const todayTodos = [];

export function todayListItems() {
    todayTodos.length = 0;

    Object.keys(projects).forEach(key => {
        projects[key].forEach(todo => {
            const todoDate = parseISO(todo.date);
            if (isToday(todoDate)) {
                todayTodos.push(todo);
            }
        });
    });

    return todayTodos;
}

export function populateToday() {
    todayListItems();

    const main = document.querySelector('.main');
    main.textContent = "";

    mainDivs(todayTodos, 'Today');
}

const thisWeekTodos = [];

export function weekListItems() {
    thisWeekTodos.length = 0; // Clear existing todos for the week

    const start = startOfWeek(new Date(), { weekStartsOn: 1 }); // Start of the week (Monday)
    const end = endOfWeek(new Date(), { weekStartsOn: 1 }); // End of the week (Sunday)

    Object.keys(projects).forEach(key => {
        projects[key].forEach(todo => {
            const todoDate = parseISO(todo.date);
            if (isWithinInterval(todoDate, { start, end })) {
                thisWeekTodos.push(todo);
            }
        });
    });

    return thisWeekTodos;
}

export function populateWeek() {
    weekListItems(); // Update thisWeekTodos with todos for the current week
    const main = document.querySelector('.main');
    main.textContent = "";

    // Pass thisWeekTodos and 'This Week' to mainDivs
    mainDivs(thisWeekTodos, 'This Week');
}

loadStorage();