// Underweight category
const categoryId = 1;

const API_URL = "http://127.0.0.1:8000/veg/diet/by-category-day";
const dayContainer = document.getElementById("dayButtons");

let activeBtn = null;

// Create Day buttons
for (let day = 1; day <= 30; day++) {
  const btn = document.createElement("div");
  btn.className = "diet_box1";
  btn.innerText = `Day ${day}`;

  btn.onclick = () => {
    if (activeBtn) {
      activeBtn.classList.remove("active");
    }

    btn.classList.add("active");
    activeBtn = btn;

    loadDiet(day);
  };

  // Default Day 1 active
  if (day === 1) {
    btn.classList.add("active");
    activeBtn = btn;
  }

  dayContainer.appendChild(btn);
}

// Load diet
function loadDiet(day) {
  fetch(`${API_URL}?category_id=${categoryId}&day=${day}`)
    .then(res => res.json())
    .then(data => {
      if (!data || data.length === 0) {
        setText("No diet available");
        return;
      }

      const diet = data[0];
      document.getElementById("breakfast").innerText = diet.breakfast;
      document.getElementById("lunch").innerText = diet.lunch;
      document.getElementById("dinner").innerText = diet.dinner;
    })
    .catch(() => alert("Error loading diet"));
}

// Default load
loadDiet(1);

function setText(msg){
  document.getElementById("breakfast").innerText = msg;
  document.getElementById("lunch").innerText = msg;
  document.getElementById("dinner").innerText = msg;
}



