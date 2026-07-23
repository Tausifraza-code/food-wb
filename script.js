/* ============================================
           FlavorFusion - JavaScript
           ============================================ */

// ---------- DOM refs ----------
const preloader = document.getElementById("preloader");
const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
const themeToggle = document.getElementById("themeToggle");
const cartBtn = document.getElementById("cartBtn");
const cartBadge = document.getElementById("cartBadge");
const cartSidebar = document.getElementById("cartSidebar");
const cartOverlay = document.getElementById("cartOverlay");
const cartClose = document.getElementById("cartClose");
const cartItemsContainer = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const toastContainer = document.getElementById("toastContainer");
const scrollTopBtn = document.getElementById("scrollTopBtn");
const searchInput = document.getElementById("searchInput");
const categoryBtns = document.querySelectorAll(".cat-btn");
const menuGrid = document.getElementById("menuGrid");
const noResults = document.getElementById("noResults");
const featuredGrid = document.getElementById("featuredGrid");
const reviewsGrid = document.getElementById("reviewsGrid");
const reviewsAverage = document.getElementById("reviewsAverage");
const contactForm = document.getElementById("contactForm");
const newsletterForm = document.getElementById("newsletterForm");
const checkoutModalOverlay = document.getElementById("checkoutModalOverlay");
const checkoutModalClose = document.getElementById("checkoutModalClose");
const checkoutConfirmBtn = document.getElementById("checkoutConfirmBtn");
const checkoutOrderTotal = document.getElementById("checkoutOrderTotal");
const slides = document.querySelectorAll(".hero-slide");
const dots = document.querySelectorAll(".dot");
const sliderPrev = document.getElementById("sliderPrev");
const sliderNext = document.getElementById("sliderNext");
const countDays = document.getElementById("countDays");
const countHours = document.getElementById("countHours");
const countMins = document.getElementById("countMins");
const countSecs = document.getElementById("countSecs");

// ---------- State ----------
let cart = JSON.parse(localStorage.getItem("flavorFusionCart")) || [];
let activeCategory = "all";
let currentSlide = 0;
let slideInterval;

// ---------- Menu Data ----------
const fullMenu = [
  {
    id: "p1",
    name: "Margherita Classic",
    category: "pizza",
    price: 12.99,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop",
    desc: "San Marzano tomatoes, fresh mozzarella, basil",
    featured: true,
  },
  {
    id: "p2",
    name: "Pepperoni Passion",
    category: "pizza",
    price: 14.99,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop",
    desc: "Double pepperoni, melted cheese, spicy edge",
    featured: true,
  },
  {
    id: "p3",
    name: "BBQ Chicken",
    category: "pizza",
    price: 15.99,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop",
    desc: "Grilled chicken, BBQ sauce, red onions, cilantro",
  },
  {
    id: "p4",
    name: "Veggie Supreme",
    category: "pizza",
    price: 13.49,
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=1170&auto=format&fit=crop",
    desc: "Bell peppers, olives, mushrooms, sweet corn",
  },
  {
    id: "b1",
    name: "Classic Smash Burger",
    category: "burger",
    price: 10.99,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
    desc: "Double patty, cheddar, lettuce, special sauce",
    featured: true,
  },
  {
    id: "b2",
    name: "Bacon Beast",
    category: "burger",
    price: 12.99,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&h=300&fit=crop",
    desc: "Crispy bacon, beef patty, onion rings, smoky mayo",
  },
  {
    id: "b3",
    name: "Chicken Crispy Deluxe",
    category: "burger",
    price: 11.49,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&h=300&fit=crop",
    desc: "Crispy fried chicken, coleslaw, pickles",
  },
  {
    id: "b4",
    name: "Mushroom Swiss Burger",
    category: "burger",
    price: 13.49,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=400&h=300&fit=crop",
    desc: "Sautéed mushrooms, Swiss cheese, garlic aioli",
  },
  {
    id: "d1",
    name: "Berry Blast Smoothie",
    category: "drinks",
    price: 6.99,
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400&h=300&fit=crop",
    desc: "Mixed berries, banana, yogurt, honey",
  },
  {
    id: "d2",
    name: "Mango Tango",
    category: "drinks",
    price: 5.99,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop",
    desc: "Fresh mango, lime, mint, sparkling water",
  },
  {
    id: "d3",
    name: "Classic Lemonade",
    category: "drinks",
    price: 3.99,
    rating: 4.2,
    image:
      "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&h=300&fit=crop",
    desc: "Freshly squeezed lemons, touch of sweetness",
  },
  {
    id: "d4",
    name: "Iced Caramel Latte",
    category: "drinks",
    price: 5.49,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop",
    desc: "Espresso, milk, caramel drizzle over ice",
  },
  {
    id: "ds1",
    name: "Chocolate Lava Cake",
    category: "dessert",
    price: 7.99,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop",
    desc: "Warm chocolate cake with molten center, ice cream",
    featured: true,
  },
  {
    id: "ds2",
    name: "New York Cheesecake",
    category: "dessert",
    price: 8.49,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&h=300&fit=crop",
    desc: "Creamy cheesecake on graham cracker crust",
  },
  {
    id: "ds3",
    name: "Tiramisu Cup",
    category: "dessert",
    price: 6.99,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop",
    desc: "Espresso-soaked ladyfingers, mascarpone cream",
  },
  {
    id: "ds4",
    name: "Fruit Tart",
    category: "dessert",
    price: 7.49,
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop",
    desc: "Buttery crust, custard, fresh seasonal fruits",
  },
];

const reviewsData = [
  {
    name: "Sophia L.",
    text: '"Best pizza I\'ve had in years! The crust is perfection and delivery was super fast."',
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Marcus J.",
    text: '"Their smash burger is absolutely insane. Juicy, flavorful, and that special sauce is magic."',
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Elena R.",
    text: '"I\'m addicted to the Berry Blast smoothie. Fresh ingredients and so refreshing!"',
    rating: 4.5,
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "David K.",
    text: '"The chocolate lava cake is a religious experience. Warm, gooey, perfectly balanced."',
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  },
];

// ---------- Utils ----------
function showToast(msg) {
  if (!toastContainer) return;
  const t = document.createElement("div");
  t.className = "toast";
  t.textContent = msg;
  toastContainer.appendChild(t);
  setTimeout(() => t.classList.add("show"), 10);
  setTimeout(() => {
    t.classList.remove("show");
    setTimeout(() => t.remove(), 300);
  }, 2500);
}

function formatPrice(p) {
  return "$" + p.toFixed(2);
}

function generateStars(rating) {
  const full = Math.floor(rating);
  let s = "";
  for (let i = 0; i < full; i++) s += "⭐";
  if (rating % 1 !== 0) s += "✨";
  return s || "No rating";
}

// ---------- Cart ----------
function saveCart() {
  localStorage.setItem("flavorFusionCart", JSON.stringify(cart));
}

function updateCartUI() {
  if (!cartBadge || !cartItemsContainer || !cartTotal) return;
  const totalItems = cart.reduce((s, i) => s + i.quantity, 0);
  cartBadge.textContent = totalItems;
  if (cart.length === 0) {
    cartItemsContainer.innerHTML =
      '<p class="cart-empty">Your cart is empty 🛒</p>';
  } else {
    cartItemsContainer.innerHTML = cart
      .map(
        (item) => `
                        <div class="cart-item">
                            <div class="cart-item-info">
                                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                                <div><h4>${item.name}</h4><span class="cart-item-price">${formatPrice(item.price)}</span></div>
                            </div>
                            <div class="cart-item-qty">
                                <button class="qty-btn" data-action="decrease" data-id="${item.id}">−</button>
                                <span>${item.quantity}</span>
                                <button class="qty-btn" data-action="increase" data-id="${item.id}">+</button>
                            </div>
                            <button class="cart-item-remove" data-id="${item.id}"><i class="fa-solid fa-trash-can"></i></button>
                        </div>
                    `,
      )
      .join("");
    document
      .querySelectorAll(".qty-btn")
      .forEach((b) => b.addEventListener("click", handleCartQuantity));
    document
      .querySelectorAll(".cart-item-remove")
      .forEach((b) => b.addEventListener("click", handleCartRemove));
  }
  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  cartTotal.textContent = formatPrice(total);
  if (checkoutOrderTotal) checkoutOrderTotal.textContent = formatPrice(total);
}

function addToCart(item) {
  const existing = cart.find((i) => i.id === item.id);
  if (existing) existing.quantity += 1;
  else cart.push({ ...item, quantity: 1 });
  saveCart();
  updateCartUI();
  showToast(`${item.name} added to cart!`);
}

function handleCartQuantity(e) {
  const id = e.target.dataset.id,
    action = e.target.dataset.action;
  const idx = cart.findIndex((i) => i.id === id);
  if (idx === -1) return;
  if (action === "increase") cart[idx].quantity += 1;
  else if (action === "decrease") {
    if (cart[idx].quantity > 1) cart[idx].quantity -= 1;
    else cart.splice(idx, 1);
  }
  saveCart();
  updateCartUI();
}

function handleCartRemove(e) {
  const id = e.currentTarget.dataset.id;
  cart = cart.filter((i) => i.id !== id);
  saveCart();
  updateCartUI();
  showToast("Item removed from cart 🗑️");
}

// ---------- Render ----------
function renderMenu(items) {
  if (!menuGrid) return;
  if (items.length === 0) {
    menuGrid.innerHTML = "";
    if (noResults) noResults.style.display = "block";
    return;
  }
  if (noResults) noResults.style.display = "none";
  menuGrid.innerHTML = items
    .map(
      (item) => `
                    <div class="menu-card" data-category="${item.category}">
                        <div class="menu-card-image"><img src="${item.image}" alt="${item.name}" loading="lazy"><div class="menu-card-rating">${generateStars(item.rating)}</div></div>
                        <div class="menu-card-body"><h3>${item.name}</h3><p>${item.desc}</p>
                            <div class="menu-card-footer"><span class="menu-price">${formatPrice(item.price)}</span><button class="btn btn-primary btn-sm add-to-cart-btn" data-id="${item.id}">Add <i class="fa-solid fa-cart-plus"></i></button></div>
                        </div>
                    </div>
                `,
    )
    .join("");
  document.querySelectorAll(".add-to-cart-btn").forEach((b) =>
    b.addEventListener("click", function () {
      const id = this.dataset.id,
        menuItem = fullMenu.find((i) => i.id === id);
      if (menuItem) addToCart(menuItem);
    }),
  );
}

function filterMenu() {
  if (!searchInput) return;
  const term = searchInput.value.toLowerCase().trim();
  let filtered = fullMenu;
  if (activeCategory !== "all")
    filtered = filtered.filter((i) => i.category === activeCategory);
  if (term)
    filtered = filtered.filter(
      (i) =>
        i.name.toLowerCase().includes(term) ||
        i.desc.toLowerCase().includes(term) ||
        i.category.toLowerCase().includes(term),
    );
  renderMenu(filtered);
}

function renderFeatured() {
  if (!featuredGrid) return;
  const items = fullMenu.filter((i) => i.featured);
  featuredGrid.innerHTML = items
    .map(
      (item) => `
                    <div class="featured-card">
                        <div class="featured-card-img"><img src="${item.image}" alt="${item.name}" loading="lazy"></div>
                        <div class="featured-card-info"><h3>${item.name}</h3><p>${item.desc}</p>
                            <div class="featured-card-footer"><span class="menu-price">${formatPrice(item.price)}</span><span class="featured-rating">${generateStars(item.rating)}</span></div>
                            <button class="btn btn-primary btn-sm add-to-cart-btn" data-id="${item.id}">Add to Cart <i class="fa-solid fa-cart-plus"></i></button>
                        </div>
                    </div>
                `,
    )
    .join("");
  document.querySelectorAll("#featuredGrid .add-to-cart-btn").forEach((b) =>
    b.addEventListener("click", function () {
      const id = this.dataset.id,
        menuItem = fullMenu.find((i) => i.id === id);
      if (menuItem) addToCart(menuItem);
    }),
  );
}

function renderReviews() {
  if (!reviewsGrid) return;
  reviewsGrid.innerHTML = reviewsData
    .map(
      (r) => `
                    <div class="review-card">
                        <div class="review-avatar"><img src="${r.avatar}" alt="${r.name}" class="avatar-img"></div>
                        <div class="review-stars">${"⭐".repeat(Math.floor(r.rating))}${r.rating % 1 !== 0 ? "✨" : ""}</div>
                        <p class="review-text">${r.text}</p><h4 class="review-author">${r.name}</h4>
                    </div>
                `,
    )
    .join("");
  if (reviewsAverage) {
    const avg =
      reviewsData.reduce((s, r) => s + r.rating, 0) / reviewsData.length;
    reviewsAverage.innerHTML = `<div class="avg-rating-box"><span class="avg-number">${avg.toFixed(1)}</span><div class="avg-stars">${"⭐".repeat(Math.floor(avg))}✨</div><p>Average rating from ${reviewsData.length} reviews</p></div>`;
  }
}

// ---------- Slider ----------
function showSlide(idx) {
  slides.forEach((s, i) => s.classList.toggle("active", i === idx));
  dots.forEach((d, i) => d.classList.toggle("active", i === idx));
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

function startSlideInterval() {
  stopSlideInterval();
  slideInterval = setInterval(nextSlide, 5000);
}

function stopSlideInterval() {
  clearInterval(slideInterval);
}

// ---------- Countdown ----------
function startCountdown() {
  if (!countDays) return;
  const target = new Date();
  target.setDate(target.getDate() + 2);
  target.setHours(23, 59, 59, 0);

  function update() {
    const diff = target - new Date();
    if (diff <= 0) {
      countDays.textContent = "00";
      countHours.textContent = "00";
      countMins.textContent = "00";
      countSecs.textContent = "00";
      return;
    }
    countDays.textContent = Math.floor(diff / (1000 * 60 * 60 * 24))
      .toString()
      .padStart(2, "0");
    countHours.textContent = Math.floor(
      (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    )
      .toString()
      .padStart(2, "0");
    countMins.textContent = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      .toString()
      .padStart(2, "0");
    countSecs.textContent = Math.floor((diff % (1000 * 60)) / 1000)
      .toString()
      .padStart(2, "0");
  }
  update();
  setInterval(update, 1000);
}

// ---------- Forms ----------
function validateContact(e) {
  e.preventDefault();
  let valid = true;
  const name = document.getElementById("contactName"),
    email = document.getElementById("contactEmail"),
    msg = document.getElementById("contactMessage");
  const ne = document.getElementById("nameError"),
    ee = document.getElementById("emailError"),
    me = document.getElementById("messageError");
  if (ne) ne.textContent = "";
  if (ee) ee.textContent = "";
  if (me) me.textContent = "";
  if (!name || name.value.trim() === "") {
    if (ne) ne.textContent = "Name is required";
    valid = false;
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    if (ee) ee.textContent = "Enter a valid email";
    valid = false;
  }
  if (!msg || msg.value.trim() === "") {
    if (me) me.textContent = "Message cannot be empty";
    valid = false;
  }
  if (valid) {
    showToast("📨 Message sent!");
    contactForm.reset();
  }
}

function handleNewsletter(e) {
  e.preventDefault();
  const input = e.target.querySelector('input[type="email"]');
  if (input && input.value.trim() !== "") {
    showToast("📬 Subscribed!");
    e.target.reset();
  }
}

// ---------- Theme ----------
function initTheme() {
  const saved = localStorage.getItem("flavorFusionTheme") || "light";
  document.documentElement.setAttribute("data-theme", saved);
  if (themeToggle) {
    const icon = themeToggle.querySelector("i");
    if (saved === "dark") icon.className = "fa-solid fa-sun";
    else icon.className = "fa-solid fa-moon";
  }
}

function toggleTheme() {
  const cur = document.documentElement.getAttribute("data-theme");
  const next = cur === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("flavorFusionTheme", next);
  if (themeToggle) {
    const icon = themeToggle.querySelector("i");
    if (next === "dark") icon.className = "fa-solid fa-sun";
    else icon.className = "fa-solid fa-moon";
  }
}

// ---------- Nav scroll ----------
function handleNavScroll() {
  if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 80);
  if (scrollTopBtn)
    scrollTopBtn.classList.toggle("visible", window.scrollY > 500);
}

// ---------- Cart UI ----------
function openCart() {
  if (cartSidebar) cartSidebar.classList.add("open");
  if (cartOverlay) cartOverlay.classList.add("active");
}

function closeCart() {
  if (cartSidebar) cartSidebar.classList.remove("open");
  if (cartOverlay) cartOverlay.classList.remove("active");
}

function openCheckout() {
  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  if (checkoutOrderTotal) checkoutOrderTotal.textContent = formatPrice(total);
  if (checkoutModalOverlay) checkoutModalOverlay.classList.add("active");
}

function closeCheckout() {
  if (checkoutModalOverlay) checkoutModalOverlay.classList.remove("active");
}

// ---------- Hamburger ----------
function toggleHamburger() {
  if (!navLinks || !hamburger) return;
  navLinks.classList.toggle("active");
  const icon = hamburger.querySelector("i");
  if (navLinks.classList.contains("active")) {
    icon.className = "fa-solid fa-xmark";
    document.body.style.overflow = "hidden";
  } else {
    icon.className = "fa-solid fa-bars";
    document.body.style.overflow = "";
  }
}

function closeMobileMenu() {
  if (navLinks && navLinks.classList.contains("active")) {
    navLinks.classList.remove("active");
    if (hamburger) {
      const icon = hamburger.querySelector("i");
      icon.className = "fa-solid fa-bars";
    }
    document.body.style.overflow = "";
  }
}

// ---------- Bind Events ----------
function bindEvents() {
  if (preloader)
    window.addEventListener("load", () =>
      setTimeout(() => preloader.classList.add("hidden"), 400),
    );
  window.addEventListener("scroll", handleNavScroll);
  if (themeToggle) themeToggle.addEventListener("click", toggleTheme);
  if (hamburger) hamburger.addEventListener("click", toggleHamburger);
  document
    .querySelectorAll(".nav-link")
    .forEach((link) => link.addEventListener("click", closeMobileMenu));
  if (cartBtn) cartBtn.addEventListener("click", openCart);
  if (cartClose) cartClose.addEventListener("click", closeCart);
  if (cartOverlay) cartOverlay.addEventListener("click", closeCart);
  if (sliderPrev)
    sliderPrev.addEventListener("click", () => {
      prevSlide();
      stopSlideInterval();
      startSlideInterval();
    });
  if (sliderNext)
    sliderNext.addEventListener("click", () => {
      nextSlide();
      stopSlideInterval();
      startSlideInterval();
    });
  dots.forEach((d) =>
    d.addEventListener("click", function () {
      currentSlide = parseInt(this.dataset.slide);
      showSlide(currentSlide);
      stopSlideInterval();
      startSlideInterval();
    }),
  );
  categoryBtns.forEach((b) =>
    b.addEventListener("click", function () {
      categoryBtns.forEach((x) => x.classList.remove("active"));
      this.classList.add("active");
      activeCategory = this.dataset.category;
      filterMenu();
    }),
  );
  if (searchInput) searchInput.addEventListener("input", filterMenu);
  if (contactForm) contactForm.addEventListener("submit", validateContact);
  if (newsletterForm)
    newsletterForm.addEventListener("submit", handleNewsletter);
  const checkoutBtn = document.getElementById("checkoutBtn");
  if (checkoutBtn)
    checkoutBtn.addEventListener("click", () => {
      if (cart.length === 0) {
        showToast("🛒 Cart is empty!");
        return;
      }
      openCheckout();
      closeCart();
    });
  if (checkoutModalClose)
    checkoutModalClose.addEventListener("click", closeCheckout);
  if (checkoutModalOverlay)
    checkoutModalOverlay.addEventListener("click", (e) => {
      if (e.target === checkoutModalOverlay) closeCheckout();
    });
  if (checkoutConfirmBtn)
    checkoutConfirmBtn.addEventListener("click", () => {
      cart = [];
      saveCart();
      updateCartUI();
      closeCheckout();
      showToast("🎉 Order confirmed!");
    });
  if (scrollTopBtn)
    scrollTopBtn.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: "smooth" }),
    );
}

// ---------- Init ----------
function init() {
  initTheme();
  renderMenu(fullMenu);
  renderFeatured();
  renderReviews();
  updateCartUI();
  if (slides.length) {
    showSlide(0);
    startSlideInterval();
  }
  startCountdown();
  bindEvents();
  handleNavScroll();
}

init();
