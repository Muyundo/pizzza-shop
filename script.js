// Empty cart
/*let cart = [];

// Add pizzas to the cart
function addToCart(pizzaName, price) {
    // Create a pizza object
    const pizza = {
        name: pizzaName,
        price: price
    };

    // Add pizza to cart
    cart.push(pizza);

    // Log updated cart to console
    console.log(cart);

    // Update cart display
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartContainer = document.getElementById('cart');
    cartContainer.innerHTML = '';  // Clear previous cart content

    // If cart is empty, display a message
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        // Display each item in the cart
        cart.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item');
            itemDiv.innerHTML = `${item.name} - Ksh. ${item.price}`;
            cartContainer.appendChild(itemDiv);
        });
    }
}

// Event listener for all "Add to Cart" buttons
/*const addToCartButton = document.querySelectorAll('.add-to-cart');
addToCartButton.forEach(button => {
    button.addEventListener('click', (event) => {
        const pizzaName = event.target.getAttribute('data-pizza');
        const pizzaPrice = event.target.getAttribute('data-price');
        addToCart(pizzaName, pizzaPrice);
    });
});*/
