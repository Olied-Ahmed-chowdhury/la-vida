/**
 * LA VIDA - OFFICIAL WEBSITE APPLICATION LOGIC
 * High-performance, reactive e-commerce and interactive demo controller.
 */

// Global State
const STATE = {
  currency: 'BDT',
  exchangeRate: 1, // 1 BDT
  cart: [],
  discountPercent: 0,
  activePromoCode: '',
  simInterval: null,
  currentSimStep: 0,
  isSimPlaying: false
};

// Product Database (Price range: ৳1,500 – ৳3,000 as instructed)
const PRODUCTS = [
  {
    id: 'lv-bergamot',
    name: 'Bergamot Zest',
    subtitle: 'Bright Citrus & Herb',
    shape: 'Smooth Rounded Oak',
    scent: 'Bergamot Zest & Cedar',
    seed: 'Organic Bergamot Seeds (Citrus Bergamia)',
    priceBDT: 1650,
    priceUSD: 15,
    tag: 'Best Seller',
    image: 'assets/images/hero.jpg',
    notes: 'Bergamot · Cedarwood · Sicilian Lemon',
    description: 'Crisp energizing citrus notes paired with pure cedar. Packaged in a hand-turned light oak shell that later houses your fragrant bergamot herb sprout.'
  },
  {
    id: 'lv-lavender',
    name: 'Wild Lavender & Mint',
    subtitle: 'Calming Botanical Infusion',
    shape: 'Octagonal Walnut',
    scent: 'Wild Lavender & Mint',
    seed: 'Highland Lavender Seeds',
    priceBDT: 1750,
    priceUSD: 16,
    tag: 'Artisan Shape',
    image: 'assets/images/lineup.jpg',
    notes: 'Wild Lavender · Fresh Spearmint · Sage',
    description: 'Serene French lavender blended with cool cooling mint. Handcrafted in a sculptural octagonal walnut shell with polished brass collar.'
  },
  {
    id: 'lv-eucalyptus',
    name: 'Eucalyptus & Sea Salt',
    subtitle: 'Cooling Marine Freshness',
    shape: 'Square Sculpted Oak',
    scent: 'Eucalyptus & Sea Salt',
    seed: 'Silver Dollar Eucalyptus Seeds',
    priceBDT: 1850,
    priceUSD: 17,
    tag: 'Humid Weather Shield',
    image: 'assets/images/hero.jpg',
    notes: 'Eucalyptus · Sea Salt Mineral · Rosemary',
    description: 'Engineered specifically for extreme Bangladesh monsoon humidity. Powerful natural odor protection with cooling mineral undertones.'
  },
  {
    id: 'lv-tulsi',
    name: 'Holy Tulsi & Sweet Basil',
    subtitle: 'Bangladesh Heritage Edition',
    shape: 'Hand-Turned Mahogany',
    scent: 'Holy Tulsi & Mint',
    seed: 'Sacred Krishna Tulsi Seeds',
    priceBDT: 1950,
    priceUSD: 18,
    tag: 'Local Fit Edition',
    image: 'assets/images/lineup.jpg',
    notes: 'Holy Tulsi · Sweet Basil · Bengal Mint',
    description: 'A tribute to local botanicals of Bengal. Antimicrobial organic tulsi extracts infused with cooling mint, paired with sacred Tulsi seeds for your home garden.'
  },
  {
    id: 'lv-sandalwood',
    name: 'Sandalwood & Warm Amber',
    subtitle: 'Rich Earthy Sanctuary',
    shape: 'Hexagonal Teak',
    scent: 'Sandalwood & Amber',
    seed: 'Golden Marigold (Genda) Seeds',
    priceBDT: 1950,
    priceUSD: 18,
    tag: 'Signature Scent',
    image: 'assets/images/lineup.jpg',
    notes: 'Mysore Sandalwood · Golden Amber · Cardamom',
    description: 'Velvety woody warmth that endures all day long. Paired with vibrant Golden Marigold seeds, a symbol of auspicious life in Bangladesh.'
  },
  {
    id: 'lv-giftbox-deluxe',
    name: 'Pohela Boishakh & Eid Deluxe Wooden Crate',
    subtitle: 'Complete Festive Green Gift Set',
    shape: 'Reclaimed Timber Keepsake Box',
    scent: '2 Full Sticks (Bergamot + Lavender)',
    seed: 'Dual Seeds: Tulsi & Marigold + Soil Pods',
    priceBDT: 2950,
    priceUSD: 27,
    tag: 'Royal Gift Box',
    image: 'assets/images/giftbox.jpg',
    notes: '2 Artisan Wooden Sticks · 2 Seed Packs · 2 Soil Pods · Terracotta Cup',
    description: 'The ultimate zero-waste festive gift for Eid, Pohela Boishakh, and corporate green celebrations in Bangladesh. Presented in a bespoke handcrafted timber box with natural jute ties.'
  },
  {
    id: 'lv-refill-duo',
    name: 'Biodegradable Core Refills (Pack of 2)',
    subtitle: 'Zero Plastic Refill Pods',
    shape: 'Fits All La Vida Wooden Shells',
    scent: 'Choose Any 2 Refill Cores',
    seed: '2 New Seasonal Seed Packets',
    priceBDT: 1500,
    priceUSD: 14,
    tag: 'Repeat Life Value',
    image: 'assets/images/architecture.jpg',
    notes: '100% Compostable Plant-Fiber Pods · Zero Waste',
    description: 'Never discard your wooden shell. Slide in fresh refills for only ৳1,500. Affordable, repeatable, and keeps your planter collection thriving.'
  }
];

// 30-Second Simulator Data (Page 3 of PDF)
const SIM_STEPS = [
  {
    number: 1,
    title: 'Stage 1: Daily Roll-On Freshness',
    subtitle: 'Days 1 - 60',
    desc: 'Smooth all-natural glide made with organic arrowroot, coconut oils, and essential fragrances. Provides 48-hour moisture and odor guard tested for Bangladesh’s humid climate.',
    icon: '🪵',
    progress: 20,
    badge: 'Dual-Function Shell',
    visualHTML: `
      <div style="font-size: 5rem; animation: floatAnim 3s ease-in-out infinite;">🧴</div>
      <div style="margin-top: 10px; font-weight:700; color:#D4AF37;">Handcrafted Solid Wood Shell with Brass Collar</div>
    `
  },
  {
    number: 2,
    title: 'Stage 2: Core Empties & Lifts Out',
    subtitle: 'The Scent is Finished',
    desc: 'When the deodorant stick finishes, the 100% biodegradable plant-fiber inner sleeve slides out in seconds. Zero plastic ends up in Dhaka or Chattogram landfills.',
    icon: '♻️',
    progress: 40,
    badge: '100% Biodegradable Core',
    visualHTML: `
      <div style="display:flex; gap:20px; align-items:center; justify-content:center;">
        <div style="font-size: 4rem;">🪵</div>
        <div style="font-size: 2.5rem; color:#D4AF37;">⬆️</div>
        <div style="font-size: 4rem; opacity:0.8;">🤍</div>
      </div>
      <div style="margin-top: 10px; font-weight:700; color:#B5C4BA;">Biodegradable Refill Core lifts out cleanly</div>
    `
  },
  {
    number: 3,
    title: 'Stage 3: Insert Drainage Disk & Soil Pod',
    subtitle: 'Transformation Begins',
    desc: 'Each La Vida wooden shell features built-in internal root aeration. Drop in the compressed organic coco-coir soil disk included in your box and add a few drops of water.',
    icon: '🪴',
    progress: 60,
    badge: 'Built-in Root Drainage',
    visualHTML: `
      <div style="font-size: 4.8rem;">🟤</div>
      <div style="margin-top: 10px; font-weight:700; color:#8BAE92;">Expanding Organic Soil Pod with Moisture Guard</div>
    `
  },
  {
    number: 4,
    title: 'Stage 4: Sow Your Companion Seeds',
    subtitle: 'Scent-Seed Sync',
    desc: 'Tear open your Kraft companion seed packet (Bergamot, Tulsi, Wild Lavender, or Marigold). Sprinkle 3-5 heirloom seeds just beneath the rich moist soil surface.',
    icon: '🌱',
    progress: 80,
    badge: 'Heirloom Seed Sync',
    visualHTML: `
      <div style="display:flex; gap:10px; align-items:center; justify-content:center;">
        <div style="font-size: 3.5rem;">💌</div>
        <div style="font-size: 2.2rem; color:#D4AF37;">✨</div>
        <div style="font-size: 3.5rem;">🌱</div>
      </div>
      <div style="margin-top: 10px; font-weight:700; color:#F1D78A;">Sowing Seeds: Tulsi · Lavender · Bergamot</div>
    `
  },
  {
    number: 5,
    title: 'Stage 5: Sprout & Blossom on Your Desk',
    subtitle: 'Finish the Scent. Plant the Seed.',
    desc: 'Within 5–8 days, green life emerges. Your personal care product is now a permanent living botanical ornament on your study table, work desk, or windowsill.',
    icon: '🌸',
    progress: 100,
    badge: 'Permanent Living Plant',
    visualHTML: `
      <div style="font-size: 5.5rem; animation: pulse 2s infinite;">🌿</div>
      <div style="margin-top: 10px; font-weight:700; color:#50E3C2;">Living Wooden Planter — Zero Waste Realized</div>
    `
  }
];

// Document Ready
document.addEventListener('DOMContentLoaded', () => {
  initStorage();
  renderProducts();
  setupEventListeners();
  renderSimulatorStep(0);
  initCustomizer();
  updateCartUI();
});

// Initialize LocalStorage for Cart
function initStorage() {
  try {
    const saved = localStorage.getItem('lavida_cart');
    if (saved) {
      STATE.cart = JSON.parse(saved);
    }
  } catch (e) {
    console.error('Storage error', e);
  }
}

function saveCart() {
  try {
    localStorage.setItem('lavida_cart', JSON.stringify(STATE.cart));
  } catch (e) {
    console.error('Storage error', e);
  }
}

// Render Product Grid
function renderProducts() {
  const container = document.getElementById('products-grid');
  if (!container) return;

  container.innerHTML = PRODUCTS.map(p => {
    const priceDisplay = STATE.currency === 'BDT' 
      ? `৳${p.priceBDT.toLocaleString()}` 
      : `$${p.priceUSD}`;

    return `
      <div class="product-card" data-id="${p.id}">
        <div class="product-thumb">
          <span class="product-shape-badge">${p.shape}</span>
          <img src="${p.image}" alt="${p.name}" loading="lazy" />
          <span class="product-pair-badge">🪴 + Seed Packet</span>
        </div>
        <div class="product-info">
          <div class="product-notes">${p.notes}</div>
          <h3 class="product-name">${p.name}</h3>
          <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 0.8rem; line-height: 1.5;">${p.description}</p>
          <div class="product-seed-tag">
            <span style="font-size: 1.1rem;">🌱</span>
            <span>Seed Pair: <strong>${p.seed}</strong></span>
          </div>
          <div class="product-footer">
            <div>
              <div class="product-price">${priceDisplay}</div>
              <div class="price-unit">${STATE.currency === 'BDT' ? 'Bangladeshi Taka' : 'USD'} · 0% Plastic</div>
            </div>
            <button class="btn btn-primary btn-sm add-to-cart-btn" onclick="addToCart('${p.id}')">
              <span>Add to Bag</span>
              <span>+</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Cart System Logic
function addToCart(productId, customQty = 1) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existing = STATE.cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += customQty;
  } else {
    STATE.cart.push({
      id: product.id,
      name: product.name,
      seed: product.seed,
      priceBDT: product.priceBDT,
      priceUSD: product.priceUSD,
      image: product.image,
      shape: product.shape,
      qty: customQty
    });
  }

  saveCart();
  updateCartUI();
  showToast(`Added "${product.name}" to your shopping bag!`);
  openCartDrawer();
}

function updateCartQty(productId, delta) {
  const item = STATE.cart.find(i => i.id === productId);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    STATE.cart = STATE.cart.filter(i => i.id !== productId);
  }

  saveCart();
  updateCartUI();
}

function removeCartItem(productId) {
  STATE.cart = STATE.cart.filter(i => i.id !== productId);
  saveCart();
  updateCartUI();
}

function updateCartUI() {
  const badge = document.getElementById('cart-badge');
  const countSpan = document.getElementById('cart-drawer-count');
  const listContainer = document.getElementById('cart-items-list');
  const subtotalEl = document.getElementById('cart-subtotal');
  const totalEl = document.getElementById('cart-total');
  const deliveryEl = document.getElementById('cart-delivery');
  const discountLine = document.getElementById('cart-discount-line');

  const totalItems = STATE.cart.reduce((sum, item) => sum + item.qty, 0);
  if (badge) badge.textContent = totalItems;
  if (countSpan) countSpan.textContent = totalItems;

  if (!listContainer) return;

  if (STATE.cart.length === 0) {
    listContainer.innerHTML = `
      <div class="cart-empty">
        <div style="font-size: 3rem; margin-bottom: 1rem;">🪴</div>
        <p style="font-weight: 600; color: var(--text-dark); margin-bottom: 0.5rem;">Your shopping bag is empty</p>
        <p style="font-size: 0.88rem; color: var(--text-muted);">Select your handcrafted wooden deodorant & heirloom seed pair above!</p>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = '৳0';
    if (totalEl) totalEl.textContent = '৳0';
    if (deliveryEl) deliveryEl.textContent = '৳0';
    if (discountLine) discountLine.style.display = 'none';
    return;
  }

  // Calculate pricing
  let subtotalBDT = 0;
  let subtotalUSD = 0;

  listContainer.innerHTML = STATE.cart.map(item => {
    subtotalBDT += item.priceBDT * item.qty;
    subtotalUSD += item.priceUSD * item.qty;

    const itemPrice = STATE.currency === 'BDT'
      ? `৳${(item.priceBDT * item.qty).toLocaleString()}`
      : `$${(item.priceUSD * item.qty)}`;

    return `
      <div class="cart-item">
        <img class="cart-item-img" src="${item.image}" alt="${item.name}" />
        <div class="cart-item-info">
          <div class="cart-item-title">${item.name}</div>
          <div class="cart-item-seed">🌱 ${item.seed}</div>
          <div class="cart-item-price">${itemPrice}</div>
          <div class="cart-item-actions">
            <button class="qty-btn" onclick="updateCartQty('${item.id}', -1)">-</button>
            <span class="qty-display">${item.qty}</span>
            <button class="qty-btn" onclick="updateCartQty('${item.id}', 1)">+</button>
            <button onclick="removeCartItem('${item.id}')" style="margin-left: auto; font-size: 0.75rem; color: #999; text-decoration: underline;">Remove</button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Delivery policy: Free delivery over ৳2,000 in Bangladesh
  let deliveryFee = subtotalBDT >= 2000 ? 0 : 80;
  let discountBDT = (subtotalBDT * STATE.discountPercent) / 100;
  let finalTotalBDT = subtotalBDT - discountBDT + deliveryFee;

  if (subtotalEl) {
    subtotalEl.textContent = STATE.currency === 'BDT' 
      ? `৳${subtotalBDT.toLocaleString()}` 
      : `$${subtotalUSD}`;
  }

  if (deliveryEl) {
    if (deliveryFee === 0) {
      deliveryEl.innerHTML = '<span style="color:#2E7D32; font-weight:700;">FREE (Orders over ৳2,000)</span>';
    } else {
      deliveryEl.textContent = `৳${deliveryFee}`;
    }
  }

  if (discountLine) {
    if (STATE.discountPercent > 0) {
      discountLine.style.display = 'flex';
      document.getElementById('cart-discount').textContent = `-৳${discountBDT.toLocaleString()} (${STATE.discountPercent}%)`;
    } else {
      discountLine.style.display = 'none';
    }
  }

  if (totalEl) {
    totalEl.textContent = STATE.currency === 'BDT'
      ? `৳${finalTotalBDT.toLocaleString()}`
      : `$${(subtotalUSD * (1 - STATE.discountPercent/100)).toFixed(2)}`;
  }
}

// Drawer Controls
function openCartDrawer() {
  document.getElementById('cart-drawer-backdrop')?.classList.add('open');
  document.getElementById('cart-drawer')?.classList.add('open');
}

function closeCartDrawer() {
  document.getElementById('cart-drawer-backdrop')?.classList.remove('open');
  document.getElementById('cart-drawer')?.classList.remove('open');
}

// Promo Code
function applyPromoCode() {
  const input = document.getElementById('promo-input');
  if (!input) return;
  const code = input.value.trim().toUpperCase();

  if (code === 'LIVEDA10' || code === 'BANGLADESH' || code === 'EID2026') {
    STATE.discountPercent = 10;
    STATE.activePromoCode = code;
    showToast(`🎉 Promo code "${code}" applied! 10% discount added.`);
    updateCartUI();
  } else if (code === '') {
    showToast('Please enter a voucher code.');
  } else {
    showToast('Invalid promo code. Try "BANGLADESH" or "LIVEDA10".');
  }
}

// 30-Second Simulator Logic (Page 3 of PDF)
function renderSimulatorStep(index) {
  STATE.currentSimStep = index;
  const step = SIM_STEPS[index];
  if (!step) return;

  // Update timeline buttons
  document.querySelectorAll('.timeline-step').forEach((el, i) => {
    if (i === index) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });

  // Update simulator card
  const titleEl = document.getElementById('sim-step-title');
  const subEl = document.getElementById('sim-step-sub');
  const descEl = document.getElementById('sim-step-desc');
  const visualEl = document.getElementById('sim-visual');
  const fillEl = document.getElementById('sim-progress-fill');
  const badgeEl = document.getElementById('sim-badge');

  if (titleEl) titleEl.textContent = step.title;
  if (subEl) subEl.textContent = step.subtitle;
  if (descEl) descEl.textContent = step.desc;
  if (visualEl) visualEl.innerHTML = step.visualHTML;
  if (fillEl) fillEl.style.width = `${step.progress}%`;
  if (badgeEl) badgeEl.textContent = step.badge;
}

function toggleAutoPlaySimulator() {
  const btn = document.getElementById('sim-play-btn');
  if (STATE.isSimPlaying) {
    // Pause
    clearInterval(STATE.simInterval);
    STATE.isSimPlaying = false;
    if (btn) btn.innerHTML = '<span>▶ Auto-Play 30s Journey</span>';
  } else {
    // Start
    STATE.isSimPlaying = true;
    if (btn) btn.innerHTML = '<span>⏸ Pause Simulation</span>';
    
    STATE.simInterval = setInterval(() => {
      let next = (STATE.currentSimStep + 1) % SIM_STEPS.length;
      renderSimulatorStep(next);
      if (next === SIM_STEPS.length - 1) {
        // completed loop
      }
    }, 4000);
  }
}

// Architecture Interactive Card (Page 2 of PDF)
function selectArchCard(index) {
  document.querySelectorAll('.arch-card').forEach((card, idx) => {
    if (idx === index) {
      card.classList.add('active');
    } else {
      card.classList.remove('active');
    }
  });

  const overlayText = document.getElementById('arch-stage-indicator');
  const stages = [
    'Stage 1: Solid Light Wood Shell with Brass Collar',
    'Stage 2: Removable Biodegradable Core Sleeve',
    'Stage 3: Transformed Indoor Desk Planter with Root Drainage'
  ];
  if (overlayText) overlayText.textContent = stages[index] || stages[0];
}

// Customizer Logic (Product Builder)
function initCustomizer() {
  const shapeBtns = document.querySelectorAll('.shape-opt-btn');
  const scentBtns = document.querySelectorAll('.scent-opt-btn');
  const woodBtns = document.querySelectorAll('.wood-opt-btn');

  function updateCustomPreview() {
    const activeShape = document.querySelector('.shape-opt-btn.active')?.dataset.val || 'Round';
    const activeScent = document.querySelector('.scent-opt-btn.active')?.dataset.val || 'Bergamot';
    const activeWood = document.querySelector('.wood-opt-btn.active')?.dataset.val || 'Oak';

    const titleEl = document.getElementById('custom-stick-title');
    const seedEl = document.getElementById('custom-seed-match');
    const priceEl = document.getElementById('custom-price-tag');

    let seedName = 'Bergamot Citrus Seeds';
    let price = 1650;

    if (activeScent === 'Lavender') {
      seedName = 'Wild Lavender Seeds';
      price = 1750;
    } else if (activeScent === 'Eucalyptus') {
      seedName = 'Eucalyptus Seeds';
      price = 1850;
    } else if (activeScent === 'Tulsi') {
      seedName = 'Sacred Krishna Tulsi Seeds';
      price = 1950;
    } else if (activeScent === 'Sandalwood') {
      seedName = 'Golden Marigold Seeds';
      price = 1950;
    }

    if (titleEl) titleEl.textContent = `${activeShape} Shell (${activeWood}) · ${activeScent}`;
    if (seedEl) seedEl.textContent = `Includes: ${seedName} + Organic Soil Coin`;
    if (priceEl) priceEl.textContent = `৳${price.toLocaleString()}`;
  }

  shapeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      shapeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      updateCustomPreview();
    });
  });

  scentBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      scentBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      updateCustomPreview();
    });
  });

  woodBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      woodBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      updateCustomPreview();
    });
  });
}

function addCustomStickToCart() {
  const activeShape = document.querySelector('.shape-opt-btn.active')?.dataset.val || 'Round';
  const activeScent = document.querySelector('.scent-opt-btn.active')?.dataset.val || 'Bergamot';
  const activeWood = document.querySelector('.wood-opt-btn.active')?.dataset.val || 'Oak';

  let baseProduct = PRODUCTS[0];
  if (activeScent === 'Lavender') baseProduct = PRODUCTS[1];
  if (activeScent === 'Eucalyptus') baseProduct = PRODUCTS[2];
  if (activeScent === 'Tulsi') baseProduct = PRODUCTS[3];
  if (activeScent === 'Sandalwood') baseProduct = PRODUCTS[4];

  addToCart(baseProduct.id, 1);
  showToast(`Custom ${activeShape} ${activeWood} (${activeScent}) added to bag!`);
}

// Plastic Saved Eco Impact Calculator
function updateEcoCalculator() {
  const slider = document.getElementById('months-slider');
  const countEl = document.getElementById('slider-months-val');
  const plasticEl = document.getElementById('eco-plastic-saved');
  const plantEl = document.getElementById('eco-plants-grown');
  const co2El = document.getElementById('eco-co2-reduced');

  if (!slider) return;
  const months = parseInt(slider.value, 10);
  if (countEl) countEl.textContent = `${months} Months`;

  const plasticCans = Math.round(months * 1.5);
  const planters = Math.max(1, Math.floor(months / 2));
  const gramsCo2 = plasticCans * 340;

  if (plasticEl) plasticEl.textContent = `${plasticCans} Bottles`;
  if (plantEl) plantEl.textContent = `${planters} Live Plants`;
  if (co2El) co2El.textContent = `${(gramsCo2 / 1000).toFixed(1)} kg CO₂`;
}

// Checkout Modal & Bangladesh Payment Simulator
function openCheckoutModal() {
  if (STATE.cart.length === 0) {
    showToast('Your shopping bag is empty. Please add a product first!');
    return;
  }
  closeCartDrawer();
  const modal = document.getElementById('checkout-modal');
  if (modal) {
    modal.classList.add('open');
    updateCheckoutSummary();
  }
}

function closeCheckoutModal() {
  document.getElementById('checkout-modal')?.classList.remove('open');
}

function selectPaymentMethod(method) {
  document.querySelectorAll('.pay-option').forEach(el => {
    el.classList.remove('selected', 'nagad-sel', 'cod-sel');
  });

  const target = document.getElementById(`pay-opt-${method}`);
  if (target) {
    if (method === 'bkash') target.classList.add('selected');
    if (method === 'nagad') target.classList.add('selected', 'nagad-sel');
    if (method === 'cod') target.classList.add('selected', 'cod-sel');
  }

  const bkashBox = document.getElementById('bkash-details-box');
  const nagadBox = document.getElementById('nagad-details-box');
  const codBox = document.getElementById('cod-details-box');

  if (bkashBox) bkashBox.style.display = method === 'bkash' ? 'block' : 'none';
  if (nagadBox) nagadBox.style.display = method === 'nagad' ? 'block' : 'none';
  if (codBox) codBox.style.display = method === 'cod' ? 'block' : 'none';
}

function updateCheckoutSummary() {
  const totalBDT = STATE.cart.reduce((sum, item) => sum + item.priceBDT * item.qty, 0);
  const discountBDT = (totalBDT * STATE.discountPercent) / 100;
  const delivery = totalBDT >= 2000 ? 0 : 80;
  const grandTotal = totalBDT - discountBDT + delivery;

  const totalEl = document.getElementById('checkout-grand-total');
  if (totalEl) totalEl.textContent = `৳${grandTotal.toLocaleString()}`;
}

function processOrder(e) {
  e.preventDefault();

  const name = document.getElementById('order-name')?.value;
  const phone = document.getElementById('order-phone')?.value;
  const address = document.getElementById('order-address')?.value;
  const district = document.getElementById('order-district')?.value;

  if (!name || !phone || !address) {
    alert('Please enter your full name, mobile number and delivery address.');
    return;
  }

  // Order Reference Generator
  const orderId = 'LV-' + Math.floor(100000 + Math.random() * 900000);
  
  // Show confirmation state
  const modalBody = document.querySelector('#checkout-modal .modal-body');
  if (modalBody) {
    modalBody.innerHTML = `
      <div style="text-align: center; padding: 2rem 1rem;">
        <div style="font-size: 4.5rem; margin-bottom: 1rem;">🌱🪴</div>
        <h2 style="font-family: var(--font-serif); font-size: 2rem; color: var(--accent-forest); margin-bottom: 0.5rem;">Shukriya! Order Confirmed</h2>
        <div style="background: rgba(42, 72, 54, 0.08); display: inline-block; padding: 0.4rem 1.2rem; border-radius: 99px; font-weight: 700; color: var(--wood-walnut); margin-bottom: 1.5rem;">
          Order ID: ${orderId}
        </div>
        <p style="font-size: 1rem; color: var(--text-dark); margin-bottom: 1rem;">
          Thank you <strong>${name}</strong> for joining the zero-waste movement in Bangladesh!
        </p>
        <div style="background: #FFF; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.2rem; text-align: left; margin-bottom: 1.5rem; font-size: 0.9rem;">
          <p><strong>Delivery To:</strong> ${address}, ${district}</p>
          <p><strong>Contact Phone:</strong> ${phone}</p>
          <p><strong>Estimated Delivery:</strong> 24-48 hrs in Dhaka, 3 days outside Dhaka</p>
          <p style="margin-top: 0.5rem; color: var(--accent-forest);"><strong>Package Includes:</strong> Solid wood deodorant stick + companion seeds + coco soil pod.</p>
        </div>
        <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 2rem;">
          A confirmation SMS has been dispatched to ${phone}. Finish the scent, plant the seed!
        </p>
        <button class="btn btn-primary" onclick="location.reload()">Return to Homepage</button>
      </div>
    `;
  }

  // Clear cart
  STATE.cart = [];
  saveCart();
  updateCartUI();
}

// Toast Notification
function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<span>🪴</span> <span>${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

// Currency Switcher
function setCurrency(currency) {
  STATE.currency = currency;
  renderProducts();
  updateCartUI();
  const badge = document.querySelector('.currency-badge');
  if (badge) badge.textContent = currency;
  showToast(`Switched currency to ${currency}`);
}

// Setup Event Listeners
function setupEventListeners() {
  // Mobile nav toggle
  const toggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (toggle && navMenu) {
    toggle.addEventListener('click', () => {
      navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
      navMenu.style.flexDirection = 'column';
      navMenu.style.position = 'absolute';
      navMenu.style.top = '100%';
      navMenu.style.left = '0';
      navMenu.style.width = '100%';
      navMenu.style.background = '#FAF8F2';
      navMenu.style.padding = '1.5rem';
      navMenu.style.borderBottom = '1px solid #D5CEBE';
    });
  }

  // Eco slider
  const slider = document.getElementById('months-slider');
  if (slider) {
    slider.addEventListener('input', updateEcoCalculator);
  }
}
