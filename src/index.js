import './styles.css';
import { populateForm, populateMain, projects } from './newProject';
import { createFolder } from './newProject';
import { selectedFolder } from './newProject';
import { selectedCreate } from './newProject';
import { populateHome } from './newProject';
populateForm();
createFolder();

const overlay = document.querySelector('.overlay');

// overlay.showModal();
selectedFolder();


document.querySelector('.addBtn').addEventListener('click',()=>{
    overlay.showModal();
    console.log(projects);
})

document.querySelector('.home').addEventListener('click',()=>{
    populateHome();
})


window.onclick = function (event) {
    if (event.target == overlay) {
        overlay.close();1
    }
}




