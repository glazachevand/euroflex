// burger
import { init as menu } from "./components/menu.js";
menu();

// убрать в бургер блок с телефоном на маленьких разрешениях экрана
import { init as hidePhone } from "./components/hide_phone.js";
hidePhone();

// клик по кнопке Скрыть решения
import { init as hideSolutions } from "./components/hide_solutions.js";
hideSolutions();

// клик по кнопке "Получить суперпредложение" на маленьких экранах
import { init as clickBtnOrder } from "./components/click_btn_order";
clickBtnOrder();
