let carts = document.querySelectorAll('.add-cart');

let products = [
   {
      name: 'Jollofrice',
      tag: 'jollofrice',
      price: 3600,
      inCart: 0
   },
   {

      name: 'Cowleg',
      tag: 'Cowleg',
      price: 2500,
      inCart: 0
   },
   {
      name: 'Friedplantain',
      tag: 'Friedplantain',
      price: 1800,
      inCart: 0
   },
   {
      name: 'Friedrice',
      tag: 'Friedrice',
      price: 3600,
      inCart: 0
   },
   {
      name: 'chickenpie',
      tag: 'chickenpie',
      price: 600,
      inCart: 0
   },
   
   {
      name: 'meatpie',
      tag: 'meatpie',
      price: 600,
      inCart: 0
   },
   
];

for (let i = 0; i < carts.length; i++) {

   carts[i].addEventListener('click', () => {
      cartNumbers(products[i]);
      totalCost(products[i]);
   });
};


function onLoadCartNumbers() {
   let productNumbers = localStorage.getItem('cartNumbers');
   if (productNumbers) {
      document.querySelector('.cart-number').textContent = productNumbers;
   }
}




function cartNumbers(product) {
   let productNumbers = localStorage.getItem('cartNumbers');
   productNumbers = parseInt(productNumbers);
   updateCartNumbers();
   if (productNumbers) {
      localStorage.setItem('cartNumbers', productNumbers + 1);
      document.querySelector('.cart-number').textContent = productNumbers + 1;
   } else {
      localStorage.setItem('cartNumbers', 1);
      document.querySelector('.cart-number').textContent = 1;

   }
   setItems(product);

}

// update cart numbers when items are added or removed
function updateCartNumbers() {
   let cartItems = localStorage.getItem("productsInCart");
   cartItems = JSON.parse(cartItems);
   let productNumbers = 0;

   if (cartItems) {
      Object.values(cartItems).forEach(item => {
         productNumbers += item.inCart;
      });
   }

   localStorage.setItem("cartNumbers", productNumbers);
   document.querySelector('.cart-number').textContent = productNumbers;
};


function setItems(product) {
   let cartItems = localStorage.getItem('productsInCart');
   cartItems = JSON.parse(cartItems);

   if (cartItems != null) {

      if (cartItems[product.tag] == undefined) {
         cartItems = {
            ...cartItems,
            [product.tag]: product
         }
      }
      cartItems[product.tag].inCart += 1;
   }
   else {
      product.inCart = 1;
      cartItems = {
         [product.tag]: product
      }
   }
   localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}


function totalCost(product) {
   let cartCost = localStorage.getItem('totalCost');
   if (cartCost != null) {
      cartCost = parseInt(cartCost);
      localStorage.setItem("totalCost", cartCost + product.price);
   }
   else {
      localStorage.setItem("totalCost", product.price);
   }

}


// displayCart() function 
function displayCart() {
   let cartItems = localStorage.getItem("productsInCart");
   cartItems = JSON.parse(cartItems);
   let productContainer = document.querySelector(".cart-items");
   let grandTotal = 0; // Initialize grand total to zero

   if (cartItems && productContainer) {
      productContainer.innerHTML = '';
      Object.values(cartItems).map(item => {
         const itemTotal = item.price * item.inCart;
         grandTotal += itemTotal; // Add item total to the grand total
         productContainer.innerHTML += `
               <tr>
                   <td>
                       <img src="../assest/${item.tag}.jpg" alt="item-img">
                       <br>
                       ${item.name}
                   </td>
                   <td># ${item.price}</td>
                   <td>${item.inCart}</td>
                   <td># ${itemTotal}</td>
                   <td class="remove-icon" onclick="removeItem('${item.tag}')">&#10006;</td>
               </tr>
           `;

      });

      // the grand total
      const grandTotalCell = document.querySelector(".grand-total");
      grandTotalCell.textContent = `# ${grandTotal}`;
   }
}


function removeItem(tag) {
   let cartItems = localStorage.getItem("productsInCart");
   cartItems = JSON.parse(cartItems);

   if (cartItems[tag]) {
      const removedItemTotal = cartItems[tag].price * cartItems[tag].inCart;
      cartItems[tag].inCart = 0; // Set the quantity to 0 to remove the item
      delete cartItems[tag];
      localStorage.setItem("productsInCart", JSON.stringify(cartItems));

      // Update cart numbers, total cost, and re-display the cart
      updateCartNumbers();
      updateTotalCost(-removedItemTotal);
      displayCart();
   }
}

function updateTotalCost(amount) {
   let cartCost = localStorage.getItem('totalCost');
   if (cartCost) {
      cartCost = parseInt(cartCost) + amount;
      localStorage.setItem("totalCost", cartCost);
   }
}

function redirectToPayment() {
   // Change the location to the payment portal page
   window.location.href = "payment.html";
}


onLoadCartNumbers();
displayCart();

