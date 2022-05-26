// declaracion de variablees
let btnAdd = document.getElementById("btn-add");
let list = document.getElementById("lista");
let newInput = document.getElementById("btn-input");
const items = JSON.parse(localStorage.getItem("parrafo")) || [];
// funcion para crear la lista y tomar los datos del usuario
function nuevaTarea() {
  let text = newInput.value;
  if (text === "") {
    return;
  }
  let li = document.createElement("li");
  li.classList.add("liCoin");

  let parrafo = document.createElement("p");
  parrafo.classList.add("parrafo");
  parrafo.textContent = text;

  let remover = document.createElement("span");
  remover.classList.add("remover");
  remover.innerHTML = "🗑️";

  li.appendChild(parrafo);
  li.appendChild(remover);

  list.appendChild(li);

  newInput.value = "";
  items.push(text);
  losDatos(items);
}
//funcion para borrar
function cambiarTo() {
  let editInput = document.getElementsByName("editInput")[0];
  if (!editInput) {
    return;
  }
  let nuevoT = editInput.value;

  if (nuevoT !== "") {
    let parrafo = editInput.parentElement.querySelector(".parrafo");
    parrafo.textContent = nuevoT;
  }
  editInput.remover();
}
//funcion par la proxima version del to do, actualmente inservible
function losDatos(data) {
  localStorage.setItem("parrafo", JSON.stringify(data));
}
//funcion para remover un obj especifico
function removerTodo(removeElement) {
  removeElement.parentElement.remove();
}
// funcion para que cuando toques enter sea como un click y se manden los datos
list.addEventListener("keypress", function (event) {
  if (
    event.target.tagName === "INPUT" &&
    event.target.type === "text" &&
    event.key === "Enter"
  ) {
    cambiarTo();
  }
});
document.addEventListener("click", cambiarTo);

btnAdd.addEventListener("click", function (event) {
  event.stopPropagation();
  nuevaTarea();
});
// funcion para que funcione el remover
list.addEventListener("click", function (event) {
  switch (event.target.tagName) {
    case "p":
      break;
    case "SPAN":
      removerTodo(event.target);
      break;
  }
});
//funcion para que funcione el boton enter
btnAdd.addEventListener("click", nuevaTarea);
newInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    nuevaTarea();
  }
});