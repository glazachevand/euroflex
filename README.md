Создание проекта
npm i

Запуск проекта:

1. Режим разработки
   npm start или
   gulp
2. Режим producion
   npm run build или
   gulp --production

gulp имя_задачи - запустить отдельную задачу

// пути
const path = require("./config/path.js");
// настройки плагинов
const app = require("./config/app.js");

Плагины
// вендерные префиксы
const autoprefixer = require("gulp-autoprefixer");

// полифилы
const babel = require("gulp-babel");

// тестовый сервер
const browserSync = require("browser-sync").create();

// сжатие css
const csso = require("gulp-csso");

// удаление директории
const del = require("del");

// сборка компонентов через include и т.д.
const fileInclude = require("gulp-file-include");

// преобразовать шрифты в нужные форматы
const fonter = require("gulp-fonter");

// сгруппировать медиазапросы
const groupCssMediaQueries = require("gulp-group-css-media-queries");

// чтобы использовать условия, 1-ый параметр условие, 2-ой вызываемый плагин
const gulpif = require("gulp-if");

// для сокращения кода
const gp = require("gulp-load-plugins");

// сжатие html
const htmlmin = require("gulp-htmlmin");

// сжатие картинок
const imagemin = require("gulp-imagemin");

// не повторять обработанные элементы
const newer = require("gulp-newer");

// всплывающие сообщения
const notify = require("gulp-notify");

// ошибки плагинов
const plumber = require("gulp-plumber");

// форматирование для html
const htmlPrettify = require("gulp-html-prettify");

// переименование, нужно для копирования
const rename = require("gulp-rename");

// препроцессоры
const sass = require("gulp-sass")(require("sass"));

// импорт файлов scss через маски в препроцессоры
const sassGlob = require("gulp-sass-glob");

// заменяет свойства css на их краткие формы
const shorthand = require("gulp-shorthand");

// узнать размер проекта
const size = require("gulp-size");

// преобразовать шрифты в woff2
const ttf2woff2 = require("gulp-ttf2woff2");

// webpack
const webpack = require("webpack-stream");

// формат webp
const webp = require("gulp-webp");
// картинки перевести в webp для новых браузеров с использованием @supports
const webpCss = require("gulp-webp-css");
// картинки перевести в picture с выбором webp для новых браузеров
const webpHtml = require("gulp-webp-html");

// минификация
const uglify = require("gulp-uglify");
