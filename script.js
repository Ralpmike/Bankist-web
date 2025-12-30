'use strict';

///////////////////////////////////////
// Modal window
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');

const openModal = function () {
  modal.classList.toggle('hidden');
  overlay.classList.tog('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

// for (let i = 0; i < btnsOpenModal.length; i++){
//   btnsOpenModal[i].addEventListener("click", openModal);

// }

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
//?Scrolling
//? Impementing smooth scrolling

btnScrollTo.addEventListener('click', function (e) {
  const s1cords = section1.getBoundingClientRect();
  console.log(s1cords.left, s1cords.top);

  console.log(e.target.getBoundingClientRect());
  console.log('Current scroll (x/y)', window.pageXOffset, window.pageYOffset);

  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  //?scrolling
  // window.scrollTo(s1cords.left + window.pageXOffset, s1cords.top + window.pageYOffset)
  // window.scrollTo(s1cords.left , s1cords.top)
  // window.scrollTo({
  //   left: s1cords.left + window.pageXOffset,
  //   top: s1cords.top + window.pageYOffset,
  //   behavior: 'smooth'
  // });

  //? modern way
  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////
//? page navigation

// document.querySelectorAll(".nav__link").forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     console.log("LINK");
//     const id = this.getAttribute("href");
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//   })
// })

//? using event delegation for page navigation instead
//?Steps
//?1. Add event listener to common parent element
//?2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  const targetEl = e.target;

  document.querySelectorAll('.nav__link').forEach(function (el) {
    el.classList.remove('active__link');
    console.log(el);
  });

  targetEl.classList.add('active__link');

  if (targetEl.classList.contains('nav__link')) {
    const id = targetEl.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//?DOM traversing
const h1 = document.querySelector('h1');

//? tabbed component
tabsContainer.addEventListener('click', function (e) {
  const tabElem = e.target.closest('.operations__tab');

  //?guard clause
  if (!tabElem) return;
  console.log(tabElem);

  //? Remove active classes
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  tabsContent.forEach(tabContent =>
    tabContent.classList.remove('operations__content--active')
  );

  //? Active tab
  tabElem.classList.add('operations__tab--active');

  //? Active content
  const tabNumber = tabElem.dataset.tab;
  const tabContent = document.querySelector(
    `.operations__content--${tabNumber}`
  );
  tabContent.classList.add('operations__content--active');
  console.log(tabContent);
});

//? Menu fade animation

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(sibling => {
      if (sibling !== link) {
        sibling.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
};

//? passing "arguments" into callback functions
nav.addEventListener(
  'mouseover',
  //   function(e){
  //   if(e.target.classList.contains('nav__link')){
  //     const link = e.target;
  //     console.log(link);
  //     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
  //     const logo = link.closest('.nav').querySelector('img')
  //     console.log(siblings);

  //     siblings.forEach(sibling => {
  //       if(sibling !== link){
  //         sibling.style.opacity = 0.5
  //       }
  //     })

  //     logo.style.opacity = 0.5
  //   }
  // }
  handleHover.bind(0.5)
);

nav.addEventListener(
  'mouseout',
  //   function(e){
  //   if(e.target.classList.contains('nav__link')){
  //     const link = e.target;
  //     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
  //     const logo = link.closest('.nav').querySelector('img')
  //     siblings.forEach(sibling => {
  //       sibling.style.opacity = 1
  //     })
  //     logo.style.opacity = 1
  //   }
  // }
  handleHover.bind(1)
);

//?Sticky Navigation

// const initialCord = section1.getBoundingClientRect();
// window.addEventListener("scroll", function(){
//   if(this.window.scrollY > initialCord.top){
//     nav.classList.add("sticky")
//   }else{
//     nav.classList.remove("sticky")
//   }
//   console.log(initialCord);
//   console.log(window.scrollY);
// })

//? Sticky navigation: Intersection Observer API

// const obsCallback = function(entries, observer){
//   entries.forEach(entry => {
//     console.log(entry);
//   })
// }

// const obsOptions = {
// root: null, //? the element that the target is intersecting with: viewport
// threshold: [0, 0.2], //? the percentage of the target element that is visible on the screen (0-1) before the callback is called

// }

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1); //? the target element to be observed

const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const observer = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

observer.observe(header);

//? Reveal sections
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    //? Unobserve: making sure the element is only observed once
    observer.unobserve(entry.target);
  });
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//? Lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]');

const loadingImg = function (entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener('load', function () {
      entry.target.classList.remove('lazy-img');
    });
    observer.unobserve(entry.target);
  });
};

const imgObserver = new IntersectionObserver(loadingImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

//?Slider

const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');
const slider = document.querySelector('.slider');
let curSlide = 0;
const maxSlide = slides.length;

// slider.style.transform = 'scale(0.4) translateX(-800px)';
// slider.style.overflow = 'visible';

// slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));

const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

goToSlide(0);

//?next slide
const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
};

//?previous slide
const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
};



btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);


//  function () {
//   if (curSlide === maxSlide - 1) {
//     curSlide = 0;
//   } else {
//     curSlide++;
//   }
  
//   goToSlide(curSlide);

  // slides.forEach((s, i) => {
  //   s.style.transform = `translateX(${100 * (i - curSlide)}%)`;
  // });

  // curSlide++;
  // slides.forEach((s, i) => {
  //   if( curSlide < slides.length ){
  //     s.style.transform = `translateX(${100 * (i - curSlide)}%)`
  //   } else {
  //     curSlide = 0;
  //     s.style.transform = `translateX(${100 * (i - curSlide)}%)`
  //   }
  // })
// }

// console.log(document.documentElement.style.fontSize = "16px");
// console.log(document.head);
// console.log(document.body);

// const allSections = document.querySelectorAll(".section");

//?Live collection of elements
// const allButtons = document.getElementsByTagName("button");

// console.log(allSections);
// console.log(allButtons);

// console.log();

// //?DOM traversing
// const message = document.createElement("div");
// message.classList.add("cookie-message");
// message.textContent =
//   "We use cookies for improved functionality and analytics.";
// message.innerHTML =
//   'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// const header = document.querySelector(".header");
// header.prepend(message);
// // header.append(message.cloneNode(true));

// // header.before(message.cloneNode(true));
// // header.after(message.cloneNode(true));

// document
//   .querySelector(".btn--close-cookie")
//   .addEventListener("click", function () {
//     message.remove();
//   });

// // styles
// message.style.backgroundColor = "#37383d";
// message.style.width = "120%";

// //? CSS properties
// console.log(getComputedStyle(message));
// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 30 + "px";

//   //? Custom properties - CSS variables: This lives in the document root which is the root element of the document.
// document.documentElement.style.setProperty("--color-primary", "orangered");

// //? Attributes
// const logo = document.querySelector(".nav__logo");
// console.log(logo.alt);
// console.log(logo.className);

// //? Non-standard
// console.log(logo.designer);
// console.log(logo.getAttribute("designer"));
// console.log(logo.getAttribute("designer"));

// console.log(logo.src);
// console.log(logo.getAttribute("src"));

// //? Data attributes
// console.log(logo.dataset.versionNumber);

// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () => `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// console.log(randomColor());

// document.querySelector(".nav__link").addEventListener("click", function (e) {
//   e.preventDefault();
//   this.style.backgroundColor = randomColor();
//   console.log("LINK", e.target, e.currentTarget);
//   console.log(e.target === this);

//   ?Stop propagation
//   e.stopPropagation();
// })

// document.querySelector(".nav__links").addEventListener("click", function (e) {
//   e.preventDefault();
//   this.style.backgroundColor = randomColor();
//   console.log("CONTAINER", e.target, e.currentTarget);
//   // console.log(e.currentTarget === this);
// })

// document.querySelector('.nav').addEventListener('click', function (e) {
//   e.preventDefault();
//   this.style.backgroundColor = randomColor();
//   console.log('NAV', e.target, e.currentTarget);
// }, true)
