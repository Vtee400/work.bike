// Produtos
const bikes = [
  {
    id:1,name:"WorkBike Mountain X",category:"mountain",price:1899,
    image_url:"https://via.placeholder.com/400x250",
    description:"Mountain bike robusta e ágil para trilhas.",
    specifications:{frame:"Alumínio",wheels:"29''",gears:"21",brakes:"V-Brake",weight:"14kg"},
    colors:["Preta","Azul"]
  },
  {
    id:2,name:"WorkBike Urban Flex",category:"urban",price:1299,
    image_url:"https://via.placeholder.com/400x250",
    description:"Bicicleta urbana confortável para o dia a dia.",
    specifications:{frame:"Aço",wheels:"26''",gears:"7",brakes:"V-Brake",weight:"12kg"},
    colors:["Vermelha","Preta"]
  },
  {
    id:3,name:"WorkBike Road Speed",category:"road",price:1599,
    image_url:"https://via.placeholder.com/400x250",
    description:"Bicicleta de estrada leve e rápida.",
    specifications:{frame:"Carbono",wheels:"28''",gears:"18",brakes:"Disco",weight:"9kg"},
    colors:["Branca","Preta"]
  },
  {
    id:4,name:"WorkBike Kids Fun",category:"kids",price:899,
    image_url:"https://via.placeholder.com/400x250",
    description:"Bicicleta infantil segura e divertida.",
    specifications:{frame:"Aço",wheels:"20''",gears:"1",brakes:"V-Brake",weight:"8kg"},
    colors:["Rosa","Azul"]
  }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// DOM
const list = document.getElementById("bike-list");
const cartModal = document.getElementById("cart-modal");
const cartItemsDiv = document.getElementById("cart-items");
const cartTotalSpan = document.getElementById("cart-total");
const cartCountSpan = document.getElementById("cart-count");

// Modal detalhes
const detailModal = document.getElementById("detail-modal");
const detailName = document.getElementById("detail-name");
const detailImg = document.getElementById("detail-img");
const detailDesc = document.getElementById("detail-desc");
const detailSpecs = document.getElementById("detail-specs");
const detailPrice = document.getElementById("detail-price");
const detailAdd = document.getElementById("detail-add");
const closeDetail = document.getElementById("close-detail");

let selectedBikeId = null;

// Renderização
function renderBikes(filter='all'){
  list.innerHTML = "";
  bikes.filter(b=>filter==='all'||b.category===filter).forEach(bike=>{
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${bike.image_url}">
      <h3>${bike.name}</h3>
      <div class="price">R$ ${bike.price}</div>
      <button onclick="addToCart(${bike.id})">Adicionar ao carrinho</button>
      <button onclick="showDetails(${bike.id})">Ver detalhes</button>
    `;
    list.appendChild(card);
  });
}

// Filtro
function filterCategory(cat){ renderBikes(cat); }

// Carrinho
function addToCart(id){
  const item = cart.find(p=>p.id===id);
  if(item) item.qty++;
  else cart.push({...bikes.find(b=>b.id===id), qty:1});
  saveCart();
}
function saveCart(){ localStorage.setItem("cart",JSON.stringify(cart)); updateCartCount(); }
function updateCartCount(){ cartCountSpan.textContent = cart.reduce((s,i)=>s+i.qty,0); }
function renderCart(){
  cartItemsDiv.innerHTML="";
  let total=0;
  cart.forEach(item=>{
    total+=item.price*item.qty;
    cartItemsDiv.innerHTML+=`<div class="cart-item">${item.name} (x${item.qty}) - R$ ${item.price*item.qty} <button onclick="removeFromCart(${item.id})">❌</button></div>`;
  });
  cartTotalSpan.textContent = total;
}
function openCart(){ renderCart(); cartModal.style.display="block"; }
function closeCart(){ cartModal.style.display="none"; }
function removeFromCart(id){ cart=cart.filter(i=>i.id!==id); saveCart(); renderCart(); }

document.getElementById("cart-btn").addEventListener("click",openCart);

// Modal detalhes
function showDetails(id){
  const bike = bikes.find(b=>b.id===id);
  selectedBikeId = id;
  detailName.textContent = bike.name;
  detailImg.src = bike.image_url;
  detailDesc.textContent = bike.description;
  detailSpecs.innerHTML = Object.entries(bike.specifications).map(([k,v])=>`<li><strong>${k}:</strong> ${v}</li>`).join('');
  detailPrice.textContent = "R$ "+bike.price;
  detailModal.style.display = "block";
}

closeDetail.onclick = ()=>{ detailModal.style.display="none"; }
detailAdd.onclick = ()=>{
  addToCart(selectedBikeId);
  detailModal.style.display="none";
}

// Inicial
renderBikes();
updateCartCount();
