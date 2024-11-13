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
  const subtotalElement = document.querySelector(".subtotal");
  const grandTotalElement = document.querySelector(".grandtotal");
  const shippingAmountElement = document.querySelector(".shipping");
  const freeShippingMessageElement = document.getElementById(
    "free-shipping-message"
  );

  let subtotal = 0;
  let totalItemCount = 0;
  let shippingCost = 10;

  orderContainer.innerHTML = "";
  bagItems.forEach((item) => {
    subtotal += item.price * item.quantity;
    totalItemCount += item.quantity;

    // Dynamic HTML
    const productHTML = `
      <div class="item-container">
        <div class="order-img">
            <img class="background" src="../assets/images/products/product-bg.png" alt="Grey product background" />
            <img class="product-image" src="${
              item.image
            }" alt="Product image of ${item.title}" />
        </div>
        <div class="product-info" data-id="${item.id}" data-size="${item.size}">
            <p id="product-heading">${item.title}</p>
            <p class="info">Size: <span class="light-weight">${
              item.size
            }</span></p>
            <p class="info">Qty: <span class="light-weight">${
              item.quantity
            }</span></p>
            <p class="light-weight">$${item.price.toFixed(2)}</p>
            <div class="display">
            <button class="minus-btn">-</button>
            <input type="number" value="${
              item.quantity
            }" class="qty-nr" readonly />
            <button class="plus-btn">+</button>
            </div>
        </div>
      </div>
    `;

    // Append productHTML to order container
    orderContainer.innerHTML += productHTML;
  });

  // Remove/add item quantity
  orderContainer.querySelectorAll(".minus-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const productInfo = this.closest(".product-info");
      const productId = productInfo.getAttribute("data-id");
      const size = productInfo.getAttribute("data-size");
      updateQuantity(productId, size, -1);
    });
  });

  orderContainer.querySelectorAll(".plus-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const productInfo = this.closest(".product-info");
      const productId = productInfo.getAttribute("data-id");
      const size = productInfo.getAttribute("data-size");
      updateQuantity(productId, size, 1);
    });
  });

  // Shipping cost
  if (subtotal >= 250) {
    shippingCost = 0;
    freeShippingMessageElement.textContent = "";
  } else {
    const amountNeeded = (250 - subtotal).toFixed(2);
    freeShippingMessageElement.textContent = `Spend $${amountNeeded} more to get free shipping!`;
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

  updateChargeAmount(grandTotal);
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
  const orderSummaryElement = document.getElementById("order-summary");
  if (orderSummaryElement) {
    displayOrderSummary();
  }
});

// Array to collect all error messages
let errors = [];

// Validate checkout forms
const checkoutBtn = document.querySelector(".checkout-btn");
if (checkoutBtn) {
  document.querySelector(".checkout-btn").addEventListener("click", (event) => {
    event.preventDefault();

    errors = [];

    const formIsValid = validateForm();
    const paymentIsValid = validatePaymentForm();

    const formValid = formIsValid && paymentIsValid;

    if (!formValid) {
      alert("Please fill out all required fields. \n" + errors.join("\n"));
    } else {
      localStorage.removeItem("shoppingBag");
      window.location.href = "checkout-success.html";
    }
  });
}

// Form validation function
function validateForm() {
  const checkoutForms = document.querySelectorAll(
    "#delivery-form input[required], #contact-form input[required], .payment-form input[required]"
  );
  let isValid = true;

  checkoutForms.forEach((field) => {
    // Remove error CSS class when the user starts typing
    field.addEventListener("input", () => {
      field.classList.remove("input-error");
    });

    // Check if the field is empty
    if (!field.value.trim()) {
      field.classList.add("input-error");
      isValid = false;
      errors.push(`Please fill out the ${field.name} field.`);
    } else {
      // Validate specific fields
      if (field.name === "email" && !validateEmail(field.value)) {
        field.classList.add("input-error");
        isValid = false;
        errors.push("Please enter a valid email address.");
      } else if (field.name === "phone" && !validatePhoneNumber(field.value)) {
        field.classList.add("input-error");
        isValid = false;
        errors.push("Please enter a valid phone number.");
      } else if (field.name === "postcode" && !validatePostcode(field.value)) {
        field.classList.add("input-error");
        isValid = false;
        errors.push("Please enter a valid postcode.");
      } else {
        field.classList.remove("input-error");
      }
    }
  });

  return isValid;
}

// Email validation
function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

// Phone number validation
function validatePhoneNumber(phone) {
  const phonePattern =
    /^(?:\+?\d{1,3})?[-.\s]?(?:\(?\d{1,4}\)?[-.\s]?)?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,4}$/;
  return phonePattern.test(phone);
}

// Postcode validation
function validatePostcode(postcode) {
  const postcodePattern = /^[A-Za-z0-9\s\-\/]{3,10}$/;
  return postcodePattern.test(postcode);
}

// Payment form validation function
function validatePaymentForm() {
  const cardNumber = document.getElementById("cardnumber");
  const nameOnCard = document.getElementById("nameoncard");
  const expiryDate = document.getElementById("expirydate");
  const securityCode = document.getElementById("securitycode");

  // Check if the payment form elements exist before validating
  if (!cardNumber || !nameOnCard || !expiryDate || !securityCode) {
    return true;
  }

  let isValid = true;

  // Card number validation
  if (!/^\d{13,19}$/.test(cardNumber.value.trim())) {
    isValid = false;
    cardNumber.classList.add("input-error");
    errors.push("Please enter a valid card number (13-19 digits).");
  } else {
    cardNumber.classList.remove("input-error");
  }

  // Name on card validation
  if (!/^[A-Za-z\s]+$/.test(nameOnCard.value.trim())) {
    isValid = false;
    nameOnCard.classList.add("input-error");
    errors.push("Please enter a valid name on the card.");
  } else {
    nameOnCard.classList.remove("input-error");
  }

  // Expiry date validation (MM/YY)
  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate.value.trim())) {
    isValid = false;
    expiryDate.classList.add("input-error");
    errors.push("Please enter a valid expiration date in MM/YY format.");
  } else {
    expiryDate.classList.remove("input-error");
  }

  // Security code validation (3 digits)
  if (!/^\d{3}$/.test(securityCode.value.trim())) {
    isValid = false;
    securityCode.classList.add("input-error");
    errors.push("Please enter a valid 3-digit security code.");
  } else {
    securityCode.classList.remove("input-error");
  }

  // Remove error CSS class when the user starts typing
  [cardNumber, nameOnCard, expiryDate, securityCode].forEach((field) => {
    field.addEventListener("input", () => {
      field.classList.remove("input-error");
    });
  });

  return isValid;
}

document.addEventListener("DOMContentLoaded", () => {
  validateForm();
  validatePaymentForm();
});
