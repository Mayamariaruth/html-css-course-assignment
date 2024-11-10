import "./api.js";
import "./bag.js";
import "./checkout.js";
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
