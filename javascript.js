const validateForm = () => {
  const tasks = JSON.parse(localStorage.getItem('datas')) ?? [];
  const task = document.getElementById('task-input');
  if (task && task.value !== '') {
    const newEntry = {
      index: tasks.length + 1,
      completed: false,
      description: task && task.value,
    };
    task.value = '';

    tasks.push(newEntry);
    localStorage.setItem('datas', JSON.stringify(tasks));

    return false;
  }

  return true;
};


const deleteIndex = (i) => {
  let tasks = JSON.parse(localStorage.getItem('datas'));
  tasks = tasks.filter((task) => task.description !== tasks[i].description);
  for (let i = 0; i < tasks.length; i += 1) {
    tasks[i].index = i + 1;
  }
  localStorage.setItem('datas', JSON.stringify(tasks));
  window.location.reload();
};





const removeAllTask = () => {
  let tasks = JSON.parse(localStorage.getItem('datas'));

  tasks = tasks.filter((task) => !task.completed);

  tasks.forEach((task, i) => {
    task.index = i;
  });

  localStorage.setItem('datas', JSON.stringify(tasks));
  window.location.reload();
};



import './style.css';

import validateForm from './functions.js';
import deleteTask from './remove.js';
import removeAllTask from './removeAll.js';

let tasks = [];

export const mainList = document.querySelector('.items');

const dataLoading = () => {
  tasks = JSON.parse(localStorage.getItem('datas')) ?? [];
};
export default dataLoading;

const ul = document.createElement('ul');

mainList.appendChild(ul);

const taskIndex = (i) => {
  const li = document.createElement('li');
  li.classList.add('inside-list');

  const div = document.createElement('div');
  div.classList.add('items-contents');

  const chk = document.createElement('input');

  const paragraph = document.createElement('input');
  chk.setAttribute('type', 'checkbox');
  if (tasks[i].completed === false) {
    chk.removeAttribute('checked');
  } else {
    chk.setAttribute('checked', 'checked');
  }
  chk.addEventListener('change', () => {
    if (chk.checked) {
      paragraph.classList.add('extra');
    }
    tasks[i].completed = chk.checked;
    localStorage.setItem('datas', JSON.stringify(tasks));
    dataLoading();
  });
  paragraph.setAttribute('type', 'text');
  paragraph.setAttribute('id', 'taskField');
  paragraph.classList.add('taskField');
  paragraph.setAttribute('value', tasks[i].description);
  paragraph.addEventListener('change', () => {
    tasks[i].description = paragraph.value;
    localStorage.setItem('datas', JSON.stringify(tasks));
    dataLoading();
  });
  div.appendChild(chk);
  div.appendChild(paragraph);
  li.appendChild(div);

  const di = document.createElement('i');
  di.classList.add('fa-solid', 'fa-ellipsis-vertical', 'icon');
  di.addEventListener('click', () => {
    deleteTask(i);
    dataLoading();
  });
  li.appendChild(di);

  ul.appendChild(li);
};

function component() {
  const form = document.querySelector('#taskForm');
  form.addEventListener('submit', () => {
    validateForm();
    dataLoading();
  });

  const inputSubmit = document.createElement('input');
  inputSubmit.setAttribute('type', 'submit');
  inputSubmit.classList.add('btn-submit');
  inputSubmit.setAttribute('value', '>');

  form.appendChild(inputSubmit);

  tasks.forEach((counter, x) => {
    showTask(x);
  });

  const inputBtn = document.querySelector('.clear-btn');
  inputBtn.addEventListener('click', () => {
    removeAllTask();
    dataLoading();
  });
}

window.addEventListener('DOMContentLoaded', () => {
  dataLoading();
  component();
});
