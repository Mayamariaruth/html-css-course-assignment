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

// Store gender selection (nav bar links/footer links) in localstorage
document.querySelectorAll('a[href="products.html"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const selectedGender = event.target.textContent.trim();
    localStorage.setItem("selectedGender", selectedGender);
  });
});

// Update .on-page class based on user gender choice in navbar
document.addEventListener("DOMContentLoaded", () => {
  const selectedGender = localStorage.getItem("selectedGender") || "Men"; // Default to "Men" if not set

  // Select all navbar links to `products.html`
  const links = document.querySelectorAll('a[href="products.html"]');

  // Apply the .on-page class based on the selected gender
  links.forEach((link) => {
    const span = link.querySelector("span");
    if (
      (selectedGender === "Men" && span.textContent.trim() === "Men") ||
      (selectedGender === "Women" && span.textContent.trim() === "Women")
    ) {
      span.classList.add("on-page");
    }
  });
});
