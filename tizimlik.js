// localStorage?
// dom manipulation
// load / loading
// json

// keyword is unique
// value addi qimmet tipliri bolidu(string)

//  title(h1), input, button, ul=>li

//  <h1 class....>....</h1>

//  title
const h1 = document.createElement("h1");
h1.setAttribute("class", "mawzu");
h1.innerText = "مال سېتىۋېلىش تىزىملىكى";

document.body.appendChild(h1);

// input

const input = document.createElement("input");
input.setAttribute("placeholder", "يېڭى نەرسىلەرنى كىرگۈزۈڭ");
document.body.appendChild(input);

// button

const button = document.createElement("button");
button.innerHTML = `<strong>قوشۇش</strong>`;
document.body.appendChild(button);

// ul / li
const ul = document.createElement("ul");
document.body.appendChild(ul);

// load
function load() {
  ul.innerHTML = null;
  const items = localStorage.getItem("list");
  if (items === null) return;
  // 5. convert received data to array
  JSON.parse(items).forEach((e, i) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.addEventListener("click", e => {
      e.preventDefault();
      const className = span.getAttribute("class");
      if (className === "cross") {
        span.setAttribute("class", "");
      } else {
        span.setAttribute("class", "cross");
      }
    });
    const btn = document.createElement("button");
    btn.setAttribute("name", i);
    btn.innerHTML = "X";
    span.innerText = i + 1 + ". " + e;
    li.appendChild(span);
    btn.addEventListener("click", e => {
      const index = Number(e.target.getAttribute("name"));
      const items = localStorage.getItem("list");
      if (items === null) return;
      const arr = JSON.parse(items);
      arr.splice(index, 1); // w3 school array splice method
      localStorage.setItem("list", JSON.stringify(arr));
      load();
    });
    li.appendChild(btn);
    ul.appendChild(li);
  });
}

load();

button.addEventListener("click", () => {
  //  1. user enter sth (get it)
  const newTask = input.value;
  // 2. test user data
  if (newTask.length >= 3) {
    // check if there is sth in localStorage
    // 1>get item from LS
    const list = localStorage.getItem("list");
    // check
    if (list === null) {
      // 1. convert newTask to an array
      const newList = newTask.split();
      // 2. convert array to json string
      const newJson = JSON.stringify(newList);
      // 3. save data
      localStorage.setItem("list", newJson);
      load();
    } else {
      // 1. convert list to an array
      const arr = JSON.parse(list);
      // 2. push newTask to the array
      arr.push(newTask);
      // 2.1 convert array to json string
      const newJson = JSON.stringify(arr);
      // 3. save data
      localStorage.setItem("list", newJson);
      load();
    }
  }
  input.value = "";
});

// json
// const arr = ["milk", "pen"];
// const newArr = JSON.stringify(arr);
// const last = JSON.parse(newArr);
// console.log(arr);
// console.log(typeof arr);
// console.log(newArr);
// console.log(typeof newArr);
// console.log(last);
// console.log(typeof last);
