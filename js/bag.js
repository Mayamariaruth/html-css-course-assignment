// Add item to the shopping bag in localStorage
export function addItemToBag(productId, size) {
  const bag = JSON.parse(localStorage.getItem("shoppingBag")) || [];
  const existingItemIndex = bag.findIndex(
    (item) => item.id === productId && item.size === size
  );

  if (existingItemIndex > -1) {
    bag[existingItemIndex].quantity += 1;
  } else {
    bag.push({ id: productId, size: size, quantity: 1 });
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
    if (mobileBagCount) mobileBagCount.textContent = ""; // Clear content if 0
    if (desktopBagCount) desktopBagCount.textContent = ""; // Clear content if 0
  }
}
