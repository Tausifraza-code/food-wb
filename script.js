/* ============================================
   FlavorFusion - Main JavaScript (with Real Images)
   ============================================ */

// ---------- DOM Elements (same as before) ----------
const preloader = document.getElementById("preloader");
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link");
const hamburger = document.getElementById("hamburger");
const navLinksContainer = document.getElementById("navLinks");
const themeToggle = document.getElementById("themeToggle");
const cartBtn = document.getElementById("cartBtn");
const cartBadge = document.getElementById("cartBadge");
const cartSidebar = document.getElementById("cartSidebar");
const cartOverlay = document.getElementById("cartOverlay");
const cartClose = document.getElementById("cartClose");
const cartItemsContainer = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const toastContainer = document.getElementById("toastContainer");
const searchInput = document.getElementById("searchInput");
const categoryBtns = document.querySelectorAll(".cat-btn");
const menuGrid = document.getElementById("menuGrid");
const noResults = document.getElementById("noResults");
const featuredGrid = document.getElementById("featuredGrid");
const reviewsGrid = document.getElementById("reviewsGrid");
const reviewsAverage = document.getElementById("reviewsAverage");
const scrollTopBtn = document.getElementById("scrollTopBtn");
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
let currentSlide = 0;
let slideInterval;

const countDays = document.getElementById("countDays");
const countHours = document.getElementById("countHours");
const countMins = document.getElementById("countMins");
const countSecs = document.getElementById("countSecs");

// ---------- Global State ----------
let cart = JSON.parse(localStorage.getItem("flavorFusionCart")) || [];
let activeCategory = "all";

// ---------- Menu Data with Real Unsplash Images ----------
const fullMenu = [
  // Pizza
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
      "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    desc: "Bell peppers, olives, mushrooms, sweet corn",
  },
  // Burgers
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
  // Drinks
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
  // Desserts
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
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face", // female portrait
  },
  {
    name: "Marcus J.",
    text: '"Their smash burger is absolutely insane. Juicy, flavorful, and that special sauce is magic."',
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face", // male portrait
  },
  {
    name: "Elena R.",
    text: '"I\'m addicted to the Berry Blast smoothie. Fresh ingredients and so refreshing!"',
    rating: 4.5,
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face", // another female portrait
  },
  {
    name: "David K.",
    text: '"The chocolate lava cake is a religious experience. Warm, gooey, perfectly balanced."',
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face", // male portrait
  },
];

// ---------- Utility Functions (same as before) ----------
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = message;
  toastContainer.appendChild(toast);
  setTimeout(() => toast.classList.add("show"), 10);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

function formatPrice(price) {
  return "$" + price.toFixed(2);
}

function generateStars(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  let stars = "";
  for (let i = 0; i < fullStars; i++) stars += "⭐";
  if (halfStar) stars += "✨";
  return stars || "No rating";
}

// ---------- Cart Functions (same localStorage logic) ----------
function saveCart() {
  localStorage.setItem("flavorFusionCart", JSON.stringify(cart));
}

function updateCartUI() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
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
                    <div>
                        <h4>${item.name}</h4>
                        <span class="cart-item-price">${formatPrice(item.price)}</span>
                    </div>
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
      .forEach((btn) => btn.addEventListener("click", handleCartQuantity));
    document
      .querySelectorAll(".cart-item-remove")
      .forEach((btn) => btn.addEventListener("click", handleCartRemove));
  }
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotal.textContent = formatPrice(total);
  if (checkoutOrderTotal) checkoutOrderTotal.textContent = formatPrice(total);
}

function addToCart(item) {
  const existing = cart.find((cartItem) => cartItem.id === item.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }
  saveCart();
  updateCartUI();
  showToast(`${item.name} added to cart!`);
}

function handleCartQuantity(e) {
  const id = e.target.getAttribute("data-id");
  const action = e.target.getAttribute("data-action");
  const itemIndex = cart.findIndex((item) => item.id === id);
  if (itemIndex === -1) return;
  if (action === "increase") {
    cart[itemIndex].quantity += 1;
  } else if (action === "decrease") {
    if (cart[itemIndex].quantity > 1) {
      cart[itemIndex].quantity -= 1;
    } else {
      cart.splice(itemIndex, 1);
    }
  }
  saveCart();
  updateCartUI();
}

function handleCartRemove(e) {
  const id = e.currentTarget.getAttribute("data-id");
  cart = cart.filter((item) => item.id !== id);
  saveCart();
  updateCartUI();
  showToast("Item removed from cart 🗑️");
}

// ---------- Menu Rendering (now with <img> tags) ----------
function renderMenu(items) {
  if (items.length === 0) {
    menuGrid.innerHTML = "";
    noResults.style.display = "block";
    return;
  }
  noResults.style.display = "none";
  menuGrid.innerHTML = items
    .map(
      (item) => `
        <div class="menu-card" data-category="${item.category}">
            <div class="menu-card-image">
                <img src="${item.image}" alt="${item.name}" loading="lazy">
                <div class="menu-card-rating">${generateStars(item.rating)}</div>
            </div>
            <div class="menu-card-body">
                <h3>${item.name}</h3>
                <p>${item.desc}</p>
                <div class="menu-card-footer">
                    <span class="menu-price">${formatPrice(item.price)}</span>
                    <button class="btn btn-primary btn-sm add-to-cart-btn" data-id="${item.id}">
                        Add <i class="fa-solid fa-cart-plus"></i>
                    </button>
                </div>
            </div>
        </div>
    `,
    )
    .join("");
  document.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      const menuItem = fullMenu.find((item) => item.id === id);
      if (menuItem) addToCart(menuItem);
    });
  });
}

function filterMenu() {
  const searchTerm = searchInput.value.toLowerCase().trim();
  let filtered = fullMenu;
  if (activeCategory !== "all")
    filtered = filtered.filter((item) => item.category === activeCategory);
  if (searchTerm !== "") {
    filtered = filtered.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm) ||
        item.desc.toLowerCase().includes(searchTerm) ||
        item.category.toLowerCase().includes(searchTerm),
    );
  }
  renderMenu(filtered);
}

// ---------- Featured Dishes (with images) ----------
function renderFeatured() {
  const featuredItems = fullMenu.filter((item) => item.featured);
  featuredGrid.innerHTML = featuredItems
    .map(
      (item) => `
        <div class="featured-card">
            <div class="featured-card-img">
                <img src="${item.image}" alt="${item.name}" loading="lazy">
            </div>
            <div class="featured-card-info">
                <h3>${item.name}</h3>
                <p>${item.desc}</p>
                <div class="featured-card-footer">
                    <span class="menu-price">${formatPrice(item.price)}</span>
                    <span class="featured-rating">${generateStars(item.rating)}</span>
                </div>
                <button class="btn btn-primary btn-sm add-to-cart-btn" data-id="${item.id}">
                    Add to Cart <i class="fa-solid fa-cart-plus"></i>
                </button>
            </div>
        </div>
    `,
    )
    .join("");
  document.querySelectorAll("#featuredGrid .add-to-cart-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      const menuItem = fullMenu.find((item) => item.id === id);
      if (menuItem) addToCart(menuItem);
    });
  });
}

// ---------- Reviews (unchanged) ----------
function renderReviews() {
  reviewsGrid.innerHTML = reviewsData
    .map(
      (review) => `
    <div class="review-card">
      <div class="review-avatar">
        <img src="${review.avatar}" alt="${review.name}" class="avatar-img">
      </div>
      <div class="review-stars">${"⭐".repeat(Math.floor(review.rating))}${review.rating % 1 !== 0 ? "✨" : ""}</div>
      <p class="review-text">${review.text}</p>
      <h4 class="review-author">${review.name}</h4>
    </div>
  `,
    )
    .join("");

  // ... average rating code remains the same
}

// ---------- Hero Slider (unchanged) ----------
function showSlide(index) {
  slides.forEach((slide, i) => slide.classList.toggle("active", i === index));
  dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
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

// ---------- Countdown Timer ----------
function startCountdown() {
  const now = new Date();
  const target = new Date(now);
  target.setDate(target.getDate() + 2);
  target.setHours(23, 59, 59, 0);
  function updateTimer() {
    const current = new Date();
    const diff = target - current;
    if (diff <= 0) {
      countDays.textContent = "00";
      countHours.textContent = "00";
      countMins.textContent = "00";
      countSecs.textContent = "00";
      return;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);
    countDays.textContent = days.toString().padStart(2, "0");
    countHours.textContent = hours.toString().padStart(2, "0");
    countMins.textContent = mins.toString().padStart(2, "0");
    countSecs.textContent = secs.toString().padStart(2, "0");
  }
  updateTimer();
  setInterval(updateTimer, 1000);
}

// ---------- Form Validation (unchanged) ----------
function validateContactForm(e) {
  e.preventDefault();
  let valid = true;
  const name = document.getElementById("contactName");
  const email = document.getElementById("contactEmail");
  const message = document.getElementById("contactMessage");
  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const messageError = document.getElementById("messageError");
  nameError.textContent = "";
  emailError.textContent = "";
  messageError.textContent = "";
  if (name.value.trim() === "") {
    nameError.textContent = "Name is required";
    valid = false;
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.value.trim())) {
    emailError.textContent = "Enter a valid email address";
    valid = false;
  }
  if (message.value.trim() === "") {
    messageError.textContent = "Message cannot be empty";
    valid = false;
  }
  if (valid) {
    showToast("📨 Message sent successfully! We'll get back to you soon.");
    contactForm.reset();
  }
  return false;
}

function handleNewsletterSubmit(e) {
  e.preventDefault();
  const input = e.target.querySelector('input[type="email"]');
  if (input && input.value.trim() !== "") {
    showToast("📬 Subscribed! Check your inbox for tasty updates.");
    e.target.reset();
  }
}

// ---------- Dark Mode ----------
function initTheme() {
  const savedTheme = localStorage.getItem("flavorFusionTheme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  const icon = themeToggle.querySelector("i");
  if (savedTheme === "dark") icon.classList.replace("fa-moon", "fa-sun");
  else icon.classList.replace("fa-sun", "fa-moon");
}
function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme");
  const newTheme = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("flavorFusionTheme", newTheme);
  const icon = themeToggle.querySelector("i");
  if (newTheme === "dark") icon.classList.replace("fa-moon", "fa-sun");
  else icon.classList.replace("fa-sun", "fa-moon");
}

// ---------- Navigation & Scroll (unchanged) ----------
function handleNavScroll() {
  if (window.scrollY > 80) navbar.classList.add("scrolled");
  else navbar.classList.remove("scrolled");
  if (window.scrollY > 500) scrollTopBtn.classList.add("visible");
  else scrollTopBtn.classList.remove("visible");
  const sections = document.querySelectorAll("section[id]");
  let currentSection = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop)
      currentSection = section.getAttribute("id");
  });
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`)
      link.classList.add("active");
  });
}
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const navHeight = navbar.offsetHeight;
        const targetPosition = targetElement.offsetTop - navHeight;
        window.scrollTo({ top: targetPosition, behavior: "smooth" });
        if (navLinksContainer.classList.contains("active")) {
          navLinksContainer.classList.remove("active");
          hamburger.querySelector("i").classList.replace("fa-xmark", "fa-bars");
        }
      }
    });
  });
}

// ---------- Cart Sidebar ----------
function openCart() {
  cartSidebar.classList.add("open");
  cartOverlay.classList.add("active");
}
function closeCart() {
  cartSidebar.classList.remove("open");
  cartOverlay.classList.remove("active");
}

// ---------- Checkout Modal ----------
function openCheckoutModal() {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  checkoutOrderTotal.textContent = formatPrice(total);
  checkoutModalOverlay.classList.add("active");
}
function closeCheckoutModal() {
  checkoutModalOverlay.classList.remove("active");
}

// ---------- Mobile Menu ----------
function toggleMobileMenu() {
  navLinksContainer.classList.toggle("active");
  const icon = hamburger.querySelector("i");
  if (navLinksContainer.classList.contains("active"))
    icon.classList.replace("fa-bars", "fa-xmark");
  else icon.classList.replace("fa-xmark", "fa-bars");
}

// ---------- Event Listeners ----------
function bindEvents() {
  window.addEventListener("load", () => {
    setTimeout(() => preloader.classList.add("hidden"), 1200);
  });
  window.addEventListener("scroll", handleNavScroll);
  setupSmoothScroll();
  themeToggle.addEventListener("click", toggleTheme);
  hamburger.addEventListener("click", toggleMobileMenu);
  cartBtn.addEventListener("click", openCart);
  cartClose.addEventListener("click", closeCart);
  cartOverlay.addEventListener("click", closeCart);
  sliderPrev.addEventListener("click", () => {
    prevSlide();
    stopSlideInterval();
    startSlideInterval();
  });
  sliderNext.addEventListener("click", () => {
    nextSlide();
    stopSlideInterval();
    startSlideInterval();
  });
  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      currentSlide = parseInt(dot.getAttribute("data-slide"));
      showSlide(currentSlide);
      stopSlideInterval();
      startSlideInterval();
    });
  });
  categoryBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      categoryBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeCategory = btn.getAttribute("data-category");
      filterMenu();
    });
  });
  searchInput.addEventListener("input", filterMenu);
  contactForm.addEventListener("submit", validateContactForm);
  newsletterForm.addEventListener("submit", handleNewsletterSubmit);
  document.getElementById("checkoutBtn").addEventListener("click", () => {
    if (cart.length === 0) {
      showToast("🛒 Your cart is empty!");
      return;
    }
    openCheckoutModal();
    closeCart();
  });
  checkoutModalClose.addEventListener("click", closeCheckoutModal);
  checkoutModalOverlay.addEventListener("click", (e) => {
    if (e.target === checkoutModalOverlay) closeCheckoutModal();
  });
  checkoutConfirmBtn.addEventListener("click", () => {
    cart = [];
    saveCart();
    updateCartUI();
    closeCheckoutModal();
    showToast("🎉 Order confirmed! Your food is on the way.");
  });
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ---------- Initialize ----------
function init() {
  initTheme();
  renderMenu(fullMenu);
  renderFeatured();
  renderReviews();
  updateCartUI();
  showSlide(currentSlide);
  startSlideInterval();
  startCountdown();
  bindEvents();
  handleNavScroll();
}

init();
