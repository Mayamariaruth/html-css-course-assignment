// Retrieve shopping bag items from localStorage
function getShoppingBagItems() {
  return JSON.parse(localStorage.getItem("shoppingBag")) || [];
}

// Display shopping bag items in the checkout
function displayOrderSummary() {
  const bagItems = getShoppingBagItems();
  const orderContainer = document.querySelector(".order-container");
  const orderHeading = document.querySelector(".order-heading .light-weight");
  const subtotalElement = document.querySelector(".totals");

  let subtotal = 0;
}
