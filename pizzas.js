async function fetchPizzas(params) {
    try{
        //get req to fetch
        const response = await fetch('http://localhost:3000/api/pizzas')
        if (!response.ok){
            throw new Error('Network response was not ok')
    }
    const pizzas = await response.json()
    displayPizzas(pizzas)
    
} catch (error) {
    console.error('Error fetching pizzas', error)
}
}

function displayPizzas(pizzas){
    const menuSection = document.querySelector('.Menu')
    menuSection.innerHTML = ''

    pizzas.forEach(pizza => {
        //create a new div for each pizza
        const pizzaDiv = document.createElement('div')
        pizzaDiv.classList.add('pizza-item')

        pizzaDiv.innerHTML = `<h3>${pizza.name}</h3>
        <img src = "${pizza.image}" alt = ${pizza.name}>
        <p class = "description">${pizza.description}</p>
        <p class = "price">Ksh. ${pizza.price}</p>

        <button class = "add-to-cart"
        data-pizza = "${pizza.name}"
        data.price = "${pizza.price}"
        data-pizza-image = "${pizza.image}">
        Add to Cart
        </button>`

        menuSection.appendChild(pizzaDiv)

        
    });
}
document.addEventListener('DOMContentLoaded', fetchPizzas)