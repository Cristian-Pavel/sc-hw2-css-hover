///// Variabile
//////////////////

let elementeDOM = {
  formular: document.querySelector(".adaugare"),
  inputText: document.querySelector("#campScriere"),
  addBtn: document.querySelector("#addItemBtn"),
  sortAscBtn: document.querySelector(".sortAsc"),
  sortDescBtn: document.querySelector(".sortDesc"),
  itemCumparat: document.getElementsByClassName("itemCumparat"),
  markedBtn: document.querySelector(".markedAsBuyed"),
  tbody: document.querySelector("tbody"),
  table: document.querySelector("table"),
};

let listaCumparaturi = [];

// Event listeners
//////////////////////

elementeDOM.inputText.addEventListener("keypress", function (event) {
  if (event.keyCode === 13) {
    adauga();
  }
});

elementeDOM.sortAscBtn.addEventListener("click", sortAsc);

elementeDOM.sortDescBtn.addEventListener("click", sortDesc);

///// Functii
////////////////////

function adauga() {
  if (validare()) {
    let item = elementeDOM.inputText.value;
    listaCumparaturi.push({
      item: item,
      buyed: false,
    });
    draw();
    elementeDOM.formular.reset();
  }
}

function draw() {
  let str = "";
  for (let i = 0; i < listaCumparaturi.length; i++) {
    str += `
        <tr>
            <td class="itemCumparat">${listaCumparaturi[i].item}</td>
            <td>
                <button class="markedAsBuyed" onclick="markedAsBuyed(${i})" 
                ><i class="fas fa-check"></i> Mark as buyed</button>
            </td>
        </tr>
        `;
  }
  elementeDOM.tbody.innerHTML = str;
  for (let i = 0; i < listaCumparaturi.length; i++) {
    if (listaCumparaturi[i].buyed === true) {
      elementeDOM.itemCumparat[i].classList.add("taiat");
    }
  }
  elementeDOM.table.classList.remove("hidden");
}

function markedAsBuyed(i) {
  if (listaCumparaturi[i].buyed === false) {
    listaCumparaturi[i].buyed = true;
  } else {
    listaCumparaturi[i].buyed = false;
  }
  draw();
}

function sortAsc() {
  let temporar, markedTemporar;
  for (let i = 0; i < listaCumparaturi.length - 1; i++) {
    for (let j = i + 1; j < listaCumparaturi.length; j++) {
      if (listaCumparaturi[i].item > listaCumparaturi[j].item) {
        temporar = listaCumparaturi[i].item;
        listaCumparaturi[i].item = listaCumparaturi[j].item;
        listaCumparaturi[j].item = temporar;

        markedTemporar = listaCumparaturi[i].buyed;
        listaCumparaturi[i].buyed = listaCumparaturi[j].buyed;
        listaCumparaturi[j].buyed = markedTemporar;
      }
    }
  }
  draw();
}

function sortDesc() {
  let temporar, markedTemporar;
  for (let i = 0; i < listaCumparaturi.length - 1; i++) {
    for (let j = i + 1; j < listaCumparaturi.length; j++) {
      if (listaCumparaturi[i].item < listaCumparaturi[j].item) {
        temporar = listaCumparaturi[i].item;
        listaCumparaturi[i].item = listaCumparaturi[j].item;
        listaCumparaturi[j].item = temporar;

        markedTemporar = listaCumparaturi[i].buyed;
        listaCumparaturi[i].buyed = listaCumparaturi[j].buyed;
        listaCumparaturi[j].buyed = markedTemporar;
      }
    }
  }
  draw();
}

function validare() {
  if (elementeDOM.inputText.value.length < 2) {
    elementeDOM.inputText.classList.add("eroare");
    alert("Nu ati introdus niciun produs.");
    return false;
  } else {
    elementeDOM.inputText.classList.remove("eroare");
    return true;
  }
}
