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
