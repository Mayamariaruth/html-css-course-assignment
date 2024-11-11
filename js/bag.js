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
