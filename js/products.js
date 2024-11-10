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

    // Register "Men"/"Women" as "male"/"female" for API filtering
    const apiGender = selectedGender === "Men" ? "Male" : "Female";

    const products = await fetchProducts();
    const productsContainer = document.querySelector(".products");

    // Filter products by gender
    const filteredProducts = products.filter(
      (product) => product.gender === apiGender
    );
    console.log("Filtered Products:", filteredProducts);

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

      // Generate HTML for each product with the mapped class applied to the image
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
