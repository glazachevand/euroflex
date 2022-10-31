export function init() {
  const hideBtnSolutions = document.querySelector(".solutions__hide-btn");
  const hideTextSolutions = document.querySelector(".solutions__hide-text");
  const solutions = document.getElementsByClassName("solutions__content")[0];
  solutions.style.maxHeight = solutions.scrollHeight + "px";

  if (hideBtnSolutions && hideTextSolutions && solutions) {
    hideBtnSolutions.addEventListener("click", hideSolutions);

    function hideSolutions() {
      const rectSolutionsTop = solutions.getBoundingClientRect().top;
      const headerHeight = document.querySelector(".header").offsetHeight;

      if (solutions.style.maxHeight !== "0px") {
        solutions.style.maxHeight = 0;
        hideTextSolutions.textContent = "ПОКАЗАТЬ решения";
        hideBtnSolutions.classList.add("_hide");

        if (rectSolutionsTop < headerHeight) {
          document
            .querySelector(".solutions")
            .scrollIntoView({ behavior: "smooth" });
        }
      } else {
        solutions.style.maxHeight = solutions.scrollHeight + "px";
        hideTextSolutions.textContent = "СКРЫТЬ все решения";
        hideBtnSolutions.classList.remove("_hide");
      }
    }
  }
}
