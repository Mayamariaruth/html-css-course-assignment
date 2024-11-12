// Retrieve shopping bag items from localStorage
function getShoppingBagItems() {
  return JSON.parse(localStorage.getItem("shoppingBag")) || [];
}

// Display shopping bag items in the checkout
function displayOrderSummary() {
  const bagItems = getShoppingBagItems();
  const orderContainer = document.querySelector(".order-container");
  const orderHeadingCount = document.querySelector(
    ".order-heading .light-weight"
  );
  const subtotalElement = document.querySelector(".totals");

  let subtotal = 0;
  let totalItemCount = 0;

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

  // Update item count and subtotal
  orderHeadingCount.textContent = `(${totalItemCount})`;
  subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
}
