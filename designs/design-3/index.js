const searchInput = document.getElementById("input");
const todosContainer = document.getElementById("todos");

function addTask() {
  if (searchInput.value === "") {
    alert("Enter Something");
  } else {
    let li = document.createElement("li");
    li.innerHTML = searchInput.value;
    todosContainer.appendChild(li)

    let edit = document.createElement("strong");
    edit.innerHTML = '\u270E';
    li.appendChild(edit);
    
    let closeIcon = document.createElement("span");
    closeIcon.innerHTML = '\u00d7';
    li.appendChild(closeIcon);
  }
  searchInput.value = "";
  saveData()
}

todosContainer.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    e.target.classList.toggle('checked');
    saveData()
  } else if (e.target.tagName === 'STRONG') {
    const existingText = e.target.parentElement.firstChild.textContent;
    searchInput.value = existingText;
    e.target.parentElement.remove();
    saveData()
  } else if (e.target.tagName === 'SPAN') {
    e.target.parentElement.remove();
    saveData()
  }
}, false);

function saveData(){
  localStorage.setItem("data",todosContainer.innerHTML)
}

function showTask(){
  todosContainer.innerHTML = localStorage.getItem('data')
}

showTask()