export function init() {
  const btnOrders = document.querySelectorAll(".btn-order");
  for (const btnOrder of btnOrders) {
    const order = btnOrder.previousElementSibling;

    if (order && order.classList.contains("order")) {
      btnOrder.addEventListener("click", clickOrder);

      function clickOrder() {
        btnOrder.classList.add("_active");
        order.classList.add("_active");
        order.style.maxHeight = order.scrollHeight + 20 + "px";
      }

      window.addEventListener("resize", resizeOrder);

      function resizeOrder() {
        if (
          btnOrder.classList.contains("_active") &&
          order.classList.contains("_active")
        ) {
          btnOrder.classList.remove("_active");
          order.classList.remove("_active");
          order.style.maxHeight = null;
        }
      }
    }
  }
}
