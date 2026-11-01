// ==========================================
// 1. DYNAMIC CONFIG & TELEGRAM BOT CREDENTIALS
// ==========================================
const DEFAULT_TG_TOKEN = "8808678555:AAFudqE_CJab9LW13HgopqdGD__hp06Vl0k";
const DEFAULT_TG_CHAT_ID = "8843460945";
const UPI_ID = "ravindershrma1@nyes";
const ADMIN_PASS = "@123hack";
const WHATSAPP_NO = "7500078349";

let tgToken = localStorage.getItem('cth_token') || DEFAULT_TG_TOKEN;
let tgChatId = localStorage.getItem('cth_chatid') || DEFAULT_TG_CHAT_ID;

// Telegram Alert Sender in Pure Hindi
async function sendTelegramHindiAlert(messageText) {
  const url = `https://api.telegram.org/bot${tgToken}/sendMessage`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: tgChatId,
        text: messageText,
        parse_mode: "Markdown"
      })
    });
    return await res.json();
  } catch (err) {
    console.error("Telegram send error:", err);
  }
}

// ==========================================
// 2. ADVANCED DEVICE, BRAND & LOCATION TELEMETRY
// ==========================================
function getDetailedDeviceInfo() {
  const ua = navigator.userAgent;
  let brand = "Desktop PC / Laptop";
  let os = "Windows / Linux";

  if (/Vivo|V2[0-9]{3}|vivo/i.test(ua)) brand = "Vivo Smartphone";
  else if (/Oppo|CPH[0-9]{4}|oppo/i.test(ua)) brand = "Oppo Smartphone";
  else if (/Realme|RMX[0-9]{4}|realme/i.test(ua)) brand = "Realme Smartphone";
  else if (/Redmi|POCO|Xiaomi|22[0-9]{2}|23[0-9]{2}|Mi /i.test(ua)) brand = "Xiaomi / Redmi / POCO";
  else if (/Samsung|SM-[A-Z0-9]+/i.test(ua)) brand = "Samsung Galaxy";
  else if (/OnePlus|ONEPLUS|GM19[0-9]{2}|IN20[0-9]{2}/i.test(ua)) brand = "OnePlus";
  else if (/iPhone/i.test(ua)) { brand = "Apple iPhone"; os = "iOS"; }
  else if (/iPad/i.test(ua)) { brand = "Apple iPad"; os = "iPadOS"; }
  else if (/Windows NT/i.test(ua)) { brand = "Windows Computer"; os = "Windows 10/11"; }
  else if (/Macintosh/i.test(ua)) { brand = "Apple Mac PC"; os = "macOS"; }
  else if (/Linux/i.test(ua) && /Android/i.test(ua)) brand = "Android Smartphone";

  if (/Android ([0-9.]+)/i.test(ua)) os = `Android ${RegExp.$1}`;

  let browser = "Google Chrome";
  if (/Edg/i.test(ua)) browser = "Microsoft Edge";
  else if (/Firefox/i.test(ua)) browser = "Mozilla Firefox";
  else if (/Opera|OPR/i.test(ua)) browser = "Opera";
  else if (/Brave/i.test(ua)) browser = "Brave Browser";
  else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) browser = "Apple Safari";

  const screenRes = `${window.screen.width}x${window.screen.height}`;
  const lang = navigator.language || "hi-IN";

  return { brand, os, browser, screenRes, lang };
}

async function trackLiveVisitor() {
  const tracked = sessionStorage.getItem('cth_visitor_logged');
  if (!tracked) {
    sessionStorage.setItem('cth_visitor_logged', 'true');
    const dev = getDetailedDeviceInfo();
    let country = "Khoj jari hai...";
    let city = "Anjaan Shahar";

    try {
      const geo = await fetch('https://ipapi.co/json/');
      if (geo.ok) {
        const d = await geo.json();
        country = `${d.country_name || 'Bharat'} (${d.country_code || 'IN'})`;
        city = d.city || 'Anjaan';
      }
    } catch(e) {
      country = "Bharat (Default)";
    }

    const hindiMsg = `🌐 *CyberTools Hub: Naya Visitor Alert!*\n\n` +
      `📱 *Mobile / Device:* *${dev.brand}*\n` +
      `📍 *Desh aur Shahar:* *${country}* - ${city}\n` +
      `💻 *Operating System:* ${dev.os}\n` +
      `🌐 *Browser:* *${dev.browser}* (Bhasha: ${dev.lang})\n` +
      `📐 *Screen Resolution:* ${dev.screenRes}\n` +
      `⏰ *Samay:* ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}\n\n` +
      `✅ *Status:* User ne CyberTools Hub website successfully open kar li hai!`;

    sendTelegramHindiAlert(hindiMsg);
  }
}

// ==========================================
// 3. INTERACTIVE MATRIX CANVAS & NEON CURSOR
// ==========================================
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class CyberNode {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.vx = (Math.random() - 0.5) * 0.6;
    this.vy = (Math.random() - 0.5) * 0.6;
    this.color = Math.random() > 0.4 ? '#00f0ff' : '#9d4edd';
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 10;
    ctx.shadowColor = this.color;
    ctx.fill();
  }
}

for (let i = 0; i < 40; i++) particles.push(new CyberNode());

function animateCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 110) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(0, 240, 255, ${0.15 - dist / 1100})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(animateCanvas);
}
animateCanvas();

// Cursor
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');
let mX = 0, mY = 0, rX = 0, rY = 0;

window.addEventListener('mousemove', (e) => {
  mX = e.clientX;
  mY = e.clientY;
  if (cursorDot) {
    cursorDot.style.left = `${mX}px`;
    cursorDot.style.top = `${mY}px`;
  }
});

function loopCursor() {
  if (cursorRing) {
    rX += (mX - rX) * 0.18;
    rY += (mY - rY) * 0.18;
    cursorRing.style.left = `${rX}px`;
    cursorRing.style.top = `${rY}px`;
  }
  requestAnimationFrame(loopCursor);
}
loopCursor();

// ==========================================
// 4. TOOLS DATABASE & INTERACTIVE HANDLERS
// ==========================================
const toolsData = [
  {
    id: "pwd-gen",
    title: "Strong Password Generator",
    category: "Security",
    icon: "fa-solid fa-key",
    desc: "Unbreakable 16-character encrypted password generate karein (numbers, symbols aur letters ke sath)."
  },
  {
    id: "ip-lookup",
    title: "Live IP & Location Detector",
    category: "Security",
    icon: "fa-solid fa-globe",
    desc: "Apna public IP address, ISP, Desh, Shahar aur network status turant check karein."
  },
  {
    id: "hash-gen",
    title: "SHA-256 Hash Generator",
    category: "Security",
    icon: "fa-solid fa-fingerprint",
    desc: "Kisi bhi text ya password ka secure cryptographic SHA-256 hash generate karein."
  },
  {
    id: "qr-maker",
    title: "Instant QR Code Maker",
    category: "Utility",
    icon: "fa-solid fa-qrcode",
    desc: "Kisi bhi URL, text ya UPI payment ke liye custom high-quality QR code banayein."
  },
  {
    id: "word-counter",
    title: "Word & Character Counter",
    category: "Text",
    icon: "fa-solid fa-spell-check",
    desc: "Apne article, assignment ya code ke exact shabdon, aksharon aur reading time ki ginti karein."
  },
  {
    id: "case-converter",
    title: "Text Case Converter",
    category: "Text",
    icon: "fa-solid fa-font",
    desc: "Text ko ek click me UPPERCASE, lowercase, Title Case ya Sentence Case me badlein."
  },
  {
    id: "base64-tool",
    title: "Base64 Encoder / Decoder",
    category: "Utility",
    icon: "fa-solid fa-code",
    desc: "Developer strings aur text ko Base64 me encode ya decode karein."
  },
  {
    id: "sip-calc",
    title: "SIP Return Calculator",
    category: "Finance",
    icon: "fa-solid fa-chart-line",
    desc: "Har mahine ki SIP investment ka future estimated return aur maturity amount nikalein."
  },
  {
    id: "emi-calc",
    title: "Loan EMI Calculator",
    category: "Finance",
    icon: "fa-solid fa-calculator",
    desc: "Home loan, bike ya car loan ki monthly EMI aur total interest aasaani se check karein."
  },
  {
    id: "port-checker",
    title: "Security Port & Header Audit",
    category: "Security",
    icon: "fa-solid fa-network-wired",
    desc: "Standard network ports (HTTP, HTTPS, SSH, FTP) aur unke security protocols ka overview."
  },
  {
    id: "url-coder",
    title: "URL Encoder & Decoder",
    category: "Utility",
    icon: "fa-solid fa-link",
    desc: "Web addresses aur parameter queries ko clean URL encoding/decoding karein."
  },
  {
    id: "unit-converter",
    title: "Data Unit Storage Converter",
    category: "Utility",
    icon: "fa-solid fa-hard-drive",
    desc: "Bytes, Kilobytes (KB), Megabytes (MB), Gigabytes (GB) aur Terabytes (TB) me aapas me conversion."
  }
];

let activeCategory = "All";

function renderToolsGrid() {
  const container = document.getElementById('toolsContainer');
  if (!container) return;
  container.innerHTML = '';

  const filtered = activeCategory === "All" 
    ? toolsData 
    : toolsData.filter(t => t.category === activeCategory);

  filtered.forEach(tool => {
    const card = document.createElement('div');
    card.className = 'glass-panel tool-card';
    card.onclick = () => launchToolModal(tool.id);
    card.innerHTML = `
      <div>
        <div class="tool-card-top">
          <div class="tool-icon-box"><i class="${tool.icon}"></i></div>
          <div>
            <h4>${tool.title}</h4>
            <span class="tool-category-badge">${tool.category}</span>
          </div>
        </div>
        <p class="tool-desc">${tool.desc}</p>
      </div>
      <div class="tool-action-btn">
        <span>Use Tool Free</span> <i class="fa-solid fa-arrow-right"></i>
      </div>
    `;
    container.appendChild(card);
  });
}

function setCategoryFilter(cat) {
  activeCategory = cat;
  document.querySelectorAll('.category-pills .pill').forEach(btn => {
    btn.classList.toggle('active', btn.innerText.includes(cat) || (cat === 'All' && btn.innerText.includes('Sabhi')));
  });
  renderToolsGrid();
}

function filterTools() {
  const query = document.getElementById('toolSearchInput').value.toLowerCase().trim();
  const container = document.getElementById('toolsContainer');
  container.innerHTML = '';

  const matched = toolsData.filter(t => 
    t.title.toLowerCase().includes(query) || 
    t.desc.toLowerCase().includes(query) || 
    t.category.toLowerCase().includes(query)
  );

  if (matched.length === 0) {
    container.innerHTML = '<p style="color:var(--text-dim); text-align:center; grid-column:1/-1;">Koi tool match nahi hua. Dusra naam search karein!</p>';
    return;
  }

  matched.forEach(tool => {
    const card = document.createElement('div');
    card.className = 'glass-panel tool-card';
    card.onclick = () => launchToolModal(tool.id);
    card.innerHTML = `
      <div>
        <div class="tool-card-top">
          <div class="tool-icon-box"><i class="${tool.icon}"></i></div>
          <div>
            <h4>${tool.title}</h4>
            <span class="tool-category-badge">${tool.category}</span>
          </div>
        </div>
        <p class="tool-desc">${tool.desc}</p>
      </div>
      <div class="tool-action-btn">
        <span>Use Tool Free</span> <i class="fa-solid fa-arrow-right"></i>
      </div>
    `;
    container.appendChild(card);
  });
}

// Tool Modal Launcher with Live Interactive UI
function launchToolModal(toolId) {
  const tool = toolsData.find(t => t.id === toolId);
  if (!tool) return;

  // Track Tool Usage Activity on Telegram in Hindi!
  const dev = getDetailedDeviceInfo();
  const activityMsg = `🛠️ *Tool Open Activity Alert*\n\n` +
    `📌 *Khole Gaye Tool Ka Naam:* *${tool.title}*\n` +
    `📂 *Category:* ${tool.category}\n` +
    `📱 *Visitor Ka Device:* *${dev.brand}* (${dev.os})\n` +
    `🌐 *Browser:* ${dev.browser}\n` +
    `⏰ *Samay:* ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}\n\n` +
    `ℹ️ *Vivaran:* User ne CyberTools Hub par is tool ko use karne ke liye click kiya hai!`;
  sendTelegramHindiAlert(activityMsg);

  document.getElementById('tTitle').innerText = tool.title;
  document.getElementById('tCat').innerText = tool.category;
  document.getElementById('tIcon').innerHTML = `<i class="${tool.icon}"></i>`;

  const body = document.getElementById('toolDynamicBody');
  body.innerHTML = '';

  // Injected Interactive Logic
  if (toolId === 'pwd-gen') {
    body.innerHTML = `
      <p style="font-size:0.85rem; color:var(--text-dim); margin-bottom:12px;">Length: <span id="pwdLenVal">16</span> characters</p>
      <input type="range" id="pwdLen" min="8" max="32" value="16" oninput="document.getElementById('pwdLenVal').innerText = this.value" style="margin-bottom:15px;">
      <button class="cyber-btn-glow" style="width:100%;" onclick="runGeneratePassword()"><i class="fa-solid fa-arrows-rotate"></i> Generate Secure Password</button>
      <div class="tool-output-area" id="pwdOutput">Click above to generate</div>
    `;
    runGeneratePassword();
  } else if (toolId === 'ip-lookup') {
    body.innerHTML = `
      <p style="font-size:0.85rem; color:var(--text-dim); margin-bottom:10px;">Aapka live network geolocation:</p>
      <button class="cyber-btn-glow" style="width:100%; margin-bottom:12px;" onclick="runIpLookup()"><i class="fa-solid fa-radar"></i> Detect My Live IP & Location</button>
      <div class="tool-output-area" id="ipOutput">Detecting your IP...</div>
    `;
    runIpLookup();
  } else if (toolId === 'hash-gen') {
    body.innerHTML = `
      <input type="text" id="hashInputText" placeholder="Text dalein jiska SHA-256 hash chahiye..." oninput="runSha256()">
      <div class="tool-output-area" id="hashOutput">Hash output yahan dikhega...</div>
    `;
  } else if (toolId === 'qr-maker') {
    body.innerHTML = `
      <input type="text" id="qrText" placeholder="URL ya Text enter karein (e.g. https://google.com)..." oninput="runQrCode()">
      <div style="text-align:center; margin-top:15px;">
        <img id="qrResultImg" style="border:2px solid var(--cyan-glow); border-radius:10px; padding:6px; background:#fff; max-width:180px;">
      </div>
    `;
    setTimeout(runQrCode, 50);
  } else if (toolId === 'word-counter') {
    body.innerHTML = `
      <textarea id="wordTextarea" rows="5" placeholder="Apna content yahan paste karein..." oninput="runWordCount()"></textarea>
      <div class="tool-output-area" id="wordStats">Words: 0 | Characters: 0 | Estimated Reading: 0s</div>
    `;
  } else if (toolId === 'case-converter') {
    body.innerHTML = `
      <textarea id="caseTextarea" rows="4" placeholder="Text yahan likhein..."></textarea>
      <div style="display:flex; gap:8px; flex-wrap:wrap; margin-top:10px;">
        <button class="pill" onclick="convertCase('upper')">UPPERCASE</button>
        <button class="pill" onclick="convertCase('lower')">lowercase</button>
        <button class="pill" onclick="convertCase('title')">Title Case</button>
      </div>
    `;
  } else if (toolId === 'sip-calc') {
    body.innerHTML = `
      <label style="font-size:0.8rem; color:var(--text-dim);">Monthly Investment (₹):</label>
      <input type="number" id="sipAmount" value="5000" oninput="runSipCalc()">
      <label style="font-size:0.8rem; color:var(--text-dim);">Expected Annual Return (%):</label>
      <input type="number" id="sipRate" value="12" oninput="runSipCalc()">
      <label style="font-size:0.8rem; color:var(--text-dim);">Time Period (Years):</label>
      <input type="number" id="sipYears" value="10" oninput="runSipCalc()">
      <div class="tool-output-area" id="sipOutput">Calculation result...</div>
    `;
    runSipCalc();
  } else {
    body.innerHTML = `
      <textarea id="genericInput" rows="4" placeholder="Input dalein..."></textarea>
      <button class="cyber-btn-glow" style="width:100%; margin-top:10px;" onclick="document.getElementById('genericOutput').innerText = btoa(document.getElementById('genericInput').value)">Base64 Encode</button>
      <button class="pill" style="margin-top:8px; width:100%;" onclick="try{document.getElementById('genericOutput').innerText = atob(document.getElementById('genericInput').value)}catch(e){alert('Invalid Base64')}">Base64 Decode</button>
      <div class="tool-output-area" id="genericOutput">Output yahan aayega...</div>
    `;
  }

  document.getElementById('toolModal').style.display = 'flex';
}

function closeToolModal() {
  document.getElementById('toolModal').style.display = 'none';
}

// Tool Specific Implementations
function runGeneratePassword() {
  const len = parseInt(document.getElementById('pwdLen').value) || 16;
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
  let pwd = "";
  for (let i = 0; i < len; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  document.getElementById('pwdOutput').innerText = pwd;
}

async function runIpLookup() {
  const out = document.getElementById('ipOutput');
  try {
    const res = await fetch('https://ipapi.co/json/');
    if (res.ok) {
      const d = await res.json();
      out.innerHTML = `IP: <strong>${d.ip}</strong><br>Location: <strong>${d.city}, ${d.region}, ${d.country_name}</strong><br>ISP / Org: <strong>${d.org}</strong><br>Postal: <strong>${d.postal}</strong>`;
    }
  } catch(e) {
    out.innerText = "IP lookup service unavailable.";
  }
}

async function runSha256() {
  const text = document.getElementById('hashInputText').value;
  const out = document.getElementById('hashOutput');
  if (!text) { out.innerText = "..."; return; }
  const msgUint8 = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  out.innerText = hashHex;
}

function runQrCode() {
  const val = document.getElementById('qrText').value || 'https://cybertoolshub.netlify.app';
  const img = document.getElementById('qrResultImg');
  img.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(val)}`;
}

function runWordCount() {
  const text = document.getElementById('wordTextarea').value.trim();
  const words = text ? text.split(/\s+/).length : 0;
  const chars = text.length;
  const reading = Math.ceil(words / 200);
  document.getElementById('wordStats').innerText = `Words: ${words} | Characters: ${chars} | Estimated Reading: ~${reading} min`;
}

function convertCase(type) {
  const el = document.getElementById('caseTextarea');
  if (type === 'upper') el.value = el.value.toUpperCase();
  else if (type === 'lower') el.value = el.value.toLowerCase();
  else if (type === 'title') {
    el.value = el.value.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  }
}

function runSipCalc() {
  const p = parseFloat(document.getElementById('sipAmount').value) || 0;
  const r = parseFloat(document.getElementById('sipRate').value) || 0;
  const y = parseFloat(document.getElementById('sipYears').value) || 0;
  const i = r / 12 / 100;
  const n = y * 12;
  const totalInvested = p * n;
  const futureValue = p * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
  const returns = futureValue - totalInvested;
  document.getElementById('sipOutput').innerHTML = `
    Kul Invested: <strong>₹${Math.round(totalInvested).toLocaleString('en-IN')}</strong><br>
    Estimated Profit: <strong>₹${Math.round(returns).toLocaleString('en-IN')}</strong><br>
    Kul Maturity Value: <strong>₹${Math.round(futureValue).toLocaleString('en-IN')}</strong>
  `;
}

// ==========================================
// 5. EXCLUSIVE FILES & PROJECTS DATABASE
// ==========================================
const initialFilesData = [
  {
    id: 101,
    title: "Mayra AI Assistant Suite",
    category: "AI & Automation",
    price: 99,
    desc: "Voice PC controller aur Android companion automation package with instant setup script.",
    downloadLink: "https://www.mediafire.com/file/olyseobnbe6ab4u/myra-companion.exe/file"
  },
  {
    id: 102,
    title: "Jarvis 2.0 System Automation Scripts",
    category: "AI & Automation",
    price: 629,
    desc: "Windows automated task scheduler, developer shortcut terminal and background health monitor.",
    downloadLink: "https://drive.google.com"
  },
  {
    id: 103,
    title: "Cyber Security Penetration & Scanner Toolkit",
    category: "Cyber Security",
    price: 999,
    desc: "Complete vulnerability scanner, network packet auditor and intrusion detection bundle.",
    downloadLink: "https://github.com"
  },
  {
    id: 104,
    title: "Anti-RAT & Spyware Removal Engine",
    category: "Cyber Security",
    price: 799,
    desc: "Hidden remote access trojans (RAT), malicious sockets aur unauthorized keyloggers finder.",
    downloadLink: "https://drive.google.com"
  },
  {
    id: 105,
    title: "Full Developer Source Code Master Bundle",
    category: "Source Code",
    price: 1999,
    desc: "Complete production-ready multi-device automation scripts, web tools bundle with full rights.",
    downloadLink: "https://drive.google.com"
  }
];

let filesData = [];
let ordersList = [];
let activePurchaseItem = null;

function initFiles() {
  const stored = localStorage.getItem('cth_files_master');
  if (stored) {
    filesData = JSON.parse(stored);
  } else {
    filesData = [...initialFilesData];
    localStorage.setItem('cth_files_master', JSON.stringify(filesData));
  }

  const storedOrders = localStorage.getItem('cth_orders_master');
  if (storedOrders) ordersList = JSON.parse(storedOrders);

  renderFilesGrid();
}

function renderFilesGrid() {
  const container = document.getElementById('filesContainer');
  if (!container) return;
  container.innerHTML = '';

  filesData.forEach(file => {
    const card = document.createElement('div');
    card.className = 'glass-panel file-card';
    card.innerHTML = `
      <div>
        <div class="file-header-row">
          <span class="badge">${file.category}</span>
          <span class="file-price-badge">${file.price === 0 ? 'FREE' : '₹' + file.price}</span>
        </div>
        <h4>${file.title}</h4>
        <p class="file-desc">${file.desc}</p>
      </div>
      <div>
        ${file.price === 0 ? `
          <a href="${file.downloadLink}" target="_blank" class="cyber-btn-glow" style="width:100%; text-decoration:none;">
            <i class="fa-solid fa-download"></i> Direct Download
          </a>
        ` : `
          <button class="cyber-btn-glow" style="width:100%;" onclick="startFilePurchase(${file.id})">
            <i class="fa-solid fa-lock"></i> Buy & Unlock Access (₹${file.price})
          </button>
        `}
      </div>
    `;
    container.appendChild(card);
  });
}

function startFilePurchase(id) {
  const item = filesData.find(f => f.id === id);
  if (!item) return;

  activePurchaseItem = item;
  document.getElementById('payItemTitle').innerText = item.title;
  document.getElementById('payItemDesc').innerText = item.desc;
  document.getElementById('payAmountVal').innerText = item.price;

  const upiUrl = `upi://pay?pa=${UPI_ID}&pn=RavinderSharma&am=${item.price}&cu=INR&tn=${encodeURIComponent(item.title.substring(0, 20))}`;
  document.getElementById('qrDisplayImg').src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiUrl)}`;

  document.getElementById('payStep1').style.display = 'block';
  document.getElementById('payStep2').style.display = 'none';
  document.getElementById('paySuccessNotice').style.display = 'none';

  // Send activity alert in Hindi on Telegram!
  const dev = getDetailedDeviceInfo();
  const msg = `💰 *Checkout Activity Alert*\n\n` +
    `📦 *File / Tool:* *${item.title}*\n` +
    `💵 *Price:* ₹${item.price}\n` +
    `📱 *Visitor Ka Device:* *${dev.brand}* (${dev.os})\n` +
    `🌐 *Browser:* ${dev.browser}\n` +
    `⏰ *Samay:* ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}\n\n` +
    `ℹ️ *Vivaran:* Visitor ne is item ko khareedne ke liye UPI QR screen open ki hai!`;
  sendTelegramHindiAlert(msg);

  document.getElementById('paymentModal').style.display = 'flex';
}

function closePaymentModal() {
  document.getElementById('paymentModal').style.display = 'none';
}

function copyUpiId() {
  navigator.clipboard.writeText(UPI_ID).then(() => alert("UPI ID Copied: " + UPI_ID));
}

function showUtrEntry() {
  document.getElementById('payStep1').style.display = 'none';
  document.getElementById('payStep2').style.display = 'block';
}

async function submitPaymentDetails() {
  const utr = document.getElementById('payUtr').value.trim();
  const phone = document.getElementById('payWhatsApp').value.trim();
  const name = document.getElementById('payCustomerName').value.trim();

  if (!utr || utr.length < 6) { alert("Kripya sahi 12-digit UTR number enter karein!"); return; }
  if (!phone || phone.length < 10) { alert("Kripya apna WhatsApp number enter karein!"); return; }
  if (!name) { alert("Kripya apna naam enter karein!"); return; }

  const dev = getDetailedDeviceInfo();
  const orderRecord = {
    id: Date.now(),
    date: new Date().toLocaleString(),
    name,
    phone,
    utr,
    item: activePurchaseItem.title,
    amount: activePurchaseItem.price,
    device: dev.brand
  };

  ordersList.unshift(orderRecord);
  localStorage.setItem('cth_orders_master', JSON.stringify(ordersList));

  // Hindi Telegram Alert for Payment Received
  const hindiMsg = `💵 *NAYA PAYMENT VERIFICATION REQUEST!*\n\n` +
    `👤 *Grahak Ka Naam:* ${name}\n` +
    `📱 *WhatsApp No.:* \`${phone}\`\n` +
    `📦 *Kharida Gaya Tool:* *${activePurchaseItem.title}*\n` +
    `💰 *Rashi (Amount):* ₹${activePurchaseItem.price}\n` +
    `🔢 *UPI UTR / Ref No.:* \`${utr}\`\n` +
    `📱 *Device Brand:* *${dev.brand}* (${dev.os})\n` +
    `⏰ *Samay:* ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}\n\n` +
    `📌 *Action Required:* Ravinder bhai, apne bank me ₹${activePurchaseItem.price} check karke WhatsApp par direct file deliver karein!`;

  sendTelegramHindiAlert(hindiMsg);

  const waMsg = encodeURIComponent(`Namaste Ravinder Sharma bhai,\nMaine ₹${activePurchaseItem.price} payment kar diya hai for "${activePurchaseItem.title}".\n\nName: ${name}\nUTR No: ${utr}\nPhone: ${phone}\n\nKripya verification karke mujhe file send kar dein.`);
  document.getElementById('waProofBtn').href = `https://wa.me/${WHATSAPP_NO}?text=${waMsg}`;

  document.getElementById('paySuccessNotice').style.display = 'block';
}

// ==========================================
// 6. CONTACT FORM ALERT
// ==========================================
async function handleUserContact(e) {
  e.preventDefault();
  const name = document.getElementById('cName').value.trim();
  const phone = document.getElementById('cPhone').value.trim();
  const email = document.getElementById('cEmail').value.trim() || 'N/A';
  const msg = document.getElementById('cMessage').value.trim();
  const dev = getDetailedDeviceInfo();

  const hindiMsg = `📩 *CyberTools Hub: Naya Contact Message!*\n\n` +
    `👤 *Naam:* ${name}\n` +
    `📱 *WhatsApp:* \`${phone}\`\n` +
    `📧 *Email:* ${email}\n` +
    `📱 *Device:* *${dev.brand}* (${dev.os})\n` +
    `💬 *Sandesh:* ${msg}\n` +
    `⏰ *Samay:* ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`;

  sendTelegramHindiAlert(hindiMsg);
  alert("Dhanyawad! Aapka sandesh successfully send ho chuka hai.");
  document.getElementById('userContactForm').reset();
}

// ==========================================
// 7. MASTER ADMIN CONTROL PANEL (@123hack)
// ==========================================
let isAdminLogged = false;

function openAdminModal() {
  document.getElementById('adminModal').style.display = 'flex';
  if (!isAdminLogged) {
    document.getElementById('adminAuthScreen').style.display = 'block';
    document.getElementById('adminDashboardScreen').style.display = 'none';
  } else {
    document.getElementById('adminAuthScreen').style.display = 'none';
    document.getElementById('adminDashboardScreen').style.display = 'block';
    loadAdminDashboard();
  }
}

function closeAdminModal() {
  document.getElementById('adminModal').style.display = 'none';
}

function verifyAdminAccess() {
  const val = document.getElementById('adminMasterPass').value;
  if (val === ADMIN_PASS) {
    isAdminLogged = true;
    document.getElementById('adminAuthScreen').style.display = 'none';
    document.getElementById('adminDashboardScreen').style.display = 'block';
    loadAdminDashboard();

    const dev = getDetailedDeviceInfo();
    const msg = `🛡️ *MASTER ADMIN LOGIN ALERT*\n\nAdmin panel ko unlock kiya gaya hai!\n📱 *Device:* *${dev.brand}*\n⏰ *Samay:* ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`;
    sendTelegramHindiAlert(msg);
  } else {
    alert("Galat Password! Access Denied.");
  }
}

function logoutAdmin() {
  isAdminLogged = false;
  document.getElementById('adminMasterPass').value = '';
  document.getElementById('adminAuthScreen').style.display = 'block';
  document.getElementById('adminDashboardScreen').style.display = 'none';
}

function switchAdminTab(tabId) {
  ['admTabUpload', 'admTabFiles', 'admTabOrders', 'admTabTelegram'].forEach(id => {
    document.getElementById(id).style.display = (id === tabId) ? 'block' : 'none';
  });
  document.querySelectorAll('.adm-tab').forEach(t => t.classList.remove('active'));
  event.target.classList.add('active');
}

function loadAdminDashboard() {
  document.getElementById('admBotToken').value = tgToken;
  document.getElementById('admChatId').value = tgChatId;

  // Render Files
  const fContainer = document.getElementById('adminFilesList');
  fContainer.innerHTML = '';
  filesData.forEach((f, idx) => {
    const item = document.createElement('div');
    item.className = 'adm-item';
    item.innerHTML = `
      <div>
        <h5>${f.title}</h5>
        <span>₹${f.price} • ${f.category}</span>
      </div>
      <div>
        <a href="${f.downloadLink}" target="_blank" style="color:#22c55e; text-decoration:none; margin-right:8px;"><i class="fa-solid fa-download"></i></a>
        <button onclick="deleteAdminFile(${idx})" style="background:transparent; border:none; color:#ff1e42; cursor:pointer;"><i class="fa-solid fa-trash"></i></button>
      </div>
    `;
    fContainer.appendChild(item);
  });

  // Render Orders
  const oContainer = document.getElementById('adminOrdersList');
  oContainer.innerHTML = '';
  if (ordersList.length === 0) {
    oContainer.innerHTML = '<p style="color:var(--text-dim); font-size:0.85rem;">Koi payment submission nahi hai abhi.</p>';
  } else {
    ordersList.forEach(o => {
      const item = document.createElement('div');
      item.className = 'adm-item';
      item.innerHTML = `
        <div>
          <h5>${o.item} (₹${o.amount})</h5>
          <span style="color:#22c55e;">UTR: ${o.utr}</span> | <span>Client: ${o.name} (${o.phone})</span>
          <div style="font-size:0.75rem; color:var(--text-dim);">${o.date} • Device: ${o.device}</div>
        </div>
      `;
      oContainer.appendChild(item);
    });
  }
}

let uploadedFileBase64 = null;
function handleAdminFileUpload(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      uploadedFileBase64 = e.target.result;
      document.getElementById('newFileUrl').value = uploadedFileBase64;
      alert("✅ File direct Base64 me upload ho gayi hai!");
    };
    reader.readAsDataURL(file);
  }
}

function saveNewAdminFile() {
  const title = document.getElementById('newFileTitle').value.trim();
  const category = document.getElementById('newFileCat').value.trim() || 'Utility';
  const price = parseInt(document.getElementById('newFilePrice').value) || 0;
  const desc = document.getElementById('newFileDesc').value.trim();
  const downloadLink = document.getElementById('newFileUrl').value.trim() || '#';

  if (!title || !desc) { alert("Title aur Description bharna zaroori hai!"); return; }

  filesData.unshift({ id: Date.now(), title, category, price, desc, downloadLink });
  localStorage.setItem('cth_files_master', JSON.stringify(filesData));

  document.getElementById('newFileTitle').value = '';
  document.getElementById('newFileCat').value = '';
  document.getElementById('newFilePrice').value = '';
  document.getElementById('newFileDesc').value = '';
  document.getElementById('newFileUrl').value = '';

  alert("✅ Nayi file live publish ho chuki hai!");
  renderFilesGrid();
  loadAdminDashboard();
}

function deleteAdminFile(idx) {
  if (confirm("Kya aap is file ko delete karna chahte hain?")) {
    filesData.splice(idx, 1);
    localStorage.setItem('cth_files_master', JSON.stringify(filesData));
    renderFilesGrid();
    loadAdminDashboard();
  }
}

function saveTelegramSettings() {
  const token = document.getElementById('admBotToken').value.trim();
  const chatId = document.getElementById('admChatId').value.trim();
  if (!token || !chatId) { alert("Token aur Chat ID dono bharna zaroori hai!"); return; }
  tgToken = token;
  tgChatId = chatId;
  localStorage.setItem('cth_token', token);
  localStorage.setItem('cth_chatid', chatId);
  alert("Telegram settings successfully save ho gayi hain!");
}

async function testTelegramBotLive() {
  saveTelegramSettings();
  const dev = getDetailedDeviceInfo();
  const testMsg = `🚀 *TELEGRAM LIVE TEST SUCCESSFUL!*\n\n` +
    `Ravinder Sharma bhai, aapka Telegram Bot nayi CyberTools Hub website se 100% active ho chuka hai!\n` +
    `📱 *Test Device:* *${dev.brand}*\n` +
    `💻 *OS:* ${dev.os}\n` +
    `🌐 *Browser:* ${dev.browser}\n` +
    `⏰ *Samay:* ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`;
  const res = await sendTelegramHindiAlert(testMsg);
  if (res && res.ok) alert("✅ Telegram Bot par test sandesh safalta-purvak deliver ho gaya!");
  else alert("❌ Error: Bot token ya chat id check karein!");
}

// Mobile Nav
function toggleNav() {
  document.getElementById('mainNav').classList.toggle('mobile-active');
}
function closeNav() {
  document.getElementById('mainNav').classList.remove('mobile-active');
}

// Initial Kickoff
window.addEventListener('DOMContentLoaded', () => {
  renderToolsGrid();
  initFiles();
  trackLiveVisitor();
});
