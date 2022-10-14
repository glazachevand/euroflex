// убрать в бургер блок с телефоном на маленьких разрешениях экрана
export function dynamic_adapt() {
  adapt();
  window.addEventListener("resize", function (event) {
    adapt();
  });

  function adapt() {
    let dataMove = document.querySelector("[data-move]");
    if (dataMove) {
      let dataMoveWidth = dataMove.getAttribute("data-move");
      if (dataMoveWidth) {
        let docWidth = document.documentElement.clientWidth;
        if (docWidth < dataMoveWidth) {
          let menuBody = document.querySelector(".menu__body");
          menuBody.append(dataMove);
        } else {
          let headerContainer = document.querySelector(".header__container");
          headerContainer.append(dataMove);
        }
      }
    }
  }
}
