import { act } from "react-dom/test-utils";
import { createStore } from "redux";
const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

const addToDo = (text) => {
  return {
    type: ADD_TODO,
    text: text,
  };
};

const deleteToDo = (id) => {
  return {
    type: DELETE_TODO,
    id,
  };
};

const reducer = (state = [], action) => {
  console.log(action);
  switch (action.type) {
    case ADD_TODO:
      const newToDoObj = { text: action.text, id: Date.now() };
      return [newToDoObj, ...state];
    case DELETE_TODO:
      console.log(action);
      return state.filter((toDo) => toDo.id !== parseInt(action.id));
    default:
      return state;
  }
};

const store = createStore(reducer);
store.subscribe(() => console.log(store.getState()));

const dispathDeleteToDo = (e) => {
  const id = e.target.parentNode.id;
  store.dispatch(deleteToDo(id));
};
const dispathchAddToDo = (text) => {
  store.dispatch(addToDo(text));
};

const paintToDos = () => {
  const toDos = store.getState();
  ul.innerHTML = "";
  toDos.forEach((toDo) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    li.id = toDo.id;
    li.innerText = toDo.text;
    btn.innerText = "DEL";
    btn.addEventListener("click", dispathDeleteToDo);
    li.appendChild(btn);
    ul.appendChild(li);
  });
};

store.subscribe(paintToDos);

// const createToDo = (toDo) => {
//   const li = document.createElement("li");
//   li.innerText = toDo;
//   ul.appendChild(li);
// };

const onSubmit = (e) => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  //createToDo(toDo);
  dispathchAddToDo(toDo);
};
form.addEventListener("submit", onSubmit);
