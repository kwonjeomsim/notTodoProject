const listInput = document.querySelector("#input-todo");
const addBtn = document.querySelector("#add-todo");
const list = document.querySelector(".notTodo-list");
const listDescription = document.querySelector(".notTodo-card__description");

let cards = [];

class Card {
    constructor(title, id) {
        this.title = title;
        this.id = id;
    }
    firstColumn = document.createElement("div");
    lastColumn = document.createElement("div");
    description = document.createElement("input");
    delBtn = document.createElement("button");
    icon = document.createElement("i");

    createCard() {
        const card = document.createElement("div");
        card.classList.add("notTodo-card");
        const firstColumn = this.createContent();
        const lastColumn = this.createDelBtn();

        card.appendChild(firstColumn);
        card.appendChild(lastColumn);
        return card;
    }

    createContent() {
        this.firstColumn.classList.add("notTodo-card__column");
        const title = document.createElement("div");
        title.innerText = this.title;
        title.classList.add("notTodo-card__title");
        this.description.classList.add("notTodo-card__description");
        this.description.placeholder = "add description!";

        this.firstColumn.appendChild(title);
        this.firstColumn.appendChild(this.description);
        return this.firstColumn;
    }

    createDelBtn() {
        this.lastColumn.classList.add("notTodo-card__column");
        this.delBtn.classList.add("delete-btn");
        this.icon.classList.add("far");
        this.icon.classList.add("fa-window-close");
        this.icon.classList.add("fa-lg");

        this.delBtn.appendChild(this.icon);
        this.lastColumn.appendChild(this.delBtn);
        return this.lastColumn;
    }
}

function saveToDos() {
    localStorage.setItem("todos", JSON.stringify(cards));
  }

function paintToDos() {
    const card = new Card(listInput.value, Date.now()).createCard();
    return card
}

function handleAddBtnClick(event) {
    console.log(cards);
    event.preventDefault();
    const card = paintToDos();
    cards.push(card);
    list.appendChild(card);
    listInput.value = "";
    saveToDos();
}

function handleDeleteBtnClick() {
    cards.pop()
}

addBtn.addEventListener("click", handleAddBtnClick);

const savedToDos = localStorage.getItem("todos");

if(savedToDos) {
    const parsedToDos = JSON.parse(savedToDos);
    cards = parsedToDos;
    parsedToDos.forEach(paintToDos);
  }