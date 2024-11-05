document.addEventListener("DOMContentLoaded", function() {
    // Simular productos en el carrito (esto debería venir de la API)
    const productsInCart = [
        { name: "Producto 1", price: 20 },
        { name: "Producto 2", price: 35 },
        { name: "Producto 3", price: 15 }
    ];

    const productList = document.getElementById('productList');
    const totalPriceElement = document.getElementById('totalPrice');
    const discountPriceElement = document.getElementById('discountPrice');
    const couponAppliedElement = document.getElementById('couponApplied');

    let totalPrice = 0;

    productsInCart.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');
        productItem.innerHTML = `<p>${product.name}</p><p>$${product.price.toFixed(2)}</p>`;
        productList.appendChild(productItem);
        totalPrice += product.price; // Sumar el precio del producto al total
    });

    // Mostrar el precio total inicial
    totalPriceElement.innerHTML = `Precio Total: $${totalPrice.toFixed(2)}`;
    discountPriceElement.innerHTML = `Precio con Descuento: $${totalPrice.toFixed(2)}`; // Inicialmente igual al total
    couponAppliedElement.innerHTML = 'Cupón Aplicado: Ninguno'; // Sin cupones aplicados al inicio

    // Aplicar cupón
    document.getElementById('applyCoupon').addEventListener('click', function() {
        const couponCode = document.getElementById('couponCode').value.trim();
        let discount = 0;

        // Validar el cupón
        if (couponCode === '20OFF') {
            discount = 20; // Aplicar descuento de 20
            alert(`Cupón ${couponCode} aplicado! Descuento de $${discount}.`);
        } else {
            alert(`El cupón ${couponCode} no es válido.`);
        }

        // Calcular el precio total después del descuento
        const discountedPrice = totalPrice - discount;
        totalPriceElement.innerHTML = `Precio Total: $${totalPrice.toFixed(2)}`;
        discountPriceElement.innerHTML = `Precio con Descuento: $${discountedPrice.toFixed(2)}`;
        couponAppliedElement.innerHTML = `Cupón Aplicado: ${discount > 0 ? couponCode : 'Ninguno'}`;
    });

    // Completar compra
    document.getElementById('completePurchase').addEventListener('click', function() {
        const address = document.getElementById('address').value.trim();
        const cardNumber = document.getElementById('cardNumber').value.trim();
        const expiryDate = document.getElementById('expiryDate').value.trim();
        const cvc = document.getElementById('cvc').value.trim();
        const dni = document.getElementById('dni').value.trim();

        // Verificar que todos los campos estén completos
        if (!address || !cardNumber || !expiryDate || !cvc || !dni) {
            alert('Por favor, complete todos los campos antes de proceder con el pago.');
            return; // No permitir avanzar si faltan datos
        }

        // Aquí puedes agregar lógica para procesar el pago usando tu API
        alert(`Compra completada para la dirección: ${address}`);
    });
});

function formatExpiry(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2);
    }
    input.value = value;
}
