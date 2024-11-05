// URL del API Gateway
const API_BASE_URL = "https://api-gateway.example.com";

// Obtiene productos desde el API 
async function fetchProducts() {
    try {
        const response = await fetch(`${API_BASE_URL}/products`);
        if (!response.ok) {
            throw new Error("Error al obtener productos");
        }
        const products = await response.json();
        displayProducts(products); // Muestra los productos en el catálogo
    } catch (error) {
        console.error("Error:", error);
        alert("No se pudieron cargar los productos. Intenta de nuevo más tarde."); 
    }
}

// Muestra productos en el catálogo
function displayProducts(products) {
    const productContainer = document.getElementById("product-container");
    productContainer.innerHTML = ""; 

    products.forEach(product => {
        // Crear un elemento para cada producto
        const productElement = document.createElement("div");
        productElement.classList.add("product");

        productElement.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.name}" class="product-image">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-price">$${product.price}</p>
            <p class="product-description">${product.description}</p>
            <button onclick="addToCart(${product.id})">Agregar al Carrito</button>
        `;
        productContainer.appendChild(productElement);
    });
}

// Filtrar productos
async function filterProducts(criteria) {
    try {
        const response = await fetch(`${API_BASE_URL}/products?filter=${criteria}`);
        const filteredProducts = await response.json();
        displayProducts(filteredProducts);
    } catch (error) {
        console.error("Error al filtrar productos:", error);
        alert("Error al filtrar productos. Intenta de nuevo más tarde.");
    }
}

// Ordenar productos
async function sortProducts(order) {
    try {
        const response = await fetch(`${API_BASE_URL}/products?sort=${order}`);
        const sortedProducts = await response.json();
        displayProducts(sortedProducts);
    } catch (error) {
        console.error("Error al ordenar productos:", error);
        alert("Error al ordenar productos. Intenta de nuevo más tarde.");
    }
}

// Agrega producto al carrito 
function addToCart(productId) {
    console.log("Producto agregado al carrito, ID:", productId);
    // Aquí podrías hacer otra llamada al backend para añadir el producto al carrito de compras
}

// Llamada a la función al cargar la página
document.addEventListener("DOMContentLoaded", fetchProducts);

// Manejo de eventos para búsqueda y ordenamiento
document.getElementById("search").addEventListener("input", function() {
    const searchValue = this.value;
    filterProducts(searchValue);
});

document.getElementById("sort").addEventListener("change", function() {
    const sortValue = this.value;
    sortProducts(sortValue);
});
