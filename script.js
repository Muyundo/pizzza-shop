//empty cart
let cart = []

//add pizzasto the cart
function addToCart(pizzaName, price){
    //pizza object
    const pizza = {
        name: pizzaName,
        price: price
    }

    //add to cart
    cart.push(pizza)

    //log updated cart to console
    console.log(cart)

     //update cart display

       // updateCartDisplay()

}

//event listenerto all addd to cart button
const addToCartButton = document.querySelectorAll('.Add-to-Cart')
addToCartButton.forEach(button =>{
    button.addEventListener('click', (event) =>{
        const pizzaName = event.target.getAttribute('data-pizza')
        const pizzaPrice = event.target.getAttribute('data-price')
        addToCart(pizzaName, pizzaPrice)

    })
})
