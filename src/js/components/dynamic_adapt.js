export function init() {
  dynamic_adapt();

  window.addEventListener("resize", function (event) {
    dynamic_adapt();
  });

  function dynamic_adapt() {
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
