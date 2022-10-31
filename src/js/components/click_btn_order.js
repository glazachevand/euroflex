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

      window.addEventListener("resize", resizeThrottler, false);

      var resizeTimeout;
      function resizeThrottler() {
        // ignore resize events as long as an actualResizeHandler execution is in the queue
        if (!resizeTimeout) {
          resizeTimeout = setTimeout(function () {
            resizeTimeout = null;
            resizeOrder();
          }, 100);
        }
      }

      function resizeOrder() {
        if (
          btnOrder.classList.contains("_active") &&
          order.classList.contains("_active")
        ) {
          const order = btnOrder.previousElementSibling;
          order.style.maxHeight = order.scrollHeight + 20 + "px";
        }
      }
    }
  }
}
