const bikes = [
  {
    id: 1,
    name: "Bicicleta Motorizada 50cc",
    price: 1999,
    image_url: "motorizada.png", // imagem que você enviou, tem que estar na pasta do site
    in_stock: true,
    description: "Bicicleta motorizada 50cc, perfeita para passeios urbanos.",
    specifications: {
      Modelo: "2Jj0454",
      Motor: "50cc",
      Cor: "Preto/cinza",
      Peso: "30 kg",
    },
  },
  {
    id: 2,
    name: "WorkBike Mountain X",
    price: 1899,
    image_url: "https://via.placeholder.com/400x250?text=Mountain+X",
    in_stock: true,
    description: "Bike mountain para trilhas e aventura.",
    specifications: {
      Frame: "Alumínio 6061",
      Wheels: "29\"",
      Gears: "21 velocidades",
      Brakes: "V-brake",
      Weight: "14 kg",
    },
  },
  {
    id: 3,
    name: "WorkBike Urban Flex",
    price: 1299,
    image_url: "https://via.placeholder.com/400x250?text=Urban+Flex",
    in_stock: true,
    description: "Bike urbana para deslocamentos diários.",
    specifications: {
      Frame: "Aço carbono",
      Wheels: "26\"",
      Gears: "7 velocidades",
      Brakes: "V-brake",
      Weight: "12 kg",
    },
  },
  // Adicione mais bicicletas aqui conforme quiser...
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const list = document.getElementById("bike-list");
const cartModal = document.getElementById("cart-modal");
const cartItemsDiv = document.getElementById("cart-items");
const cartTotalSpan = document.getElementById("cart-total");
const cartCountSpan = document.getElementById("cart-count");

function renderBikes() {
  list.innerHTML = ""; // limpa antes de renderizar
  bikes.forEach(bike => {
    const card = document.createElement("div");
    card.className = "card";

    // Montar especificações em texto
    let specsHTML = "<ul>";
    for (const [key, value] of Object.entries(bike.specifications)) {
      specsHTML += `<li><strong>${key}:</strong> ${value}</li>`;
    }
    specsHTML += "</ul>";

    card.innerHTML = `
      <img src="${bike.image_url}" alt="${bike.name}" />
      <h2>${bike.name}</h2>
      <p>${bike.description || ""}</p>
      ${specsHTML}
      <div class="price">R$ ${bike.price}</div>
      <button onclick="addToCart(${bike.id})" ${!bike.in_stock ? "disabled" : ""}>
        ${bike.in_stock ? "Adicionar ao carrinho" : "Indisponível"}
      </button>
    `;

    list.appendChild(card);
  });
}

function addToCart(id) {
  const item = cart.find(p => p.id === id);
  if (item) {
    item.qty++;
  } else {
    const bike = bikes.find(b => b.id === id);
    cart.push({ ...bike, qty: 1 });
  }
  saveCart();
  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  renderCart();
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  cartCountSpan.textContent = count;
}

function renderCart() {
  cartItemsDiv.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;
    cartItemsDiv.innerHTML += `
      <div class="cart-item">
        <span>${item.name} (x${item.qty})</span>
        <span>
          R$ ${item.price * item.qty}
          <button onclick="removeFromCart(${item.id})">❌</button>
        </span>
      </div>
    `;
  });

  cartTotalSpan.textContent = total;
}

function openCart() {
  renderCart();
  cartModal.style.display = "block";
}

function closeCart() {
  cartModal.style.display = "none";
}

document.getElementById("cart-btn").addEventListener("click", openCart);

renderBikes();
updateCartCount();
