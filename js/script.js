import "./api.js";
import "./bag.js";
import "./checkout.js";
import "./contact.js";
import "./products.js";

// Toggle nav bar color for mobile screens
document.addEventListener("DOMContentLoaded", function () {
  const navBox = document.getElementById("nav-box");
  const header = document.querySelector("header");

  navBox.addEventListener("click", function () {
    header.classList.toggle("active");
  });
});

// Store gender selection (nav bar links/footer links) in localStorage
document.querySelectorAll('a[href="products.html"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const selectedGender = event.target.textContent.trim();
    localStorage.setItem("selectedGender", selectedGender);
  });
});

// Update .on-page class based on user gender choice in navbar
document.addEventListener("DOMContentLoaded", () => {
  const selectedGender = localStorage.getItem("selectedGender") || "Men";

  // Select all navbar links to `products.html`
  const links = document.querySelectorAll('a[href="products.html"]');

  // Remove the .on-page class from both links initially
  links.forEach((link) => {
    const span = link.querySelector("span");
    if (span) {
      // Check if span exists
      span.classList.remove("on-page");
    }
  });

  // Apply the .on-page class only if on the products.html page
  if (window.location.pathname.endsWith("products.html")) {
    links.forEach((link) => {
      const span = link.querySelector("span");
      if (span) {
        if (
          (selectedGender === "Men" && span.textContent.trim() === "Men") ||
          (selectedGender === "Women" && span.textContent.trim() === "Women")
        ) {
          span.classList.add("on-page");
        }
      }
    });
  }
});

// Function to show the notification
export function showNotification(productTitle) {
  const notificationBox = document.getElementById("notification-box");
  const productNameSpan = document.getElementById("product-name");
  const selectedSize = localStorage.getItem("selectedSize");

  // Update the notification message
  if (selectedSize) {
    productNameSpan.innerHTML = `${productTitle} (Size: <strong>${selectedSize}</strong>)`;
  } else {
    productNameSpan.textContent = `${productTitle}`;
  }
  // Display the notification
  notificationBox.classList.remove("hidden");
  notificationBox.classList.add("visible");

  // Hide notification after 4 seconds
  setTimeout(() => {
    notificationBox.classList.remove("visible");
    notificationBox.classList.add("hidden");
  }, 5000);
}

// Generate a random 7-digit order number
function generateOrderNumber() {
  return Math.floor(1000000 + Math.random() * 9000000);
}

document.addEventListener("DOMContentLoaded", () => {
  const orderNumber = generateOrderNumber();
  const orderNumberElement = document.getElementById("order-number");
  if (orderNumberElement) {
    orderNumberElement.textContent = orderNumber;
  }
});
