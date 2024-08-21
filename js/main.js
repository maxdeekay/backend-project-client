"use strict";

window.onload = async () => {
    const menu = await getMenu();
    drawMenu(menu);
}

function drawMenu(menu) {
    const container = document.getElementById("menu-container");

    // sort menu items by ascending price
    const items = menu.consumables.sort((a, b) => a.price - b.price);

    // loops through the array and creates the DOM-elements
    items.forEach((item) => {
        const div = document.createElement("div");
        const title = document.createElement("h3");
        const ingr = document.createElement("p");
        const price = document.createElement("p");

        ingr.classList.add("ingredients");
        price.classList.add("price");

        const titleText = document.createTextNode(item.title);
        const ingrText = document.createTextNode(item.ingredients.join(", ")); // takes the ingredients array and makes it into one string
        const priceText = document.createTextNode(item.price + " kr");

        title.appendChild(titleText);
        ingr.appendChild(ingrText);
        price.appendChild(priceText);
        div.appendChild(title),
        div.appendChild(ingr);
        div.appendChild(price);
        
        container.appendChild(div);
    });
}

// function that gets the complete menu from the API
async function getMenu() {
    try {
        const url = "https://backend-project-api.onrender.com/consumables";
        const response = await fetch(url);
        if (response.ok) return await response.json();
    } catch (error) {
        console.log("Error requesting menu: " + error);
    }
}