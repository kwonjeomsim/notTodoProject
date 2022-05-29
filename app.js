const listInput = document.querySelector("#input-todo");
const addBtn = document.querySelector("#add-todo");
const list = document.querySelector(".notTodo-list");
const listDescription = document.querySelector(".notTodo-card__description");

let cards = [];

class Card {
    constructor(cardObj) {
        this.cardObj = cardObj;
    }
    card = document.createElement("div");
    firstColumn = document.createElement("div");
    lastColumn = document.createElement("div");
    title = document.createElement("div");
    description = document.createElement("input");
    delBtn = document.createElement("button");
    icon = document.createElement("i");

    createCard() {
        this.card = document.createElement("div");
        this.card.classList.add("notTodo-card");
        const firstColumn = this.createContent();
        const lastColumn = this.createDelBtn();

        this.card.appendChild(firstColumn);
        this.card.appendChild(lastColumn);
        this.card.id = this.cardObj.id;
        return this.card;
    }

    createContent() {
        this.firstColumn.classList.add("notTodo-card__column");
        this.title.innerText = this.cardObj.text;
        this.title.classList.add("notTodo-card__title");
        this.description.classList.add("notTodo-card__description");
        this.description.placeholder = "add description!";
        this.description.value = this.cardObj.description;

        this.firstColumn.appendChild(this.title);
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
    localStorage.setItem("notTodos", JSON.stringify(cards));
  }

function paintToDos(cardObj) {
    const card = new Card(cardObj);
    card.delBtn.addEventListener("click", handleDeleteBtnClick);
    card.description.addEventListener("change", handleDescriptionChange);
    list.appendChild(card.createCard());
}

function handleDescriptionChange(event) {
    const cardList = event.target.parentElement.parentElement;
    cards.forEach(card => {
        if (card.id === parseInt(cardList.id)) {
            card.description = event.target.value;
        }
    })

    saveToDos();
}

function handleAddBtnClick(event) {
    event.preventDefault();
    const newCardObj = {
        text: listInput.value,
        id: Date.now(),
        description: ""
    }
    cards.push(newCardObj);
    paintToDos(newCardObj);
    listInput.value = "";
    saveToDos();
}

function deleteElement(card) {
    card.remove();
}

function handleDeleteBtnClick(event) {
    const cardList = event.target.parentElement.parentElement.parentElement;
    cardList.classList.add("disappear");
    setTimeout(() => {
        deleteElement(cardList);
    }, 800);
    cards = cards.filter(card => card.id !== parseInt(cardList.id));
    saveToDos();
}

addBtn.addEventListener("click", handleAddBtnClick);

const savedToDos = localStorage.getItem("notTodos");

if(savedToDos) {
    const parsedToDos = JSON.parse(savedToDos);
    cards = parsedToDos;
    console.log(cards);
    parsedToDos.forEach(paintToDos);
  }