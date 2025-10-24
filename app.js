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