// Retrieve shopping bag items from localStorage
function getShoppingBagItems() {
  return JSON.parse(localStorage.getItem("shoppingBag")) || [];
}

// Display shopping bag items in the checkout
function displayOrderSummary() {
  const bagItems = getShoppingBagItems();
  console.log("Bag Items:", bagItems);
  const orderContainer = document.querySelector(".order-container");
  const orderHeadingCount = document.querySelector(
    ".order-heading .light-weight"
  );
  const subtotalElement = document.querySelector(".subtotal");
  const grandTotalElement = document.querySelector(".grandtotal");
  const shippingAmountElement = document.querySelector(".shipping");

  let subtotal = 0;
  let totalItemCount = 0;
  let shippingCost = 0;

  orderContainer.innerHTML = "";
  bagItems.forEach((item) => {
    subtotal += item.price * item.quantity;
    totalItemCount += item.quantity;

    // Dynamic HTML
    const productHTML = `
      <div class="order-img">
        <img
          class="background"
          src="../assets/images/products/product-bg.png"
          alt="Grey product background"
        />
        <img
          class="product-image"
          src="${item.image}" 
          alt="Product image of ${item.title}"
        />
      </div>
      <div class="product-info">
        <p id="product-heading">${item.title}</p>
        <p class="info">Size: <span class="light-weight">${item.size}</span></p>
        <p class="info">Qty: <span class="light-weight">${
          item.quantity
        }</span></p>
        <p class="light-weight">$${item.price.toFixed(2)}</p>
        <div class="display">
          <button class="minus-btn" onclick="updateQuantity('${item.id}', '${
      item.size
    }', -1)">
            <span><i class="fas fa-minus"></i></span>
          </button>
          <input type="number" value="${
            item.quantity
          }" class="qty-nr" readonly />
          <button class="plus-btn" onclick="updateQuantity('${item.id}', '${
      item.size
    }', 1)">
            <span><i class="fas fa-plus"></i></span>
          </button>
        </div>
      </div>
      <hr />
    `;

    // Append productHTML to order container
    orderContainer.innerHTML += productHTML;
  });

  // Determine shipping cost
  if (subtotal >= 100) {
    shippingCost = 0;
  } else {
    shippingCost = 10;
  }

  const grandTotal = subtotal + shippingCost;

  // Update item count and subtotal
  orderHeadingCount.textContent = `(${totalItemCount})`;
  subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
  orderHeadingCount.textContent = `(${totalItemCount})`;
  subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
  shippingAmountElement.textContent =
    shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)}`;
  grandTotalElement.textContent = `$${grandTotal.toFixed(2)}`;
}

// Update quantity for a specific item
function updateQuantity(productId, size, change) {
  const bagItems = getShoppingBagItems();
  const itemIndex = bagItems.findIndex(
    (item) => item.id === productId && item.size === size
  );

  if (itemIndex !== -1) {
    // Update quantity
    bagItems[itemIndex].quantity += change;

    // Remove item if quantity reaches zero
    if (bagItems[itemIndex].quantity <= 0) {
      bagItems.splice(itemIndex, 1);
    }

    // Save updated bag and refresh the display
    localStorage.setItem("shoppingBag", JSON.stringify(bagItems));
    displayOrderSummary();
  }
}

// Initialize checkout
document.addEventListener("DOMContentLoaded", () => {
  displayOrderSummary();
});
