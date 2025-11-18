
// OPEN / CLOSE MODAL

const modal = document.getElementById("modal-add");
const openBtn = document.getElementById("btn-add");
const closeBtn = document.getElementById("close-modal");

openBtn.onclick = () => modal.classList.remove("hidden");
closeBtn.onclick = () => modal.classList.add("hidden");


// VALIDATE FORM + CREATE WORKER

const form = document.getElementById("add-worker-form");
const stock = document.getElementById("stock"); // where employees appear
const name = document.getElementById("name");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Simple validation
//   if (name.value || role.value || email.value || tel.value) {
//     alert("Please fill all required fields!");
//     return;
//   }

  // Collect experiences
  const experiences = [...document.querySelectorAll(".exp-item")].map(x => x.value);

  // Create worker object
  const worker = {
    id: Date.now(),
    name: name.value,
    role: role.value,
    photo: photo.value || "https://via.placeholder.com/100",
    email: email.value,
    tel: tel.value,
    experiences,
  };

  // Display worker in sidebar
  const card = document.createElement("div");
  card.className = "border p-2 m-2 rounded flex gap-2 items-center";

  card.innerHTML = `
      <img src="${worker.photo}" class="w-12 h-12 rounded object-cover">
      <div>
        <p class="font-bold">${worker.name}</p>
        <p class="text-sm">${worker.role}</p>
      </div>
  `;

  stock.appendChild(card);

  // Close modal
  modal.classList.add("hidden");

  // Reset form
  form.reset();
  preview.classList.add("hidden");
  expList.innerHTML = "<label class='font-semibold'>Expériences</label>";
});