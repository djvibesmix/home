(function() {
  const CONFIG = {
    TELEGRAM_USERNAME: 'djvibesmix09',
    POPUP_DELAY: 1000,
    IMAGE_PATH: 'image/', // Image folder path (matches ./image directory)
    BUNDLE: {
      name: 'All in One Bundle',
      price: '₹999',
      oldPrice: '₹4999',
      songs: '7000+',
      rating: 5.0
    },
    REGULAR: {
      price: '₹199',
      oldPrice: '₹299',
      songs: '250+'
    }
  };

  const PRODUCTS = [
    "Holi Dhamaka 150 BPM Pack", "New Bollywood", "New Wedding", "Haldi Ceremony",
    "Punjabi Latest Extended Pack", "Bhojpuri Power Dance Collection", "CG New Song DJ Remix Pack",
    "CG Folk Fusion DJ Mix", "Ram Navmi Bhakti Bass Pack", "Mandla Festival DJ Collection",
    "Hindi Party Nonstop 2026", "English Club Vibe Extended Mix", "Bollywood Love Mashup Pro",
    "Sambalpuri Trol Dance Mix", "DJ Bass Booster Ultimate Pack", "Navratri Garba Energy Mix",
    "Ganpati Visarjan DJ Thunder", "Ladies Sangeet Dance Hits", "Baraat Entry Blast Edition",
    "EDM Night 150 BPM Special", "Desi Hip Hop Party Drop", "South Indian Mass DJ Mix",
    "Trap & Trol Bass Machine", "Romantic Reverb Slow Jams", "Instrumental DJ Pro Edits",
    "Independence Day Desh Bhakti Mix", "Birthday Bash Celebration Pack", "New Year Countdown DJ Blast",
    "90s Bollywood Retro Reboot", "Haryanvi Dance Floor Pack", "Club House Electro Vibes",
    "Item Song High Energy Mix", "Sufi Night Spiritual Beats", "Wedding Grand Entry Pro"
  ];

  const elements = {
    popup: document.getElementById('popupOverlay'),
    productSection: document.getElementById('product-section'),
    container: document.getElementById('productGrid'),
    popupYes: document.getElementById('popupYes'),
    popupNo: document.getElementById('popupNo'),
    homeBuyBtn: document.getElementById('homeBuyBtn')
  };

  let showBuyButtons = true;

  function openTelegramDM(productName, price) {
    try {
      const message = `I NEED ${productName} - ${price}`;
      const url = `https://t.me/${CONFIG.TELEGRAM_USERNAME}?text=${encodeURIComponent(message)}`;
      
      const newWindow = window.open(url, '_blank');
      if (!newWindow) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Failed to open Telegram:', error);
      alert('Unable to open Telegram. Please contact us directly at @djvibesmix09');
    }
  }

  function getRandomRating() {
    return (4 + Math.random()).toFixed(1);
  }

  function getStars(rating) {
    const num = parseFloat(rating);
    const fullStars = Math.floor(num);
    const hasHalfStar = num - fullStars >= 0.5;
    
    let stars = '<i class="fas fa-star"></i>'.repeat(fullStars);
    if (hasHalfStar) {
      stars += '<i class="fas fa-star-half-alt"></i>';
    }
    return stars;
  }

  function getImagePath(productName) {
    // Directly use the product name as filename with .png extension
    // Encode URI components to handle special characters like &, spaces, etc.
    return `${CONFIG.IMAGE_PATH}${encodeURIComponent(productName)}.png`;
  }

  function handleImageError(img, productName) {
    console.warn(`Image not found: ${productName}.png`);
    
    // Create fallback colored SVG with product name
    const hash = productName.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
    const color = ((hash * 123456) % 0xFFFFFF).toString(16).padStart(6, '0');
    const displayName = productName.substring(0, 15); // Show more characters
    
    img.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23${color}'/%3E%3Ctext x='20' y='120' fill='%23ffffff' font-size='16'%3E${encodeURIComponent(displayName)}%3C/text%3E%3C/svg%3E`;
  }

  function createBundleCard() {
    const card = document.createElement('div');
    card.className = 'product-card';

    const bundleImagePath = getImagePath(CONFIG.BUNDLE.name);

    card.innerHTML = `
      <div class="product-image">
        <img src="${bundleImagePath}" 
             alt="All in One Bundle" 
             loading="lazy" 
             onerror="this.onerror=null; this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'200\\' height=\\'200\\' viewBox=\\'0 0 200 200\\'%3E%3Crect width=\\'200\\' height=\\'200\\' fill=\\'%23c62828\\'/%3E%3Ctext x=\\'30\\' y=\\'120\\' fill=\\'%23ffffff\\' font-size=\\'20\\' font-weight=\\'bold\\'%3EBUNDLE%3C/text%3E%3C/svg%3E'">
      </div>
      <div class="product-content">
        <div class="product-name">⭐ ALL IN ONE BUNDLE (40 Packs)</div>
        <div class="rating-stars">${'<i class="fas fa-star"></i>'.repeat(5)} <span>(${CONFIG.BUNDLE.rating})</span></div>
        <div class="songs-badge">${CONFIG.BUNDLE.songs} songs</div>
        <div class="product-desc">🎧 320K MP3 • Complete Collection</div>
        <div class="price-block">
          <span class="old-price">${CONFIG.BUNDLE.oldPrice}</span>
          <span class="new-price">${CONFIG.BUNDLE.price}</span>
        </div>
    `;

    if (showBuyButtons) {
      const buyBtn = document.createElement('button');
      buyBtn.className = 'card-btn';
      buyBtn.textContent = 'Buy Bundle';
      buyBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openTelegramDM(CONFIG.BUNDLE.name, CONFIG.BUNDLE.price);
      });
      card.querySelector('.product-content').appendChild(buyBtn);
    }

    return card;
  }

  function createProductCard(productName) {
    const card = document.createElement('div');
    card.className = 'product-card';
    const rating = getRandomRating();
    const imagePath = getImagePath(productName);

    card.innerHTML = `
      <div class="product-image">
        <img src="${imagePath}" 
             alt="${productName}" 
             loading="lazy" 
             onerror="this.onerror=null; (function(img) { 
               var hash = '${productName}'.split('').reduce(function(acc, char) { return char.charCodeAt(0) + acc; }, 0);
               var color = ((hash * 123456) % 0xFFFFFF).toString(16).padStart(6, '0');
               img.src = 'data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'200\\' height=\\'200\\' viewBox=\\'0 0 200 200\\'%3E%3Crect width=\\'200\\' height=\\'200\\' fill=\\'%23' + color + '\\'/%3E%3Ctext x=\\'20\\' y=\\'120\\' fill=\\'%23ffffff\\' font-size=\\'16\\'%3E${encodeURIComponent(productName.substring(0, 15))}%3C/text%3E%3C/svg%3E';
             })(this)">
      </div>
      <div class="product-content">
        <div class="product-name">${productName}</div>
        <div class="rating-stars">${getStars(rating)} <span>(${rating})</span></div>
        <div class="songs-badge">${CONFIG.REGULAR.songs} songs</div>
        <div class="product-desc">🎧 320K MP3</div>
        <div class="price-block">
          <span class="old-price">${CONFIG.REGULAR.oldPrice}</span>
          <span class="new-price">${CONFIG.REGULAR.price}</span>
        </div>
    `;

    if (showBuyButtons) {
      const buyBtn = document.createElement('button');
      buyBtn.className = 'card-btn';
      buyBtn.textContent = 'Buy Now';
      buyBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openTelegramDM(productName, CONFIG.REGULAR.price);
      });
      card.querySelector('.product-content').appendChild(buyBtn);
    }

    return card;
  }

  function renderProducts() {
    if (!elements.container) return;
    
    const fragment = document.createDocumentFragment();
    
    fragment.appendChild(createBundleCard());
    
    PRODUCTS.forEach(product => {
      fragment.appendChild(createProductCard(product));
    });
    
    elements.container.innerHTML = '';
    elements.container.appendChild(fragment);
  }

  function initEventListeners() {
    elements.popupYes.addEventListener('click', () => {
      elements.popup.classList.remove('show');
      showBuyButtons = true;
      renderProducts();
      elements.productSection.scrollIntoView({ behavior: 'smooth' });
    });

    elements.popupNo.addEventListener('click', () => {
      elements.popup.classList.remove('show');
      showBuyButtons = false;
      renderProducts();
    });

    elements.homeBuyBtn.addEventListener('click', () => {
      elements.productSection.scrollIntoView({ behavior: 'smooth' });
    });
  }

  function init() {
    initEventListeners();
    
    setTimeout(() => {
      elements.popup.classList.add('show');
    }, CONFIG.POPUP_DELAY);
    
    renderProducts();
  }

  init();
})();
