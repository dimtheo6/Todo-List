
export const projects = {
    study: [],
    work: [],
    random: []
};

const projectForm = document.querySelector('form');
let currentFolder = "study";
let folder = 'Todo'

export default class Project{
    constructor(title,description,date,priority){
        this.title = title;
        this.description = description;
        this.date = date;
        this.priority = priority;
    }

    static addTodo(title,description,date,priority){
        const currentProject = projects[currentFolder];

        if (!currentProject){
            console.error(`The folder "${currentProject}" does not exist.`)
            return
        }

        const newTodo = new Project(title,description,date,priority);
        currentProject.push(newTodo);
        console.log(projects);
    }

}

projectForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const dialog = document.querySelector('.overlay');
    console.log(folder);

    if (folder.toLowerCase() === 'project'){
        const title = document.getElementById('title').value;
        projects[title]=[];
        createFolder();
        projectForm.reset();
        dialog.close();
        selectedFolder();
        console.log(projects)
    }else{
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const date = document.getElementById('date').value;
        const priority = document.querySelector(`input[name="priority"]:checked`).value;

        Project.addTodo(title,description,date,priority);
        populateMain(currentFolder);
        projectForm.reset();
        dialog.close();
    }

})


export function selectedFolder(){
    const ul_list = document.querySelectorAll('li[class=folder]');
    const allFolders = document.querySelectorAll('li');

    allFolders.forEach(list => {
    
        list.addEventListener('click',()=>{
            allFolders.forEach(list => list.classList.remove('selected_folder'));
          list.classList.add('selected_folder')
     }) });

    ul_list.forEach(list => {
        list.addEventListener('click',()=>{
            isHomeView = false;

            currentFolder = list.innerHTML.trim();
            populateMain(currentFolder);

            console.log(`Current folder is ${currentFolder}`)
        })
    });

};

const project = new Project('Study maths','gep cock','12-2','low');
const project2 = new Project('Study Geometry','gep cock','12-2','high');


projects.study.push(project);
projects.study.push(project2);



console.log(projects)


export function createFolder(){
    const folder = document.querySelector('.sidebar_folders');
    const sidebar_title = document.createElement('div');
    sidebar_title.classList.add('sidebar_title')
    sidebar_title.innerHTML = 'Projects';
    folder.textContent = ""
    folder.appendChild(sidebar_title);

    Object.keys(projects).forEach(key => {
        const sidebar_folder = document.createElement('li');
        sidebar_folder.classList.add(`folder`);
        
        sidebar_folder.innerHTML = key;

        folder.appendChild(sidebar_folder);
    });
}

export function populateMain(currentFolder){
    const main = document.querySelector('.main');
    main.textContent = "";
    const selectedFolder = projects[currentFolder];
    mainDivs(selectedFolder);

}

function mainDivs(folder){
    const selectedFolder = folder
    const main = document.querySelector('.main');
    
    selectedFolder.forEach((project, index) => {
        const {title,description,date,priority} = project;

        const todo = document.createElement('div');
        const todo_title = document.createElement('div');
        const todo_description = document.createElement('div');
        const todo_date = document.createElement('div');
        const todo_priority = document.createElement('div');
        const todo_delete = document.createElement('button');
        const left = document.createElement('div');
        const right = document.createElement('div');

        todo.classList.add('todo');
        todo.classList.add('priority-'+priority);
        todo_title.classList.add('todo_title');
        todo_description.classList.add('todo_description');
        todo_date.classList.add('todo_date');
        todo_priority.classList.add('todo_priority');
        todo_delete.classList.add('todo_delete');
        left.classList.add('left_panel');
        right.classList.add('right_panel')

        todo_title.innerHTML = title;
        todo_description.innerHTML = description;
        todo_date.innerHTML = date;
        todo_priority.innerHTML = priority;
        todo_delete.innerHTML = 'delete'

        main.appendChild(todo);
        todo.appendChild(left);
        todo.appendChild(right);
        left.appendChild(todo_title);
        left.appendChild(todo_description);
        right.appendChild(todo_date);
        right.appendChild(todo_priority);
        right.appendChild(todo_delete);

        todo_delete.addEventListener('click',()=>{
            todoDelete(index,currentFolder);
            if (isHomeView){
                populateHome();
            }else{
                populateMain(currentFolder);
            }
            
        })
    });
}

let isHomeView = false;

export function populateHome(){
    isHomeView = true;

    const main = document.querySelector('.main');
    main.textContent = "";
    
    Object.keys(projects).forEach(key => {
        mainDivs(projects[key], key);
    });
}

export function populateForm(){
    const lists = document.querySelectorAll('li[class=create_project]');
    populateTodo();

    lists.forEach(list => {
        list.addEventListener('click',()=>{
            lists.forEach(list => list.classList.remove('selected'));
            list.classList.add('selected')
            
            folder = list.innerHTML;

            console.log(`Current folder is ${folder}`)

            if (folder === 'Todo'){
                populateTodo();
            }else if(folder === 'Project'){
                populateProject();
            }
        })
    });
};

function populateTodo(){
    const prio = ['low','medium','high'];
    const content = document.querySelector('.add_content');
    content.innerHTML = "";



    const title = document.createElement('input');
    const description = document.createElement('textarea');
    const dateDiv = document.createElement('div');
    const dateLabel = document.createElement('label');
    const date = document.createElement('input');
    const prioWrapper = document.createElement('div');
    const prioDiv = document.createElement('div');
    const priority = document.createElement('input');
    const button = document.createElement('button');

    title.setAttribute('id','title');
    description.setAttribute('id','description');
    date.setAttribute('id','date');
    prioDiv.classList.add('prio_container');
    button.setAttribute('id','submitBtn');
    prioWrapper.classList.add('prio_wrapper');

    title.setAttribute('type','text');
    date.setAttribute('type','date');
    button.setAttribute('type','text');
    button.setAttribute('type','submit');

    title.placeholder = 'Title: Pay Bills'
    description.placeholder = 'Description'
    priority.placeholder = 'Priority'
    dateLabel.innerHTML = 'Due Date: '

    button.innerHTML = 'Submit';

    for (let i=0; i<prio.length;i++){
        const prioBtn = document.createElement('input');
        const prioLabel = document.createElement('label');

        prioBtn.setAttribute('type','radio');
        prioBtn.setAttribute('id',prio[i]);
        prioBtn.setAttribute('name','priority');
        prioBtn.setAttribute('value',prio[i]);

        prioLabel.setAttribute('for',prio[i]);
        prioLabel.setAttribute('id',`prio_${prio[i]}`)

        prioBtn.innerHTML = prio[i];
        prioLabel.innerHTML = prio[i];

        prioDiv.appendChild(prioBtn);
        prioDiv.appendChild(prioLabel);
   }

    content.appendChild(title);
    content.appendChild(description);
    content.appendChild(dateDiv);
    dateDiv.appendChild(dateLabel);
    dateDiv.appendChild(date);
    content.appendChild(prioWrapper)
    prioWrapper.appendChild(prioDiv);
    prioWrapper.appendChild(button);
}

function populateProject(){
    const content = document.querySelector('.add_content');
    content.innerHTML = "";

    const title = document.createElement('input');
    const button = document.createElement('button');

    title.setAttribute('id','title');
    button.setAttribute('id','submitBtn');

    title.setAttribute('type','text');
    button.setAttribute('type','submit');

    title.placeholder = 'Title...';
    button.innerHTML = 'Create project';

    content.appendChild(title);
    content.appendChild(button);
}



function todoDelete(index,currentFolder){
    const currentProject = projects[currentFolder];
    currentProject.splice(index,1);
}