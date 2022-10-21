export function init() {
  const header = document.querySelector(".header");

  menu_burger();

  function menu_burger() {
    let iconMenu = document.querySelector(".icon-menu");
    let menuBody = document.querySelector(".menu__body");

    iconMenu?.addEventListener("click", function (e) {
      iconMenu.classList.toggle("_active");
      menuBody.classList.toggle("_active");
    });
  }

  // меню и шапка при скролле
  window.addEventListener("scroll", scrollHandler);

  function scrollHandler() {
    if (header) {
      if (window.pageYOffset > 40) {
        header.classList.add("_scroll");
      } else {
        header.classList.remove("_scroll");
      }
    }

    document.querySelectorAll(".menu__link").forEach((link) => {
      const href = link.getAttribute("href").substring(1);
      const scrollTargetTop =
        document.getElementById(href).getBoundingClientRect().top +
        window.pageYOffset;
      const scrollTargetBottom =
        scrollTargetTop + document.getElementById(href).offsetHeight;
      const point = window.pageYOffset + header.offsetHeight + 20;

      if (point > scrollTargetTop && point < scrollTargetBottom) {
        link.classList.add("_active");
      } else if (link.classList.contains("_active")) {
        link.classList.remove("_active");
      }
    });
  }

  // плавная прокрутка к разделам
  document.querySelectorAll(".menu__link").forEach((link) => {
    link.addEventListener("click", linkClickHandler);
  });

  function linkClickHandler(e) {
    e.preventDefault();

    let iconMenu = document.querySelector(".icon-menu");
    let menuBody = document.querySelector(".menu__body");
    iconMenu?.classList.remove("_active");
    menuBody?.classList.remove("_active");

    const href = this.getAttribute("href").substring(1);
    const scrollTarget = document.getElementById(href);
    const position =
      scrollTarget.getBoundingClientRect().top - header.offsetHeight;

    window.scrollBy({
      top: position,
      behavior: "smooth",
    });
  }
}
