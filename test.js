const cartContainer = document.getElementById("cart-container");
const productsContainer = document.getElementById("products-container");
const dessertCards = document.getElementById("dessert-card-container");
const cartBtn = document.getElementById("cart-btn");
const clearCartBtn = document.getElementById("clear-cart-btn");
const totalNumberOfItems = document.getElementById("total-items");
const cartSubTotal = document.getElementById("subtotal");
const cartTaxes = document.getElementById("taxes");
const cartTotal = document.getElementById("total");
const showHideCartSpan = document.getElementById("show-hide-cart");
let isCartShowing = false;

const products = [
  {
    id: 1,
    name: "Pizza",
    price: 5,
    category: "Main Dish",
    image: "food/pizza.webp"
  },
  {
    id: 2,
    name: "Pasta",
    price: 5,
    category: "Main Dish",
    image: "food/pasta-img3.png"
  },
  {
    id: 3,
    name: "Biryani",
    price: 5,
    category: "Main Dish",
    image: "food/biryani.png"
  },
  {
    id: 4,
    name: "Sushi",
    price: 6,
    category: "Main Dish",
    image: "food/sushi.png"
  },
  {
    id: 5,
    name: "Noodle",
    price: 6,
    category: "Main Dish",
    image: "food/noodle.png"
  },
  {
    id: 6,
    name: "Nacho",
    price: 2.99,
    category: "Dessert",
    image: "food/nachoOne.png"
  },
  {
    id: 7,
    name: "Burger",
    price: 4.99,
    category: "Snack",
    image: "food/burger.png" 
  },
  {
    id: 8,
    name: "Fries",
    price: 2.99,
    category: "Snack",
    image: "food/fries.webp" },
  {
    id: 9,
    name: "Pepsi",
    price: 2,
    category: "Drink",
    image: "food/pepsi.png"
  },
  {
    id: 10,
    name: "Fanta",
    price: 2,
    category: "Drink",
    image: "food/fanta.png"
  },
  {
    id: 11,
    name: "Red Bull",
    price: 2.50,
    category: "Drink",
    image: "food/red-bull.png"
  },
  {
    id: 12,
    name: "Cappuccino",
    price: 3,
    category: "Drink",
    image: "food/coffee-photo.webp"
  },
];

products.forEach(
  ({ name, id, price, category, image }) => {
    dessertCards.innerHTML += `
      <div class="dessert-card">
        <img src="${image}" />
        <h2>${name}</h2>
        <p class="dessert-price">$${price}</p>
        <p class="product-category">Category: ${category}</p>
        <button 
          id="${id}" 
          class="btn add-to-cart-btn">Add to cart
        </button>
      </div>
    `;
  }
);

class ShoppingCart {
  constructor() {
    this.items = [];
    this.total = 0;
    this.taxRate = 8.25;
  }

  addItem(id, products) {
    const product = products.find((item) => item.id === id);
    const { name, price } = product;
    this.items.push(product);

    const totalCountPerProduct = {};
    this.items.forEach((dessert) => {
      totalCountPerProduct[dessert.id] = (totalCountPerProduct[dessert.id] || 0) + 1;
    })

    const currentProductCount = totalCountPerProduct[product.id];
    const currentProductCountSpan = document.getElementById(`product-count-for-id${id}`);

    currentProductCount > 1 
      ? currentProductCountSpan.textContent = `${currentProductCount}x`
      : productsContainer.innerHTML += `
      <div id="dessert${id}" class="product">
        <p>
          <span class="product-count" id="product-count-for-id${id}"></span>${name}
        </p>
        <p>${price}</p>
      </div>
      `;
  }

  getCounts() {
    return this.items.length;
  }

  clearCart() {
    if (!this.items.length) {
      alert("Your shopping cart is already empty");
      return;
    }

    const isCartCleared = confirm(
      "Are you sure you want to clear all items from your shopping cart?"
    );

    if (isCartCleared) {
      this.items = [];
      this.total = 0;
      productsContainer.innerHTML = "";
      totalNumberOfItems.textContent = 0;
      cartSubTotal.textContent = 0;
      cartTaxes.textContent = 0;
      cartTotal.textContent = 0;
    }
  }

  calculateTaxes(amount) {
    return parseFloat(((this.taxRate / 100) * amount).toFixed(2));
  }

  calculateTotal() {
    const subTotal = this.items.reduce((total, item) => total + item.price, 0);
    const tax = this.calculateTaxes(subTotal);
    this.total = subTotal + tax;
    cartSubTotal.textContent = `$${subTotal.toFixed(2)}`;
    cartTaxes.textContent = `$${tax.toFixed(2)}`;
    cartTotal.textContent = `$${this.total.toFixed(2)}`;
    return this.total;
  }
};

const cart = new ShoppingCart();
const addToCartBtns = document.getElementsByClassName("add-to-cart-btn");

[...addToCartBtns].forEach(
  (btn) => {
    btn.addEventListener("click", (event) => {
      cart.addItem(Number(event.target.id), products);
      totalNumberOfItems.textContent = cart.getCounts();
      cart.calculateTotal();
    })
  }
);

cartBtn.addEventListener("click", () => {
  isCartShowing = !isCartShowing;
  showHideCartSpan.textContent = isCartShowing ? "Hide" : "Show";
  cartContainer.style.display = isCartShowing ? "block" : "none";
});

