const listInput = document.querySelector("#input-todo");
const addBtn = document.querySelector("#add-todo");
const list = document.querySelector(".notTodo-list");
const cards = document.querySelectorAll(".notTodo-card");
const deleteBtn = document.querySelector(".notTodo-card__column:last-child");
const listDescription = document.querySelector(".notTodo-card__description");

function createListStructure(title) {
    const container = document.createElement("div");
    const containerColumn = document.createElement("div");
    const containerTitle = document.createElement("div");
    const delBtn = deleteBtn.cloneNode(true);
    const descriptionInput = listDescription.cloneNode(true);
    containerTitle.innerText = title;
    container.classList.add("notTodo-card");
    containerColumn.classList.add("notTodo-card__column");
    containerTitle.classList.add("notTodo-card__title");
    containerColumn.appendChild(containerTitle);
    containerColumn.appendChild(descriptionInput);
    container.appendChild(containerColumn);
    container.appendChild(delBtn);
    cards.push(container);
    list.appendChild(container);
}

function createList(title) {
    createListStructure(title);
}

function handleAddBtnClick(event) {
    event.preventDefault();
    createList(listInput.value);
    listInput.value = "";
}

function handleDeleteBtnClick() {
    console.log(cards);
}

addBtn.addEventListener("click", handleAddBtnClick);
deleteBtn.addEventListener("click", handleDeleteBtnClick);