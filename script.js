let count = document.querySelector("#no");
let empty = document.querySelector(".emptyState");
let taskList = document.querySelector(".task-list");
let inputVal;

let task = JSON.parse(localStorage.getItem("tasks") || "[]");

if (task.length == 0) {
  empty.style.display = "flex";
  taskList.style.display = "none";
}
let countNo = task.length;
function createTask(taskText) {
  countNo++;
  count.innerHTML = countNo;
  let div = document.createElement("div");
  div.classList.add("tasks");
  div.innerText = taskText;
  taskList.append(div);

  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("checkbox");
  div.prepend(checkbox);

  let button = document.createElement("button");
  button.classList.add("delete");
  div.append(button);
  button.addEventListener("click", () => {
    let index = task.indexOf(taskText);
    task.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(task));
    div.remove();
    countNo--;
    count.innerHTML = countNo;

    if (task.length == 0) {
      empty.style.display = "flex";
      taskList.style.display = "none";
      countNo = 0;
      count.innerHTML = 0;
      document.querySelector(".inp").value = " ";
    }
  });

  let img = document.createElement("img");
  img.src = "imgs/image.png";
  img.classList.add("deleteIcon");
  button.append(img);
}

//for old tasks
for (let i = 0; i < task.length; i++) {
  createTask(task[i]);
  empty.style.display = "none";
  taskList.style.display = "flex";
}

//adding new tasks
let addBtn = document.querySelector(".btn");
addBtn.addEventListener("click", () => {
  inputVal = document.querySelector(".inp").value;
  if (inputVal == "") {
    alert("please enter a task");
    return;
  }
  task.push(inputVal);
  localStorage.setItem("tasks", JSON.stringify(task));

  createTask(inputVal);
  empty.style.display = "none";
  taskList.style.display = "flex";
});
