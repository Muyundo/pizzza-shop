// Global cart array
let cart1 = JSON.parse(localStorage.getItem('cart')) || []

// Function to update the cart display
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items')
    const totalPriceElement = document.getElementById('total-price')

    if (!cartItemsContainer || !totalPriceElement) {
        return
    }

    // Clear the existing cart items
    cartItemsContainer.innerHTML = ''

    // Iterate through the cart and add each item to the container
    cart1.forEach((item, i) => {
        const itemElement = document.createElement('div')
        itemElement.classList.add('cart-item')

        itemElement.innerHTML = `
            <div class="cart-item-details">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">Price: Ksh. ${(item.price * item.quantity).toFixed(2)}</div>
                    <input type="number" value="${item.quantity}" min="1" class="quantity-input" onchange="updateQuantity(${i}, this.value)">
                    <button onclick="removeItemFromCart(event, ${i})" class="remove-btn">Remove</button>
                </div>
            </div>
        `

        cartItemsContainer.appendChild(itemElement)
    })

    // Update the total price calculation to include quantity
    const totalPrice = cart1.reduce((acc, item) => acc + item.price * item.quantity, 0)
    totalPriceElement.textContent = `Total: Ksh. ${totalPrice.toFixed(2)}`
}

// Function to update the quantity of an item
function updateQuantity(index, newQuantity) {
    const item = cart1[index]
    item.quantity = parseInt(newQuantity, 10) || 1 // Ensure the quantity is at least 1

    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart1))

    // Update the cart display
    updateCart()
}

// Function to remove an item from the cart
function removeItemFromCart(event, index) {
    event.preventDefault() // Stay on the same page
    if(cart1[index].quantity > 1){ //remove items quanity by 1 if more than 1
        cart1[index].quantity -=1 
        showNotification('Cart Item Quanity Updated')
        } else {
            cart1.splice(index, 1) //remove entire item if only 1
            showNotification('Cart Item cleared')
    }
    localStorage.setItem('cart', JSON.stringify(cart1))
    updateCart() // Update the cart display
   }

// Function to show notifications
function showNotification(message, duration = 3000) {
    const notification = document.getElementById('notification')
    notification.textContent = message
    notification.classList.add('show')

    setTimeout(() => {
        notification.classList.remove('show')
    }, duration)
}

// DOMContentLoaded event to ensure the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart')

    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart)
    })

    function addToCart(event) {
        event.preventDefault() // Stay on the same page
        const button = event.target

        // Add error handling: Check if the button and attributes exist
        if (button && button.hasAttribute('data-pizza') && 
            button.hasAttribute('data-price') &&
            button.hasAttribute('data-pizza-image')
        ) {
            const pizzaName = button.getAttribute('data-pizza')
            const pizzaPrice = parseFloat(button.getAttribute('data-price'))
            const pizzaImage = button.getAttribute('data-pizza-image')

            // Check if the item already exists in the cart
            const existingItem = cart1.find(item => item.name === pizzaName)
            if (existingItem) {
                existingItem.quantity += 1
            } else {
                // Add pizza to the cart array with a default quantity of 1
                cart1.push({ name: pizzaName, price: pizzaPrice, image: pizzaImage, quantity: 1 })
            }

            // Save items to local storage
            localStorage.setItem('cart', JSON.stringify(cart1))

            updateCart() // Call the updateCart function

            // Show notification
            showNotification(`${pizzaName} added to the cart`)
        } else {
            console.error("Error: Button or required attributes not found.")
        }
    }

    // Initialize the cart display on page load
    updateCart()
})

// Toggle hamburger menu
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle')
    const navMenu = document.querySelector('nav ul')

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active')
    })
})
