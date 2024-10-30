// Datos de ejemplo para el menú
const menuItems = [
  { id: 1, name: "Hamburguesa Clásica", description: "Carne de res, lechuga, tomate, queso", price: 10.99, category: "Platos Principales" },
  { id: 2, name: "Ensalada César", description: "Lechuga romana, crutones, parmesano, aderezo césar", price: 8.99, category: "Ensaladas" },
  { id: 3, name: "Pizza Margherita", description: "Salsa de tomate, mozzarella, albahaca", price: 12.99, category: "Platos Principales" },
  { id: 4, name: "Sopa de Tomate", description: "Tomates frescos, albahaca, crema", price: 6.99, category: "Sopas" },
  { id: 5, name: "Tiramisú", description: "Bizcocho de café, mascarpone, cacao", price: 7.99, category: "Postres" },
];

let cart = [];

document.addEventListener('DOMContentLoaded', () => {
  const categories = [...new Set(menuItems.map(item => item.category))];
  const menuTabs = document.getElementById('menuTabs');
  const menuTabContent = document.getElementById('menuTabContent');

  // Crear pestañas y contenido
  categories.forEach((category, index) => {
      const tabId = `tab-${category.toLowerCase().replace(' ', '-')}`;
      
      // Crear pestaña
      const tabLi = document.createElement('li');
      tabLi.className = 'nav-item';
      tabLi.innerHTML = `
          <a class="nav-link ${index === 0 ? 'active' : ''}" id="${tabId}-tab" data-bs-toggle="tab" href="#${tabId}" role="tab" aria-controls="${tabId}" aria-selected="${index === 0}">
              ${category}
          </a>
      `;
      menuTabs.appendChild(tabLi);

      // Crear contenido de la pestaña
      const tabContent = document.createElement('div');
      tabContent.className = `tab-pane fade ${index === 0 ? 'show active' : ''}`;
      tabContent.id = tabId;
      tabContent.setAttribute('role', 'tabpanel');
      tabContent.setAttribute('aria-labelledby', `${tabId}-tab`);

      const itemsInCategory = menuItems.filter(item => item.category === category);
      const row = document.createElement('div');
      row.className = 'row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4';

      itemsInCategory.forEach(item => {
          const col = document.createElement('div');
          col.className = 'col';
          col.innerHTML = `
              <div class="card h-100">
                  <div class="card-body">
                      <h5 class="card-title">${item.name}</h5>
                      <p class="card-text">${item.description}</p>
                  </div>
                  <div class="card-footer d-flex justify-content-between align-items-center">
                      <span class="h5 mb-0">$${item.price.toFixed(2)}</span>
                      <button class="btn btn-primary add-to-cart" data-id="${item.id}">
                          <i class="bi bi-plus"></i> Añadir
                      </button>
                  </div>
              </div>
          `;
          row.appendChild(col);
      });

      tabContent.appendChild(row);
      menuTabContent.appendChild(tabContent);
  });

  // Event listener para botones "Añadir al carrito"
  document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', (e) => {
          const itemId = parseInt(e.currentTarget.dataset.id);
          addToCart(itemId);
      });
  });

  // Event listener para el botón del carrito
  document.getElementById('cartBtn').addEventListener('click', () => {
      updateCartOffcanvas();
      new bootstrap.Offcanvas(document.getElementById('cartOffcanvas')).show();
  });

  // Event listener para confirmar pedido
  document.getElementById('confirmOrder').addEventListener('click', () => {
      alert('¡Pedido confirmado! Gracias por tu compra.');
      cart = [];
      updateCartBadge();
      updateCartOffcanvas();
      bootstrap.Offcanvas.getInstance(document.getElementById('cartOffcanvas')).hide();
  });
});

function addToCart(itemId) {
  const item = menuItems.find(item => item.id === itemId);
  const existingItem = cart.find(cartItem => cartItem.id === itemId);

  if (existingItem) {
      existingItem.quantity++;
  } else {
      cart.push({ ...item, quantity: 1 });
  }

  updateCartBadge();
}

function updateCartBadge() {
  const cartBadge = document.getElementById('cartBadge');
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartBadge.textContent = totalItems;
  cartBadge.style.display = totalItems > 0 ? 'inline-block' : 'none';
}

function updateCartOffcanvas() {
  const cartItems = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');
  
  cartItems.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
      cartItems.innerHTML = '<p class="text-center">Tu carrito está vacío</p>';
  } else {
      cart.forEach(item => {
          const itemElement = document.createElement('div');
          itemElement.className = 'mb-3';
          itemElement.innerHTML = `
              <div class="d-flex justify-content-between align-items-center">
                  <span>${item.name}</span>
                  <div class="quantity-control">
                      <button class="btn btn-sm btn-outline-secondary decrease-quantity" data-id="${item.id}">
                          <i class="bi bi-dash"></i>
                      </button>
                      <span class="mx-2">${item.quantity}</span>
                      <button class="btn btn-sm btn-outline-secondary increase-quantity" data-id="${item.id}">
                          <i class="bi bi-plus"></i>
                      </button>
                  </div>
              </div>
          `;
          cartItems.appendChild(itemElement);

          total += item.price * item.quantity;
      });
  }

  cartTotal.textContent = total.toFixed(2);

  // Event listeners para los botones de cantidad
  document.querySelectorAll('.decrease-quantity').forEach(button => {
      button.addEventListener('click', (e) => {
          const itemId = parseInt(e.currentTarget.dataset.id);
          removeFromCart(itemId);
      });
  });

  document.querySelectorAll('.increase-quantity').forEach(button => {
      button.addEventListener('click', (e) => {
          const itemId = parseInt(e.currentTarget.dataset.id);
          addToCart(itemId);
      });
  });
}

function removeFromCart(itemId) {
  const itemIndex = cart.findIndex(item => item.id === itemId);
  if (itemIndex !== -1) {
      if (cart[itemIndex].quantity > 1) {
          cart[itemIndex].quantity--;
      } else {
          cart.splice(itemIndex, 1);
      }
      updateCartBadge();
      updateCartOffcanvas();
  }
}