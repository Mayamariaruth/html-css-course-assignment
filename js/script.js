import "./api.js";
import "./bag.js";
import "./checkout.js";
import "./contact.js";
import "./products.js";

document.addEventListener("DOMContentLoaded", () => {
  toggleNavBarColor();
  setupGenderSelection();
  highlightActivePage();
  setupGenderNavigation();
  displayOrderNumber();
  setupNewsletterSubmission();
});

// Toggle nav bar color for mobile screens
function toggleNavBarColor() {
  const navBox = document.getElementById("nav-box");
  const header = document.querySelector("header");

  if (navBox && header) {
    navBox.addEventListener("click", () => {
      header.classList.toggle("active");
    });
  }
}

// Store gender selection in localStorage from links or buttons
function setupGenderSelection() {
  const navbarLinks = document.querySelectorAll('a[href="products.html"]');
  const genderLinks = document.querySelectorAll("a[data-gender]");

  navbarLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const selectedGender = event.target.textContent.trim();
      localStorage.setItem("selectedGender", selectedGender);
    });
  });

  genderLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const gender = event.target.closest("a").getAttribute("data-gender");
      localStorage.setItem("selectedGender", gender);
    });
  });
}

// Highlight the active gender page in the navbar
function highlightActivePage() {
  const selectedGender = localStorage.getItem("selectedGender") || "Men";
  const links = document.querySelectorAll('a[href="products.html"]');
  const currentPath = window.location.pathname;

  links.forEach((link) => {
    const span = link.querySelector("span");
    if (span) {
      span.classList.remove("on-page");
    }
  });

  if (currentPath.endsWith("products.html")) {
    links.forEach((link) => {
      const span = link.querySelector("span");
      if (span && link.textContent.trim() === selectedGender) {
        span.classList.add("on-page");
      }
    });
  }
}

// Handle gender navigation on the products.html page
function setupGenderNavigation() {
  if (window.location.pathname.endsWith("products.html")) {
    const genderButtons = document.querySelectorAll(".gender-buttons a");

    genderButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const gender = event.target.closest("a").textContent.trim();
        localStorage.setItem("selectedGender", gender);
      });
    });
  }
}

// Generate and display a random order number on the checkout-success page
function displayOrderNumber() {
  const orderNumberElement = document.getElementById("order-number");
  if (orderNumberElement) {
    orderNumberElement.textContent = generateOrderNumber();
  }
}

function generateOrderNumber() {
  return Math.floor(1000000 + Math.random() * 9000000);
}

// Show notification for added product
export function showNotification(productTitle) {
  const notificationBox = document.getElementById("notification-box");
  const productNameSpan = document.getElementById("product-name");
  const selectedSize = localStorage.getItem("selectedSize");

  if (productNameSpan) {
    productNameSpan.innerHTML = selectedSize
      ? `${productTitle} (Size: <strong>${selectedSize}</strong>)`
      : productTitle;
  }

  if (notificationBox) {
    notificationBox.classList.remove("hidden");
    notificationBox.classList.add("visible");

    setTimeout(() => {
      notificationBox.classList.remove("visible");
      notificationBox.classList.add("hidden");
    }, 5000);
  }
}

// Handle newsletter form submission
function setupNewsletterSubmission() {
  const newsletterForm = document.querySelector(".newsletter form");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const emailInput = document.getElementById("email");
      if (emailInput) emailInput.value = "";

      const thankYouMessage = document.createElement("p");
      thankYouMessage.textContent = `Thank you for subscribing!`;
      thankYouMessage.classList.add("thank-you-message");

      const newsletterSection = document.querySelector(".newsletter");
      if (newsletterSection) {
        newsletterSection.appendChild(thankYouMessage);
      }
    });
  }
}
