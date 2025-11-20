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

/* DELETE worker */
stock.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const id = Number(e.target.dataset.id);
    const index = workers.findIndex(w => w.id === id);
    if (index !== -1) workers.splice(index, 1);

    renderUnassigned();
    renderZones();
  }
});

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




/* ============================
   7) ROOM ZONES CONFIG
============================ */

const zoneMap = {
  conference: ".item1",
  servers: ".item2",
  securityRoom: ".item3",
  reception: ".item4",
  staffRoom: ".item5",
  archives: ".item6"
};

/* Required rooms */
const requiredZones = ["reception", "servers", "securityRoom", "archives"];

/* Max worker limits */
const zoneLimits = {
  conference: 5,
  servers: 2,
  securityRoom: 2,
  reception: 1,
  staffRoom: 15,
  archives: 3
};

/* ============================
   8) RENDER ZONES
============================ */

function renderZones() {
  Object.entries(zoneMap).forEach(([zone, selector]) => {
    const zoneEl = document.querySelector(selector);
    const area = zoneEl.querySelector(".room-workers");

    area.innerHTML = "";

    workers
      .filter(w => w.location === zone)
      .forEach(w => {
        const div = document.createElement("div");
        div.className = "zone-worker flex items-center gap-2 p-2 bg-white shadow rounded";

        div.innerHTML = `
          <img src="${w.photo}" class="w-10 h-10 rounded-full object-cover" />
          <p>${w.name}</p>
          <button data-id="${w.id}"
                  class="remove-zone bg-red-500 text-white px-2 rounded">
            X
          </button>
        `;

        area.appendChild(div);
      });
  });

  highlightRequiredZones();  // << added
}


/* ============================
   10) LIMIT CHECK
============================ */

function checkLimit(zone) {
  const limit = zoneLimits[zone] ?? 9999;
  const count = workers.filter(w => w.location === zone).length;
  return count < limit;
}

/* ============================
   11) ASSIGN WORKER TO ZONE
============================ */

const modalRoom = document.getElementById("modal-room");
const roomStock = document.getElementById("room-stock");
const closeModalRoom = document.getElementById("close-modal-room");

let currentZone = null;

document.querySelectorAll(".add-item").forEach(btn => {
  btn.addEventListener("click", (e) => {
    const zoneEl = e.target.closest(".gallery-item");

    currentZone = Object.keys(zoneMap).find(
      key => zoneEl.matches(zoneMap[key])
    );

    fillRoomModal();
    modalRoom.classList.remove("hidden");
  });
});

closeModalRoom.onclick = () =>
  modalRoom.classList.add("hidden");

function fillRoomModal() {
  roomStock.innerHTML = "";

  workers
    .filter(w => w.location === "unassigned")
    .forEach(w => {
      const btn = document.createElement("button");
      btn.className = "p-2 bg-blue-100 w-full rounded text-left";
      btn.textContent = `${w.name} — ${w.role}`;

      btn.onclick = () => {
        if (!checkLimit(currentZone)) {
          alert('Room limit reached!');
          return;
        }

        w.location = currentZone;
        modalRoom.classList.add("hidden");

        renderUnassigned();
        renderZones();
      };

      roomStock.appendChild(btn);
    });
}

/* ============================
   12) REMOVE WORKER FROM ROOM
============================ */

document.body.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-zone")) {
    const id = Number(e.target.dataset.id);
    const w = workers.find(w => w.id === id);
    if (w) w.location = "unassigned";

    renderUnassigned();
    renderZones();
  }
});

/* ============================
   INIT
============================ */

renderUnassigned();
renderZones();
