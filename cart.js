// Global cart array
let cart1 = JSON.parse (localStorage.getItem('cart')) || []

// update the cart display (global)
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items')
    const totalPriceElement = document.getElementById('total-price')

    if (!cartItemsContainer ||  !totalPriceElement) {
        return
    }
    // Clear the existing cart items
    cartItemsContainer.innerHTML = '';

    // Iterate through the cart and add each item to the container
    for (let i = 0; i < cart1.length; i++) {
        const item = cart1[i];
        const itemElement = document.createElement('div')
        itemElement.classList.add('cart-items');
        itemElement.innerHTML = `
        <div class="cart-item-details">
        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">Price: $${item.price}</div>
        <button onclick="removeItemFromCart(${i})" class="remove-btn">Remove</button>
        `
        cartItemsContainer.appendChild(itemElement)
    }

    // Update the total price
    const totalPrice = cart1.reduce((acc, item) => acc + item.price, 0)
    totalPriceElement.textContent = `Total: Ksh. ${totalPrice.toFixed(2)}`
}

// Function to remove an item from the cart (global)
function removeItemFromCart(index) {
    event.preventDefault()//stay on the same page
    cart1.splice(index, 1); // Remove the item at the given index
    localStorage.setItem('cart', JSON.stringify(cart1))
    updateCart(); // Update the cart display
    showNotification('Item removed from cart') // Notify the user
}

// Function to show notifications (global)
function showNotification(message, duration = 3000) {
    const notification = document.getElementById('notification')
    notification.textContent = message
    notification.classList.add('show')

    setTimeout(() => {
        notification.classList.remove('show')
    }, duration)
    updateCart()
}

// DOMContentLoaded event to ensure the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart')

    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart)
    });

    function addToCart(event) {
        event.preventDefault()//stay on the same page
        const button = event.target

        // Add error handling: Check if the button and attributes exist
        if (button && button.hasAttribute('data-pizza') && 
            button.hasAttribute('data-price') &&
            button.hasAttribute('data-pizza-image')
        ) {
            const pizzaName = button.getAttribute('data-pizza');
            const pizzaPrice = parseFloat(button.getAttribute('data-price'))
            const pizzaImage = button.getAttribute('data-pizza-image')

            // Add pizza to the cart array
            cart1.push({ name: pizzaName, price: pizzaPrice, image: pizzaImage })

           //save items to local Storage
            localStorage.setItem('cart', JSON.stringify(cart1))

            updateCart(); // Call the updateCart function

            // Show notification
            showNotification(`${pizzaName} added to the cart`)
        } else {
            console.error("Error: Button or required attributes not found.")
        }
    }
    updateCart()
}); 

//toggle humberger
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle')
    const navMenu = document.querySelector('nav ul')
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active')
    })
})
