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

  // Update both mobile and desktop bag count elements
  const mobileBagCount = document.querySelector("#bag-count");
  const desktopBagCount = document.querySelector("#desktop-bag-count");

  if (mobileBagCount) mobileBagCount.textContent = totalCount;
  if (desktopBagCount) desktopBagCount.textContent = totalCount;
}
