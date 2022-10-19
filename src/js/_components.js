// burger
import { menu_burger } from "./components/menu.js";
menu_burger();
// menu_close();

// убрать в бургер блок с телефоном на маленьких разрешениях экрана
import { init as dynamic_adapt } from "./components/dynamic_adapt.js";
dynamic_adapt();

// sliders
import Swiper, { Navigation, Autoplay, Thumbs } from "swiper";
Swiper.use([Navigation, Autoplay, Thumbs]);

// мини-слайдер с продуктами
const productsMiniSwiper = new Swiper(".products-mini-slider", {
  loop: true,
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    576: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: 120,
    },
  },
});

// слайдер с продуктами
const productsSwiper = new Swiper(".products-slider", {
  loop: true,
  slidesPerView: 1,
  autoplay: {
    delay: 5000,
    // Отключить после ручного переключения
    disableOnInteraction: true,
  },
  speed: 1000,
  autoHeight: true,

  // Свайпер с мениатюрами
  thumbs: {
    swiper: productsMiniSwiper,
  },
  // Navigation arrows
  navigation: {
    nextEl: ".products-slider__swiper-button_next",
    prevEl: ".products-slider__swiper-button_prev",
  },
});

// слайдер в секции Наше производство
const productionSwiper = new Swiper(".production-slider", {
  loop: true,
  centeredSlides: true,
  spaceBetween: 20,
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    576: {
      slidesPerView: 2,
    },
    767: {
      slidesPerView: 3,
    },
    992: {
      slidesPerView: 4,
    },
    1200: {
      slidesPerView: 5,
    },
  },
  // Navigation arrows
  navigation: {
    nextEl: ".production-slider__swiper-button_next",
    prevEl: ".production-slider__swiper-button_prev",
  },

  pagination: {
    el: ".production-slider__pagination-container",
    bulletActiveClass: "production-slider__pagination-item_active",
    bulletClass: "production-slider__pagination-item",
    clickable: true,
  },
});

// галерея (в слайдере)
import lightbox from "../../node_modules/lightbox2/dist/js/lightbox-plus-jquery.min";
lightbox.option({
  alwaysShowNavOnTouchDevices: true,
  albumLabel: "рис. %1 из %2",
  fadeDuration: 700,
  resizeDuration: 800,
  positionFromTop: document.documentElement.clientHeight / 3,
  wrapAround: false,
});

// анимации при скролле
import AOS from "aos";
AOS.init();

// анимация цифр
import { CountUp } from "../../node_modules/countup.js/dist/countUp.min.js";
const digits = document.querySelectorAll("._digit-anim");

digits.forEach((digit) => {
  digit.textContent = digit.textContent.replace(",", ".");
  const decimalLength = digit.textContent.includes(".")
    ? digit.textContent.split(".").pop().length
    : 0;

  const countUp = new CountUp(digit, digit.textContent, {
    startVal: 0,
    duration: 3,
    decimalPlaces: decimalLength,
    decimal: ",",
    useEasing: false,
    scrollSpyOnce: true,
  });
  if (!countUp.error) {
    document.addEventListener("aos:in:digit", () => {
      countUp.start();
    });
  } else {
    console.error(countUp.error);
  }
});
