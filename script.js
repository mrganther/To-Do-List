// script.js

// Date and Time
updateClock();

setInterval(updateClock, 1000);

function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();

  minutes = minutes < 10 ? "0" + minutes : minutes;

  const timeString = `${hours}:${minutes}`;
  document.getElementById("datetime").innerHTML = timeString;
}

console.log(new Date());

// Add "Enter key" support
const input = document.getElementById("taskInput");

input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevent form submission or line break
    handleAdd();
  }
});

function handleAdd(text) {
  const input = document.getElementById("taskInput");
  addTask(input.value);
  input.value = ""; // Clear Input
}

function addTask(text) {
  if (!text.trim()) return; // ingore empty text

  const li = document.createElement("li");
  li.classList.add("task-item");

  const wrapper = document.createElement("div");
  wrapper.className = "checkbox-wrapper";

  const round = document.createElement("div");
  round.className = "round";

  const checkboxId = `checkbox-${Date.now()}`;
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = checkboxId;

  const label = document.createElement("label");
  label.setAttribute("for", checkboxId);

  round.appendChild(checkbox);
  round.appendChild(label);
  wrapper.appendChild(round);

  const span = document.createElement("span");
  span.textContent = text;
  span.className = "task-text";

  const buttonId = `button-${Date.now()}`;
  const button = document.createElement("button");
  button.id = buttonId;
  button.textContent = "X";
  button.alt = "Remove Task";
  //button.style.visibility = "hidden";

  // checkbox listener
  checkbox.addEventListener("change", function () {
    if (checkbox.checked) {
      const strike = document.createElement("s");
      strike.textContent = span.textContent;
      span.textContent = "";
      span.appendChild(strike);
    } else {
      const plain = span.querySelector("s")?.textContent || "";
      span.textContent = plain;
    }
  });

  button.addEventListener("click", function () {
    const li = this.parentElement;
    li.classList.add("clear-task-fade-out");
    setTimeout(() => li.remove(), 300);
  });

  li.appendChild(wrapper);
  li.appendChild(span);
  li.appendChild(button);

  document.getElementById("tasklist").appendChild(li);
}
