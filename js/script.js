
      // MODAL ADD WORKER

const modal = document.getElementById("modal-add");
const btnAdd = document.getElementById("btn-add");
const closeModal = document.getElementById("close-modal");
const saveBtn = document.getElementById("save");

btnAdd.onclick = () => modal.classList.remove("hidden");
closeModal.onclick = () => modal.classList.add("hidden");


      // PREVIEW PHOTO

const preview = document.getElementById("preview");
const inputUrl = document.getElementById("photo");

inputUrl.addEventListener("input", () => {
  preview.src = inputUrl.value.trim();
});


      // EXPERIENCE DYNAMIC FORM

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


      // GLOBAL WORKERS ARRAY

const workers = [];


      // FORM VALIDATION

const nameError = document.getElementById("name-error");
const roleError = document.getElementById("role-error");
const emailError = document.getElementById("email-error");
const telError = document.getElementById("tel-error");
const photoError = document.getElementById("photo-error");

const form = document.getElementById("add-worker-form");

function validateForm() {
  let isValid = true;

  const name = document.getElementById("name").value.trim();
  const role = document.getElementById("role").value.trim();
  const photo = document.getElementById("photo").value.trim();
  const email = document.getElementById("email").value.trim();
  const tel = document.getElementById("tel").value.trim();

  // NAME
  if (name.length < 3 || name.split(" ").length < 2) {
    nameError.textContent = "Veuillez entrer un nom complet.";
    nameError.style.color = "red";
    isValid = false;
  } else {
    nameError.textContent = "Valid";
    nameError.style.color = "green";
  }

  // ROLE
  if (role === "") {
    roleError.textContent = "Veuillez choisir un rôle";
    roleError.style.color = "red";
    isValid = false;
  } else {
    roleError.textContent = "Valid";
    roleError.style.color = "green";
  }

  // PHOTO
  if (photo === "") {
    photoError.textContent = "Veuillez entrer une URL.";
    photoError.style.color = "red";
    isValid = false;
  } else {
    photoError.textContent = "Valid";
    photoError.style.color = "green";
  }

  // EMAIL
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    emailError.textContent = "Email invalide.";
    emailError.style.color = "red";
    isValid = false;
  } else {
    emailError.textContent = "Valid";
    emailError.style.color = "green";
  }

  // TEL
  const telRegex = /^[0-9]{10}$/;
  if (!telRegex.test(tel)) {
    telError.textContent = "Téléphone invalide (10 chiffres).";
    telError.style.color = "red";
    isValid = false;
  } else {
    telError.textContent = "Valid";
    telError.style.color = "green";
  }

  // EXPERIENCES
  const expCards = document.querySelectorAll(".exp-card");
  expCards.forEach((card) => {
    const company = card.querySelector(".exp-company");
    const role = card.querySelector(".exp-role");
    const from = card.querySelector(".exp-from");
    const to = card.querySelector(".exp-to");

    if (company.value.trim() === "") {
      company.classList.add("border-red-700");
      isValid = false;
    } else company.classList.remove("border-red-700");

    if (role.value.trim() === "") {
      role.classList.add("border-red-700");
      isValid = false;
    } else role.classList.remove("border-red-700");

    if (!from.value) {
      from.classList.add("border-red-700");
      isValid = false;
    } else from.classList.remove("border-red-700");

    if (!to.value) {
      to.classList.add("border-red-700");
      isValid = false;
    } else to.classList.remove("border-red-700");

    if (from.value && to.value && new Date(from.value) > new Date(to.value)) {
      from.classList.add("border-red-700");
      to.classList.add("border-red-700");
      isValid = false;
    }
  });

  return isValid;
}

saveBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (!validateForm()) return;
  form.requestSubmit();
});


      // FORM SUBMIT

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
    experiences: [...document.querySelectorAll(".exp-card")].map((card) => ({
      company: card.querySelector(".exp-company").value,
      role: card.querySelector(".exp-role").value,
      from: card.querySelector(".exp-from").value,
      to: card.querySelector(".exp-to").value,
    })),
  };

  workers.push(worker);

  renderUnassigned();
  renderZones();

  form.reset();
  expList.innerHTML = "";
  preview.src = "";
  modal.classList.add("hidden");
});

      // RENDER UNASSIGNED

const stock = document.getElementById("stock");

function renderUnassigned() {
  stock.innerHTML = "";

  workers
    .filter((w) => w.location === "unassigned")
    .forEach((w) => {
      const card = document.createElement("div");
      card.className =
        "zone-worker flex items-center gap-2 p-2 bg-white shadow rounded";

      card.innerHTML = `
        <img src="${w.photo}" 
             class="w-12 h-12 rounded object-cover cursor-pointer open-profile"
             data-id="${w.id}" />

        <div class="flex-1 cursor-pointer open-profile" data-id="${w.id}">
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
    const index = workers.findIndex((w) => w.id === id);

    if (index !== -1) workers.splice(index, 1);

    renderUnassigned();
    renderZones();
  }
});

      // ACCESS CONTROL RULES


const roleAccessRules = {
  Manager: ["conference", "reception", "servers", "securityRoom", "staffRoom", "archives"],
  Receptionniste: ["reception"],
  "Technicien IT": ["servers"],
  "Agent Sécurité": ["securityRoom"],
  Nettoyage: ["conference", "reception", "servers", "securityRoom", "staffRoom"],
  Autre: ["staffRoom"],
};

function canAccessZone(worker, zone) {
  return roleAccessRules[worker.role]?.includes(zone);
}

      // ZONE MAP + LIMITS

const zoneMap = {
  conference: ".item1",
  servers: ".item2",
  securityRoom: ".item3",
  reception: ".item4",
  staffRoom: ".item5",
  archives: ".item6",
};

const requiredZones = ["reception", "servers", "securityRoom", "archives"];

const zoneLimits = {
  conference: 5,
  servers: 2,
  securityRoom: 2,
  reception: 1,
  staffRoom: 15,
  archives: 3,
};

function checkLimit(zone) {
  const limit = zoneLimits[zone] ?? 9999;
  const count = workers.filter((w) => w.location === zone).length;
  return count < limit;
}

      // RENDER ZONES

function renderZones() {
  Object.entries(zoneMap).forEach(([zone, selector]) => {
    const zoneEl = document.querySelector(selector);
    const area = zoneEl.querySelector(".room-workers");
    area.innerHTML = "";

    workers
      .filter((w) => w.location === zone)
      .forEach((w) => {
        const div = document.createElement("div");
        div.className =
          "zone-worker flex items-center gap-2 p-2 bg-white shadow rounded";

        div.innerHTML = `
          <img src="${w.photo}" 
               class="w-10 h-10 rounded-full object-cover cursor-pointer open-profile"
               data-id="${w.id}" />
          
          <p class="cursor-pointer open-profile" data-id="${w.id}">
            ${w.name}
          </p>

          <button data-id="${w.id}"
                  class="remove-zone bg-red-500 text-white px-2 rounded">
            X
          </button>
        `;

        area.appendChild(div);
      });
  });

  highlightRequiredZones();
}

function highlightRequiredZones() {
  requiredZones.forEach((zone) => {
    const zoneEl = document.querySelector(zoneMap[zone]);
    const count = workers.filter((w) => w.location === zone).length;

    if (count === 0) zoneEl.classList.add("empty-required-zone");
    else zoneEl.classList.remove("empty-required-zone");
  });
}

      // ASSIGN TO ZONE (MODAL)

const modalRoom = document.getElementById("modal-room");
const roomStock = document.getElementById("room-stock");
const closeModalRoom = document.getElementById("close-modal-room");

let currentZone = null;

document.querySelectorAll(".add-item").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const zoneEl = e.target.closest(".gallery-item");

    currentZone = Object.keys(zoneMap).find((key) =>
      zoneEl.matches(zoneMap[key])
    );

    roomStock.innerHTML = "";

    workers
      .filter((w) => w.location === "unassigned" && canAccessZone(w, currentZone))
      .forEach((w) => {
        const el = document.createElement("button");
        el.className = "p-2 bg-blue-100 rounded text-left";
        el.textContent = `${w.name} — ${w.role}`;

        el.onclick = () => {
          if (!checkLimit(currentZone)) {
            alert("Limit reached!");
            return;
          }

          w.location = currentZone;
          modalRoom.classList.add("hidden");

          renderUnassigned();
          renderZones();
        };

        roomStock.appendChild(el);
      });

    modalRoom.classList.remove("hidden");
  });
});

closeModalRoom.onclick = () => modalRoom.classList.add("hidden");

      // UNASSIGN WORKER

document.body.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-zone")) {
    const id = Number(e.target.dataset.id);
    const w = workers.find((w) => w.id === id);

    if (w) w.location = "unassigned";

    renderUnassigned();
    renderZones();
  }
});

      // PROFILE MODAL

const profileModal = document.getElementById("modal-profile");
const profileContent = document.getElementById("profile-content");
const closeProfile = document.getElementById("close-profile");

closeProfile.onclick = () => profileModal.classList.add("hidden");

document.body.addEventListener("click", (e) => {
  if (e.target.classList.contains("open-profile")) {
    const id = Number(e.target.dataset.id);
    const w = workers.find((wk) => wk.id === id);

    if (w) showProfile(w);
  }
});

function showProfile(worker) {
  let expHTML = "";

  if (worker.experiences.length === 0) {
    expHTML = `<p class="text-gray-500 italic">Aucune expérience.</p>`;
  } else {
    worker.experiences.forEach((exp) => {
      expHTML += `
      <div class="border p-2 rounded bg-gray-50">
        <p><strong>Entreprise:</strong> ${exp.company}</p>
        <p><strong>Rôle:</strong> ${exp.role}</p>
        <p><strong>De:</strong> ${exp.from}</p>
        <p><strong>À:</strong> ${exp.to}</p>
      </div>`;
    });
  }

  profileContent.innerHTML = `
    <img src="${worker.photo}"
         class="w-32 h-32 rounded-full object-cover border shadow" />

    <h2 class="text-xl font-bold">${worker.name}</h2>
    <p class="text-blue-600 font-semibold">${worker.role}</p>

    <p><strong>Email:</strong> ${worker.email}</p>
    <p><strong>Téléphone:</strong> ${worker.tel}</p>

    <p class="mt-2"><strong>Localisation:</strong>
      <span class="text-green-600">
        ${worker.location === "unassigned" ? "Non assigné" : worker.location}
      </span>
    </p>

    <h3 class="text-lg font-bold mt-4">Expériences professionnelles</h3>
    <div class="flex flex-col gap-2">${expHTML}</div>
  `;

  profileModal.classList.remove("hidden");
}

renderUnassigned();
renderZones();
