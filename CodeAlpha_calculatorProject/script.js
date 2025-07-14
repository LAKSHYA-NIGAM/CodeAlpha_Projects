function append(char) {
  document.getElementById('display').value += char;
}

function clearDisplay() {
  document.getElementById('display').value = '';
}

function deleteLast() {
  const display = document.getElementById('display');
  display.value = display.value.slice(0, -1);
}

function calculate() {
  const display = document.getElementById('display');
  try {
    display.value = eval(display.value);
  } catch {
    display.value = "Error";
  }
}

function toggleTheme() {
  const body = document.body;
  const toggleBtn = document.getElementById('theme-toggle');
  const isDark = body.classList.contains("dark-mode");

  if (isDark) {
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
    toggleBtn.textContent = "🌞";
  } else {
    body.classList.remove("light-mode");
    body.classList.add("dark-mode");
    toggleBtn.textContent = "🌙";
  }
}

