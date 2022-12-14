// sliders
import Swiper, { Navigation, Autoplay, Thumbs, Pagination } from "swiper";
Swiper.use([Navigation, Autoplay, Thumbs, Pagination]);

// мини-слайдер с продуктами
const productsMiniSwiper = new Swiper(".products-mini-slider", {
  loop: false,
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
import lightbox from "../../node_modules/lightbox2/dist/js/lightbox-plus-jquery.js";
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

onElementHeightChange(document.body, function () {
  AOS.refresh();
});

function onElementHeightChange(elm, callback) {
  var lastHeight = elm.clientHeight;
  var newHeight;

  (function run() {
    newHeight = elm.clientHeight;
    if (lastHeight !== newHeight) callback();
    lastHeight = newHeight;

    if (elm.onElementHeightChangeTimer) {
      clearTimeout(elm.onElementHeightChangeTimer);
    }

    elm.onElementHeightChangeTimer = setTimeout(run, 200);
  })();
}

// анимация цифр
import { CountUp } from "../../node_modules/countup.js/dist/countUp.min.js";
const digits = document.getElementsByClassName("_digit-anim");

for (const digit of digits) {
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
}

// формы
import { validateForms } from "./components/validate_forms";
// popup
import GraphModal from "graph-modal";

const afterForm = (message) => {
  const modal = new GraphModal({
    isOpen: (modal) => {
      const text = document.querySelector(".graph-modal__text");
      text.innerHTML = message;
    },
  }).open("first");
};

validateForms(".form-order", afterForm);
