import './styles.css';
import { createFolder,selectedFolder,populateHome,populateToday,populateWeek,populateForm } from './newProject';
import { projects } from './newProject';

import { projectDelete } from './newProject';
import { attachDeleteListeners } from './newProject';

createFolder();
selectedFolder();

const overlay = document.querySelector('.overlay');
const details = document.querySelector('.details')


const deleteTest = document.querySelectorAll('.delete_folder');
const folder = document.querySelectorAll('.folder');


document.querySelector('.addBtn').addEventListener('click',()=>{

    populateForm();
    overlay.classList.add('active');
    console.log(projects);
})


document.querySelector('.home').addEventListener('click',()=>{
    populateHome();

    
})

document.querySelector('.today').addEventListener('click',()=>{
    populateToday();
})

document.querySelector('.week').addEventListener('click',()=>{
    populateWeek();
})



window.onclick = function (event) {
    if (event.target == overlay || event.target == details) {
        overlay.classList.remove('active');1
        details.classList.remove('active');1  
    }
}





