"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function () {
  modal.classList.toggle("hidden");
  overlay.classList.tog("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};


btnsOpenModal.forEach(btn => btn.addEventListener("click", openModal)
)

// for (let i = 0; i < btnsOpenModal.length; i++){
//   btnsOpenModal[i].addEventListener("click", openModal);

// }

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// console.log(document.documentElement.style.fontSize = "16px");
console.log(document.head);
console.log(document.body);


const allSections = document.querySelectorAll(".section");

//?Live collection of elements
const allButtons = document.getElementsByTagName("button");

console.log(allSections);
console.log(allButtons);

console.log();


//?DOM traversing
const message = document.createElement("div");
message.classList.add("cookie-message");
message.textContent =
  "We use cookies for improved functionality and analytics.";
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

const header = document.querySelector(".header");
header.prepend(message);
// header.append(message.cloneNode(true));

// header.before(message.cloneNode(true));
// header.after(message.cloneNode(true));

document
  .querySelector(".btn--close-cookie")
  .addEventListener("click", function () {
    message.remove();
  });

// styles
message.style.backgroundColor = "#37383d";
message.style.width = "120%";

//? CSS properties
console.log(getComputedStyle(message));
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + "px";

  //? Custom properties - CSS variables: This lives in the document root which is the root element of the document.
document.documentElement.style.setProperty("--color-primary", "orangered"); 


//? Attributes
const logo = document.querySelector(".nav__logo");
console.log(logo.alt);
console.log(logo.className);

//? Non-standard
console.log(logo.designer);
console.log(logo.getAttribute("designer"));
console.log(logo.getAttribute("designer"));

console.log(logo.src);
console.log(logo.getAttribute("src"));


//? Data attributes
console.log(logo.dataset.versionNumber);