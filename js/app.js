/* ── API Config ──────────────────────────────────────────────────────────────
   Relative path — works because the frontend is served by the same Express
   server that handles the API. No CORS issues, no hardcoded ports.
   ─────────────────────────────────────────────────────────────────────────── */
const API_BASE = '/api';

/* ── Utility: fetch wrapper ────────────────────────────────────────────────── */
async function apiFetch(endpoint) {
  const res = await fetch(`${API_BASE}${endpoint}`);
  if (!res.ok) throw new Error(`API error ${res.status}: ${endpoint}`);
  return res.json();
}

/* ── Utility: toast ────────────────────────────────────────────────────────── */
function showToast(msg) {
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  document.body.appendChild(t);
  requestAnimationFrame(() => t.classList.add('show'));
  setTimeout(() => {
    t.classList.remove('show');
    setTimeout(() => t.remove(), 400);
  }, 3500);
}

/* ── Particles ─────────────────────────────────────────────────────────────── */
(function spawnParticles() {
  const c = document.getElementById('heroParticles');
  if (!c) return;
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const s = Math.random() * 4 + 2;
    p.style.cssText = `width:${s}px;height:${s}px;left:${Math.random() * 100}%;` +
      `animation-duration:${Math.random() * 12 + 8}s;animation-delay:${Math.random() * 8}s;`;
    c.appendChild(p);
  }
})();

/* ── Navbar ─────────────────────────────────────────────────────────────────── */
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 40);
});
function toggleNav() {
  document.getElementById('navLinks').classList.toggle('open');
}

/* ── Scroll animations ─────────────────────────────────────────────────────── */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-in-up').forEach(el => io.observe(el));

/* ── Map ────────────────────────────────────────────────────────────────────── */
const mapColors = { open: '#22c55e', busy: '#eab308', closed: '#ef4444', gem: '#a855f7' };
let leafletMap;
let allMarkers = [];

function mkIcon(color) {
  return L.divIcon({
    className: '',
    html: `<div style="width:16px;height:16px;border-radius:50%;background:${color};border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.35);"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
}

function buildPopup(p) {
  const col = mapColors[p.type];
  const typeLabel = { open: 'Open & Safe', busy: 'High Crowd', closed: 'Closed ⛔', gem: '🔮 Hidden Gem' }[p.type];
  const crowdCol = p.crowd === 'Low' ? '#22c55e' : p.crowd === 'Medium' ? '#eab308' : p.crowd === 'High' ? '#ef4444' : '#94a3b8';
  return `<div style="font-family:Poppins,sans-serif;min-width:220px;padding:4px;">
    <div style="font-size:1rem;font-weight:800;color:#0f172a;margin-bottom:8px;">${p.name}</div>
    <div style="font-size:0.76rem;background:${col}22;color:${col};border:1px solid ${col}44;padding:3px 8px;border-radius:20px;display:inline-block;margin-bottom:10px;font-weight:700;">${typeLabel}</div>
    <table style="width:100%;font-size:0.8rem;border-collapse:collapse;">
      <tr><td style="color:#64748b;padding:3px 0;">Status</td><td style="font-weight:600;">${p.type === 'closed' ? '🔴 Closed' : '🟢 Open'}</td></tr>
      <tr><td style="color:#64748b;padding:3px 0;">Safety</td><td style="font-weight:600;color:#0f766e;">${p.safety ? p.safety + '/10 ✅' : 'N/A'}</td></tr>
      <tr><td style="color:#64748b;padding:3px 0;">Crowd</td><td style="font-weight:600;color:${crowdCol};">${p.crowd}</td></tr>
      <tr><td style="color:#64748b;padding:3px 0;">Best Time</td><td style="font-weight:600;">${p.bestTime}</td></tr>
    </table>
    <div style="margin-top:10px;font-size:0.78rem;color:#475569;line-height:1.5;">${p.desc}</div>
  </div>`;
}

async function initMap() {
  leafletMap = L.map('map', { center: [22.5, 82.0], zoom: 5 });
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 18,
  }).addTo(leafletMap);

  try {
    const places = await apiFetch('/places');
    places.forEach(p => {
      const col = mapColors[p.type];
      const m = L.marker([p.lat, p.lng], { icon: mkIcon(col) }).addTo(leafletMap);
      m.bindPopup(buildPopup(p), { maxWidth: 280 });
      allMarkers.push({ marker: m, type: p.type });
    });
  } catch (err) {
    console.error('Could not load map places:', err.message);
  }
}

function filterMap(type, btn) {
  document.querySelectorAll('.map-filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  allMarkers.forEach(({ marker, type: mt }) => {
    if (type === 'all' || type === mt) {
      if (!leafletMap.hasLayer(marker)) marker.addTo(leafletMap);
    } else {
      if (leafletMap.hasLayer(marker)) leafletMap.removeLayer(marker);
    }
  });
}

/* ── Scam Alerts ────────────────────────────────────────────────────────────── */
async function loadScamAlerts() {
  const container = document.getElementById('scamAlertsList');
  if (!container) return;

  try {
    const alerts = await apiFetch('/scam-alerts');
    container.innerHTML = alerts.map(a => `
      <div class="scam-alert">
        <div class="scam-alert-icon a-${a.severity}"><i class="fas ${a.icon}"></i></div>
        <div>
          <div class="scam-alert-text">${a.text}</div>
          <div class="scam-alert-time">${a.time} · ${a.location}</div>
        </div>
      </div>`).join('');

    // Re-observe new elements for scroll animation
    container.querySelectorAll('.scam-alert').forEach(el => io.observe(el));
  } catch (err) {
    console.error('Could not load scam alerts:', err.message);
    container.innerHTML = '<p style="color:rgba(255,255,255,0.5);font-size:0.85rem;">Unable to load alerts right now.</p>';
  }
}

/* ── Guides ─────────────────────────────────────────────────────────────────── */
function starsHtml(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  let s = '★'.repeat(full);
  if (half) s += '½';
  return s;
}

function guideCardHtml(g) {
  return `
    <div class="guide-card fade-in-up">
      <div class="guide-card-header">
        ${g.verified ? '<div class="guide-verified"><i class="fas fa-check"></i> Verified</div>' : ''}
        <img class="guide-avatar" src="${g.avatar}" alt="${g.name}" />
        <div class="guide-name">${g.name}</div>
        <div class="guide-location"><i class="fas fa-map-marker-alt"></i> ${g.location}</div>
      </div>
      <div class="guide-card-body">
        <div class="guide-stars">${starsHtml(g.rating)} <span>${g.rating} (${g.reviews} reviews)</span></div>
        <div class="guide-langs"><i class="fas fa-language"></i> ${g.languages.join(', ')}</div>
        <div class="guide-tours">🗺️ ${g.tours.join(' · ')}</div>
        <div class="guide-price">₹${g.pricePerDay.toLocaleString('en-IN')} <span>/ day</span></div>
        <button class="btn-book" onclick="openBookingModal('${g.name.replace(/'/g, "\\'")} — Guide')">📅 Book Now</button>
      </div>
    </div>`;
}

async function loadGuides() {
  const grid = document.getElementById('guidesGrid');
  if (!grid) return;

  // Show skeletons while loading
  grid.innerHTML = Array(4).fill('<div class="skeleton skeleton-card"></div>').join('');

  try {
    const guides = await apiFetch('/guides');
    grid.innerHTML = guides.map(guideCardHtml).join('');
    grid.querySelectorAll('.fade-in-up').forEach(el => io.observe(el));
  } catch (err) {
    console.error('Could not load guides:', err.message);
    grid.innerHTML = '<p style="color:var(--gray-600);grid-column:1/-1;text-align:center;">Unable to load guides right now.</p>';
  }
}

/* ── Experiences ────────────────────────────────────────────────────────────── */
function experienceCardHtml(e) {
  const durIcon = e.durationType === 'moon' ? 'fa-moon' : 'fa-clock';
  return `
    <div class="exp-card fade-in-up" onclick="openBookingModal('${e.title.replace(/'/g, "\\'")}')">
      <div class="exp-card-img" style="background:${e.bgGradient};">
        ${e.emoji}
        <span class="exp-badge">${e.badge}</span>
      </div>
      <div class="exp-card-body">
        <div class="exp-card-title">${e.title}</div>
        <div class="exp-card-desc">${e.description}</div>
        <div class="exp-card-meta">
          <div class="exp-card-price">₹${e.pricePerPerson.toLocaleString('en-IN')} <small style="color:var(--gray-400);font-weight:400;">/person</small></div>
          <div class="exp-card-dur"><i class="fas ${durIcon}"></i> ${e.duration}</div>
        </div>
      </div>
    </div>`;
}

async function loadExperiences() {
  const grid = document.getElementById('experiencesGrid');
  if (!grid) return;

  grid.innerHTML = Array(6).fill('<div class="skeleton skeleton-card"></div>').join('');

  try {
    const experiences = await apiFetch('/experiences');
    grid.innerHTML = experiences.map(experienceCardHtml).join('');
    grid.querySelectorAll('.fade-in-up').forEach(el => io.observe(el));
  } catch (err) {
    console.error('Could not load experiences:', err.message);
    grid.innerHTML = '<p style="color:var(--gray-600);grid-column:1/-1;text-align:center;">Unable to load experiences right now.</p>';
  }
}

/* ── Booking Modal ──────────────────────────────────────────────────────────── */
let currentBookingItem = '';

function openBookingModal(name) {
  currentBookingItem = name;
  document.getElementById('bookingModalSub').textContent = `Booking: ${name}`;
  document.getElementById('bookingForm').reset();
  document.getElementById('bookingModal').classList.add('open');
}

function closeModal(id) {
  document.getElementById(id).classList.remove('open');
}

async function submitBooking(e) {
  e.preventDefault();
  const btn = document.getElementById('bookingSubmitBtn');
  btn.disabled = true;
  btn.textContent = 'Submitting…';

  const payload = {
    name:            document.getElementById('bookingName').value.trim(),
    email:           document.getElementById('bookingEmail').value.trim(),
    phone:           document.getElementById('bookingPhone').value.trim(),
    people:          parseInt(document.getElementById('bookingPeople').value, 10) || 1,
    date:            document.getElementById('bookingDate').value || null,
    specialRequests: document.getElementById('bookingRequests').value.trim(),
    itemName:        currentBookingItem,
  };

  try {
    const res = await fetch(`${API_BASE}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Booking failed');

    closeModal('bookingModal');
    showToast(data.message);
  } catch (err) {
    showToast('❌ ' + err.message);
  } finally {
    btn.disabled = false;
    btn.textContent = 'Confirm Booking';
  }
}

// Close modals when clicking the backdrop
document.querySelectorAll('.modal-overlay').forEach(m => {
  m.addEventListener('click', function (e) {
    if (e.target === this) this.classList.remove('open');
  });
});

/* ── Init ───────────────────────────────────────────────────────────────────── */
window.addEventListener('load', () => {
  initMap();
  loadScamAlerts();
  loadGuides();
  loadExperiences();
});
