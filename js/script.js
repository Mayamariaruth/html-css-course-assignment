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
