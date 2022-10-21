export function init() {
  const hideBtnSolutions = document.querySelector(".solutions__hide-btn");
  const hideTextSolutions = document.querySelector(".solutions__hide-text");
  const headerHeight = document.querySelector(".header").offsetHeight;
  const solutions = document.getElementsByClassName("solutions__content")[0];
  solutions.style.maxHeight = solutions.scrollHeight + "px";

  if (hideBtnSolutions && hideTextSolutions) {
    hideBtnSolutions.addEventListener("click", hideSolutions);

    function hideSolutions() {
      const rectSolutionsTop = solutions.getBoundingClientRect().top;

      if (solutions.style.maxHeight !== "0px") {
        solutions.style.maxHeight = 0;
        if (rectSolutionsTop < headerHeight) {
          document
            .querySelector(".solutions")
            .scrollIntoView({ behavior: "smooth" });
        }
      } else {
        solutions.style.maxHeight = solutions.scrollHeight + "px";
      }
    }
  }
}
