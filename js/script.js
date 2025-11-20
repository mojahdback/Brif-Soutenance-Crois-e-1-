/******************************************************
 * WORKSPACE STAFF MANAGER — FINAL MERGED VERSION
 ******************************************************/

/* ============================
   1) MODAL ADD WORKER
============================ */

const modal = document.getElementById("modal-add");
const btnAdd = document.getElementById("btn-add");
const closeModal = document.getElementById("close-modal");
const saveBtn = document.getElementById("save");

btnAdd.onclick = () => modal.classList.remove("hidden");
closeModal.onclick = () => modal.classList.add("hidden");
saveBtn.onclick = () => modal.classList.add("hidden");

/* ============================
   2) PREVIEW PHOTO
============================ */

const preview = document.getElementById("preview");
const inputUrl = document.getElementById("photo");

inputUrl.addEventListener("input", () => {
  preview.src = inputUrl.value.trim();
});

/* ============================
   3) EXPERIENCES LOGIC
============================ */

const expList = document.getElementById("exp-list");
const addExpBtn = document.getElementById("add-exp");

addExpBtn.addEventListener("click", () => {
  const card = document.createElement("div");
  card.className = "exp-card border p-3 rounded bg-gray-100";

  card.innerHTML = `
    <div class="flex justify-between mb-2">
      <p class="font-semibold">Experience:</p>
      <button class="close-exp text-red-600 font-bold">X</button>
    </div>

    <label>Company</label>
    <input type="text" class="border p-1 w-full exp-company">

    <label>Role</label>
    <input type="text" class="border p-1 w-full exp-role">

    <label>From</label>
    <input type="date" class="border p-1 w-full exp-from">

    <label>To</label>
    <input type="date" class="border p-1 w-full exp-to">
  `;

  expList.appendChild(card);
});

expList.addEventListener("click", (e) => {
  if (e.target.classList.contains("close-exp")) {
    e.target.closest(".exp-card").remove();
  }
});

/* ============================
   4) GLOBAL WORKERS ARRAY
============================ */

const workers = [];

/* ============================
   5) FORM SUBMIT
============================ */

const form = document.getElementById("add-worker-form");
const stock = document.getElementById("stock");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const worker = {
    id: Date.now(),
    name: document.getElementById("name").value.trim(),
    role: document.getElementById("role").value,
    photo: document.getElementById("photo").value.trim(),
    email: document.getElementById("email").value.trim(),
    tel: document.getElementById("tel").value.trim(),
    location: "unassigned",
    experiences: [...document.querySelectorAll(".exp-card")].map(card => ({
      company: card.querySelector(".exp-company").value,
      role: card.querySelector(".exp-role").value,
      from: card.querySelector(".exp-from").value,
      to: card.querySelector(".exp-to").value
    }))
  };

  workers.push(worker);
  renderUnassigned();
  form.reset();
  preview.src = "";
  modal.classList.add("hidden");
});

/* ============================
   6) RENDER UNASSIGNED WORKERS
============================ */

function renderUnassigned() {
  stock.innerHTML = "";

  workers
    .filter(r => r.location === "unassigned")
    .forEach(w => {
      const card = document.createElement("div");
      card.className = "border p-2 m-2 rounded flex gap-2 items-center";

      card.innerHTML = `
        <img src="${w.photo || 'https://via.placeholder.com/60'}"
             class="w-12 h-12 rounded object-cover" />

        <div class="flex-1">
          <p class="font-bold text-sm">${w.name}</p>
          <p class="text-xs">${w.role}</p>
        </div>

        <button data-id="${w.id}"
                class="delete-btn bg-red-500 text-white px-2 py-1 rounded text-sm">
          X
        </button>
      `;

      stock.appendChild(card);
    });
}



/* ============================
   ROLE ACCESS RULES
============================ */

const roleAccessRules = {
  Manager: ["conference", "reception", "servers", "securityRoom", "staffRoom", "archives"],
  Receptionniste: ["reception", "staffRoom"],
  "Technicien IT": ["servers", "conference", "archives", "staffRoom"],
  "Agent Sécurité": ["securityRoom", "reception"],
  Nettoyage: ["conference", "reception", "servers", "securityRoom", "staffRoom", "archives"],
  Autre: ["staffRoom"]
};

/* Check if worker can access zone */
function canAccessZone(worker, zoneKey) {
  return roleAccessRules[worker.role]?.includes(zoneKey);
}


