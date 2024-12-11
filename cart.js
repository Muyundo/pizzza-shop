document.addEventListener('DOMContentLoaded', () => { // Ensure DOM is fully loaded
    const cartItemsContainer = document.getElementById('cart-items') 
    const totalPriceElement = document.getElementById('total-price') 
    let cart1 = []

    const addToCartButtons = document.querySelectorAll('.add-to-cart') 

    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart)
    });


    function addToCart(event) {
        const button = event.target

        // Add error handling:  Check if the button and attributes exist.
        if (button && button.hasAttribute('data-pizza') && button.hasAttribute('data-price')) {
            const pizzaName = button.getAttribute('data-pizza');
            const pizzaPrice = parseFloat(button.getAttribute('data-price'))

            //add pizza to the cart array
            cart1.push({name: pizzaName, price: pizzaPrice})
            //Call updateCart function.  Make sure this function exists.
            updateCart(); // Call the function
        } else {
            console.error("Error: Button or required attributes not found.")
        }
    }


    function updateCart() {
        // Clear the cart display
        cartItemsContainer.innerHTML = '';
    
        // Add each item from the cart to the display
        cart1.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item');
            itemDiv.innerHTML = `${item.name} - Ksh. ${item.price.toFixed(2)}`;
            cartItemsContainer.appendChild(itemDiv);
        });
    
        // Update the total price
        const totalPrice = cart1.reduce((acc, item) => acc + item.price, 0);
        totalPriceElement.textContent = `Total: Ksh. ${totalPrice.toFixed(2)}`;
    }
})