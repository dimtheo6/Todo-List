import './styles.css';
import { createFolder,selectedFolder,populateHome,populateToday,populateWeek,populateProject } from './newProject';



createFolder();
selectedFolder();

const overlay = document.querySelector('.overlay');
const details = document.querySelector('.details')


document.querySelector('.addBtn').addEventListener('click',()=>{
    populateProject();
    overlay.classList.add('active');
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





