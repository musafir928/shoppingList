//  title
const h1 = document.createElement("h1");
h1.setAttribute("class", "mawzu");
h1.innerText = "مال سېتىۋېلىش تىزىملىكى";
document.body.appendChild(h1);

const input = document.createElement("input");
input.setAttribute("placeholder", "يېڭى نەرسىلەرنى كىرگۈزۈڭ");
document.body.appendChild(input);

// button

const button = document.createElement("button");
button.innerHTML = `<strong>قوشۇش</strong>`;
button.setAttribute("class", "stick");
document.body.appendChild(button);

const buttonClear = document.createElement("button");
buttonClear.innerHTML = `<strong>تازىلاش</strong>`;
buttonClear.setAttribute("class", "stick");
document.body.appendChild(buttonClear);
buttonClear.addEventListener("click", () => {
  if (!window.confirm("ئۆچۈرەمسىز؟!")) return;
  window.alert("ئەمىسە ئۆچۈرىۋېرىڭ");
  localStorage.removeItem("list");
  load();
});

const ul = document.createElement("ul");
document.body.appendChild(ul);

function load() {
  ul.innerHTML = null;
  const tasks = localStorage.getItem("list");
  if (!tasks) return;
  const arr = JSON.parse(tasks);
  arr.forEach((e, i) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.innerText = i + 1 + ". " + e.name;
    const className = e.done === false ? "" : "jijish";
    // <span class..>dfdshjkj</span> ==  event.target
    span.addEventListener("click", event => {
      const newClass =
        event.target.getAttribute("class") === "" ? "jijish" : "";
      event.target.setAttribute("class", newClass);
      e.done = !e.done;
      localStorage.setItem("list", JSON.stringify(arr));
    });
    span.setAttribute("class", className);
    const btn = document.createElement("button");
    btn.innerText = "X";
    btn.setAttribute("name", i);
    btn.addEventListener("click", ahmed => {
      const index = ahmed.target.name;
      arr.splice(index, 1);
      localStorage.setItem("list", JSON.stringify(arr));
      load();
    });
    li.appendChild(span);
    li.appendChild(btn);
    ul.appendChild(li);
  });
}

load();

button.addEventListener("click", () => {
  const newInput = input.value;
  if (!newInput) return;
  const newTask = {
    name: newInput,
    done: false
  };
  let list = [];
  const oldList = localStorage.getItem("list");
  if (!oldList) {
    list.push(newTask);
    localStorage.setItem("list", JSON.stringify(list));
  } else {
    const newList = JSON.parse(oldList);
    newList.push(newTask);
    localStorage.setItem("list", JSON.stringify(newList));
  }
  load();
  input.value = "";
});
