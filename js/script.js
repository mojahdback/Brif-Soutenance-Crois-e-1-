
// OPEN / CLOSE MODAL

const modal = document.getElementById("modal-add");
const openBtn = document.getElementById("btn-add");
const closeBtn = document.getElementById("close-modal");
const saveData = document.getElementById('save');


openBtn.onclick = () => modal.classList.remove("hidden");
closeBtn.onclick = () => modal.classList.add("hidden");
saveData.onclick = () => modal.classList.add("hidden");



// ADD EXPERIENCE (Dynamic Form)

const expList = document.getElementById("exp-list");
const addExpBtn = document.getElementById("add-exp");

addExpBtn.addEventListener("click", () => {
  const cardExp = document.createElement('div');
  cardExp.className = "border p-6 m-2 bg-gray-100";

  cardExp.innerHTML= `

              <div class="flex justify-between">
            <p class="font-semibold"> Experience: </p> 
             <button class=" close-exp  static left-3 top-3 text-black-500 font-bold text-md ">X</button>
          </div>
       
        <label class="font-sans flex flex-col ">Company</label>
        <input  type="text" class="border p-1 w-60 rounded-md exp-item " required>
         <label class="font-sans flex flex-col">Role</label>
        <input  type="text" class="border p-1 w-60 rounded-md exp-item " required>
         <label class="font-sans flex flex-col">From</label>
        <input  type="date" class="border p-1 w-60 rounded-md exp-item " required>
         <label class="font-sans flex flex-col">To</label>
        <input  type="date" class="border p-1 w-60 rounded-md exp-item" required>
  
  
  `
expList.append(cardExp);

});

expList.addEventListener('click', (e) => {
    
      if(e.target.classList.contains("close-exp")){
        e.target.parentElement.parentElement.remove();
      }
      
});



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


  // Reset form
  form.reset();
  expList.innerHTML = "<label class='font-semibold'>Expériences</label>";
});