// Add items to the shopping bag in localStorage
export function addItemToBag(product) {
  const bag = JSON.parse(localStorage.getItem("shoppingBag")) || [];
  const existingItemIndex = bag.findIndex(
    (item) => item.id === product.id && item.size === product.size
  );

  if (existingItemIndex > -1) {
    // Update quantity if the product and size already exist in the bag
    bag[existingItemIndex].quantity += product.quantity;
  } else {
    // Add all product details to the shopping bag
    bag.push({
      id: product.id,
      title: product.title,
      image: product.image,
      size: product.size,
      quantity: product.quantity,
      price: product.price,
    });
  }

  localStorage.setItem("shoppingBag", JSON.stringify(bag));
}

// Update the shopping bag count in the navbar
export function updateBagCount() {
  const bag = JSON.parse(localStorage.getItem("shoppingBag")) || [];
  const totalCount = bag.reduce((acc, item) => acc + item.quantity, 0);

  // Select the mobile and desktop bag count elements
  const mobileBagCount = document.querySelector("#bag-count");
  const desktopBagCount = document.querySelector("#desktop-bag-count");

  // Update text content
  if (totalCount > 0) {
    if (mobileBagCount) mobileBagCount.textContent = totalCount;
    if (desktopBagCount) desktopBagCount.textContent = totalCount;
  } else {
    if (mobileBagCount) mobileBagCount.textContent = "";
    if (desktopBagCount) desktopBagCount.textContent = "";
  }
}

updateBagCount();
