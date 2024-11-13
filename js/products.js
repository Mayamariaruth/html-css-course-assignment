import { fetchProducts } from "./api.js";
import { showNotification } from "./script.js";
import { addItemToBag, updateBagCount } from "./bag.js";

async function displayBestsellers() {
  const products = await fetchProducts();
  const bestsellersContainer = document.querySelector(".bestsellers");

  if (products && bestsellersContainer) {
    products.forEach((product) => {
      // Remove "Rainy Days" from the product title
      const displayTitle = product.title.replace("Rainy Days", "").trim();

      // Adds styling classes based on product title
      const productStyles = {
        "VitaForce Jacket": "all-height",
        "XX Jacket": "img-styling",
        "M83 Jacket": "img-styling",
        "Gelventure Jacket": "all-height",
        "Akra Jacket": "all-height",
        "Rock Creek Jacket": "all-height",
        "Silverbreeze Jacket": "all-height",
        "Venture Jacket": "all-size",
        "Thunderbolt Jacket": "all-size",
      };

      const imageClass = "product-img " + (productStyles[displayTitle] || "");

      // Create HTML with dynamic classes
      const productHTML = `
                <div class="column-bestsellers">
                    <img class="product-bg" src="assets/images/products/product-bg.png" alt="Grey product background" />
                    <img class="${imageClass}" src="${product.image}" alt="${displayTitle}" />
                    <a class="bestsellers-btns" href="html/products.html?id=${product.id}">${displayTitle}</a>
                </div>
            `;

      bestsellersContainer.innerHTML += productHTML;
    });
  }
}

displayBestsellers();

// Display gendered products on the products.html page based on user choice
async function displayFilteredProducts() {
  // Check if we’re on products.html before running the code
  if (!window.location.pathname.endsWith("products.html")) {
    return;
  }

  try {
    // Retrieve selected gender from localStorage or default to "Men"
    const selectedGender = localStorage.getItem("selectedGender") || "Men";

    // Update active page and heading to reflect the selected gender
    const activePageElement = document.querySelector(".active-page");
    if (activePageElement) {
      activePageElement.textContent = selectedGender;
    }

    const headingElement = document.querySelector(".gender-heading");
    if (headingElement) {
      headingElement.textContent = selectedGender;
    }

    // Register "Men"/"Women" to "Male"/"Female" for API filtering
    const apiGender = selectedGender === "Men" ? "Male" : "Female";

    const products = await fetchProducts();
    const productsContainer = document.querySelector(".products");

    // Filter products by gender
    const filteredProducts = products.filter(
      (product) => product.gender === apiGender
    );

    // Clear existing content in productsContainer
    productsContainer.innerHTML = "";

    // Display each filtered product
    filteredProducts.forEach((product) => {
      // Define styling classes based on product title
      const productClass = {
        "Rainy Days Habita Jacket": "product-styling",
        "Rainy Days Rock Creek Jacket": "product-styling product-styling2",
        "Rainy Days Silverbreeze Jacket": "product-styling product-styling3",
        "Rainy Days XX Jacket": "product-styling",
        "Rainy Days Gelventure Jacket": "product-styling product-styling4",
        "Rainy Days Akra Jacket": "product-styling product-styling2",
        "Rainy Days Thunderbolt Jacket": "product-styling product-styling2",
        "Rainy Days VitaForce Jacket": "product-styling product-styling3",
        "Rainy Days M83 Jacket": "product-styling",
        "Rainy Days Venture Jacket": "product-styling product-styling2",
        "Rainy Days Puddle Jumper Jacket": "product-styling product-styling4",
        "Rainy Days TrailBlaze Jacket": "product-styling product-styling4",
      };

      // Get the specific class based on the product title, or leave empty if not found
      const imageClass = productClass[product.title] || "";

      // Generate HTML for each product with the classes applied
      const productHTML = `
      <a href="product_detail.html?id=${product.id}" class="product">
        <div class="image-container">
          <img src="../assets/images/products/product-bg.png" alt="Grey product background" class="background">
          <img src="${product.image}" alt="Product image of the ${product.title}" class="product-image ${imageClass}">
        </div>
        <h2>${product.title}</h2>
        <p>$${product.price}</p>
      </a>
    `;

      productsContainer.innerHTML += productHTML;
    });

    // Update product count
    document.getElementById(
      "product-count"
    ).textContent = `${filteredProducts.length} products`;
  } catch (error) {
    console.error("Error displaying filtered products:", error);
  }
}

displayFilteredProducts();

document.addEventListener("DOMContentLoaded", async () => {
  // Check if we're on the product detail page by looking for "id" in the URL
  const productId = new URLSearchParams(window.location.search).get("id");
  if (!productId) return;

  try {
    // Fetch and display product details
    const product = await fetchProductById(productId);
    if (product) {
      updateProductDetails(product);
    } else {
      console.error("Product not found");
    }
  } catch (error) {
    console.error("Error fetching product details:", error);
  }
  // Update bag count on page load
  updateBagCount();
});

// Function to fetch product data by ID
async function fetchProductById(id) {
  const apiUrl = `https://api.noroff.dev/api/v1/rainy-days/${id}`;
  const response = await fetch(apiUrl);
  if (!response.ok) throw new Error("Network response was not ok");
  return await response.json();
}

// Function to update the page with product details
function updateProductDetails(product) {
  // Update breadcrumb and heading
  document.getElementById(
    "breadcrumb"
  ).innerHTML = `Home / Products / <span class="active-page">${product.title}</span>`;
  document.getElementById("details-heading").textContent = product.title;

  // Update price
  const priceElement = document.getElementById("price");
  priceElement.innerHTML = `$${product.price.toFixed(2)}`;

  // Update product image
  const productImage = document.getElementById("product-image");
  productImage.src =
    product.image || "../assets/images/products/product-bg.png";
  productImage.alt = `Product image of ${product.title}`;

  // Add styling classes to images
  const imageClassMap = {
    "Rainy Days Silverbreeze Jacket": "sm-image",
    "Rainy Days XX Jacket": "sm-image",
    "Rainy Days Gelventure Jacket": "sm-image",
    "Rainy Days VitaForce Jacket": "sm-image",
    "Rainy Days Thunderbolt Jacket": "lg-image",
    "Rainy Days M83 Jacket": "sm-image",
    "Rainy Days Venture Jacket": "lg-image",
    "Rainy Days Puddle Jumper Jacket": "lg-image",
    "Rainy Days TrailBlaze Jacket": "lg-image",
  };
  const imageClass = imageClassMap[product.title];
  if (imageClass) productImage.classList.add(imageClass);

  // Initialize selectedSize variable
  let selectedSize = null;

  // Update available sizes and create buttons for each size
  const sizeContainer = document.getElementById("size-container");
  sizeContainer.innerHTML = `<p id="size">SIZE:</p>`;
  product.sizes.forEach((size) => {
    const button = document.createElement("button");
    button.className = "size-btn";
    if (size === "S" || size === "L") button.classList.add("size-padding");
    if (size === "M") button.classList.add("m-padding");
    button.textContent = size;

    // Add event listener to select size
    button.addEventListener("click", () => {
      selectedSize = size;
      localStorage.setItem("selectedSize", selectedSize);
      document
        .querySelectorAll(".size-btn")
        .forEach((btn) => btn.classList.remove("selected"));
      button.classList.add("selected");
    });

    sizeContainer.appendChild(button);
  });

  // Update product description
  const descriptionContainer = document.getElementById("product-description");
  descriptionContainer.innerHTML = `<h2>Details</h2>`;
  product.description.split("\n").forEach((paragraph) => {
    const p = document.createElement("p");
    p.className = "details";
    p.textContent = paragraph;
    descriptionContainer.appendChild(p);
  });

  // Add to bag functionality
  document.getElementById("add-to-bag").addEventListener("click", () => {
    if (!selectedSize) {
      alert("Please select a size before adding to the bag.");
      return;
    }

    const productToAdd = {
      id: product.id,
      title: product.title,
      image: product.image,
      size: selectedSize,
      quantity: 1,
      price: product.price,
    };

    addItemToBag(productToAdd);
    updateBagCount();
    showNotification(product.title, selectedSize);

    const sizeButtons = document.querySelectorAll(".size-btn");
    sizeButtons.forEach((button) => {
      button.classList.remove("selected");
    });
  });
}
