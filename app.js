// ======= WhatsApp flotante: mostrar tras scroll + mensaje por horario =======
document.addEventListener('DOMContentLoaded', () => {
  const waBtn = document.querySelector('.whatsapp-float');
  if (waBtn) {
    // 1) Mensaje dinámico según hora local (9 a 18 h "en línea")
    const h = new Date().getHours();
    const enHorario = h >= 9 && h < 18;
    const msg = enHorario ? '¡Respondo ahora!' : 'Fuera de horario, te contesto pronto';

    waBtn.title = `WhatsApp — ${msg}`;
    waBtn.setAttribute('aria-label', `Chatea por WhatsApp — ${msg}`);

    // (Opcional) Prefill del texto en el chat
    const telefono = '521234567890'; // ✅ Número ficticio (52 + 10 dígitos)
    const texto = encodeURIComponent('Hola, vengo del sitio Pedri Store. Me interesa una playera.');
    waBtn.href = `https://wa.me/${telefono}?text=${texto}`;

    // 2) Mostrar/ocultar por scroll (aparece al bajar 300px)
    const UMBRAL = 300;
    const toggleWA = () => {
      if (window.scrollY > UMBRAL) {
        waBtn.classList.add('show');
      } else {
        waBtn.classList.remove('show');
      }
    };

    // Estado inicial y listener
    toggleWA();
    window.addEventListener('scroll', toggleWA, { passive: true });
  }
});
// ======= Carrito de compras (Maquillaje SHE) =======
document.addEventListener("DOMContentLoaded", () => {
  const cart = [];
  const cartBtn = document.getElementById("cartBtn");
  const cartModal = document.getElementById("cartModal");
  const cartItems = document.getElementById("cartItems");
  const cartCount = document.getElementById("cartCount");
  const cartTotal = document.getElementById("cartTotal");
  const closeCart = document.getElementById("closeCart");
  const checkoutBtn = document.getElementById("checkoutBtn");

  const addButtons = document.querySelectorAll(".btn-add");

  addButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const row = btn.closest("tr");
      const title = row.querySelector("td").textContent.trim();
      const priceText = row.querySelectorAll("td")[1].textContent.replace("$", "");
      const price = parseFloat(priceText);

      const existing = cart.find((p) => p.title === title);
      if (existing) {
        existing.qty++;
      } else {
        cart.push({ title, price, qty: 1 });
      }
      updateCart();
    });
  });

  function updateCart() {
    cartItems.innerHTML = "";
    let total = 0;
    cart.forEach((p) => {
      total += p.price * p.qty;
      const li = document.createElement("li");
      li.textContent = `${p.title} — ${p.qty} x $${p.price.toFixed(2)}`;
      cartItems.appendChild(li);
    });
    cartTotal.textContent = total.toFixed(2);
    cartCount.textContent = cart.reduce((a, b) => a + b.qty, 0);
  }

  cartBtn.addEventListener("click", (e) => {
    e.preventDefault();
    cartModal.style.display = "flex";
  });

  closeCart.addEventListener("click", () => {
    cartModal.style.display = "none";
  });

  checkoutBtn.addEventListener("click", () => {
    alert("💋 ¡Gracias por tu compra! Tu pedido de maquillaje será procesado pronto.");
    cart.length = 0;
    updateCart();
    cartModal.style.display = "none";
  });
});

// ================== Degradado dinámico HSL con mouse move ==================
document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;

  // Colores base en HSL inspirados en la paleta pastel
  const coloresHSL = [
    { h: 180, s: 25, l: 70 },  // #99CCCC
    { h: 190, s: 20, l: 75 },  // #A8BDC2
    { h: 300, s: 10, l: 75 },  // #B8AEB8
    { h: 330, s: 25, l: 75 },  // #C79EAD
    { h: 340, s: 35, l: 70 }   // #D78FA3
  ];

  document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    const index = Math.floor(x * (coloresHSL.length - 1));
    const nextIndex = (index + 1) % coloresHSL.length;

    const mix = y;
    const h = coloresHSL[index].h * (1 - mix) + coloresHSL[nextIndex].h * mix;
    const s = coloresHSL[index].s * (1 - mix) + coloresHSL[nextIndex].s * mix;
    const l = coloresHSL[index].l * (1 - mix) + coloresHSL[nextIndex].l * mix;

    const grad = `linear-gradient(135deg,
      hsl(${h}, ${s}%, ${l + 5}%),
      hsl(${(h + 40) % 360}, ${s + 10}%, ${l - 5}%)
    )`;

    body.style.background = grad;
    body.style.transition = 'background 0.3s ease';
  });
});
// ======= Carrito de compras básico =======
document.addEventListener("DOMContentLoaded", () => {
  const cart = [];
  const cartBtn = document.getElementById("cartBtn");
  const cartModal = document.getElementById("cartModal");
  const cartItems = document.getElementById("cartItems");
  const cartCount = document.getElementById("cartCount");
  const cartTotal = document.getElementById("cartTotal");
  const closeCart = document.getElementById("closeCart");
  const checkoutBtn = document.getElementById("checkoutBtn");

  // Seleccionar botones "Agregar al carrito" (de tus cards)
  const addButtons = document.querySelectorAll(".btn-add");

  addButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".card");
      const title = card.querySelector(".card-title").textContent;
      const priceText = card.querySelector(".price").textContent.replace("$", "");
      const price = parseFloat(priceText);

      // Buscar si el producto ya está en el carrito
      const existing = cart.find((p) => p.title === title);
      if (existing) {
        existing.qty++;
      } else {
        cart.push({ title, price, qty: 1 });
      }
      updateCart();
    });
  });

  // Actualizar contenido del carrito
  function updateCart() {
    cartItems.innerHTML = "";
    let total = 0;
    cart.forEach((p) => {
      total += p.price * p.qty;
      const li = document.createElement("li");
      li.textContent = `${p.title} — ${p.qty} x $${p.price.toFixed(2)}`;
      cartItems.appendChild(li);
    });
    cartTotal.textContent = total.toFixed(2);
    cartCount.textContent = cart.reduce((a, b) => a + b.qty, 0);
  }

  // Mostrar/ocultar modal del carrito
  cartBtn.addEventListener("click", (e) => {
    e.preventDefault();
    cartModal.style.display = "flex";
  });

  closeCart.addEventListener("click", () => {
    cartModal.style.display = "none";
  });

  // Simular pago
  checkoutBtn.addEventListener("click", () => {
    alert("Gracias por tu compra 🛍️");
    cart.length = 0;
    updateCart();
    cartModal.style.display = "none";
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("contenedor-api");

  // 1️⃣ Llamar a la API RESTful
  fetch("https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline")
    .then(response => response.json())
    .then(data => {
      mostrarProductos(data);
    })
    .catch(error => {
      console.error("Error al consumir la API:", error);
      contenedor.innerHTML = `<p class="text-danger text-center">Error al cargar los productos. Intenta nuevamente más tarde.</p>`;
    });

  // 2️⃣ Función para crear tarjetas dinámicas
  function mostrarProductos(productos) {
    const productosFiltrados = productos.slice(0, 12); // Mostramos solo 12 para no saturar

    productosFiltrados.forEach(prod => {
      const card = document.createElement("div");
      card.classList.add("col-md-3", "mb-4");

      card.innerHTML = `
        <div class="card h-100 shadow-sm">
          <img src="${prod.image_link}" class="card-img-top" alt="${prod.name}">
          <div class="card-body">
            <h5 class="card-title">${prod.name}</h5>
            <p class="card-text text-muted mb-1">${prod.brand}</p>
            <p class="card-text"><strong>Precio:</strong> $${prod.price || "No disponible"}</p>
            <button class="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#modalProducto${prod.id}">
              Ver más
            </button>
          </div>
        </div>

        <!-- Modal con detalles del producto -->
        <div class="modal fade" id="modalProducto${prod.id}" tabindex="-1" aria-labelledby="modalLabel${prod.id}" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="modalLabel${prod.id}">${prod.name}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
              </div>
              <div class="modal-body">
                <img src="${prod.image_link}" class="img-fluid mb-3" alt="${prod.name}">
                <p><strong>Marca:</strong> ${prod.brand}</p>
                <p><strong>Precio:</strong> $${prod.price || "No disponible"}</p>
                <p><strong>Descripción:</strong> ${prod.description || "Sin descripción disponible."}</p>
              </div>
            </div>
          </div>
        </div>
      `;

      contenedor.appendChild(card);
    });
  }
});