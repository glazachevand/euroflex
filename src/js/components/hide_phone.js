export function init() {
  hidePhone();

  window.addEventListener("resize", hidePhone);

  function hidePhone() {
    const dataMove = document.querySelector("[data-move]");
    if (dataMove) {
      const dataMoveWidth = dataMove.getAttribute("data-move");
      if (dataMoveWidth) {
        const docWidth = document.documentElement.clientWidth;
        if (docWidth < dataMoveWidth) {
          const menuBody = document.querySelector(".menu__body");
          menuBody.append(dataMove);
        } else {
          const headerContainer = document.querySelector(".header__container");
          headerContainer.append(dataMove);
        }
      }
    }
  }
}
