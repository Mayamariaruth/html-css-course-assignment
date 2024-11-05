// Fetch products from API
const apiUrl = "https://api.noroff.dev/api/v1/rainy-days";

export async function fetchProducts() {
  try {
    const response = await fetch(apiUrl);
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }
}
