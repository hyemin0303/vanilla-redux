import { createStore } from "redux";

const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

number.innerText = 0;

const ADD = "ADD";
const MINUS = "MINUS";

const countModifier = (count = 0, action) => {
  console.log(action);
  switch (action.type) {
    case ADD:
      return count + 1;
    case MINUS:
      return count - 1;
    default:
      return count;
  }
  // if (action.type === "ADD") {
  //   return count + 1;
  // } else if (action.type === "MINUS") {
  //   return count - 1;
  // } else {
  //   return count;
  // }
};

const countStore = createStore(countModifier); // 데이터 저장하는 data 의 store를 만들고
const onChange = () => {
  number.innerText = countStore.getState();
};
countStore.subscribe(onChange); //subscribe 변화 감지할때 마다 onChange 실행

// countStore.dispatch({ type: "ADD" });
// console.log(countStore.getState());
add.addEventListener("click", () => {
  countStore.dispatch({ type: ADD });
});
minus.addEventListener("click", () => {
  countStore.dispatch({ type: MINUS });
});
