/* ── API Config ──────────────────────────────────────────────────────────────
   Set this to your live backend URL once deployed (e.g. Railway / Render).
   Leave as null to use built-in static data (works on Vercel with no backend).
   ─────────────────────────────────────────────────────────────────────────── */
const API_BASE = null; // e.g. 'https://your-backend.up.railway.app/api'

/* ── Static Data (used when API_BASE is null) ────────────────────────────── */
const STATIC = {
  places: [
    {id:1, name:'Taj Mahal',           lat:27.1751,lng:78.0421,type:'open',  crowd:'Medium',safety:9,  bestTime:'Sunrise (6–8 AM)',     desc:'Iconic white marble mausoleum, UNESCO World Heritage Site.'},
    {id:2, name:'Jaipur City Palace',   lat:26.9257,lng:75.8235,type:'busy',  crowd:'High',  safety:8,  bestTime:'Morning (9–11 AM)',     desc:'Royal palace complex in the heart of the Pink City.'},
    {id:3, name:'Varanasi Ghats',       lat:25.3176,lng:82.9739,type:'busy',  crowd:'High',  safety:7,  bestTime:'Dawn Aarti (5–6 AM)',   desc:'Ancient city on the Ganges with iconic stepped riverbanks.'},
    {id:4, name:'Kerala Backwaters',    lat:9.4981, lng:76.3388,type:'open',  crowd:'Low',   safety:9,  bestTime:'Morning (8–10 AM)',     desc:'Tranquil network of canals, lagoons, and lakes in coastal Kerala.'},
    {id:5, name:'Hampi Ruins',          lat:15.3350,lng:76.4600,type:'open',  crowd:'Low',   safety:8,  bestTime:'Sunrise / Sunset',      desc:'Stunning ruins of the Vijayanagara Empire set among boulders.'},
    {id:6, name:'Rann of Kutch',        lat:23.7337,lng:69.8597,type:'open',  crowd:'Low',   safety:9,  bestTime:'Oct–Feb (Rann Utsav)',  desc:'Vast white salt desert, magical at full moon.'},
    {id:7, name:'Khajuraho Temples',    lat:24.8318,lng:79.9199,type:'open',  crowd:'Low',   safety:9,  bestTime:'Morning (7–11 AM)',     desc:'Famous medieval temples with intricate sculpture art.'},
    {id:8, name:'Ajanta Caves',         lat:20.5519,lng:75.7033,type:'closed',crowd:'N/A',   safety:null,bestTime:'Currently Closed',    desc:'Ancient Buddhist cave monuments currently under renovation.'},
    {id:9, name:'Leh Palace, Ladakh',   lat:34.1642,lng:77.5847,type:'open',  crowd:'Low',   safety:8,  bestTime:'Morning (9 AM–1 PM)',   desc:'Nine-storey palace above Leh with panoramic Himalayan views.'},
    {id:10,name:'Sundarbans',           lat:21.9497,lng:88.8796,type:'open',  crowd:'Medium',safety:7,  bestTime:'Oct–Mar',               desc:"World's largest mangrove forest, home to the Royal Bengal Tiger."},
    {id:11,name:'Coorg Coffee Estates', lat:12.3375,lng:75.8069,type:'gem',   crowd:'Low',   safety:9,  bestTime:'Year-round',            desc:'Lush coffee and spice plantations in the misty Western Ghats.'},
    {id:12,name:'Ziro Valley, Arunachal',lat:27.5330,lng:93.8278,type:'gem',  crowd:'Low',   safety:9,  bestTime:'Sep–Oct',               desc:'Serene valley of the Apatani tribe with unique paddy-fish farming.'},
    {id:13,name:'Mawlynnong Village',   lat:25.2020,lng:91.9120,type:'gem',   crowd:'Low',   safety:10, bestTime:'Year-round',            desc:"Asia's Cleanest Village with living root bridges."},
    {id:14,name:'Spiti Valley',         lat:32.2461,lng:78.0338,type:'open',  crowd:'Low',   safety:8,  bestTime:'May–Oct',               desc:'Cold desert mountain valley with ancient monasteries in Himachal.'},
    {id:15,name:'Gokarna Beach',        lat:14.5479,lng:74.3188,type:'open',  crowd:'Medium',safety:8,  bestTime:'Oct–Mar',               desc:'Pristine beaches and the sacred Mahabaleshwara temple.'},
    {id:16,name:'Majuli Island',        lat:26.9503,lng:94.1793,type:'gem',   crowd:'Low',   safety:9,  bestTime:'Oct–Apr',               desc:"World's largest river island on Brahmaputra with rare birds."},
    {id:17,name:'Chopta, Uttarakhand',  lat:30.5133,lng:79.3085,type:'gem',   crowd:'Low',   safety:9,  bestTime:'Mar–Jun / Sep–Nov',     desc:'"Mini Switzerland of India" — meadows and views of Trishul peak.'},
  ],
  guides: [
    {id:1,name:'Rajesh Kumar',  location:'Jaipur, Rajasthan',  avatar:'https://ui-avatars.com/api/?name=Rajesh+Kumar&background=0f766e&color=fff&size=140', rating:4.9,reviews:312,languages:['Hindi','English'],    tours:['Heritage Palace Tours','Fort Walks','Artisan Village Tours','Sunset Photography'],pricePerDay:1500,verified:true},
    {id:2,name:'Priya Nair',    location:'Alleppey, Kerala',    avatar:'https://ui-avatars.com/api/?name=Priya+Nair&background=d97706&color=fff&size=140',   rating:4.8,reviews:275,languages:['Malayalam','English'], tours:['Backwater Houseboat','Spice Plantation','Kathakali Shows','Ayurveda Village'],  pricePerDay:1800,verified:true},
    {id:3,name:'Tenzin Dorje',  location:'Leh, Ladakh',         avatar:'https://ui-avatars.com/api/?name=Tenzin+Dorje&background=7c3aed&color=fff&size=140',  rating:4.9,reviews:198,languages:['Ladakhi','Hindi','English'],tours:['Himalayan Treks','Monastery Circuits','Pangong Lake','Snow Leopard Safari'],pricePerDay:2000,verified:true},
    {id:4,name:'Ananya Sharma', location:'Varanasi, UP',         avatar:'https://ui-avatars.com/api/?name=Ananya+Sharma&background=dc2626&color=fff&size=140', rating:4.7,reviews:420,languages:['Hindi','English','French'],tours:['Ganga Aarti','Ghats Boat Tours','Temple Circuits','Silk Weaving Workshops'],pricePerDay:1200,verified:true},
  ],
  experiences: [
    {id:1,title:'Old Delhi Street Food Safari',    description:'Walk through Chandni Chowk tasting paranthe, jalebis, chaat, and chai with a local foodie guide.',                                    emoji:'🍛',badge:'🔥 Most Popular',bgGradient:'linear-gradient(135deg,#fef3c7,#fde68a)',pricePerPerson:799, duration:'3 hrs',  durationType:'clock'},
    {id:2,title:'Hampi Sunrise Trek & Ruins Walk', description:'Catch sunrise from Matanga Hill then explore Vijayanagara ruins with an archaeologist-guide.',                                         emoji:'🥾',badge:'⭐ Top Rated',   bgGradient:'linear-gradient(135deg,#d1fae5,#a7f3d0)',pricePerPerson:1299,duration:'5 hrs',  durationType:'clock'},
    {id:3,title:'Meghalaya Village Homestay',      description:"Stay with a Khasi family in Mawlynnong — Asia's cleanest village. Cook local meals, explore root bridges.",                           emoji:'🏡',badge:'🌿 Eco Stay',    bgGradient:'linear-gradient(135deg,#ede9fe,#ddd6fe)',pricePerPerson:2500,duration:'1–3 nights',durationType:'moon'},
    {id:4,title:'Jaipur Block Printing Workshop',  description:'Learn traditional Rajasthani hand block printing with a master artisan. Take your creations home.',                                   emoji:'🎨',badge:'🎭 Cultural',    bgGradient:'linear-gradient(135deg,#fce7f3,#fbcfe8)',pricePerPerson:950, duration:'4 hrs',  durationType:'clock'},
    {id:5,title:'Kerala Backwater Canoe Tour',     description:'Glide through village canals in a traditional country boat. Visit coconut farms and fishing villages.',                              emoji:'🚣',badge:'💧 Water',       bgGradient:'linear-gradient(135deg,#cffafe,#a5f3fc)',pricePerPerson:1600,duration:'6 hrs',  durationType:'clock'},
    {id:6,title:'Coorg Coffee Estate Walk',        description:'Tour a working coffee estate in Coorg. Learn the farm-to-cup process, taste fresh filter coffee, spot wildlife.',                   emoji:'☕',badge:'🏞️ Nature',      bgGradient:'linear-gradient(135deg,#fef9c3,#fef08a)',pricePerPerson:1100,duration:'4 hrs',  durationType:'clock'},
  ],
  scamAlerts: [
    {id:1,severity:'danger', icon:'fa-exclamation-triangle',text:'⚠️ Fake guide near <strong>Taj Mahal Gate 2</strong> claiming to be "official". Do NOT pay upfront.',         time:'2 mins ago',  location:'Agra, UP'},
    {id:2,severity:'warning',icon:'fa-taxi',                text:'🛺 Overpriced auto-rickshaws in <strong>Jaipur Old City</strong>. Verified fare: ₹80–120 (not ₹500).',        time:'15 mins ago', location:'Jaipur, RJ'},
    {id:3,severity:'ok',     icon:'fa-check-circle',        text:'✅ Verified taxi fare: <strong>Delhi Airport → City = ₹350–400</strong>. Use Terminal 3 prepaid counters.',   time:'32 mins ago', location:'Delhi'},
    {id:4,severity:'danger', icon:'fa-store',               text:'⚠️ Fake gem shops on <strong>MG Road, Jaipur</strong> selling uncertified stones as "certified".',            time:'1 hr ago',    location:'Jaipur, RJ'},
    {id:5,severity:'warning',icon:'fa-camera',              text:'📸 "Free photo" scam at <strong>Varanasi Ghats</strong>. Demands ₹500–1000 after taking photo.',             time:'2 hrs ago',   location:'Varanasi, UP'},
  ],
};

/* ── Utility: fetch (falls back to static data) ──────────────────────────── */
async function apiFetch(endpoint) {
  if (API_BASE) {
    const res = await fetch(`${API_BASE}${endpoint}`);
    if (!res.ok) throw new Error(`API error ${res.status}`);
    return res.json();
  }
  // Static fallback
  const map = {
    '/places':      STATIC.places,
    '/guides':      STATIC.guides,
    '/experiences': STATIC.experiences,
    '/scam-alerts': STATIC.scamAlerts,
  };
  const key = Object.keys(map).find(k => endpoint.startsWith(k));
  if (key) return map[key];
  throw new Error('No static data for: ' + endpoint);
}

/* ── Utility: toast ──────────────────────────────────────────────────────── */
function showToast(msg) {
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  document.body.appendChild(t);
  requestAnimationFrame(() => t.classList.add('show'));
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 400); }, 3500);
}

/* ── Particles ───────────────────────────────────────────────────────────── */
(function spawnParticles() {
  const c = document.getElementById('heroParticles');
  if (!c) return;
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const s = Math.random() * 4 + 2;
    p.style.cssText = `width:${s}px;height:${s}px;left:${Math.random()*100}%;animation-duration:${Math.random()*12+8}s;animation-delay:${Math.random()*8}s;`;
    c.appendChild(p);
  }
})();

/* ── Navbar ──────────────────────────────────────────────────────────────── */
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 40);
});
function toggleNav() {
  document.getElementById('navLinks').classList.toggle('open');
}

/* ── Scroll animations ───────────────────────────────────────────────────── */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-in-up').forEach(el => io.observe(el));

/* ── Map ─────────────────────────────────────────────────────────────────── */
const mapColors = { open:'#22c55e', busy:'#eab308', closed:'#ef4444', gem:'#a855f7' };
let leafletMap, allMarkers = [];

function mkIcon(color) {
  return L.divIcon({
    className: '',
    html: `<div style="width:16px;height:16px;border-radius:50%;background:${color};border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.35);"></div>`,
    iconSize: [16,16], iconAnchor: [8,8],
  });
}

function buildPopup(p) {
  const col = mapColors[p.type];
  const typeLabel = {open:'Open & Safe',busy:'High Crowd',closed:'Closed ⛔',gem:'🔮 Hidden Gem'}[p.type];
  const crowdCol = p.crowd==='Low'?'#22c55e':p.crowd==='Medium'?'#eab308':p.crowd==='High'?'#ef4444':'#94a3b8';
  return `<div style="font-family:Poppins,sans-serif;min-width:220px;padding:4px;">
    <div style="font-size:1rem;font-weight:800;color:#0f172a;margin-bottom:8px;">${p.name}</div>
    <div style="font-size:0.76rem;background:${col}22;color:${col};border:1px solid ${col}44;padding:3px 8px;border-radius:20px;display:inline-block;margin-bottom:10px;font-weight:700;">${typeLabel}</div>
    <table style="width:100%;font-size:0.8rem;border-collapse:collapse;">
      <tr><td style="color:#64748b;padding:3px 0;">Status</td><td style="font-weight:600;">${p.type==='closed'?'🔴 Closed':'🟢 Open'}</td></tr>
      <tr><td style="color:#64748b;padding:3px 0;">Safety</td><td style="font-weight:600;color:#0f766e;">${p.safety?p.safety+'/10 ✅':'N/A'}</td></tr>
      <tr><td style="color:#64748b;padding:3px 0;">Crowd</td><td style="font-weight:600;color:${crowdCol};">${p.crowd}</td></tr>
      <tr><td style="color:#64748b;padding:3px 0;">Best Time</td><td style="font-weight:600;">${p.bestTime}</td></tr>
    </table>
    <div style="margin-top:10px;font-size:0.78rem;color:#475569;line-height:1.5;">${p.desc}</div>
  </div>`;
}

async function initMap() {
  leafletMap = L.map('map', { center:[22.5,82.0], zoom:5 });
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>', maxZoom:18,
  }).addTo(leafletMap);
  try {
    const places = await apiFetch('/places');
    places.forEach(p => {
      const m = L.marker([p.lat,p.lng],{icon:mkIcon(mapColors[p.type])}).addTo(leafletMap);
      m.bindPopup(buildPopup(p),{maxWidth:280});
      allMarkers.push({marker:m, type:p.type});
    });
  } catch(err) { console.error('Map error:', err.message); }
}

function filterMap(type, btn) {
  document.querySelectorAll('.map-filter-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  allMarkers.forEach(({marker,type:mt}) => {
    if (type==='all'||type===mt) { if(!leafletMap.hasLayer(marker)) marker.addTo(leafletMap); }
    else { if(leafletMap.hasLayer(marker)) leafletMap.removeLayer(marker); }
  });
}

/* ── Scam Alerts ─────────────────────────────────────────────────────────── */
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
    container.querySelectorAll('.scam-alert').forEach(el => io.observe(el));
  } catch(err) {
    container.innerHTML = '<p style="color:rgba(255,255,255,0.5);font-size:0.85rem;">Unable to load alerts right now.</p>';
  }
}

/* ── Guides ──────────────────────────────────────────────────────────────── */
function starsHtml(rating) {
  return '★'.repeat(Math.floor(rating)) + (rating%1>=0.5?'½':'');
}

function guideCardHtml(g) {
  return `
    <div class="guide-card fade-in-up">
      <div class="guide-card-header">
        ${g.verified?'<div class="guide-verified"><i class="fas fa-check"></i> Verified</div>':''}
        <img class="guide-avatar" src="${g.avatar}" alt="${g.name}"/>
        <div class="guide-name">${g.name}</div>
        <div class="guide-location"><i class="fas fa-map-marker-alt"></i> ${g.location}</div>
      </div>
      <div class="guide-card-body">
        <div class="guide-stars">${starsHtml(g.rating)} <span>${g.rating} (${g.reviews} reviews)</span></div>
        <div class="guide-langs"><i class="fas fa-language"></i> ${g.languages.join(', ')}</div>
        <div class="guide-tours">🗺️ ${g.tours.join(' · ')}</div>
        <div class="guide-price">₹${g.pricePerDay.toLocaleString('en-IN')} <span>/ day</span></div>
        <button class="btn-book" onclick="openBookingModal('${g.name.replace(/'/g,"\\'")} — Guide')">📅 Book Now</button>
      </div>
    </div>`;
}

async function loadGuides() {
  const grid = document.getElementById('guidesGrid');
  if (!grid) return;
  grid.innerHTML = Array(4).fill('<div class="skeleton skeleton-card"></div>').join('');
  try {
    const guides = await apiFetch('/guides');
    grid.innerHTML = guides.map(guideCardHtml).join('');
    grid.querySelectorAll('.fade-in-up').forEach(el => io.observe(el));
  } catch(err) {
    grid.innerHTML = '<p style="color:var(--gray-600);grid-column:1/-1;text-align:center;">Unable to load guides right now.</p>';
  }
}

/* ── Experiences ─────────────────────────────────────────────────────────── */
function experienceCardHtml(e) {
  return `
    <div class="exp-card fade-in-up" onclick="openBookingModal('${e.title.replace(/'/g,"\\'")}')">
      <div class="exp-card-img" style="background:${e.bgGradient};">
        ${e.emoji}<span class="exp-badge">${e.badge}</span>
      </div>
      <div class="exp-card-body">
        <div class="exp-card-title">${e.title}</div>
        <div class="exp-card-desc">${e.description}</div>
        <div class="exp-card-meta">
          <div class="exp-card-price">₹${e.pricePerPerson.toLocaleString('en-IN')} <small style="color:var(--gray-400);font-weight:400;">/person</small></div>
          <div class="exp-card-dur"><i class="fas ${e.durationType==='moon'?'fa-moon':'fa-clock'}"></i> ${e.duration}</div>
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
  } catch(err) {
    grid.innerHTML = '<p style="color:var(--gray-600);grid-column:1/-1;text-align:center;">Unable to load experiences right now.</p>';
  }
}

/* ── Booking Modal ───────────────────────────────────────────────────────── */
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

  if (!API_BASE) {
    // No backend — show success message anyway
    closeModal('bookingModal');
    showToast('🎉 Booking request received! We will contact you shortly.');
    btn.disabled = false;
    btn.textContent = 'Confirm Booking';
    return;
  }

  try {
    const payload = {
      name:            document.getElementById('bookingName').value.trim(),
      email:           document.getElementById('bookingEmail').value.trim(),
      phone:           document.getElementById('bookingPhone').value.trim(),
      people:          parseInt(document.getElementById('bookingPeople').value,10)||1,
      date:            document.getElementById('bookingDate').value||null,
      specialRequests: document.getElementById('bookingRequests').value.trim(),
      itemName:        currentBookingItem,
    };
    const res  = await fetch(`${API_BASE}/bookings`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
    const data = await res.json();
    if (!res.ok) throw new Error(data.error||'Booking failed');
    closeModal('bookingModal');
    showToast(data.message);
  } catch(err) {
    showToast('❌ '+err.message);
  } finally {
    btn.disabled = false;
    btn.textContent = 'Confirm Booking';
  }
}

document.querySelectorAll('.modal-overlay').forEach(m => {
  m.addEventListener('click', function(e) { if(e.target===this) this.classList.remove('open'); });
});

/* ── Init ────────────────────────────────────────────────────────────────── */
window.addEventListener('load', () => {
  initMap();
  loadScamAlerts();
  loadGuides();
  loadExperiences();
});
