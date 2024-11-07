import { fetchProducts } from "./api.js";

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
  try {
    // Retrieve the selected gender from localStorage or default to "Men"
    const selectedGender = localStorage.getItem("selectedGender") || "Men";

    // Register "Men"/"Women" to "male"/"female" for API filtering
    const apiGender = selectedGender === "Men" ? "Male" : "Female";

    const products = await fetchProducts();
    const productsContainer = document.querySelector(".products");

    if (!productsContainer) {
      console.error("Products container not found in the HTML.");
      return;
    }

    // Filter products by gender
    const filteredProducts = products.filter(
      (product) => product.gender === apiGender
    );
    console.log("Filtered Products:", filteredProducts);

    // Clear existing content
    productsContainer.innerHTML = "";

    // Display message if no products match
    if (filteredProducts.length === 0) {
      productsContainer.innerHTML =
        "<p>No products available for the selected category.</p>";
      return;
    }

    // Display each filtered product
    filteredProducts.forEach((product) => {
      // Adds styling IDs based on product title (FIX THIS CODE)
      const productId = {
        "Rainy Days VitaForce Jacket": "all-height",
        "Rainy Days XX Jacket": "img-styling",
        "Rainy Days M83 Jacket": "img-styling",
        "Rainy Days Gelventure Jacket": "all-height",
        "Rainy Days Akra Jacket": "all-height",
        "Rainy Days Rock Creek Jacket": "all-height",
        "Rainy Days Silverbreeze Jacket": "all-height",
        "Rainy Days Venture Jacket": "all-size",
        "Rainy Days Thunderbolt Jacket": "all-size",
      };

      const imageId = "product-image " + (productId || "");

      const productHTML = `
          <a href="product_detail.html?id=${product.id}" class="product">
            <div class="image-container">
              <img src="../assets/images/products/product-bg.png" alt="Grey product background" class="background">
              <img src="${product.image}" alt="Product image of the ${product.title}" class="product-image" id="${imageId}">
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
