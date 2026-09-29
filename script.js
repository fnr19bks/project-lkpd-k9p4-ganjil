/* =========================================================
   LKPD INFORMATIKA KELAS 9 — MISI DETEKTIF STRUKTUR
   Pemecahan Masalah Terpadu Graf & Tree
   SMP Negeri 19 Kota Bekasi — Berpikir Komputasional
   File: script.js  (Vanilla JavaScript, tanpa framework)
   ========================================================= */
'use strict';

/* =========================================================
   1. KONFIGURASI GAME (⚙️ TUNABLE)
   ========================================================= */
const GAME_CONFIG = {
  schoolName: "SMP Negeri 19 Kota Bekasi",
  subject: "Informatika",
  grade: "Kelas 9",
  phase: "Fase D",
  meeting: "Pertemuan 4",
  title: "Pemecahan Masalah Terpadu Graf & Tree",
  subtitle: "Studi Kasus dan Diagram Digital",

  footerText:
    "LKPD Informatika Kelas 9 · Pemecahan Masalah Terpadu Graf & Tree · © 2026 SMP Negeri 19 Kota Bekasi",

  scoring: {
    correctAnswer: 10,
    hint1Penalty: 1,
    hint2Penalty: 2,
    hint3Penalty: 3,
    levelCompleteBonus: 5
  },

  gameplay: {
    allowRetry: true,
    allowReset: true,
    useLocalStorage: true,
    enableSound: false,
    enableTimer: false,
    enableLeaderboard: false
  },

  accessibility: {
    reducedMotionSupport: true
  },

  assets: {
    logo: "logo.png",
    favicon: "favicon.svg"
  }
};

const STORAGE_KEY = 'lkpd_graf_tree_smpn19_v1';
const SVGNS = 'http://www.w3.org/2000/svg';

/* =========================================================
   2. DAFTAR MISI (SCREENS)
   ========================================================= */
const SCREENS = [
  { id:'welcome',     nav:'Selamat Datang',            title:'Selamat Datang' },
  { id:'briefing',    nav:'Briefing Misi',             title:'Briefing Misi' },
  { id:'icebreaking', nav:'Cari Hubungan',             title:'Ice Breaking — Cari Hubungan' },
  { id:'graphtree',   nav:'Graf atau Tree?',           title:'Graf atau Tree?' },
  { id:'vocab',       nav:'Pasangkan Istilah',         title:'Pasangkan Istilah' },
  { id:'steps',       nav:'Urutkan Proses',            title:'Urutkan Proses Pemecahan Masalah' },
  { id:'case1',       nav:'Kasus 1 · Rute Aman',       title:'Studi Kasus 1 — Rute Aman Menuju Ruang Laboratorium' },
  { id:'case2',       nav:'Kasus 2 · Folder Proyek',   title:'Studi Kasus 2 — Struktur Folder Proyek Kelas' },
  { id:'case3',       nav:'Kasus 3 · Rekomendasi',     title:'Studi Kasus 3 — Jaringan Rekomendasi Kegiatan' },
  { id:'choosemodel', nav:'Pilih Model',               title:'Pilih Model dan Alasan' },
  { id:'change',      nav:'Jika Hubungan Berubah',     title:'Jika Hubungan Berubah' },
  { id:'diagnostic',  nav:'Kuis Diagnostik',           title:'Kuis Diagnostik' },
  { id:'summative',   nav:'Misi Terakhir',             title:'Misi Terakhir (Asesmen Sumatif)' },
  { id:'reflection',  nav:'Refleksi',                  title:'Exit Ticket / Refleksi' },
  { id:'result',      nav:'Hasil Belajar',             title:'Hasil Belajar' }
];

/* =========================================================
   3. DATA ISTILAH (VOCABULARY)
   ========================================================= */
const VOCABULARY_ITEMS = [
  { id:'node',   term:'Node',   meaning:'Simpul' },
  { id:'edge',   term:'Edge',   meaning:'Sisi' },
  { id:'graph',  term:'Graph',  meaning:'Graf' },
  { id:'path',   term:'Path',   meaning:'Jalur' },
  { id:'weight', term:'Weight', meaning:'Bobot' },
  { id:'root',   term:'Root',   meaning:'Akar' },
  { id:'parent', term:'Parent', meaning:'Induk' },
  { id:'child',  term:'Child',  meaning:'Anak' },
  { id:'leaf',   term:'Leaf',   meaning:'Daun' },
  { id:'level',  term:'Level',  meaning:'Tingkat' }
];

/* =========================================================
   4. DATA CONTOH GRAF ATAU TREE
   ========================================================= */
const MODEL_EXAMPLES = [
  {
    id:'ex1', label:'Jaringan jalan', answer:'graph',
    why:'Benar. Jaringan jalan dapat memiliki banyak hubungan antartitik dan tidak selalu bertingkat, sehingga lebih sesuai dimodelkan sebagai Graph (Graf).'
  },
  {
    id:'ex2', label:'Relasi pertemanan', answer:'graph',
    why:'Benar. Relasi pertemanan dapat saling terhubung secara bebas dan tidak memiliki satu akar, sehingga lebih sesuai dimodelkan sebagai Graph (Graf).'
  },
  {
    id:'ex3', label:'Rute perjalanan', answer:'graph',
    why:'Benar. Rute perjalanan menghubungkan banyak titik yang dapat saling terhubung, sehingga lebih sesuai dimodelkan sebagai Graph (Graf).'
  },
  {
    id:'ex4', label:'Folder komputer', answer:'tree',
    why:'Benar. Folder komputer tersusun bertingkat dan bercabang dari satu folder utama, sehingga lebih sesuai dimodelkan sebagai Tree (Pohon).'
  },
  {
    id:'ex5', label:'Struktur organisasi', answer:'tree',
    why:'Benar. Struktur organisasi memiliki satu pimpinan teratas lalu bercabang ke bawah, sehingga lebih sesuai dimodelkan sebagai Tree (Pohon).'
  },
  {
    id:'ex6', label:'Kategori barang', answer:'tree',
    why:'Benar. Kategori barang tersusun dari kategori umum menuju kategori khusus, sehingga lebih sesuai dimodelkan sebagai Tree (Pohon).'
  }
];

/* =========================================================
   5. DELAPAN LANGKAH PEMECAHAN MASALAH (urutan benar)
   ========================================================= */
const PROBLEM_STEPS = [
  { id:'s1', text:'Pahami masalah: apa yang diketahui, apa yang dicari, dan apa aturannya?' },
  { id:'s2', text:'Pecah masalah menjadi bagian yang lebih kecil.' },
  { id:'s3', text:'Tentukan objek dan hubungan.' },
  { id:'s4', text:'Pilih model: graf, tree, atau kombinasi keduanya.' },
  { id:'s5', text:'Buat diagram.' },
  { id:'s6', text:'Uji diagram dengan contoh sederhana.' },
  { id:'s7', text:'Susun strategi dan bandingkan kemungkinan solusi.' },
  { id:'s8', text:'Jelaskan hasil dan refleksikan keterbatasannya.' }
];

/* =========================================================
   6. DATA STUDI KASUS (teks persis dari materi)
   ========================================================= */
const CASE_STUDIES = [
  {
    id:'case1',
    nav:'Kasus 1 · Rute Aman',
    title:'Studi Kasus 1 — Rute Aman Menuju Ruang Laboratorium',
    text:'Di SMPN 19 Kota Bekasi, beberapa kelas harus menuju laboratorium komputer. Ada beberapa titik yang dapat dilewati: kelas, koridor, tangga, perpustakaan, dan laboratorium. Saat jam tertentu, satu koridor dapat ditutup agar arus murid tidak terlalu padat. Kelompokmu diminta membuat model hubungan antartitik dan menjelaskan strategi mencari jalur yang sesuai.',
    model:'graph'
  },
  {
    id:'case2',
    nav:'Kasus 2 · Folder Proyek',
    title:'Studi Kasus 2 — Struktur Folder Proyek Kelas',
    text:'Sebuah kelompok kelas 9 menyimpan proyek digital dalam folder utama. Di dalamnya terdapat folder Materi, Tugas, Presentasi, dan Dokumentasi. Setiap folder dapat memiliki subfolder. Guru meminta struktur penyimpanan dibuat mudah dipahami agar anggota baru dapat menemukan file tanpa bertanya berkali-kali.',
    model:'tree'
  },
  {
    id:'case3',
    nav:'Kasus 3 · Rekomendasi',
    title:'Studi Kasus 3 — Jaringan Rekomendasi Kegiatan',
    text:'Murid memilih kegiatan berdasarkan minat. Satu kegiatan dapat berhubungan dengan beberapa minat dan satu minat dapat mengarah ke beberapa kegiatan. Kelompokmu diminta memodelkan hubungan tersebut agar rekomendasi kegiatan lebih mudah dijelaskan.',
    model:'graph'
  }
];

/* =========================================================
   7. DATA KUIS DIAGNOSTIK (teks persis dari materi)
   ========================================================= */
const DIAGNOSTIC_QUESTIONS = [
  {
    id:'d1',
    q:'Mana yang lebih mirip struktur folder: graf atau tree?',
    options:['Tree (Pohon)','Graph (Graf)'],
    answer:0,
    feedback:'Tepat. Struktur folder bersifat bertingkat dan bercabang, sehingga lebih mirip Tree (Pohon).'
  },
  {
    id:'d2',
    q:'Dalam peta jalan, apa yang dapat menjadi simpul?',
    options:['Tempat/titik/lokasi','Warna jalan','Nama pengemudi'],
    answer:0,
    feedback:'Tepat. Simpul (node) adalah objek atau tempat yang dimodelkan, misalnya tempat, titik, atau lokasi.'
  },
  {
    id:'d3',
    q:'Apa yang dimaksud hubungan dalam diagram?',
    options:['Koneksi antara dua objek','Jarak antara dua halaman','Urutan abjad nama objek'],
    answer:0,
    feedback:'Tepat. Hubungan (sisi/edge) adalah koneksi antara dua objek pada diagram.'
  },
  {
    id:'d4',
    q:'Mengapa diagram membantu memecahkan masalah?',
    options:['Membuat hubungan lebih mudah dilihat dan dianalisis','Membuat masalah menjadi lebih panjang','Menghilangkan semua aturan pada masalah'],
    answer:0,
    feedback:'Tepat. Diagram membantu karena hubungan antarbagian masalah menjadi lebih mudah dilihat dan dianalisis.'
  },
  {
    id:'d5',
    q:'Jika satu jalan ditutup, apa yang perlu diperiksa?',
    options:['Jalur/strategi dan hubungan yang terdampak','Warna jalan yang ditutup','Nama jalan yang ditutup'],
    answer:0,
    feedback:'Tepat. Yang perlu diperiksa adalah jalur/strategi serta hubungan mana saja yang terdampak oleh penutupan tersebut.'
  }
];

/* =========================================================
   8. DATA ASESMEN SUMATIF (teks persis dari materi)
   ========================================================= */
const SUMMATIVE_QUESTIONS = [
  { id:'sum1', text:'Sebuah sekolah memiliki lima titik: A, B, C, D, E. A terhubung ke B dan C; B terhubung ke D; C terhubung ke D dan E. Apakah hubungan tersebut lebih tepat dipandang sebagai graf atau tree? Jelaskan.' },
  { id:'sum2', text:'Sebuah folder utama memiliki subfolder Tugas, Materi, dan Presentasi. Folder Tugas memiliki subfolder Individu dan Kelompok. Model apa yang sesuai? Jelaskan.' },
  { id:'sum3', text:'Jika jalur B–D pada soal pertama ditutup, apa yang perlu dilakukan sebelum menentukan jalur baru?' },
  { id:'sum4', text:'Mengapa sebuah diagram yang tampak rapi belum tentu menjadi model yang baik?' },
  { id:'sum5', text:'Buat satu contoh masalah di sekolah yang dapat dimodelkan dengan tree dan satu yang dapat dimodelkan dengan graf.' }
];

const SELF_ASSESS_INDICATORS = [
  'Saya menyebutkan model',
  'Saya memberikan alasan',
  'Saya menggunakan bukti dari model',
  'Saya menjelaskan perubahan',
  'Saya memberi contoh yang relevan'
];

/* =========================================================
   9. DATA EXIT TICKET / REFLEKSI (teks persis dari materi)
   ========================================================= */
const EXIT_TICKET = [
  { id:'ex1', text:'Satu hal yang saya pahami hari ini adalah ...' },
  { id:'ex2', text:'Satu hal yang masih membingungkan adalah ...' },
  { id:'ex3', text:'Jika satu hubungan pada model berubah, saya akan ...' }
];
const EXIT_RATING_TEXT = 'Saya memberi nilai kesiapan diri untuk menggunakan graf/tree pada masalah baru: 1 / 2 / 3 / 4.';

/* =========================================================
   10. HINT (PETUNJUK) — maksimal 3 tingkat per aktivitas
   ========================================================= */
const HINTS = {
  icebreaking: [
    'Mulailah dari benda yang paling dekat denganmu: apa hubungan antara Rumah dan Jalan?',
    'Sekolah dapat dihubungkan dengan Rumah, Jalan, maupun Laboratorium. Coba buat minimal dua garis.',
    'Klik satu kartu, lalu klik kartu lain. Contoh: Rumah — Jalan, Jalan — Sekolah, Sekolah — Laboratorium.'
  ],
  graphtree: [
    'Perhatikan bentuk hubungannya: apakah bebas saling terhubung atau bertingkat?',
    'Jika ada satu titik paling atas yang bercabang ke bawah, itu ciri Tree (Pohon).',
    'Jika hubungannya bebas dan boleh saling terhubung tanpa satu akar, itu ciri Graph (Graf).'
  ],
  vocab: [
    'Bacalah istilah Inggrisnya perlahan. Beberapa mirip dengan katanya dalam bahasa Indonesia.',
    'Graph → Graf, Node → Simpul, Edge → Sisi. Sisanya berhubungan dengan struktur bertingkat.',
    'Root = Akar, Parent = Induk, Child = Anak, Leaf = Daun, Level = Tingkat, Path = Jalur, Weight = Bobot.'
  ],
  steps: [
    'Langkah pertama selalu berhubungan dengan memahami masalah terlebih dahulu.',
    'Membuat diagram baru dilakukan setelah kamu menentukan objek, hubungan, dan model.',
    'Urutan: pahami masalah → pecah masalah → tentukan objek & hubungan → pilih model → buat diagram → uji diagram → susun strategi → jelaskan hasil.'
  ],
  case1: [
    'Simpul adalah tempat yang dilewati. Bacalah kalimat tentang titik yang dapat dilewati.',
    'Aturan/batasan biasanya berbentuk kalimat "saat jam tertentu ... dapat ditutup".',
    'Karena titik-titiknya dapat saling terhubung bebas, model yang sesuai adalah Graph (Graf).'
  ],
  case2: [
    'Ada satu folder paling atas, yaitu folder utama. Itu adalah Akar (Root).',
    'Folder Tugas memiliki dua subfolder, yaitu Individu dan Kelompok.',
    'Struktur bertingkat seperti ini sesuai dimodelkan sebagai Tree (Pohon).'
  ],
  case3: [
    'Ada dua kelompok simpul: Minat dan Kegiatan.',
    'Satu minat dapat terhubung ke lebih dari satu kegiatan, begitu pula sebaliknya.',
    'Hubungan bebas seperti ini sesuai dimodelkan sebagai Graph (Graf).'
  ],
  choosemodel: [
    'Pikirkan bentuk hubungannya, bukan banyaknya simpul.',
    'Sebutkan apakah hubungannya bebas atau bertingkat dalam alasanmu.',
    'Contoh alasan: "Rute Aman menggunakan Graph karena titik-titiknya dapat saling terhubung bebas dan tidak memiliki satu akar."'
  ],
  change: [
    'Klik garis pada diagram untuk menutup hubungan tersebut.',
    'Periksa apakah simpul tujuan masih dapat dijangkau dari simpul awal.',
    'Menambah hubungan baru dapat dilakukan dengan mengklik dua simpul secara berurutan.'
  ],
  diagnostic: [
    'Bacalah pertanyaan dengan teliti, lalu pikirkan contoh nyatanya.',
    'Ingat: graf untuk hubungan bebas, tree untuk hubungan bertingkat.',
    'Diagram membantu kita melihat hubungan, bukan menghias masalah.'
  ],
  summative: [
    'Tulis jawaban dengan kalimatmu sendiri, tidak perlu panjang.',
    'Sebutkan modelnya, lalu berikan alasannya.',
    'Gunakan bukti dari diagram, misalnya "karena titik C terhubung ke D dan E".'
  ],
  reflection: [
    'Tuliskan satu hal saja yang benar-benar kamu rasakan hari ini.',
    'Tidak apa-apa jika masih ada yang membingungkan. Tulis dengan jujur.',
    'Pilih bintang sesuai kesiapanmu, bukan sesuai nilai yang kamu inginkan.'
  ]
};

/* =========================================================
   11. UTILITAS UMUM
   ========================================================= */
function $(sel, ctx){ return (ctx || document).querySelector(sel); }
function $$(sel, ctx){ return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

function clamp(v, a, b){ return Math.max(a, Math.min(b, v)); }

function escapeHtml(value){
  return String(value == null ? '' : value)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

function shuffleArray(arr){
  const a = arr.slice();
  for(let i = a.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    const t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}

function sameSet(a, b){
  if(a.length !== b.length) return false;
  const sa = a.slice().sort().join('|');
  const sb = b.slice().sort().join('|');
  return sa === sb;
}

function nowISO(){ return new Date().toISOString(); }

function formatDateID(date){
  try{
    return new Intl.DateTimeFormat('id-ID', {
      weekday:'long', day:'numeric', month:'long', year:'numeric',
      hour:'2-digit', minute:'2-digit'
    }).format(date);
  }catch(e){
    return date.toLocaleString();
  }
}

/* =========================================================
   12. STATE GAME & LOCAL STORAGE
   ========================================================= */
function createDefaultState(){
  return {
    version: 1,
    started: false,
    startedAt: nowISO(),
    student: { name:'', kelas:'', mode:'individu' },
    current: 'welcome',
    unlocked: ['welcome'],
    completed: {},
    score: 0,
    attempts: {},
    hints: {},
    answers: {},
    badges: []
  };
}

let state = createDefaultState();

function saveState(){
  if(!GAME_CONFIG.gameplay.useLocalStorage) return;
  try{
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }catch(err){
    /* localStorage bisa gagal pada mode privat; aplikasi tetap berjalan */
  }
}

function loadState(){
  if(!GAME_CONFIG.gameplay.useLocalStorage) return null;
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) return null;
    const parsed = JSON.parse(raw);
    if(!parsed || typeof parsed !== 'object') return null;
    const base = createDefaultState();
    const merged = Object.assign(base, parsed);
    merged.student = Object.assign({ name:'', kelas:'', mode:'individu' }, parsed.student || {});
    merged.answers = parsed.answers || {};
    merged.completed = parsed.completed || {};
    merged.attempts = parsed.attempts || {};
    merged.hints = parsed.hints || {};
    merged.unlocked = Array.isArray(parsed.unlocked) && parsed.unlocked.length ? parsed.unlocked : ['welcome'];
    return merged;
  }catch(err){
    return null;
  }
}

function getAns(key, factory){
  if(!state.answers[key] || typeof state.answers[key] !== 'object'){
    state.answers[key] = factory ? factory() : {};
  }
  return state.answers[key];
}

/* =========================================================
   13. SISTEM SKOR
   ========================================================= */
function addScore(points, reason){
  state.score = Math.max(0, state.score + points);
  saveState();
  updateHeader();
  if(reason && points !== 0){
    /* Alasan skor disimpan untuk laporan cetak */
    if(!state.scoreLog) state.scoreLog = [];
    state.scoreLog.push({ t: nowISO(), points: points, reason: reason });
  }
}

function scoreCorrect(){ addScore(GAME_CONFIG.scoring.correctAnswer, 'Jawaban benar'); }
function scoreLevelBonus(screenId){ addScore(GAME_CONFIG.scoring.levelCompleteBonus, 'Menyelesaikan ' + screenId); }

function registerAttempt(screenId){
  state.attempts[screenId] = (state.attempts[screenId] || 0) + 1;
  saveState();
}

/* =========================================================
   14. BADGE / LENCANA
   ========================================================= */
const BADGES = [
  { id:'hubungan',   label:'Pengenal Hubungan',  test: ()=> !!state.completed.icebreaking },
  { id:'ahliGraf',   label:'Ahli Graf',          test: ()=> countCorrectExamples() >= 5 },
  { id:'ahliTree',   label:'Ahli Tree',          test: ()=> !!state.completed.case2 },
  { id:'pembuat',    label:'Pembuat Model',      test: ()=> !!state.completed.case1 && !!state.completed.case3 },
  { id:'pemecah',    label:'Pemecah Masalah',    test: ()=> !!state.completed.diagnostic },
  { id:'reflektif',  label:'Reflektif',          test: ()=> !!state.completed.reflection }
];

function countCorrectExamples(){
  const a = state.answers.graphtree;
  if(!a || !a.answers) return 0;
  let n = 0;
  MODEL_EXAMPLES.forEach(function(ex){
    if(a.answers[ex.id] === ex.answer) n++;
  });
  return n;
}

function refreshBadges(){
  const earned = [];
  BADGES.forEach(function(b){
    if(b.test()) earned.push(b.id);
  });
  state.badges = earned;
}

/* =========================================================
   15. PROGRESS & NAVIGASI
   ========================================================= */
function updateHeader(){
  const idx = SCREENS.findIndex(function(s){ return s.id === state.current; });
  const safeIdx = idx < 0 ? 0 : idx;
  const total = SCREENS.length;
  const pct = Math.round(((safeIdx + 1) / total) * 100);

  const label = $('#progressLabel');
  const fill = $('#progressFill');
  const bar = $('#progressBar');
  if(label) label.textContent = 'Misi ' + (safeIdx + 1) + ' dari ' + total;
  if(fill) fill.style.width = pct + '%';
  if(bar) bar.setAttribute('aria-valuenow', String(pct));

  const scoreChip = $('#scoreChip');
  if(scoreChip) scoreChip.textContent = 'Skor (Score): ' + state.score;

  const chip = $('#studentChip');
  if(chip){
    if(state.student.name){
      chip.hidden = false;
      chip.textContent = state.student.name + ' · ' + (state.student.kelas || '-') +
        ' · ' + (state.student.mode === 'kelompok' ? 'Kelompok' : 'Individu');
    }else{
      chip.hidden = true;
      chip.textContent = '';
    }
  }

  const ph = $('#printStudent');
  if(ph){
    ph.textContent = 'Nama: ' + (state.student.name || '-') +
      '   |   Kelas: ' + (state.student.kelas || '-') +
      '   |   Mode: ' + (state.student.mode === 'kelompok' ? 'Kelompok' : 'Individu') +
      '   |   Tanggal: ' + formatDateID(new Date());
  }
}

function updateNav(){
  const list = $('#navList');
  if(!list) return;
  list.innerHTML = SCREENS.map(function(s, i){
    const unlocked = state.unlocked.indexOf(s.id) !== -1;
    const done = !!state.completed[s.id];
    const current = state.current === s.id;
    const cls = ['nav-item-btn'];
    if(current) cls.push('is-current');
    if(done) cls.push('is-done');
    return '<li>' +
      '<button type="button" class="' + cls.join(' ') + '" data-nav="' + s.id + '"' +
      (unlocked ? '' : ' disabled aria-disabled="true"') + '>' +
        '<span class="nav-num">' + (done ? '✓' : (i + 1)) + '</span>' +
        '<span class="nav-label">' + escapeHtml(s.nav) + '</span>' +
      '</button>' +
    '</li>';
  }).join('');
}

function unlockNext(screenId){
  const i = SCREENS.findIndex(function(s){ return s.id === screenId; });
  if(i >= 0 && i + 1 < SCREENS.length){
    const nextId = SCREENS[i + 1].id;
    if(state.unlocked.indexOf(nextId) === -1) state.unlocked.push(nextId);
  }
}

function markComplete(screenId){
  if(!state.completed[screenId]){
    state.completed[screenId] = true;
    scoreLevelBonus(screenId);
    unlockNext(screenId);
  }
  refreshBadges();
  saveState();
  updateHeader();
  updateNav();
}

function goTo(screenId){
  if(state.unlocked.indexOf(screenId) === -1){
    toast('Misi ini belum terbuka. Selesaikan misi sebelumnya terlebih dahulu.', 'warning');
    return;
  }
  state.current = screenId;
  saveState();
  render();
}

function nextScreen(){
  const i = SCREENS.findIndex(function(s){ return s.id === state.current; });
  if(i + 1 < SCREENS.length){
    if(state.unlocked.indexOf(SCREENS[i + 1].id) === -1) state.unlocked.push(SCREENS[i + 1].id);
    goTo(SCREENS[i + 1].id);
  }
}

/* =========================================================
   16. MODAL & TOAST
   ========================================================= */
function showModal(options){
  const backdrop = $('#modalBackdrop');
  const title = $('#modalTitle');
  const body = $('#modalBody');
  const actions = $('#modalActions');
  if(!backdrop) return;

  title.textContent = options.title || 'Konfirmasi';
  body.innerHTML = options.body || '';
  actions.innerHTML = '';

  (options.actions || []).forEach(function(act){
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn ' + (act.cls || 'btn-ghost');
    btn.textContent = act.label;
    btn.addEventListener('click', function(){
      if(act.onClick) act.onClick();
    });
    actions.appendChild(btn);
  });

  backdrop.hidden = false;
  const firstBtn = actions.querySelector('button');
  if(firstBtn) firstBtn.focus();
}

function hideModal(){
  const backdrop = $('#modalBackdrop');
  if(backdrop) backdrop.hidden = true;
}

let toastTimer = null;
function toast(message, type){
  const el = $('#toast');
  if(!el) return;
  el.textContent = message;
  el.className = 'toast show' + (type ? ' toast-' + type : '');
  el.hidden = false;
  if(toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(function(){
    el.classList.remove('show');
    setTimeout(function(){ el.hidden = true; }, 300);
  }, 2800);
}

/* =========================================================
   17. SISTEM HINT (PETUNJUK)
   ========================================================= */
function hintBlockHTML(screenId){
  const list = HINTS[screenId] || [];
  if(!list.length) return '';
  const used = state.hints[screenId] || 0;
  const items = [];
  for(let i = 0; i < used; i++){
    items.push('<div class="hint-item"><strong>Petunjuk ' + (i + 1) + ':</strong> ' + escapeHtml(list[i]) + '</div>');
  }
  return '' +
    '<div class="hint-block">' +
      '<button type="button" class="btn btn-ghost btn-sm" data-hint="' + screenId + '">' +
        'Petunjuk / Hint' + (used >= list.length ? ' (semua sudah terbuka)' : '') +
      '</button>' +
      '<div class="hint-text" id="hintText-' + screenId + '">' + items.join('') + '</div>' +
    '</div>';
}

function useHint(screenId){
  const list = HINTS[screenId] || [];
  if(!list.length) return;
  const used = state.hints[screenId] || 0;
  if(used >= list.length){
    toast('Semua petunjuk sudah terbuka.', 'warning');
    return;
  }
  const penalties = [
    GAME_CONFIG.scoring.hint1Penalty,
    GAME_CONFIG.scoring.hint2Penalty,
    GAME_CONFIG.scoring.hint3Penalty
  ];
  const penalty = penalties[used] || 0;
  state.hints[screenId] = used + 1;
  addScore(-penalty, 'Menggunakan Petunjuk ' + (used + 1));

  const box = $('#hintText-' + screenId);
  if(box){
    const div = document.createElement('div');
    div.className = 'hint-item';
    div.innerHTML = '<strong>Petunjuk ' + (used + 1) + ':</strong> ' + escapeHtml(list[used]);
    box.appendChild(div);
  }
  const btn = document.querySelector('[data-hint="' + screenId + '"]');
  if(btn){
    btn.textContent = 'Petunjuk / Hint' + (state.hints[screenId] >= list.length ? ' (semua sudah terbuka)' : '');
  }
  saveState();
}

/* =========================================================
   18. KOMPONEN EDITOR GRAF (SIMPUL & SISI)
   ========================================================= */
function initGraphEditor(canvas, cfg){
  const svg = canvas.querySelector('.editor-svg');
  const initialNodes = (cfg.nodes || []).map(function(n){ return Object.assign({}, n); });
  const initialEdges = (cfg.edges || []).map(function(e){
    return { a: e.a, b: e.b, disabled: !!e.disabled };
  });

  const st = {
    nodes: initialNodes.map(function(n){ return Object.assign({}, n); }),
    edges: initialEdges.map(function(e){ return Object.assign({}, e); }),
    selected: null
  };

  const nodeEls = {};
  let dragInfo = null;
  let suppressClick = false;

  function nodeById(id){
    for(let i = 0; i < st.nodes.length; i++){
      if(st.nodes[i].id === id) return st.nodes[i];
    }
    return null;
  }

  function placeNode(el, node){
    el.style.left = node.x + '%';
    el.style.top = node.y + '%';
  }

  function drawEdges(){
    while(svg.firstChild) svg.removeChild(svg.firstChild);
    st.edges.forEach(function(e){
      const A = nodeById(e.a);
      const B = nodeById(e.b);
      if(!A || !B) return;

      const g = document.createElementNS(SVGNS, 'g');

      const line = document.createElementNS(SVGNS, 'line');
      line.setAttribute('x1', A.x); line.setAttribute('y1', A.y);
      line.setAttribute('x2', B.x); line.setAttribute('y2', B.y);
      line.setAttribute('vector-effect', 'non-scaling-stroke');
      line.setAttribute('class', 'edge-line' + (e.disabled ? ' is-disabled' : ''));

      const hit = document.createElementNS(SVGNS, 'line');
      hit.setAttribute('x1', A.x); hit.setAttribute('y1', A.y);
      hit.setAttribute('x2', B.x); hit.setAttribute('y2', B.y);
      hit.setAttribute('vector-effect', 'non-scaling-stroke');
      hit.setAttribute('class', 'edge-hit');

      const title = document.createElementNS(SVGNS, 'title');
      title.textContent = 'Hubungan ' + A.label + ' — ' + B.label +
        (e.disabled ? ' (ditutup)' : ' (terbuka)');
      g.appendChild(title);

      hit.addEventListener('click', function(ev){
        ev.stopPropagation();
        if(!cfg.allowToggle) return;
        e.disabled = !e.disabled;
        drawEdges();
        notifyChange();
      });

      g.appendChild(line);
      g.appendChild(hit);
      svg.appendChild(g);
    });
  }

  function updateSelectionStyles(){
    Object.keys(nodeEls).forEach(function(id){
      nodeEls[id].classList.toggle('is-selected', st.selected === id);
      nodeEls[id].classList.toggle('is-target', st.selected !== null && st.selected !== id);
    });
  }

  function toggleEdge(a, b){
    let found = -1;
    for(let i = 0; i < st.edges.length; i++){
      const e = st.edges[i];
      if((e.a === a && e.b === b) || (e.a === b && e.b === a)){ found = i; break; }
    }
    if(found >= 0){
      if(st.edges[found].disabled){
        st.edges[found].disabled = false;
      }else{
        st.edges.splice(found, 1);
      }
    }else{
      st.edges.push({ a: a, b: b, disabled: false });
    }
  }

  function notifyChange(){
    if(typeof cfg.onChange === 'function'){
      cfg.onChange({
        nodes: st.nodes,
        edges: st.edges,
        activeEdges: st.edges.filter(function(e){ return !e.disabled; }),
        disabledEdges: st.edges.filter(function(e){ return e.disabled; })
      });
    }
  }

  function onNodeClick(id){
    if(st.selected === null){
      st.selected = id;
    }else if(st.selected === id){
      st.selected = null;
    }else{
      toggleEdge(st.selected, id);
      st.selected = null;
    }
    updateSelectionStyles();
    drawEdges();
    notifyChange();
  }

  function onPointerDown(ev){
    if(ev.button !== undefined && ev.button !== 0) return;
    const id = ev.currentTarget.getAttribute('data-id');
    dragInfo = {
      id: id,
      moved: false,
      startX: ev.clientX,
      startY: ev.clientY
    };
    try{ ev.currentTarget.setPointerCapture(ev.pointerId); }catch(err){ /* diabaikan */ }
  }

  function onPointerMove(ev){
    if(!dragInfo) return;
    const node = nodeById(dragInfo.id);
    if(!node) return;
    const dx = ev.clientX - dragInfo.startX;
    const dy = ev.clientY - dragInfo.startY;
    if(!dragInfo.moved && (Math.abs(dx) > 5 || Math.abs(dy) > 5)) dragInfo.moved = true;
    if(!dragInfo.moved) return;

    const rect = canvas.getBoundingClientRect();
    const x = ((ev.clientX - rect.left) / rect.width) * 100;
    const y = ((ev.clientY - rect.top) / rect.height) * 100;
    node.x = clamp(x, 9, 91);
    node.y = clamp(y, 9, 91);
    placeNode(nodeEls[node.id], node);
    drawEdges();
  }

  function onPointerUp(){
    if(!dragInfo) return;
    suppressClick = dragInfo.moved;
    dragInfo = null;
  }

  /* Bangun elemen simpul */
  st.nodes.forEach(function(node){
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'editor-node';
    btn.setAttribute('data-id', node.id);
    btn.setAttribute('aria-label', 'Simpul ' + node.label);
    btn.textContent = node.label;
    placeNode(btn, node);
    canvas.appendChild(btn);
    nodeEls[node.id] = btn;

    btn.addEventListener('click', function(){
      if(suppressClick){ suppressClick = false; return; }
      onNodeClick(node.id);
    });
    btn.addEventListener('pointerdown', onPointerDown);
    btn.addEventListener('pointermove', onPointerMove);
    btn.addEventListener('pointerup', onPointerUp);
    btn.addEventListener('pointercancel', onPointerUp);
  });

  drawEdges();
  notifyChange();

  return {
    getState: function(){ return st; },
    reset: function(){
      st.nodes = initialNodes.map(function(n){ return Object.assign({}, n); });
      st.edges = initialEdges.map(function(e){ return Object.assign({}, e); });
      st.selected = null;
      st.nodes.forEach(function(n){
        if(nodeEls[n.id]) placeNode(nodeEls[n.id], n);
      });
      updateSelectionStyles();
      drawEdges();
      notifyChange();
    },
    drawEdges: drawEdges
  };
}

/* =========================================================
   19. KOMPONEN EDITOR TREE (STRUKTUR BERTINGKAT)
   ========================================================= */
function initTreeEditor(canvas, trayEl, cfg){
  const svg = canvas.querySelector('.editor-svg');
  const rootId = cfg.root;
  const nodes = (cfg.nodes || []).map(function(n){ return Object.assign({}, n); });
  const orderMap = {};
  nodes.forEach(function(n, i){ orderMap[n.id] = i; });

  const st = {
    parent: {},
    selectedChild: null
  };

  if(cfg.parent){
    Object.keys(cfg.parent).forEach(function(k){ st.parent[k] = cfg.parent[k]; });
  }

  const nodeEls = {};

  function nodeById(id){
    for(let i = 0; i < nodes.length; i++){
      if(nodes[i].id === id) return nodes[i];
    }
    return null;
  }

  function childrenOf(id){
    return Object.keys(st.parent)
      .filter(function(k){ return st.parent[k] === id; })
      .sort(function(a, b){ return orderMap[a] - orderMap[b]; });
  }

  function isDescendant(candidate, ancestor){
    let cur = candidate;
    let guard = 0;
    while(cur && guard < 100){
      if(cur === ancestor) return true;
      cur = st.parent[cur];
      guard++;
    }
    return false;
  }

  function placedIds(){
    const list = [rootId];
    Object.keys(st.parent).forEach(function(k){
      if(list.indexOf(k) === -1) list.push(k);
    });
    return list;
  }

  function computeLayout(){
    const pos = {};
    let cursor = 0;
    function assign(id, level){
      const kids = childrenOf(id);
      if(kids.length === 0){
        pos[id] = { x: 12 + cursor * 15.2, y: 13 + level * 30 };
        cursor++;
      }else{
        kids.forEach(function(k){ assign(k, level + 1); });
        const xs = kids.map(function(k){ return pos[k].x; });
        pos[id] = { x: (Math.min.apply(null, xs) + Math.max.apply(null, xs)) / 2, y: 13 + level * 30 };
      }
    }
    assign(rootId, 0);
    return pos;
  }

  function drawEdges(pos){
    while(svg.firstChild) svg.removeChild(svg.firstChild);
    Object.keys(st.parent).forEach(function(child){
      const parentId = st.parent[child];
      const A = pos[parentId];
      const B = pos[child];
      if(!A || !B) return;
      const line = document.createElementNS(SVGNS, 'line');
      line.setAttribute('x1', A.x); line.setAttribute('y1', A.y);
      line.setAttribute('x2', B.x); line.setAttribute('y2', B.y);
      line.setAttribute('vector-effect', 'non-scaling-stroke');
      line.setAttribute('class', 'edge-line');
      svg.appendChild(line);
    });
  }

  function renderTray(){
    if(!trayEl) return;
    const unplaced = nodes.filter(function(n){
      return n.id !== rootId && !st.parent[n.id];
    });
    if(!unplaced.length){
      trayEl.innerHTML = '<h4>Belum ditempatkan</h4><p class="tray-empty">Semua simpul sudah ditempatkan. Bagus!</p>';
      return;
    }
    trayEl.innerHTML = '<h4>Belum ditempatkan</h4><div class="tray-items">' +
      unplaced.map(function(n){
        return '<button type="button" class="tray-item' +
          (st.selectedChild === n.id ? ' is-selected' : '') +
          '" data-tray="' + n.id + '">' + escapeHtml(n.label) + '</button>';
      }).join('') + '</div>';
  }

  function renderNodes(){
    const pos = computeLayout();
    const placed = placedIds();

    /* hapus simpul yang tidak lagi ditempatkan */
    Object.keys(nodeEls).forEach(function(id){
      if(placed.indexOf(id) === -1){
        if(nodeEls[id].parentNode) nodeEls[id].parentNode.removeChild(nodeEls[id]);
        delete nodeEls[id];
      }
    });

    placed.forEach(function(id){
      const node = nodeById(id);
      if(!node) return;
      let el = nodeEls[id];
      if(!el){
        el = document.createElement('button');
        el.type = 'button';
        el.className = 'editor-node';
        el.setAttribute('data-id', id);
        el.addEventListener('click', function(){ onNodeClick(id); });
        canvas.appendChild(el);
        nodeEls[id] = el;
      }
      el.textContent = node.label;
      el.setAttribute('aria-label', 'Simpul ' + node.label);
      el.classList.toggle('is-root', id === rootId);
      el.classList.toggle('is-selected', st.selectedChild === id);
      el.classList.toggle('is-target', st.selectedChild !== null && st.selectedChild !== id);
      el.style.left = pos[id].x + '%';
      el.style.top = pos[id].y + '%';
    });

    drawEdges(pos);
  }

  function onNodeClick(id){
    if(id === rootId && st.selectedChild === null){
      toast('Folder Utama adalah Akar (Root). Pilih simpul lain yang ingin dipindahkan.', 'warning');
      return;
    }
    if(st.selectedChild === null){
      if(id === rootId) return;
      st.selectedChild = id;
    }else if(st.selectedChild === id){
      st.selectedChild = null;
    }else{
      const child = st.selectedChild;
      if(isDescendant(id, child)){
        toast('Tidak bisa. Simpul induk tidak boleh berasal dari cabang simpul itu sendiri.', 'danger');
        return;
      }
      st.parent[child] = id;
      st.selectedChild = null;
    }
    renderTray();
    renderNodes();
    notifyChange();
  }

  function notifyChange(){
    if(typeof cfg.onChange === 'function'){
      cfg.onChange({
        parent: Object.assign({}, st.parent),
        placedCount: Object.keys(st.parent).length
      });
    }
  }

  if(trayEl){
    trayEl.addEventListener('click', function(ev){
      const btn = ev.target.closest('[data-tray]');
      if(!btn) return;
      const id = btn.getAttribute('data-tray');
      st.selectedChild = (st.selectedChild === id) ? null : id;
      renderTray();
      renderNodes();
    });
  }

  renderTray();
  renderNodes();
  notifyChange();

  return {
    getParent: function(){ return Object.assign({}, st.parent); },
    reset: function(){
      st.parent = {};
      if(cfg.parent){
        Object.keys(cfg.parent).forEach(function(k){ st.parent[k] = cfg.parent[k]; });
      }
      st.selectedChild = null;
      renderTray();
      renderNodes();
      notifyChange();
    }
  };
}

/* =========================================================
   20. LANGKAH 0 — WELCOME / SELAMAT DATANG
   ========================================================= */
function renderWelcome(root){
  const s = state.student;
  const logoSrc = './' + GAME_CONFIG.assets.logo;

  root.innerHTML = '' +
  '<section class="screen screen-welcome">' +
    '<div class="hero">' +
      '<div class="hero-logo">' +
        '<img class="logo-img" src="' + logoSrc + '" alt="Logo ' + escapeHtml(GAME_CONFIG.schoolName) + '">' +
      '</div>' +
      '<p class="hero-kicker">' + escapeHtml(GAME_CONFIG.schoolName) + ' · ' +
        escapeHtml(GAME_CONFIG.subject) + ' · ' + escapeHtml(GAME_CONFIG.grade) + ' / ' + escapeHtml(GAME_CONFIG.phase) + '</p>' +
      '<h1 class="hero-title">Misi Detektif Struktur</h1>' +
      '<p class="hero-sub">' + escapeHtml(GAME_CONFIG.title) + '</p>' +
      '<p class="hero-tagline">“Temukan hubungan. Bangun model. Uji strategi.”</p>' +
      '<p class="hero-meta">' + escapeHtml(GAME_CONFIG.meeting) + ' dari 16 · 2 × 40 menit · Elemen: Berpikir Komputasional</p>' +
    '</div>' +

    '<form class="card" id="welcomeForm" novalidate>' +
      '<h2 class="card-title">Data Detektif</h2>' +
      '<p class="muted">Isi datamu dulu ya. Data ini hanya disimpan di komputermu sendiri (localStorage), tidak dikirim ke mana pun.</p>' +

      '<label class="field">' +
        '<span>Nama Murid</span>' +
        '<input class="input" id="inpName" name="name" type="text" maxlength="40" autocomplete="off" value="' + escapeHtml(s.name) + '" placeholder="Tulis namamu di sini">' +
      '</label>' +

      '<label class="field">' +
        '<span>Kelas</span>' +
        '<input class="input" id="inpClass" name="kelas" type="text" maxlength="20" autocomplete="off" value="' + escapeHtml(s.kelas) + '" placeholder="Contoh: 9A">' +
      '</label>' +

      '<fieldset class="field">' +
        '<legend>Mode Pengerjaan</legend>' +
        '<div class="radio-row">' +
          '<label class="radio-pill"><input type="radio" name="mode" value="individu"' + (s.mode !== 'kelompok' ? ' checked' : '') + '><span>Individu (Sendiri)</span></label>' +
          '<label class="radio-pill"><input type="radio" name="mode" value="kelompok"' + (s.mode === 'kelompok' ? ' checked' : '') + '><span>Kelompok</span></label>' +
        '</div>' +
      '</fieldset>' +

      '<p class="form-error" id="welcomeError" role="alert" hidden></p>' +
      '<div class="screen-actions">' +
        '<button type="submit" class="btn btn-primary btn-lg">Mulai Misi / Start Mission</button>' +
      '</div>' +
    '</form>' +
  '</section>';

  const form = $('#welcomeForm');
  form.addEventListener('submit', function(ev){
    ev.preventDefault();
    const name = $('#inpName').value.trim();
    const kelas = $('#inpClass').value.trim();
    const modeEl = form.querySelector('input[name="mode"]:checked');
    const err = $('#welcomeError');

    if(!name || !kelas){
      err.hidden = false;
      err.textContent = 'Nama dan Kelas wajib diisi sebelum memulai misi.';
      return;
    }
    err.hidden = true;

    state.student.name = name;
    state.student.kelas = kelas;
    state.student.mode = modeEl ? modeEl.value : 'individu';
    state.started = true;
    state.startedAt = nowISO();

    if(state.unlocked.indexOf('briefing') === -1) state.unlocked.push('briefing');
    markComplete('welcome');
    saveState();
    toast('Selamat datang, Detektif ' + name + '!', 'success');
    goTo('briefing');
  });

  attachLogoFallbacks();
}

/* =========================================================
   21. LANGKAH 1 — BRIEFING / MISI AWAL
   ========================================================= */
function renderBriefing(root){
  root.innerHTML = '' +
  '<section class="screen">' +
    '<h1 class="screen-title">Briefing Misi</h1>' +
    '<p class="lead">Hari ini kamu menjadi <strong>detektif struktur</strong>. Tugasmu menemukan hubungan pada sebuah masalah, lalu mengubahnya menjadi model yang bisa dilihat dan diuji.</p>' +

    '<div class="grid-4">' +
      '<article class="concept-card">' +
        '<h3>1. Pahami</h3>' +
        '<p class="en">Understand (Memahami)</p>' +
        '<p>Kenali masalah, objek, hubungan, dan aturan.</p>' +
      '</article>' +
      '<article class="concept-card">' +
        '<h3>2. Bangun</h3>' +
        '<p class="en">Apply (Mengaplikasi)</p>' +
        '<p>Pilih model Graf atau Tree dan gunakan untuk memecahkan masalah.</p>' +
      '</article>' +
      '<article class="concept-card">' +
        '<h3>3. Uji</h3>' +
        '<p class="en">Test (Menguji)</p>' +
        '<p>Lihat apa yang terjadi ketika hubungan atau kondisi berubah.</p>' +
      '</article>' +
      '<article class="concept-card">' +
        '<h3>4. Refleksi</h3>' +
        '<p class="en">Reflect (Merefleksi)</p>' +
        '<p>Jelaskan apa yang kamu pelajari dan bagaimana strategimu.</p>' +
      '</article>' +
    '</div>' +

    '<div class="card">' +
      '<h2 class="card-title">Apa itu Graf dan Tree?</h2>' +
      '<p><strong>Graf</strong> adalah cara untuk menggambarkan objek dan hubungan antarkomponen. Dalam bahasa sederhana, kita dapat membayangkan graf sebagai kumpulan titik yang dihubungkan oleh garis.</p>' +
      '<p><strong>Tree (Pohon)</strong> adalah struktur hubungan yang bertingkat dan bercabang. Biasanya terdapat satu simpul awal yang disebut akar (root), kemudian bercabang menuju bagian-bagian di bawahnya.</p>' +
    '</div>' +

    '<div class="card">' +
      '<h2 class="card-title">Perbandingan Graf dan Tree</h2>' +
      '<div class="table-wrap">' +
      '<table class="cmp">' +
        '<thead><tr><th>Aspek</th><th>Graf</th><th>Tree (Pohon)</th></tr></thead>' +
        '<tbody>' +
          '<tr><td>Bentuk hubungan</td><td>Lebih bebas; dapat saling terhubung.</td><td>Bertingkat/bercabang.</td></tr>' +
          '<tr><td>Titik awal</td><td>Tidak harus memiliki satu akar.</td><td>Umumnya memiliki satu akar.</td></tr>' +
          '<tr><td>Contoh</td><td>Jaringan jalan, relasi pertemanan, rute.</td><td>Folder komputer, struktur organisasi, kategori barang.</td></tr>' +
          '<tr><td>Kegunaan</td><td>Menganalisis koneksi, rute, dan hubungan.</td><td>Mengorganisasi informasi secara hierarkis.</td></tr>' +
        '</tbody>' +
      '</table>' +
      '</div>' +
    '</div>' +

    '<div class="card card-soft">' +
      '<h2 class="card-title">Petualanganmu hari ini</h2>' +
      '<p class="muted">Kamu akan melewati beberapa misi: mencari hubungan, membedakan graf dan tree, memasangkan istilah, mengurutkan proses pemecahan masalah, mengerjakan tiga studi kasus, menguji perubahan hubungan, mengerjakan kuis, dan menuliskan refleksi.</p>' +
    '</div>' +

    '<div class="screen-actions">' +
      '<button type="button" class="btn btn-primary btn-lg" id="briefNext">Lanjut / Next</button>' +
    '</div>' +
  '</section>';

  $('#briefNext').addEventListener('click', function(){
    markComplete('briefing');
    nextScreen();
  });
}

/* =========================================================
   22. LANGKAH 2 — ICE BREAKING: CARI HUBUNGAN
   ========================================================= */
function renderIceBreaking(root){
  const a = getAns('icebreaking', function(){ return { edges: [] }; });

  root.innerHTML = '' +
  '<section class="screen">' +
    '<h1 class="screen-title">Ice Breaking — Cari Hubungan</h1>' +

    '<div class="card">' +
      '<p class="lead">Perhatikan empat objek berikut: <strong>Rumah</strong>, <strong>Jalan</strong>, <strong>Sekolah</strong>, dan <strong>Laboratorium</strong>.</p>' +
      '<p><strong>Tarik garis untuk menunjukkan hubungan yang mungkin.</strong></p>' +
      '<p class="muted">Cara bermain: klik satu kartu, lalu klik kartu lain untuk membuat garis penghubung. Klik garis untuk menghapusnya. Kamu juga boleh menggeser kartu.</p>' +
    '</div>' +

    '<div class="card editor-card">' +
      '<div class="editor">' +
        '<div class="editor-canvas" id="iceCanvas">' +
          '<svg class="editor-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"></svg>' +
        '</div>' +
      '</div>' +
      '<p class="editor-status" id="iceStatus">Hubungan terbentuk: 0</p>' +
    '</div>' +

    '<div class="card feedback-card" id="iceFeedback" hidden></div>' +
    hintBlockHTML('icebreaking') +

    '<div class="screen-actions">' +
      '<button type="button" class="btn btn-ghost" id="iceReset">Reset (Atur Ulang)</button>' +
      '<button type="button" class="btn btn-primary" id="iceCheck">Periksa Jawaban / Check Answer</button>' +
    '</div>' +
  '</section>';

  const canvas = $('#iceCanvas');
  const editor = initGraphEditor(canvas, {
    nodes: [
      { id:'rumah',        label:'Rumah',        x:22, y:24 },
      { id:'jalan',        label:'Jalan',        x:78, y:24 },
      { id:'sekolah',      label:'Sekolah',      x:22, y:76 },
      { id:'laboratorium', label:'Laboratorium', x:78, y:76 }
    ],
    edges: a.edges,
    allowToggle: true,
    onChange: function(st){
      a.edges = st.edges.map(function(e){ return { a:e.a, b:e.b, disabled: !!e.disabled }; });
      const active = st.edges.filter(function(e){ return !e.disabled; }).length;
      const status = $('#iceStatus');
      if(status) status.textContent = 'Hubungan terbentuk: ' + active;
      saveState();
    }
  });

  $('#iceReset').addEventListener('click', function(){
    editor.reset();
    toast('Diagram dikembalikan ke kondisi awal.', 'warning');
  });

  $('#iceCheck').addEventListener('click', function(){
    const st = editor.getState();
    const active = st.edges.filter(function(e){ return !e.disabled; }).length;
    const fb = $('#iceFeedback');
    fb.hidden = false;

    if(active < 2){
      fb.className = 'card feedback-card is-wrong';
      fb.innerHTML = '<p class="feedback-title">Belum cukup, Detektif.</p>' +
        '<p class="feedback-text">Buat minimal dua hubungan dulu. Klik satu kartu, lalu klik kartu lain.</p>';
      registerAttempt('icebreaking');
      return;
    }

    fb.className = 'card feedback-card is-correct';
    fb.innerHTML = '<p class="feedback-title">Bagus!</p>' +
      '<p class="feedback-text">Hubungan membantu kita melihat struktur masalah. Kamu baru saja membuat model sederhana dari sebuah situasi nyata.</p>';
    toast('Misi Cari Hubungan selesai!', 'success');
    markComplete('icebreaking');
    saveState();

    setTimeout(function(){
      if(state.completed.icebreaking) nextScreen();
    }, 1200);
  });

  attachLogoFallbacks();
}

/* =========================================================
   23. LANGKAH 3 — GRAF ATAU TREE?
   ========================================================= */
function renderGraphTree(root){
  const a = getAns('graphtree', function(){ return { answers:{}, index:0, revealed:false }; });
  const total = MODEL_EXAMPLES.length;
  const idx = clamp(a.index || 0, 0, total - 1);
  const ex = MODEL_EXAMPLES[idx];
  const chosen = a.answers[ex.id];
  const revealed = !!chosen;

  let feedbackHTML = '';
  if(revealed){
    const benar = chosen === ex.answer;
    feedbackHTML = '<div class="card feedback-card ' + (benar ? 'is-correct' : 'is-wrong') + '">' +
      '<p class="feedback-title">' + (benar ? 'Tepat sekali!' : 'Belum tepat.') + '</p>' +
      '<p class="feedback-text">' + escapeHtml(ex.why) + '</p>' +
      (benar ? '' : '<p class="feedback-text"><strong>Jawaban yang sesuai:</strong> ' +
        (ex.answer === 'graph' ? 'Graph (Graf)' : 'Tree (Pohon)') + '</p>') +
      '</div>';
  }

  root.innerHTML = '' +
  '<section class="screen">' +
    '<h1 class="screen-title">Graf atau Tree?</h1>' +
    '<p class="lead">Perhatikan contoh berikut. Model mana yang paling sesuai?</p>' +
    '<p class="muted">Contoh ' + (idx + 1) + ' dari ' + total + '</p>' +

    '<div class="card">' +
      '<h2 class="q-text">' + escapeHtml(ex.label) + '</h2>' +
      '<p class="muted">Pilih model yang paling sesuai untuk menggambarkan contoh di atas.</p>' +
      '<div class="btn-row" id="gtChoices">' +
        '<button type="button" class="btn btn-primary" data-choice="graph"' + (revealed ? ' disabled' : '') + '>Pilih Graph (Graf)</button>' +
        '<button type="button" class="btn btn-secondary" data-choice="tree"' + (revealed ? ' disabled' : '') + '>Pilih Tree (Pohon)</button>' +
      '</div>' +
    '</div>' +

    feedbackHTML +
    hintBlockHTML('graphtree') +

    '<div class="screen-actions">' +
      (revealed ? '<button type="button" class="btn btn-primary btn-lg" id="gtNext">' +
        (idx + 1 < total ? 'Lanjut / Next' : 'Selesai / Finish') + '</button>' : '') +
    '</div>' +
  '</section>';

  const choices = $('#gtChoices');
  if(choices){
    choices.addEventListener('click', function(ev){
      const btn = ev.target.closest('[data-choice]');
      if(!btn || revealed) return;
      a.answers[ex.id] = btn.getAttribute('data-choice');
      a.revealed = true;
      registerAttempt('graphtree');
      if(a.answers[ex.id] === ex.answer) scoreCorrect();
      saveState();
      render();
    });
  }

  const nextBtn = $('#gtNext');
  if(nextBtn){
    nextBtn.addEventListener('click', function(){
      if(idx + 1 < total){
        a.index = idx + 1;
        saveState();
        render();
      }else{
        markComplete('graphtree');
        toast('Misi Graf atau Tree selesai!', 'success');
        nextScreen();
      }
    });
  }

  attachLogoFallbacks();
}

/* =========================================================
   24. LANGKAH 4 — PASANGKAN ISTILAH
   ========================================================= */
function renderVocab(root){
  const a = getAns('vocab', function(){
    return {
      matched: {},
      selectedTerm: null,
      rightOrder: shuffleArray(VOCABULARY_ITEMS.map(function(v){ return v.id; }))
    };
  });

  if(!a.rightOrder || a.rightOrder.length !== VOCABULARY_ITEMS.length){
    a.rightOrder = shuffleArray(VOCABULARY_ITEMS.map(function(v){ return v.id; }));
  }

  const matchedCount = Object.keys(a.matched).length;
  const allDone = matchedCount === VOCABULARY_ITEMS.length;

  function byId(id){
    return VOCABULARY_ITEMS.filter(function(v){ return v.id === id; })[0];
  }

  root.innerHTML = '' +
  '<section class="screen">' +
    '<h1 class="screen-title">Pasangkan Istilah</h1>' +
    '<p class="lead">Cocokkan istilah Inggris di kolom kiri dengan arti bahasa Indonesianya di kolom kanan.</p>' +
    '<p class="muted">Sudah cocok: ' + matchedCount + ' dari ' + VOCABULARY_ITEMS.length + '</p>' +

    '<div class="card">' +
      '<div class="match-wrap">' +
        '<div class="match-col">' +
          '<h3>Istilah (Term)</h3>' +
          VOCABULARY_ITEMS.map(function(v){
            const done = !!a.matched[v.id];
            return '<button type="button" class="match-item' +
              (done ? ' is-matched' : '') +
              (a.selectedTerm === v.id ? ' is-selected' : '') +
              '" data-term="' + v.id + '"' + (done ? ' disabled' : '') + '>' +
              escapeHtml(v.term) + '</button>';
          }).join('') +
        '</div>' +
        '<div class="match-col">' +
          '<h3>Arti (Meaning)</h3>' +
          a.rightOrder.map(function(id){
            const v = byId(id);
            const done = !!a.matched[v.id];
            return '<button type="button" class="match-item' +
              (done ? ' is-matched' : '') +
              '" data-meaning="' + v.id + '"' + (done ? ' disabled' : '') + '>' +
              escapeHtml(v.meaning) + '</button>';
          }).join('') +
        '</div>' +
      '</div>' +
    '</div>' +

    '<div class="card feedback-card" id="vocabFeedback" hidden></div>' +
    hintBlockHTML('vocab') +

    (allDone ? '<div class="screen-actions"><button type="button" class="btn btn-primary btn-lg" id="vocabNext">Lanjut / Next</button></div>' : '') +
  '</section>';

  const wrap = root.querySelector('.match-wrap');
  wrap.addEventListener('click', function(ev){
    const termBtn = ev.target.closest('[data-term]');
    const meanBtn = ev.target.closest('[data-meaning]');
    const fb = $('#vocabFeedback');

    if(termBtn){
      const id = termBtn.getAttribute('data-term');
      if(a.matched[id]) return;
      a.selectedTerm = (a.selectedTerm === id) ? null : id;
      saveState();
      render();
      return;
    }

    if(meanBtn){
      const meanId = meanBtn.getAttribute('data-meaning');
      if(a.matched[meanId]) return;
      if(!a.selectedTerm){
        fb.hidden = false;
        fb.className = 'card feedback-card is-info';
        fb.innerHTML = '<p class="feedback-title">Pilih dulu istilahnya.</p>' +
          '<p class="feedback-text">Klik salah satu istilah di kolom kiri, lalu klik artinya di kolom kanan.</p>';
        return;
      }

      registerAttempt('vocab');

      if(a.selectedTerm === meanId){
        a.matched[meanId] = true;
        a.selectedTerm = null;
        scoreCorrect();
        saveState();
        toast('Istilah ditemukan!', 'success');
        render();
      }else{
        meanBtn.classList.add('is-wrong');
        setTimeout(function(){ meanBtn.classList.remove('is-wrong'); }, 400);
        fb.hidden = false;
        fb.className = 'card feedback-card is-wrong';
        fb.innerHTML = '<p class="feedback-title">Belum cocok.</p>' +
          '<p class="feedback-text">Coba ingat kembali: apakah istilah itu berhubungan dengan struktur bertingkat atau dengan hubungan antarobjek?</p>';
        saveState();
      }
    }
  });

  const nextBtn = $('#vocabNext');
  if(nextBtn){
    nextBtn.addEventListener('click', function(){
      markComplete('vocab');
      nextScreen();
    });
  }

  attachLogoFallbacks();
}

/* =========================================================
   25. LANGKAH 5 — URUTKAN PROSES PEMECAHAN MASALAH
   ========================================================= */
function renderSteps(root){
  const a = getAns('steps', function(){
    return { pool: shuffleArray(PROBLEM_STEPS.map(function(s){ return s.id; })), placed: [], checked: false, result: null };
  });

  if(!a.pool || a.pool.length !== PROBLEM_STEPS.length){
    a.pool = shuffleArray(PROBLEM_STEPS.map(function(s){ return s.id; }));
  }

  function stepById(id){
    return PROBLEM_STEPS.filter(function(s){ return s.id === id; })[0];
  }

  const allPlaced = a.placed.length === PROBLEM_STEPS.length;
  let resultHTML = '';

  if(a.checked && a.result){
    const ok = a.result.every(function(r){ return r; });
    resultHTML = '<div class="card feedback-card ' + (ok ? 'is-correct' : 'is-wrong') + '">' +
      '<p class="feedback-title">' + (ok ? 'Urutanmu tepat!' : 'Urutannya belum tepat.') + '</p>' +
      '<p class="feedback-text">' + (ok
        ? 'Model masalah yang baik membutuhkan proses. Jangan langsung menggambar sebelum memahami masalah.'
        : 'Perhatikan lagi: sebelum membuat diagram, kita harus memahami masalah dan menentukan objek serta hubungannya.') + '</p>' +
      '</div>';
  }

  root.innerHTML = '' +
  '<section class="screen">' +
    '<h1 class="screen-title">Urutkan Proses Pemecahan Masalah</h1>' +
    '<p class="lead">Susun delapan langkah pemecahan masalah berikut ini menjadi urutan yang benar.</p>' +
    '<p class="muted">Klik langkah pada kotak pilihan untuk memindahkannya ke urutan di bawah. Klik langkah pada urutan untuk mengembalikannya.</p>' +

    '<div class="card">' +
      '<h2 class="card-title">Urutanmu</h2>' +
      '<div class="step-ordered" id="stepOrdered">' +
        (a.placed.length
          ? a.placed.map(function(id, i){
              const s = stepById(id);
              let cls = 'step-chip is-placed';
              if(a.checked && a.result){
                cls += a.result[i] ? ' is-ok' : ' is-bad';
              }
              return '<button type="button" class="' + cls + '" data-placed="' + id + '">' +
                '<span class="step-index">' + (i + 1) + '</span>' +
                '<span>' + escapeHtml(s.text) + '</span>' +
              '</button>';
            }).join('')
          : '<p class="step-empty">Belum ada langkah yang dipilih.</p>') +
      '</div>' +
    '</div>' +

    '<div class="card">' +
      '<h2 class="card-title">Pilihan Langkah</h2>' +
      '<div class="step-pool" id="stepPool">' +
        (a.pool.length
          ? a.pool.map(function(id){
              const s = stepById(id);
              return '<button type="button" class="step-chip" data-pool="' + id + '">' +
                '<span class="step-index">?</span>' +
                '<span>' + escapeHtml(s.text) + '</span>' +
              '</button>';
            }).join('')
          : '<p class="step-empty">Semua langkah sudah kamu susun.</p>') +
      '</div>' +
    '</div>' +

    resultHTML +
    hintBlockHTML('steps') +

    '<div class="screen-actions">' +
      '<button type="button" class="btn btn-ghost" id="stepResetAll">Reset (Atur Ulang)</button>' +
      '<button type="button" class="btn btn-primary" id="stepCheck"' + (allPlaced ? '' : ' disabled') + '>Periksa Jawaban / Check Answer</button>' +
      (a.checked && a.result && a.result.every(function(r){ return r; })
        ? '<button type="button" class="btn btn-success btn-lg" id="stepNext">Lanjut / Next</button>' : '') +
    '</div>' +
  '</section>';

  const ordered = $('#stepOrdered');
  const pool = $('#stepPool');

  ordered.addEventListener('click', function(ev){
    const btn = ev.target.closest('[data-placed]');
    if(!btn) return;
    const id = btn.getAttribute('data-placed');
    a.placed = a.placed.filter(function(x){ return x !== id; });
    a.pool.push(id);
    a.checked = false;
    a.result = null;
    saveState();
    render();
  });

  pool.addEventListener('click', function(ev){
    const btn = ev.target.closest('[data-pool]');
    if(!btn) return;
    const id = btn.getAttribute('data-pool');
    a.pool = a.pool.filter(function(x){ return x !== id; });
    a.placed.push(id);
    a.checked = false;
    a.result = null;
    saveState();
    render();
  });

  $('#stepResetAll').addEventListener('click', function(){
    a.placed = [];
    a.pool = shuffleArray(PROBLEM_STEPS.map(function(s){ return s.id; }));
    a.checked = false;
    a.result = null;
    saveState();
    toast('Urutan diatur ulang.', 'warning');
    render();
  });

  const checkBtn = $('#stepCheck');
  if(checkBtn){
    checkBtn.addEventListener('click', function(){
      registerAttempt('steps');
      a.result = a.placed.map(function(id, i){ return id === PROBLEM_STEPS[i].id; });
      a.checked = true;
      const ok = a.result.every(function(r){ return r; });
      if(ok) scoreCorrect();
      saveState();
      render();
    });
  }

  const nextBtn = $('#stepNext');
  if(nextBtn){
    nextBtn.addEventListener('click', function(){
      markComplete('steps');
      nextScreen();
    });
  }

  attachLogoFallbacks();
}

/* =========================================================
   26. LANGKAH 6 — STUDI KASUS 1: RUTE AMAN
   ========================================================= */
const CASE1_OBJEK_CORRECT = ['kelas','koridor','tangga','perpustakaan','laboratorium'];
const CASE1_OBJEK_ALL = [
  { id:'kelas', label:'Kelas' },
  { id:'koridor', label:'Koridor' },
  { id:'tangga', label:'Tangga' },
  { id:'perpustakaan', label:'Perpustakaan' },
  { id:'laboratorium', label:'Laboratorium' },
  { id:'kantin', label:'Kantin' },
  { id:'lapangan', label:'Lapangan Upacara' },
  { id:'ruangguru', label:'Ruang Guru' }
];
const CASE1_ATURAN_CORRECT = ['a1'];
const CASE1_ATURAN_ALL = [
  { id:'a1', label:'Satu koridor dapat ditutup saat jam tertentu agar arus murid tidak terlalu padat.' },
  { id:'a2', label:'Warna koridor di sekolah adalah biru.' },
  { id:'a3', label:'Jumlah murid di setiap kelas sama banyak.' },
  { id:'a4', label:'Nama guru yang bertugas di laboratorium.' }
];

function renderCase1(root){
  const cs = CASE_STUDIES[0];
  const a = getAns('case1', function(){
    return {
      objek: [], objekOk: false,
      aturan: [], aturanOk: false,
      tujuan: '', tujuanOk: false,
      model: '', modelOk: false,
      edges: [], edgesOk: false,
      closed: false, masihBisa: '', alasan: '', perubahanOk: false
    };
  });

  const semuaOk = a.objekOk && a.aturanOk && a.tujuanOk && a.modelOk && a.edgesOk && a.perubahanOk;

  root.innerHTML = '' +
  '<section class="screen">' +
    '<h1 class="screen-title">' + escapeHtml(cs.title) + '</h1>' +

    '<div class="card card-soft">' +
      '<p class="lead">' + escapeHtml(cs.text) + '</p>' +
    '</div>' +

    /* BAGIAN A — OBJEK */
    '<div class="card">' +
      '<h2 class="card-title">A. Objek / Simpul (Node)</h2>' +
      '<p class="muted">Centang semua titik yang disebutkan dalam masalah di atas.</p>' +
      '<div class="radio-row" id="c1Objek">' +
        CASE1_OBJEK_ALL.map(function(o){
          const on = a.objek.indexOf(o.id) !== -1;
          return '<label class="check-pill"><input type="checkbox" data-objek="' + o.id + '"' + (on ? ' checked' : '') + '><span>' + escapeHtml(o.label) + '</span></label>';
        }).join('') +
      '</div>' +
      '<div class="screen-actions"><button type="button" class="btn btn-ghost btn-sm" id="c1ObjekCheck">Periksa Objek</button></div>' +
      '<div id="c1ObjekFb"></div>' +
    '</div>' +

    /* BAGIAN B — ATURAN */
    '<div class="card">' +
      '<h2 class="card-title">B. Aturan / Batasan</h2>' +
      '<p class="muted">Centang pernyataan yang benar-benar menjadi aturan atau batasan pada masalah di atas.</p>' +
      '<div class="radio-row" id="c1Aturan">' +
        CASE1_ATURAN_ALL.map(function(o){
          const on = a.aturan.indexOf(o.id) !== -1;
          return '<label class="check-pill"><input type="checkbox" data-aturan="' + o.id + '"' + (on ? ' checked' : '') + '><span>' + escapeHtml(o.label) + '</span></label>';
        }).join('') +
      '</div>' +
      '<div class="screen-actions"><button type="button" class="btn btn-ghost btn-sm" id="c1AturanCheck">Periksa Aturan</button></div>' +
      '<div id="c1AturanFb"></div>' +
    '</div>' +

    /* BAGIAN C — TUJUAN */
    '<div class="card">' +
      '<h2 class="card-title">C. Tujuan (Goal)</h2>' +
      '<p class="muted">Tuliskan dengan kata-katamu sendiri: apa yang ingin dicapai dalam masalah ini?</p>' +
      '<label class="field"><span>Jawabanmu</span>' +
        '<textarea class="input" id="c1Tujuan" rows="3">' + escapeHtml(a.tujuan) + '</textarea>' +
      '</label>' +
      '<div class="screen-actions"><button type="button" class="btn btn-ghost btn-sm" id="c1TujuanCheck">Periksa Tujuan</button></div>' +
      '<div id="c1TujuanFb"></div>' +
    '</div>' +

    /* BAGIAN D — PILIH MODEL */
    '<div class="card">' +
      '<h2 class="card-title">D. Pilih Model</h2>' +
      '<p class="muted">Model mana yang paling sesuai untuk masalah ini?</p>' +
      '<div class="btn-row" id="c1Model">' +
        '<button type="button" class="btn btn-primary" data-model="graph">Pilih Graph (Graf)</button>' +
        '<button type="button" class="btn btn-secondary" data-model="tree">Pilih Tree (Pohon)</button>' +
      '</div>' +
      '<div id="c1ModelFb"></div>' +
    '</div>' +

    /* BAGIAN E — BANGUN DIAGRAM */
    '<div class="card editor-card">' +
      '<h2 class="card-title">E. Bangun Diagram</h2>' +
      '<p class="muted">Klik satu simpul lalu klik simpul lain untuk membuat hubungan. Klik garis untuk menutup atau menghapus hubungan. Buat minimal 4 hubungan.</p>' +
      '<div class="editor">' +
        '<div class="editor-canvas" id="c1Canvas">' +
          '<svg class="editor-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"></svg>' +
        '</div>' +
        '<p class="editor-help">Simpul: Kelas, Koridor, Tangga, Perpustakaan, Laboratorium.</p>' +
      '</div>' +
      '<p class="editor-status" id="c1Status">Hubungan aktif: 0</p>' +
      '<div class="screen-actions">' +
        '<button type="button" class="btn btn-ghost btn-sm" id="c1Reset">Reset Diagram</button>' +
        '<button type="button" class="btn btn-ghost btn-sm" id="c1DiagramCheck">Periksa Diagram</button>' +
      '</div>' +
      '<div id="c1DiagramFb"></div>' +
    '</div>' +

    /* BAGIAN F — PERUBAHAN KONDISI */
    '<div class="card">' +
      '<h2 class="card-title">F. Jika Satu Koridor Ditutup</h2>' +
      '<p class="muted">Klik salah satu garis pada diagram di atas sampai berubah menjadi garis putus-putus merah (artinya koridor ditutup). Lalu jawab pertanyaan berikut.</p>' +
      '<p><strong>Apakah tujuan masih dapat dicapai?</strong></p>' +
      '<div class="btn-row" id="c1Bisa">' +
        '<button type="button" class="btn btn-ghost" data-bisa="ya">Ya, masih bisa</button>' +
        '<button type="button" class="btn btn-ghost" data-bisa="tidak">Tidak bisa</button>' +
      '</div>' +
      '<label class="field" style="margin-top:.8rem"><span>Jelaskan alasanmu</span>' +
        '<textarea class="input" id="c1Alasan" rows="3">' + escapeHtml(a.alasan) + '</textarea>' +
      '</label>' +
      '<div class="screen-actions"><button type="button" class="btn btn-ghost btn-sm" id="c1PerubahanCheck">Periksa Jawaban</button></div>' +
      '<div id="c1PerubahanFb"></div>' +
    '</div>' +

    hintBlockHTML('case1') +

    '<div class="screen-actions">' +
      '<button type="button" class="btn btn-success btn-lg" id="c1Finish"' + (semuaOk ? '' : ' disabled') + '>Selesaikan Misi Ini</button>' +
    '</div>' +
  '</section>';

  /* ===== EDITOR ===== */
  const canvas = $('#c1Canvas');
  const editor = initGraphEditor(canvas, {
    nodes: [
      { id:'kelas',         label:'Kelas',         x:15, y:20 },
      { id:'koridor',       label:'Koridor',       x:50, y:20 },
      { id:'tangga',        label:'Tangga',        x:85, y:20 },
      { id:'perpustakaan',  label:'Perpustakaan',  x:30, y:72 },
      { id:'laboratorium',  label:'Laboratorium',  x:76, y:72 }
    ],
    edges: a.edges,
    allowToggle: true,
    onChange: function(st){
      a.edges = st.edges.map(function(e){ return { a:e.a, b:e.b, disabled: !!e.disabled }; });
      const active = st.edges.filter(function(e){ return !e.disabled; }).length;
      const disabled = st.edges.filter(function(e){ return e.disabled; }).length;
      const status = $('#c1Status');
      if(status) status.textContent = 'Hubungan aktif: ' + active + ' · Hubungan ditutup: ' + disabled;
      if(disabled > 0) a.closed = true;
      saveState();
    }
  });

  /* ===== OBJEK ===== */
  const objekBox = $('#c1Objek');
  objekBox.addEventListener('change', function(){
    a.objek = $$('input[data-objek]:checked', objekBox).map(function(i){ return i.getAttribute('data-objek'); });
    saveState();
  });
  $('#c1ObjekCheck').addEventListener('click', function(){
    registerAttempt('case1');
    const fb = $('#c1ObjekFb');
    const ok = sameSet(a.objek, CASE1_OBJEK_CORRECT);
    a.objekOk = ok;
    if(ok) scoreCorrect();
    fb.innerHTML = '<div class="card feedback-card ' + (ok ? 'is-correct' : 'is-wrong') + '">' +
      '<p class="feedback-title">' + (ok ? 'Tepat!' : 'Belum tepat.') + '</p>' +
      '<p class="feedback-text">' + (ok
        ? 'Objek/simpul masalah ini adalah Kelas, Koridor, Tangga, Perpustakaan, dan Laboratorium.'
        : 'Coba baca lagi kalimat: "Ada beberapa titik yang dapat dilewati: kelas, koridor, tangga, perpustakaan, dan laboratorium." Hanya lima titik itu yang menjadi simpul.') + '</p>' +
      '</div>';
    saveState();
    updateFinishButton();
  });

  /* ===== ATURAN ===== */
  const aturanBox = $('#c1Aturan');
  aturanBox.addEventListener('change', function(){
    a.aturan = $$('input[data-aturan]:checked', aturanBox).map(function(i){ return i.getAttribute('data-aturan'); });
    saveState();
  });
  $('#c1AturanCheck').addEventListener('click', function(){
    registerAttempt('case1');
    const fb = $('#c1AturanFb');
    const ok = sameSet(a.aturan, CASE1_ATURAN_CORRECT);
    a.aturanOk = ok;
    if(ok) scoreCorrect();
    fb.innerHTML = '<div class="card feedback-card ' + (ok ? 'is-correct' : 'is-wrong') + '">' +
      '<p class="feedback-title">' + (ok ? 'Tepat!' : 'Belum tepat.') + '</p>' +
      '<p class="feedback-text">' + (ok
        ? 'Aturan/batasan pada masalah ini adalah: "Saat jam tertentu, satu koridor dapat ditutup agar arus murid tidak terlalu padat."'
        : 'Aturan atau batasan adalah hal yang membatasi pilihan kita. Pada masalah ini, batasannya adalah koridor yang dapat ditutup pada jam tertentu.') + '</p>' +
      '</div>';
    saveState();
    updateFinishButton();
  });

  /* ===== TUJUAN ===== */
  const tujuanEl = $('#c1Tujuan');
  tujuanEl.addEventListener('input', function(){ a.tujuan = tujuanEl.value; saveState(); });
  $('#c1TujuanCheck').addEventListener('click', function(){
    registerAttempt('case1');
    const fb = $('#c1TujuanFb');
    const teks = (a.tujuan || '').trim();
    const ok = teks.length >= 10;
    a.tujuanOk = ok;
    if(ok) scoreCorrect();
    fb.innerHTML = '<div class="card feedback-card ' + (ok ? 'is-correct' : 'is-wrong') + '">' +
      '<p class="feedback-title">' + (ok ? 'Bagus, tujuanmu tercatat.' : 'Tuliskan lebih lengkap.') + '</p>' +
      '<p class="feedback-text">' + (ok
        ? 'Contoh rumusan tujuan: "Mencari jalur dari kelas menuju laboratorium komputer yang tetap dapat dilewati walaupun satu koridor ditutup."'
        : 'Tuliskan minimal satu kalimat lengkap tentang apa yang ingin dicapai.') + '</p>' +
      '</div>';
    saveState();
    updateFinishButton();
  });

  /* ===== MODEL ===== */
  $('#c1Model').addEventListener('click', function(ev){
    const btn = ev.target.closest('[data-model]');
    if(!btn) return;
    registerAttempt('case1');
    a.model = btn.getAttribute('data-model');
    const ok = a.model === 'graph';
    a.modelOk = ok;
    if(ok) scoreCorrect();
    const fb = $('#c1ModelFb');
    fb.innerHTML = '<div class="card feedback-card ' + (ok ? 'is-correct' : 'is-wrong') + '">' +
      '<p class="feedback-title">' + (ok ? 'Tepat!' : 'Belum tepat.') + '</p>' +
      '<p class="feedback-text">' + (ok
        ? 'Titik-titik pada masalah ini dapat saling terhubung secara bebas dan tidak memiliki satu akar. Model yang sesuai adalah Graph (Graf).'
        : 'Perhatikan: apakah titik-titiknya tersusun bertingkat dengan satu titik paling atas? Pada masalah ini tidak. Jadi model yang sesuai adalah Graph (Graf).') + '</p>' +
      '</div>';
    saveState();
    updateFinishButton();
  });

  /* ===== DIAGRAM ===== */
  $('#c1Reset').addEventListener('click', function(){
    editor.reset();
    toast('Diagram dikembalikan ke kondisi awal.', 'warning');
  });

  $('#c1DiagramCheck').addEventListener('click', function(){
    registerAttempt('case1');
    const st = editor.getState();
    const active = st.edges.filter(function(e){ return !e.disabled; }).length;
    const ok = active >= 4;
    a.edgesOk = ok;
    if(ok) scoreCorrect();
    $('#c1DiagramFb').innerHTML = '<div class="card feedback-card ' + (ok ? 'is-correct' : 'is-wrong') + '">' +
      '<p class="feedback-title">' + (ok ? 'Diagrammu sudah cukup lengkap.' : 'Hubungan masih kurang.') + '</p>' +
      '<p class="feedback-text">' + (ok
        ? 'Jumlah hubungan aktif: ' + active + '. Diagram yang baik menunjukkan hubungan antartitik sehingga jalur dapat dianalisis.'
        : 'Buat minimal 4 hubungan. Contoh: Kelas — Koridor, Koridor — Tangga, Koridor — Perpustakaan, Perpustakaan — Laboratorium.') + '</p>' +
      '</div>';
    saveState();
    updateFinishButton();
  });

  /* ===== PERUBAHAN KONDISI ===== */
  const bisaBox = $('#c1Bisa');
  bisaBox.addEventListener('click', function(ev){
    const btn = ev.target.closest('[data-bisa]');
    if(!btn) return;
    a.masihBisa = btn.getAttribute('data-bisa');
    $$('[data-bisa]', bisaBox).forEach(function(b){ b.classList.remove('btn-primary'); });
    btn.classList.add('btn-primary');
    saveState();
  });

  const alasanEl = $('#c1Alasan');
  alasanEl.addEventListener('input', function(){ a.alasan = alasanEl.value; saveState(); });

  $('#c1PerubahanCheck').addEventListener('click', function(){
    registerAttempt('case1');
    const fb = $('#c1PerubahanFb');
    const st = editor.getState();
    const disabled = st.edges.filter(function(e){ return e.disabled; }).length;
    const alasanOk = (a.alasan || '').trim().length >= 15;
    const ok = disabled > 0 && !!a.masihBisa && alasanOk;

    a.perubahanOk = ok;
    if(ok) scoreCorrect();

    let pesan = '';
    if(disabled === 0) pesan = 'Belum ada koridor yang ditutup. Klik salah satu garis pada diagram sampai berubah menjadi garis putus-putus merah.';
    else if(!a.masihBisa) pesan = 'Pilih dulu apakah tujuan masih dapat dicapai atau tidak.';
    else if(!alasanOk) pesan = 'Tuliskan alasanmu minimal satu kalimat lengkap (minimal 15 karakter).';
    else pesan = 'Bagus. Ketika satu hubungan berubah, kita perlu memeriksa kembali hubungan yang terdampak dan menyesuaikan strategi jalurnya.';

    fb.innerHTML = '<div class="card feedback-card ' + (ok ? 'is-correct' : 'is-wrong') + '">' +
      '<p class="feedback-title">' + (ok ? 'Jawabanmu tercatat.' : 'Belum lengkap.') + '</p>' +
      '<p class="feedback-text">' + escapeHtml(pesan) + '</p>' +
      '</div>';
    saveState();
    updateFinishButton();
  });

  function updateFinishButton(){
    const btn = $('#c1Finish');
    if(!btn) return;
    const siap = a.objekOk && a.aturanOk && a.tujuanOk && a.modelOk && a.edgesOk && a.perubahanOk;
    btn.disabled = !siap;
  }

  const finishBtn = $('#c1Finish');
  finishBtn.addEventListener('click', function(){
    markComplete('case1');
    toast('Studi Kasus 1 selesai!', 'success');
    nextScreen();
  });

  updateFinishButton();
  attachLogoFallbacks();
}

/* =========================================================
   27. LANGKAH 7 — STUDI KASUS 2: STRUKTUR FOLDER
   ========================================================= */
const CASE2_NODES = [
  { id:'root',        label:'Folder Utama' },
  { id:'materi',      label:'Materi' },
  { id:'tugas',       label:'Tugas' },
  { id:'presentasi',  label:'Presentasi' },
  { id:'dokumentasi', label:'Dokumentasi' },
  { id:'individu',    label:'Individu' },
  { id:'kelompok',    label:'Kelompok' }
];
const CASE2_EXPECTED_LEVEL1 = ['materi','tugas','presentasi','dokumentasi'];
const CASE2_EXPECTED_LEVEL2 = ['individu','kelompok'];

function renderCase2(root){
  const cs = CASE_STUDIES[1];
  const a = getAns('case2', function(){
    return { parent: {}, checked: false, ok: false, alasan: '' };
  });

  root.innerHTML = '' +
  '<section class="screen">' +
    '<h1 class="screen-title">' + escapeHtml(cs.title) + '</h1>' +

    '<div class="card card-soft">' +
      '<p class="lead">' + escapeHtml(cs.text) + '</p>' +
    '</div>' +

    '<div class="card">' +
      '<h2 class="card-title">Bangun Struktur Folder</h2>' +
      '<p class="muted">Klik simpul di kotak <strong>Belum ditempatkan</strong>, lalu klik simpul lain untuk menjadikannya <em>Induk (Parent)</em>. Simpul <strong>Folder Utama</strong> adalah <em>Akar (Root)</em> dan tidak dapat dipindahkan.</p>' +
      '<p class="muted">Perhatikan: <strong>Individu</strong> dan <strong>Kelompok</strong> harus menjadi anak dari folder <strong>Tugas</strong>.</p>' +

      '<div class="editor">' +
        '<div class="editor-canvas" id="c2Canvas">' +
          '<svg class="editor-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"></svg>' +
        '</div>' +
      '</div>' +
      '<div class="tray" id="c2Tray"></div>' +
      '<p class="editor-status" id="c2Status">Simpul ditempatkan: 0 dari 6</p>' +

      '<div class="screen-actions">' +
        '<button type="button" class="btn btn-ghost btn-sm" id="c2Reset">Reset Struktur</button>' +
        '<button type="button" class="btn btn-primary btn-sm" id="c2Check">Periksa Jawaban / Check Answer</button>' +
      '</div>' +
      '<div id="c2Fb"></div>' +
    '</div>' +

    '<div class="card">' +
      '<h2 class="card-title">Mengapa model ini dipilih?</h2>' +
      '<label class="field"><span>Alasanmu</span>' +
        '<textarea class="input" id="c2Alasan" rows="3">' + escapeHtml(a.alasan) + '</textarea>' +
      '</label>' +
    '</div>' +

    hintBlockHTML('case2') +

    '<div class="screen-actions">' +
      '<button type="button" class="btn btn-success btn-lg" id="c2Finish"' + (a.ok && (a.alasan || '').trim().length >= 15 ? '' : ' disabled') + '>Selesaikan Misi Ini</button>' +
    '</div>' +
  '</section>';

  const canvas = $('#c2Canvas');
  const tray = $('#c2Tray');

  const editor = initTreeEditor(canvas, tray, {
    nodes: CASE2_NODES,
    root: 'root',
    parent: a.parent,
    onChange: function(st){
      a.parent = st.parent;
      const status = $('#c2Status');
      if(status) status.textContent = 'Simpul ditempatkan: ' + st.placedCount + ' dari 6';
      saveState();
      updateFinish();
    }
  });

  function updateFinish(){
    const btn = $('#c2Finish');
    if(!btn) return;
    btn.disabled = !(a.ok && (a.alasan || '').trim().length >= 15);
  }

  $('#c2Reset').addEventListener('click', function(){
    editor.reset();
    a.checked = false; a.ok = false;
    $('#c2Fb').innerHTML = '';
    toast('Struktur diatur ulang.', 'warning');
    saveState();
    updateFinish();
  });

  $('#c2Check').addEventListener('click', function(){
    registerAttempt('case2');
    const p = editor.getParent();
    const semuaDitempatkan = CASE2_NODES.filter(function(n){ return n.id !== 'root'; })
      .every(function(n){ return !!p[n.id]; });

    const level1Ok = CASE2_EXPECTED_LEVEL1.every(function(id){ return p[id] === 'root'; });
    const level2Ok = CASE2_EXPECTED_LEVEL2.every(function(id){ return p[id] === 'tugas'; });
    const ok = semuaDitempatkan && level1Ok && level2Ok;

    a.checked = true;
    a.ok = ok;
    if(ok) scoreCorrect();

    let pesan = '';
    if(!semuaDitempatkan) pesan = 'Masih ada simpul yang belum ditempatkan. Pindahkan semua simpul dari kotak "Belum ditempatkan".';
    else if(!level1Ok) pesan = 'Materi, Tugas, Presentasi, dan Dokumentasi seharusnya berada langsung di bawah Folder Utama.';
    else if(!level2Ok) pesan = 'Folder Tugas memiliki dua subfolder, yaitu Individu dan Kelompok.';
    else pesan = 'Struktur ini bersifat hierarkis sehingga Tree (Pohon) sesuai untuk mengorganisasi informasi bertingkat.';

    $('#c2Fb').innerHTML = '<div class="card feedback-card ' + (ok ? 'is-correct' : 'is-wrong') + '">' +
      '<p class="feedback-title">' + (ok ? 'Struktur folder tepat!' : 'Belum tepat.') + '</p>' +
      '<p class="feedback-text">' + escapeHtml(pesan) + '</p>' +
      '</div>';

    saveState();
    updateFinish();
  });

  const alasanEl = $('#c2Alasan');
  alasanEl.addEventListener('input', function(){
    a.alasan = alasanEl.value;
    saveState();
    updateFinish();
  });

  $('#c2Finish').addEventListener('click', function(){
    markComplete('case2');
    toast('Studi Kasus 2 selesai!', 'success');
    nextScreen();
  });

  updateFinish();
  attachLogoFallbacks();
}

/* =========================================================
   28. LANGKAH 8 — STUDI KASUS 3: JARINGAN REKOMENDASI
   ========================================================= */
const CASE3_NODES = [
  { id:'minat-olahraga', label:'Olahraga',      x:15, y:22 },
  { id:'minat-seni',     label:'Seni',          x:15, y:50 },
  { id:'minat-sains',    label:'Sains',         x:15, y:78 },
  { id:'keg-futsal',     label:'Futsal',        x:82, y:12 },
  { id:'keg-basket',     label:'Basket',        x:82, y:27 },
  { id:'keg-padus',      label:'Paduan Suara',  x:82, y:43 },
  { id:'keg-lukis',      label:'Lukis',         x:82, y:58 },
  { id:'keg-karya',      label:'Karya Ilmiah',  x:82, y:73 },
  { id:'keg-percobaan',  label:'Percobaan',     x:82, y:88 }
];
const CASE3_MINAT_IDS = ['minat-olahraga','minat-seni','minat-sains'];

function renderCase3(root){
  const cs = CASE_STUDIES[2];
  const a = getAns('case3', function(){
    return { edges: [], ok: false, alasan: '' };
  });

  root.innerHTML = '' +
  '<section class="screen">' +
    '<h1 class="screen-title">' + escapeHtml(cs.title) + '</h1>' +

    '<div class="card card-soft">' +
      '<p class="lead">' + escapeHtml(cs.text) + '</p>' +
    '</div>' +

    '<div class="card editor-card">' +
      '<h2 class="card-title">Bangun Hubungan Minat ↔ Kegiatan</h2>' +
      '<p class="muted">Klik satu simpul lalu klik simpul lain untuk membuat hubungan. Buat minimal 6 hubungan, dan pastikan setiap minat terhubung ke minimal 2 kegiatan.</p>' +
      '<div class="editor">' +
        '<div class="editor-canvas" id="c3Canvas">' +
          '<svg class="editor-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"></svg>' +
        '</div>' +
      '</div>' +
      '<p class="editor-status" id="c3Status">Hubungan aktif: 0</p>' +
      '<div class="screen-actions">' +
        '<button type="button" class="btn btn-ghost btn-sm" id="c3Reset">Reset Diagram</button>' +
        '<button type="button" class="btn btn-primary btn-sm" id="c3Check">Periksa Diagram</button>' +
      '</div>' +
      '<div id="c3Fb"></div>' +
    '</div>' +

    '<div class="card">' +
      '<h2 class="card-title">Model apa yang kamu gunakan?</h2>' +
      '<div class="btn-row" id="c3Model">' +
        '<button type="button" class="btn btn-ghost" data-model="graph">Graph (Graf)</button>' +
        '<button type="button" class="btn btn-ghost" data-model="tree">Tree (Pohon)</button>' +
      '</div>' +
      '<label class="field" style="margin-top:.8rem"><span>Mengapa model itu yang kamu pilih?</span>' +
        '<textarea class="input" id="c3Alasan" rows="3">' + escapeHtml(a.alasan) + '</textarea>' +
      '</label>' +
    '</div>' +

    hintBlockHTML('case3') +

    '<div class="screen-actions">' +
      '<button type="button" class="btn btn-success btn-lg" id="c3Finish"' + (a.ok && (a.alasan || '').trim().length >= 15 ? '' : ' disabled') + '>Selesaikan Misi Ini</button>' +
    '</div>' +
  '</section>';

  const editor = initGraphEditor($('#c3Canvas'), {
    nodes: CASE3_NODES,
    edges: a.edges,
    allowToggle: true,
    onChange: function(st){
      a.edges = st.edges.map(function(e){ return { a:e.a, b:e.b, disabled: !!e.disabled }; });
      const active = st.edges.filter(function(e){ return !e.disabled; }).length;
      const status = $('#c3Status');
      if(status) status.textContent = 'Hubungan aktif: ' + active;
      saveState();
    }
  });

  $('#c3Reset').addEventListener('click', function(){
    editor.reset();
    toast('Diagram diatur ulang.', 'warning');
  });

  $('#c3Check').addEventListener('click', function(){
    registerAttempt('case3');
    const st = editor.getState();
    const active = st.edges.filter(function(e){ return !e.disabled; });

    const cukup = active.length >= 6;
    const tiapMinat = CASE3_MINAT_IDS.every(function(mid){
      return active.filter(function(e){ return e.a === mid || e.b === mid; }).length >= 2;
    });
    const ok = cukup && tiapMinat;
    a.ok = ok;
    if(ok) scoreCorrect();

    let pesan = '';
    if(!cukup) pesan = 'Hubungan masih kurang. Buat minimal 6 hubungan antara minat dan kegiatan.';
    else if(!tiapMinat) pesan = 'Setiap minat sebaiknya terhubung ke minimal 2 kegiatan. Periksa minat yang masih hanya punya satu hubungan.';
    else pesan = 'Karena satu minat dapat berhubungan dengan beberapa kegiatan dan sebaliknya, model yang sesuai adalah Graph (Graf), bukan Tree (Pohon).';

    $('#c3Fb').innerHTML = '<div class="card feedback-card ' + (ok ? 'is-correct' : 'is-wrong') + '">' +
      '<p class="feedback-title">' + (ok ? 'Diagrammu sudah baik!' : 'Belum lengkap.') + '</p>' +
      '<p class="feedback-text">' + escapeHtml(pesan) + '</p>' +
      '</div>';
    saveState();
    updateFinish();
  });

  $('#c3Model').addEventListener('click', function(ev){
    const btn = ev.target.closest('[data-model]');
    if(!btn) return;
    a.model = btn.getAttribute('data-model');
    $$('[data-model]', $('#c3Model')).forEach(function(b){ b.classList.remove('btn-primary'); });
    btn.classList.add('btn-primary');
    saveState();
  });

  const alasanEl = $('#c3Alasan');
  alasanEl.addEventListener('input', function(){
    a.alasan = alasanEl.value;
    saveState();
    updateFinish();
  });

  function updateFinish(){
    const btn = $('#c3Finish');
    if(!btn) return;
    btn.disabled = !(a.ok && (a.alasan || '').trim().length >= 15);
  }

  $('#c3Finish').addEventListener('click', function(){
    markComplete('case3');
    toast('Studi Kasus 3 selesai!', 'success');
    nextScreen();
  });

  updateFinish();
  attachLogoFallbacks();
}

/* =========================================================
   29. LANGKAH 9 — PILIH MODEL & ALASAN
   ========================================================= */
function renderChooseModel(root){
  const a = getAns('choosemodel', function(){ return { why1:'', why2:'', why3:'' }; });

  const rows = [
    { kasus:'Rute Aman', model:'Graph (Graf)', key:'why1', hint:'Rute Aman' },
    { kasus:'Struktur Folder', model:'Tree (Pohon)', key:'why2', hint:'Struktur Folder' },
    { kasus:'Jaringan Rekomendasi', model:'Graph (Graf)', key:'why3', hint:'Jaringan Rekomendasi' }
  ];

  root.innerHTML = '' +
  '<section class="screen">' +
    '<h1 class="screen-title">Pilih Model dan Alasan</h1>' +
    '<p class="lead">Berikut ringkasan model dari tiga studi kasus. Tugasmu bukan hanya membaca, tetapi menjelaskan <strong>“Mengapa?”</strong></p>' +

    '<div class="card">' +
      '<div class="table-wrap">' +
      '<table class="cmp">' +
        '<thead><tr><th>Kasus</th><th>Model</th></tr></thead>' +
        '<tbody>' +
          '<tr><td>Rute Aman</td><td>Graph (Graf)</td></tr>' +
          '<tr><td>Struktur Folder</td><td>Tree (Pohon)</td></tr>' +
          '<tr><td>Jaringan Rekomendasi</td><td>Graph (Graf)</td></tr>' +
        '</tbody>' +
      '</table>' +
      '</div>' +
    '</div>' +

    rows.map(function(r, i){
      return '<div class="card">' +
        '<h2 class="card-title">' + (i + 1) + '. ' + escapeHtml(r.kasus) + ' → ' + escapeHtml(r.model) + '</h2>' +
        '<label class="field"><span>Mengapa model itu yang sesuai?</span>' +
          '<textarea class="input" data-why="' + r.key + '" rows="3">' + escapeHtml(a[r.key]) + '</textarea>' +
        '</label>' +
        '<p class="muted">Tulis minimal satu kalimat lengkap (minimal 20 karakter).</p>' +
      '</div>';
    }).join('') +

    '<div class="card card-soft">' +
      '<h2 class="card-title">Rubrik Refleksi (Penilaian Diri)</h2>' +
      '<ul>' +
        '<li>Saya menyebutkan model yang dipilih.</li>' +
        '<li>Saya memberikan alasan berdasarkan bentuk hubungannya.</li>' +
        '<li>Saya menggunakan bukti dari diagram yang saya buat.</li>' +
      '</ul>' +
    '</div>' +

    hintBlockHTML('choosemodel') +

    '<div class="screen-actions">' +
      '<button type="button" class="btn btn-primary btn-lg" id="cmCheck">Periksa Jawaban / Check Answer</button>' +
    '</div>' +
    '<div id="cmFb"></div>' +
  '</section>';

  root.addEventListener('input', function(ev){
    const t = ev.target.closest('[data-why]');
    if(!t) return;
    a[t.getAttribute('data-why')] = t.value;
    saveState();
  });

  $('#cmCheck').addEventListener('click', function(){
    registerAttempt('choosemodel');
    const kurang = [];
    if((a.why1 || '').trim().length < 20) kurang.push('Rute Aman');
    if((a.why2 || '').trim().length < 20) kurang.push('Struktur Folder');
    if((a.why3 || '').trim().length < 20) kurang.push('Jaringan Rekomendasi');

    const fb = $('#cmFb');
    if(kurang.length){
      fb.innerHTML = '<div class="card feedback-card is-wrong">' +
        '<p class="feedback-title">Belum selesai.</p>' +
        '<p class="feedback-text">Tuliskan alasanmu untuk: ' + escapeHtml(kurang.join(', ')) + '. Setiap alasan minimal 20 karakter.</p>' +
        '</div>';
      return;
    }

    scoreCorrect();
    fb.innerHTML = '<div class="card feedback-card is-correct">' +
      '<p class="feedback-title">Alasanmu tercatat.</p>' +
      '<p class="feedback-text">Model yang baik bukan sekadar gambar yang rapi, tetapi alat untuk memahami masalah, menguji strategi, dan menjelaskan alasan.</p>' +
      '<div class="screen-actions"><button type="button" class="btn btn-success btn-lg" id="cmNext">Lanjut / Next</button></div>' +
      '</div>';

    markComplete('choosemodel');

    $('#cmNext').addEventListener('click', function(){ nextScreen(); });
    saveState();
  });

  attachLogoFallbacks();
}

/* =========================================================
   30. LANGKAH 10 — JIKA HUBUNGAN BERUBAH
   ========================================================= */
function renderChange(root){
  const a = getAns('change', function(){
    return {
      edges: [
        { a:'A', b:'B', disabled:false },
        { a:'A', b:'C', disabled:false },
        { a:'B', b:'D', disabled:false },
        { a:'C', b:'D', disabled:false },
        { a:'C', b:'E', disabled:false }
      ],
      removed: false,
      q1:'', q2:'', q3:'',
      added: false,
      q4:'',
      selesai: false
    };
  });

  root.innerHTML = '' +
  '<section class="screen">' +
    '<h1 class="screen-title">Jika Hubungan Berubah</h1>' +
    '<p class="lead">Apa yang terjadi jika satu hubungan dihapus atau ditambahkan?</p>' +

    '<div class="card card-soft">' +
      '<p class="muted">Diagram di bawah ini menggambarkan lima titik: A, B, C, D, dan E. A terhubung ke B dan C; B terhubung ke D; C terhubung ke D dan E.</p>' +
    '</div>' +

    '<div class="card editor-card">' +
      '<h2 class="card-title">Diagram Awal</h2>' +
      '<div class="editor">' +
        '<div class="editor-canvas" id="chCanvas">' +
          '<svg class="editor-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"></svg>' +
        '</div>' +
      '</div>' +
      '<p class="editor-help">Klik garis untuk menutup hubungan (garis menjadi putus-putus merah). Klik dua simpul untuk menambah hubungan baru.</p>' +
      '<p class="editor-status" id="chStatus">Hubungan aktif: 5 · Hubungan ditutup: 0</p>' +
      '<div class="screen-actions"><button type="button" class="btn btn-ghost btn-sm" id="chReset">Reset Diagram</button></div>' +
    '</div>' +

    '<div class="card">' +
      '<h2 class="card-title">Tahap 1 — Hapus / Tutup Satu Hubungan</h2>' +
      '<p class="muted">Klik salah satu garis pada diagram sehingga berubah menjadi garis putus-putus merah.</p>' +
      '<label class="field"><span>1. Apa yang berubah pada diagram?</span>' +
        '<textarea class="input" data-ch="q1" rows="2">' + escapeHtml(a.q1) + '</textarea></label>' +
      '<label class="field"><span>2. Apakah tujuan masih dapat dicapai?</span>' +
        '<textarea class="input" data-ch="q2" rows="2">' + escapeHtml(a.q2) + '</textarea></label>' +
      '<label class="field"><span>3. Apakah strategi perlu diubah? Jelaskan.</span>' +
        '<textarea class="input" data-ch="q3" rows="2">' + escapeHtml(a.q3) + '</textarea></label>' +
    '</div>' +

    '<div class="card">' +
      '<h2 class="card-title">Tahap 2 — Tambah Hubungan Baru</h2>' +
      '<p class="muted">Sekarang tambahkan satu hubungan baru pada diagram dengan mengklik dua simpul secara berurutan.</p>' +
      '<label class="field"><span>4. Apa yang berubah setelah hubungan ditambahkan?</span>' +
        '<textarea class="input" data-ch="q4" rows="2">' + escapeHtml(a.q4) + '</textarea></label>' +
    '</div>' +

    hintBlockHTML('change') +

    '<div class="screen-actions">' +
      '<button type="button" class="btn btn-primary btn-lg" id="chCheck">Periksa Jawaban / Check Answer</button>' +
    '</div>' +
    '<div id="chFb"></div>' +
  '</section>';

  const editor = initGraphEditor($('#chCanvas'), {
    nodes: [
      { id:'A', label:'A', x:14, y:26 },
      { id:'B', label:'B', x:50, y:14 },
      { id:'C', label:'C', x:14, y:70 },
      { id:'D', label:'D', x:60, y:48 },
      { id:'E', label:'E', x:86, y:80 }
    ],
    edges: a.edges,
    allowToggle: true,
    onChange: function(st){
      a.edges = st.edges.map(function(e){ return { a:e.a, b:e.b, disabled: !!e.disabled }; });
      const active = st.edges.filter(function(e){ return !e.disabled; }).length;
      const disabled = st.edges.filter(function(e){ return e.disabled; }).length;
      const status = $('#chStatus');
      if(status) status.textContent = 'Hubungan aktif: ' + active + ' · Hubungan ditutup: ' + disabled;
      if(disabled > 0) a.removed = true;
      if(active > 5) a.added = true;
      saveState();
    }
  });

  $('#chReset').addEventListener('click', function(){
    editor.reset();
    toast('Diagram diatur ulang.', 'warning');
  });

  root.addEventListener('input', function(ev){
    const t = ev.target.closest('[data-ch]');
    if(!t) return;
    a[t.getAttribute('data-ch')] = t.value;
    saveState();
  });

  $('#chCheck').addEventListener('click', function(){
    registerAttempt('change');
    const st = editor.getState();
    const active = st.edges.filter(function(e){ return !e.disabled; }).length;
    const disabled = st.edges.filter(function(e){ return e.disabled; }).length;

    const fb = $('#chFb');
    const kurang = [];
    if(disabled === 0) kurang.push('menutup satu hubungan dengan mengklik salah satu garis');
    if(active <= 5) kurang.push('menambah satu hubungan baru dengan mengklik dua simpul');
    if((a.q1 || '').trim().length < 10) kurang.push('menjawab pertanyaan 1');
    if((a.q2 || '').trim().length < 10) kurang.push('menjawab pertanyaan 2');
    if((a.q3 || '').trim().length < 10) kurang.push('menjawab pertanyaan 3');
    if((a.q4 || '').trim().length < 10) kurang.push('menjawab pertanyaan 4');

    if(kurang.length){
      fb.innerHTML = '<div class="card feedback-card is-wrong">' +
        '<p class="feedback-title">Belum lengkap.</p>' +
        '<p class="feedback-text">Kamu masih perlu: ' + escapeHtml(kurang.join('; ')) + '.</p>' +
        '</div>';
      return;
    }

    scoreCorrect();
    a.selesai = true;
    saveState();

    fb.innerHTML = '<div class="card feedback-card is-correct">' +
      '<p class="feedback-title">Bagus sekali, Detektif!</p>' +
      '<p class="feedback-text">Ketika satu hubungan berubah, kita perlu memeriksa kembali hubungan yang terdampak, mengecek apakah tujuan masih dapat dicapai, dan menyesuaikan strategi. Itulah inti berpikir komputasional: <strong>model → perubahan kondisi → perubahan strategi</strong>.</p>' +
      '<div class="screen-actions"><button type="button" class="btn btn-success btn-lg" id="chNext">Lanjut / Next</button></div>' +
      '</div>';

    markComplete('change');
    $('#chNext').addEventListener('click', function(){ nextScreen(); });
  });

  attachLogoFallbacks();
}

/* =========================================================
   31. LANGKAH 11 — KUIS DIAGNOSTIK
   ========================================================= */
function renderDiagnostic(root){
  const a = getAns('diagnostic', function(){ return { order:{}, picks:{}, correct:{} }; });

  DIAGNOSTIC_QUESTIONS.forEach(function(q){
    if(!a.order[q.id] || a.order[q.id].length !== q.options.length){
      a.order[q.id] = shuffleArray(q.options.map(function(_, i){ return i; }));
    }
  });

  const totalBenar = DIAGNOSTIC_QUESTIONS.filter(function(q){ return a.correct[q.id]; }).length;

  let html = '' +
  '<section class="screen">' +
    '<h1 class="screen-title">Kuis Diagnostik</h1>' +
    '<p class="lead">Jawab lima pertanyaan berikut. Jika jawabanmu belum tepat, kamu boleh mencoba lagi. Tidak ada hukuman besar untuk kesalahan.</p>' +
    '<p class="muted">Jawaban tepat: ' + totalBenar + ' dari ' + DIAGNOSTIC_QUESTIONS.length + '</p>';

  DIAGNOSTIC_QUESTIONS.forEach(function(q, qi){
    const pick = a.picks[q.id];
    const sudah = a.correct[q.id];

    html += '<div class="card question-card">' +
      '<h2 class="q-title">Soal ' + (qi + 1) + '</h2>' +
      '<p class="q-text">' + escapeHtml(q.q) + '</p>' +
      '<div class="option-list">' +
        a.order[q.id].map(function(optIdx){
          let cls = 'option-btn';
          if(pick !== undefined){
            if(optIdx === q.answer) cls += ' is-correct';
            else if(optIdx === pick) cls += ' is-wrong';
          }
          return '<button type="button" class="' + cls + '" data-q="' + q.id + '" data-opt="' + optIdx + '"' +
            (pick !== undefined ? ' disabled' : '') + '>' +
            escapeHtml(q.options[optIdx]) + '</button>';
        }).join('') +
      '</div>';

    if(pick !== undefined){
      const benar = pick === q.answer;
      html += '<div class="card feedback-card ' + (benar ? 'is-correct' : 'is-wrong') + '" style="margin-top:.7rem;margin-bottom:0">' +
        '<p class="feedback-title">' + (benar ? 'Benar!' : 'Belum tepat.') + '</p>' +
        '<p class="feedback-text">' + escapeHtml(q.feedback) + '</p>' +
        '</div>' +
        '<div class="screen-actions"><button type="button" class="btn btn-ghost btn-sm" data-retry="' + q.id + '">Coba Lagi / Try Again</button></div>';
    }

    html += '</div>';
  });

  html += hintBlockHTML('diagnostic');

  if(totalBenar === DIAGNOSTIC_QUESTIONS.length){
    html += '<div class="screen-actions"><button type="button" class="btn btn-success btn-lg" id="dgNext">Lanjut / Next</button></div>';
  }

  html += '</section>';
  root.innerHTML = html;

  root.addEventListener('click', function(ev){
    const optBtn = ev.target.closest('[data-q][data-opt]');
    if(optBtn){
      const qid = optBtn.getAttribute('data-q');
      const optIdx = parseInt(optBtn.getAttribute('data-opt'), 10);
      const q = DIAGNOSTIC_QUESTIONS.filter(function(x){ return x.id === qid; })[0];
      if(!q) return;
      if(a.picks[qid] !== undefined) return;

      a.picks[qid] = optIdx;
      a.correct[qid] = (optIdx === q.answer);
      registerAttempt('diagnostic');
      if(a.correct[qid]) scoreCorrect();
      saveState();
      render();
      return;
    }

    const retryBtn = ev.target.closest('[data-retry]');
    if(retryBtn){
      const qid = retryBtn.getAttribute('data-retry');
      delete a.picks[qid];
      delete a.correct[qid];
      saveState();
      render();
    }
  });

  const nextBtn = $('#dgNext');
  if(nextBtn){
    nextBtn.addEventListener('click', function(){
      markComplete('diagnostic');
      toast('Kuis Diagnostik selesai!', 'success');
      nextScreen();
    });
  }

  attachLogoFallbacks();
}

/* =========================================================
   32. LANGKAH 12 — MISI TERAKHIR (ASESMEN SUMATIF)
   ========================================================= */
function renderSummative(root){
  const a = getAns('summative', function(){ return { texts:{}, checks:{} }; });

  let html = '' +
  '<section class="screen">' +
    '<h1 class="screen-title">Misi Terakhir (Asesmen Sumatif)</h1>' +
    '<div class="card card-soft">' +
      '<p class="lead">Jawablah pertanyaan terbuka berikut dengan kata-katamu sendiri. Setelah menulis jawaban, lakukan <strong>Penilaian Diri / Self Assessment</strong> dengan mencentang indikator yang sudah kamu penuhi.</p>' +
      '<p class="muted">Tidak ada jawaban yang dinilai otomatis di sini. Gurumu akan membaca jawabanmu. Yang penting adalah kamu menyebutkan model, memberikan alasan, dan menggunakan bukti dari diagram.</p>' +
    '</div>';

  SUMMATIVE_QUESTIONS.forEach(function(q, i){
    const checks = a.checks[q.id] || [];
    html += '<div class="card question-card">' +
      '<h2 class="q-title">Soal ' + (i + 1) + '</h2>' +
      '<p class="q-text">' + escapeHtml(q.text) + '</p>' +
      '<label class="field"><span>Jawabanmu</span>' +
        '<textarea class="input" data-sum="' + q.id + '" rows="4">' + escapeHtml(a.texts[q.id] || '') + '</textarea>' +
      '</label>' +
      '<fieldset class="self-assess field">' +
        '<legend>Penilaian Diri / Self Assessment</legend>' +
        '<div class="radio-row">' +
          SELF_ASSESS_INDICATORS.map(function(ind, k){
            return '<label class="check-pill"><input type="checkbox" data-check="' + q.id + '" data-i="' + k + '"' +
              (checks.indexOf(k) !== -1 ? ' checked' : '') + '><span>' + escapeHtml(ind) + '</span></label>';
          }).join('') +
        '</div>' +
      '</fieldset>' +
    '</div>';
  });

  html += hintBlockHTML('summative');
  html += '<div class="screen-actions"><button type="button" class="btn btn-primary btn-lg" id="smCheck">Periksa Jawaban / Check Answer</button></div>';
  html += '<div id="smFb"></div>';
  html += '</section>';
  root.innerHTML = html;

  root.addEventListener('input', function(ev){
    const t = ev.target.closest('[data-sum]');
    if(t){ a.texts[t.getAttribute('data-sum')] = t.value; saveState(); }
  });

  root.addEventListener('change', function(ev){
    const c = ev.target.closest('[data-check]');
    if(!c) return;
    const qid = c.getAttribute('data-check');
    const i = parseInt(c.getAttribute('data-i'), 10);
    if(!a.checks[qid]) a.checks[qid] = [];
    if(c.checked){
      if(a.checks[qid].indexOf(i) === -1) a.checks[qid].push(i);
    }else{
      a.checks[qid] = a.checks[qid].filter(function(x){ return x !== i; });
    }
    saveState();
  });

  $('#smCheck').addEventListener('click', function(){
    registerAttempt('summative');
    const kurang = [];
    SUMMATIVE_QUESTIONS.forEach(function(q, i){
      const teks = (a.texts[q.id] || '').trim();
      const checks = a.checks[q.id] || [];
      if(teks.length < 30) kurang.push('Soal ' + (i + 1) + ' (jawaban minimal 30 karakter)');
      if(checks.length < 1) kurang.push('Soal ' + (i + 1) + ' (centang minimal satu indikator penilaian diri)');
    });

    const fb = $('#smFb');
    if(kurang.length){
      fb.innerHTML = '<div class="card feedback-card is-wrong">' +
        '<p class="feedback-title">Belum selesai.</p>' +
        '<p class="feedback-text">Yang masih perlu dilengkapi: ' + escapeHtml(kurang.join('; ')) + '.</p>' +
        '</div>';
      return;
    }

    scoreCorrect();
    markComplete('summative');
    fb.innerHTML = '<div class="card feedback-card is-correct">' +
      '<p class="feedback-title">Misi Terakhir selesai!</p>' +
      '<p class="feedback-text">Terima kasih sudah menjelaskan alasanmu dengan jujur. Penilaian diri membantu kamu mengetahui bagian mana yang sudah kuat dan bagian mana yang masih perlu dilatih.</p>' +
      '<div class="screen-actions"><button type="button" class="btn btn-success btn-lg" id="smNext">Lanjut / Next</button></div>' +
      '</div>';

    $('#smNext').addEventListener('click', function(){ nextScreen(); });
    saveState();
  });

  attachLogoFallbacks();
}

/* =========================================================
   33. LANGKAH 13 — EXIT TICKET / REFLEKSI
   ========================================================= */
function renderReflection(root){
  const a = getAns('reflection', function(){ return { answers:{}, rating:0 }; });

  root.innerHTML = '' +
  '<section class="screen">' +
    '<h1 class="screen-title">Exit Ticket / Refleksi</h1>' +
    '<p class="lead">Luangkan waktu sejenak. Jawab dengan jujur, tidak perlu panjang.</p>' +

    EXIT_TICKET.map(function(q, i){
      return '<div class="card">' +
        '<label class="field"><span>' + (i + 1) + '. ' + escapeHtml(q.text) + '</span>' +
          '<textarea class="input" data-ref="' + q.id + '" rows="3">' + escapeHtml(a.answers[q.id] || '') + '</textarea>' +
        '</label>' +
      '</div>';
    }).join('') +

    '<div class="card">' +
      '<h2 class="card-title">4. ' + escapeHtml(EXIT_RATING_TEXT) + '</h2>' +
      '<div class="btn-row" id="refStars">' +
        [1,2,3,4].map(function(n){
          const stars = new Array(n + 1).join('⭐');
          return '<button type="button" class="btn btn-ghost' + (a.rating === n ? ' btn-primary' : '') +
            '" data-star="' + n + '" aria-label="Nilai kesiapan ' + n + ' dari 4">' + stars + ' ' + n + '</button>';
        }).join('') +
      '</div>' +
    '</div>' +

    hintBlockHTML('reflection') +

    '<div class="screen-actions">' +
      '<button type="button" class="btn btn-primary btn-lg" id="refCheck">Periksa Jawaban / Check Answer</button>' +
    '</div>' +
    '<div id="refFb"></div>' +
  '</section>';

  root.addEventListener('input', function(ev){
    const t = ev.target.closest('[data-ref]');
    if(!t) return;
    a.answers[t.getAttribute('data-ref')] = t.value;
    saveState();
  });

  $('#refStars').addEventListener('click', function(ev){
    const btn = ev.target.closest('[data-star]');
    if(!btn) return;
    a.rating = parseInt(btn.getAttribute('data-star'), 10);
    $$('[data-star]', $('#refStars')).forEach(function(b){
      b.classList.remove('btn-primary');
      b.classList.add('btn-ghost');
    });
    btn.classList.add('btn-primary');
    btn.classList.remove('btn-ghost');
    saveState();
  });

  $('#refCheck').addEventListener('click', function(){
    registerAttempt('reflection');
    const kurang = [];
    EXIT_TICKET.forEach(function(q, i){
      if(((a.answers[q.id] || '').trim()).length < 5) kurang.push('pertanyaan ' + (i + 1));
    });
    if(!a.rating) kurang.push('penilaian kesiapan diri (bintang 1–4)');

    const fb = $('#refFb');
    if(kurang.length){
      fb.innerHTML = '<div class="card feedback-card is-wrong">' +
        '<p class="feedback-title">Belum lengkap.</p>' +
        '<p class="feedback-text">Masih perlu diisi: ' + escapeHtml(kurang.join(', ')) + '.</p>' +
        '</div>';
      return;
    }

    scoreCorrect();
    markComplete('reflection');
    fb.innerHTML = '<div class="card feedback-card is-correct">' +
      '<p class="feedback-title">Refleksimu tersimpan.</p>' +
      '<p class="feedback-text">Sekarang kamu bisa melihat hasil belajarmu dan mengunduh laporan LKPD.</p>' +
      '<div class="screen-actions"><button type="button" class="btn btn-success btn-lg" id="refNext">Lanjut / Next</button></div>' +
      '</div>';

    $('#refNext').addEventListener('click', function(){ nextScreen(); });
    saveState();
  });

  attachLogoFallbacks();
}

/* =========================================================
   34. LANGKAH 14 — HASIL BELAJAR
   ========================================================= */
function renderResult(root){
  refreshBadges();

  const totalMisi = SCREENS.length;
  const selesai = Object.keys(state.completed).length;
  const totalPercobaan = Object.keys(state.attempts).reduce(function(sum, k){
    return sum + (state.attempts[k] || 0);
  }, 0);

  /* Hitung kekuatan per kategori */
  const kategori = hitungKategori();

  /* Aktivitas yang perlu diulang */
  const perluDiulang = [];
  const aGT = state.answers.graphtree;
  if(aGT && aGT.answers){
    let salah = 0;
    MODEL_EXAMPLES.forEach(function(ex){ if(aGT.answers[ex.id] && aGT.answers[ex.id] !== ex.answer) salah++; });
    if(salah > 0) perluDiulang.push('Graf atau Tree? (' + salah + ' contoh masih keliru)');
  }
  const aD = state.answers.diagnostic;
  if(aD && aD.correct){
    const salah = DIAGNOSTIC_QUESTIONS.filter(function(q){ return !aD.correct[q.id]; }).length;
    if(salah > 0) perluDiulang.push('Kuis Diagnostik (' + salah + ' soal belum tepat)');
  }
  if(state.hints && Object.keys(state.hints).some(function(k){ return state.hints[k] >= 3; })){
    perluDiulang.push('Aktivitas yang kamu buka semua petunjuknya — coba ulangi tanpa petunjuk.');
  }
  if(!perluDiulang.length) perluDiulang.push('Tidak ada. Semua aktivitas utama sudah kamu selesaikan dengan baik.');

  /* Galeri model */
  const galeri = [];
  const c1 = state.answers.case1;
  if(c1 && c1.edges && c1.edges.length){
    galeri.push({
      title:'Model 1 — Rute Aman Menuju Ruang Laboratorium',
      model:'Graph (Graf)',
      isi: c1.edges.map(function(e){
        return '  • ' + e.a + ' — ' + e.b + (e.disabled ? '  (ditutup)' : '');
      }).join('\n'),
      catatan: c1.tujuan || '-'
    });
  }
  const c2 = state.answers.case2;
  if(c2 && c2.parent && Object.keys(c2.parent).length){
    galeri.push({
      title:'Model 2 — Struktur Folder Proyek Kelas',
      model:'Tree (Pohon)',
      isi: Object.keys(c2.parent).map(function(child){
        return '  • Induk (Parent): ' + c2.parent[child] + '  →  Anak (Child): ' + child;
      }).join('\n'),
      catatan: c2.alasan || '-'
    });
  }
  const c3 = state.answers.case3;
  if(c3 && c3.edges && c3.edges.length){
    galeri.push({
      title:'Model 3 — Jaringan Rekomendasi Kegiatan',
      model:'Graph (Graf)',
      isi: c3.edges.map(function(e){
        return '  • ' + e.a + ' ↔ ' + e.b + (e.disabled ? '  (ditutup)' : '');
      }).join('\n'),
      catatan: c3.alasan || '-'
    });
  }
  const aCh = state.answers.change;
  if(aCh && aCh.edges && aCh.edges.length){
    galeri.push({
      title:'Model 4 — Jika Hubungan Berubah (A, B, C, D, E)',
      model:'Graph (Graf)',
      isi: aCh.edges.map(function(e){
        return '  • ' + e.a + ' — ' + e.b + (e.disabled ? '  (ditutup)' : '');
      }).join('\n'),
      catatan: aCh.q4 || '-'
    });
  }

  root.innerHTML = '' +
  '<section class="screen">' +
    '<h1 class="screen-title">Misi Selesai!</h1>' +
    '<p class="lead">Kerja bagus, Detektif ' + escapeHtml(state.student.name || '-') + '. Berikut ringkasan hasil belajarmu.</p>' +

    '<div class="card">' +
      '<h2 class="card-title">Identitas</h2>' +
      '<div class="stat-grid">' +
        '<div class="stat"><div class="label">Nama</div><div class="value" style="font-size:1rem">' + escapeHtml(state.student.name || '-') + '</div></div>' +
        '<div class="stat"><div class="label">Kelas</div><div class="value" style="font-size:1rem">' + escapeHtml(state.student.kelas || '-') + '</div></div>' +
        '<div class="stat"><div class="label">Mode</div><div class="value" style="font-size:1rem">' + (state.student.mode === 'kelompok' ? 'Kelompok' : 'Individu') + '</div></div>' +
        '<div class="stat"><div class="label">Tanggal</div><div class="value" style="font-size:.95rem">' + escapeHtml(formatDateID(new Date())) + '</div></div>' +
      '</div>' +
    '</div>' +

    '<div class="card">' +
      '<h2 class="card-title">Ringkasan Aktivitas</h2>' +
      '<div class="stat-grid">' +
        '<div class="stat"><div class="label">Total Aktivitas</div><div class="value">' + totalMisi + '</div></div>' +
        '<div class="stat"><div class="label">Jumlah Selesai</div><div class="value">' + selesai + '</div></div>' +
        '<div class="stat"><div class="label">Skor (Score)</div><div class="value">' + state.score + '</div></div>' +
        '<div class="stat"><div class="label">Jumlah Percobaan</div><div class="value">' + totalPercobaan + '</div></div>' +
      '</div>' +
      '<p class="disclaimer" style="margin-top:.8rem">Skor ini merupakan indikator aktivitas belajar dalam game, bukan nilai rapor.</p>' +
    '</div>' +

    '<div class="card">' +
      '<h2 class="card-title">Kekuatan Belajarmu</h2>' +
      '<div class="category-list">' +
        kategori.map(function(k){
          return '<div class="category-row">' +
            '<span class="cat-name">' + escapeHtml(k.nama) + '</span>' +
            '<span class="category-bar"><span style="width:' + k.persen + '%"></span></span>' +
            '<span class="cat-val">' + k.persen + '%</span>' +
          '</div>';
        }).join('') +
      '</div>' +
    '</div>' +

    '<div class="card">' +
      '<h2 class="card-title">Lencana (Badge)</h2>' +
      '<div class="badge-grid">' +
        BADGES.map(function(b){
          const earned = state.badges.indexOf(b.id) !== -1;
          return '<span class="badge' + (earned ? ' is-earned' : '') + '">' +
            (earned ? '★ ' : '☆ ') + escapeHtml(b.label) + '</span>';
        }).join('') +
      '</div>' +
    '</div>' +

    '<div class="card">' +
      '<h2 class="card-title">Aktivitas yang Perlu Diulang</h2>' +
      '<ul>' + perluDiulang.map(function(p){ return '<li>' + escapeHtml(p) + '</li>'; }).join('') + '</ul>' +
    '</div>' +

    '<div class="card">' +
      '<h2 class="card-title">Model Saya</h2>' +
      (galeri.length
        ? galeri.map(function(g){
            return '<div class="gallery-item">' +
              '<h4>' + escapeHtml(g.title) + '</h4>' +
              '<p class="muted">Model: ' + escapeHtml(g.model) + '</p>' +
              '<pre>' + escapeHtml(g.isi) + '</pre>' +
              '<p class="muted" style="margin-top:.4rem"><strong>Catatan:</strong> ' + escapeHtml(g.catatan) + '</p>' +
            '</div>';
          }).join('')
        : '<p class="muted">Belum ada model yang tersimpan.</p>') +
    '</div>' +

    '<div class="card">' +
      '<h2 class="card-title">Refleksi Singkat</h2>' +
      '<p><strong>Satu hal yang saya pahami:</strong> ' + escapeHtml((state.answers.reflection && state.answers.reflection.answers && state.answers.reflection.answers.ex1) || '-') + '</p>' +
      '<p><strong>Yang masih membingungkan:</strong> ' + escapeHtml((state.answers.reflection && state.answers.reflection.answers && state.answers.reflection.answers.ex2) || '-') + '</p>' +
      '<p><strong>Jika satu hubungan berubah, saya akan:</strong> ' + escapeHtml((state.answers.reflection && state.answers.reflection.answers && state.answers.reflection.answers.ex3) || '-') + '</p>' +
      '<p><strong>Nilai kesiapan diri:</strong> ' +
        ((state.answers.reflection && state.answers.reflection.rating) ? (new Array(state.answers.reflection.rating + 1).join('⭐') + ' (' + state.answers.reflection.rating + '/4)') : '-') +
      '</p>' +
    '</div>' +

    '<div class="screen-actions">' +
      '<button type="button" class="btn btn-primary" id="resDownloadTxt">Download Result (Unduh Hasil) .txt</button>' +
      '<button type="button" class="btn btn-secondary" id="resDownloadJson">Download Result (Unduh Hasil) .json</button>' +
      '<button type="button" class="btn btn-ghost" id="resPrint">Print Worksheet (Cetak LKPD)</button>' +
      '<button type="button" class="btn btn-ghost" id="resRestart">Kembali ke Awal</button>' +
    '</div>' +
  '</section>';

  $('#resDownloadTxt').addEventListener('click', function(){ downloadTxt(); });
  $('#resDownloadJson').addEventListener('click', function(){ downloadJson(); });
  $('#resPrint').addEventListener('click', function(){ window.print(); });
  $('#resRestart').addEventListener('click', function(){
    goTo('briefing');
  });

  attachLogoFallbacks();
}

function hitungKategori(){
  const hasil = [];

  /* Pemahaman Awal — briefing + graphtree */
  let pa = 0;
  if(state.completed.briefing) pa += 50;
  if(state.completed.graphtree) pa += 50;
  hasil.push({ nama:'Pemahaman Awal', persen: pa });

  /* Pemodelan — case1, case2, case3 */
  let pm = 0;
  if(state.answers.case1 && state.answers.case1.edgesOk) pm += 34;
  if(state.answers.case2 && state.answers.case2.ok) pm += 33;
  if(state.answers.case3 && state.answers.case3.ok) pm += 33;
  hasil.push({ nama:'Pemodelan', persen: pm });

  /* Penalaran — steps + diagnostic */
  let pn = 0;
  if(state.answers.steps && state.answers.steps.checked && state.answers.steps.result &&
     state.answers.steps.result.every(function(r){ return r; })) pn += 50;
  const aD = state.answers.diagnostic;
  if(aD && aD.correct){
    const benar = DIAGNOSTIC_QUESTIONS.filter(function(q){ return aD.correct[q.id]; }).length;
    pn += Math.round((benar / DIAGNOSTIC_QUESTIONS.length) * 50);
  }
  hasil.push({ nama:'Penalaran', persen: pn });

  /* Strategi — vocab + change + choosemodel */
  let ps = 0;
  if(state.completed.vocab) ps += 34;
  if(state.completed.change) ps += 33;
  if(state.completed.choosemodel) ps += 33;
  hasil.push({ nama:'Strategi', persen: ps });

  /* Refleksi — summative + reflection */
  let pr = 0;
  if(state.completed.summative) pr += 50;
  if(state.completed.reflection) pr += 50;
  hasil.push({ nama:'Refleksi', persen: pr });

  return hasil;
}

/* =========================================================
   35. DOWNLOAD HASIL
   ========================================================= */
function buildResultObject(){
  return {
    aplikasi: 'LKPD Game Interaktif — Misi Detektif Struktur',
    judul: GAME_CONFIG.title,
    sekolah: GAME_CONFIG.schoolName,
    mataPelajaran: GAME_CONFIG.subject,
    kelas: GAME_CONFIG.grade,
    fase: GAME_CONFIG.phase,
    pertemuan: GAME_CONFIG.meeting,
    tanggal: nowISO(),
    murid: {
      nama: state.student.name,
      kelas: state.student.kelas,
      mode: state.student.mode
    },
    skor: state.score,
    jumlahAktivitas: SCREENS.length,
    jumlahSelesai: Object.keys(state.completed).length,
    misiSelesai: Object.keys(state.completed),
    jumlahPercobaan: state.attempts,
    petunjukDibuka: state.hints,
    lencana: state.badges,
    jawaban: state.answers,
    catatan: 'Skor ini merupakan indikator aktivitas belajar dalam game, bukan nilai rapor.'
  };
}

function buildResultText(){
  const obj = buildResultObject();
  const L = [];
  L.push('==========================================================');
  L.push('LKPD INFORMATIKA KELAS 9');
  L.push('PEMECAHAN MASALAH TERPADU GRAF & TREE');
  L.push(obj.sekolah.toUpperCase());
  L.push('==========================================================');
  L.push('');
  L.push('Nama Murid       : ' + (obj.murid.nama || '-'));
  L.push('Kelas            : ' + (obj.murid.kelas || '-'));
  L.push('Mode Pengerjaan  : ' + (obj.murid.mode === 'kelompok' ? 'Kelompok' : 'Individu'));
  L.push('Tanggal          : ' + formatDateID(new Date()));
  L.push('');
  L.push('----------------------------------------------------------');
  L.push('RINGKASAN');
  L.push('----------------------------------------------------------');
  L.push('Skor (Score)          : ' + obj.skor);
  L.push('Total Aktivitas       : ' + obj.jumlahAktivitas);
  L.push('Jumlah Selesai        : ' + obj.jumlahSelesai);
  L.push('Lencana (Badge)       : ' + (obj.lencana.length ? obj.lencana.join(', ') : '-'));
  L.push('');
  L.push('Catatan: Skor ini merupakan indikator aktivitas belajar dalam game,');
  L.push('bukan nilai rapor.');
  L.push('');
  L.push('----------------------------------------------------------');
  L.push('JAWABAN STUDI KASUS 1 — RUTE AMAN MENUJU RUANG LABORATORIUM');
  L.push('----------------------------------------------------------');
  const c1 = obj.jawaban.case1 || {};
  L.push('Tujuan (Goal)  : ' + (c1.tujuan || '-'));
  L.push('Model dipilih  : ' + (c1.model || '-'));
  L.push('Hubungan (Edge):');
  (c1.edges || []).forEach(function(e){
    L.push('   - ' + e.a + ' — ' + e.b + (e.disabled ? ' (ditutup)' : ''));
  });
  if(!(c1.edges || []).length) L.push('   -');
  L.push('Tujuan masih dapat dicapai? : ' + (c1.masihBisa || '-'));
  L.push('Alasan : ' + (c1.alasan || '-'));
  L.push('');
  L.push('----------------------------------------------------------');
  L.push('JAWABAN STUDI KASUS 2 — STRUKTUR FOLDER PROYEK KELAS');
  L.push('----------------------------------------------------------');
  const c2 = obj.jawaban.case2 || {};
  L.push('Struktur (Induk → Anak):');
  Object.keys(c2.parent || {}).forEach(function(ch){
    L.push('   - ' + c2.parent[ch] + '  →  ' + ch);
  });
  if(!Object.keys(c2.parent || {}).length) L.push('   -');
  L.push('Alasan pemilihan model : ' + (c2.alasan || '-'));
  L.push('');
  L.push('----------------------------------------------------------');
  L.push('JAWABAN STUDI KASUS 3 — JARINGAN REKOMENDASI KEGIATAN');
  L.push('----------------------------------------------------------');
  const c3 = obj.jawaban.case3 || {};
  L.push('Model dipilih : ' + (c3.model || '-'));
  L.push('Hubungan:');
  (c3.edges || []).forEach(function(e){ L.push('   - ' + e.a + ' ↔ ' + e.b); });
  if(!(c3.edges || []).length) L.push('   -');
  L.push('Alasan : ' + (c3.alasan || '-'));
  L.push('');
  L.push('----------------------------------------------------------');
  L.push('ALASAN PEMILIHAN MODEL (LEVEL 7)');
  L.push('----------------------------------------------------------');
  const cm = obj.jawaban.choosemodel || {};
  L.push('Rute Aman            : ' + (cm.why1 || '-'));
  L.push('Struktur Folder      : ' + (cm.why2 || '-'));
  L.push('Jaringan Rekomendasi : ' + (cm.why3 || '-'));
  L.push('');
  L.push('----------------------------------------------------------');
  L.push('JIKA HUBUNGAN BERUBAH');
  L.push('----------------------------------------------------------');
  const ch = obj.jawaban.change || {};
  L.push('1. Apa yang berubah?                : ' + (ch.q1 || '-'));
  L.push('2. Apakah tujuan masih tercapai?    : ' + (ch.q2 || '-'));
  L.push('3. Apakah strategi perlu diubah?    : ' + (ch.q3 || '-'));
  L.push('4. Setelah hubungan ditambahkan?    : ' + (ch.q4 || '-'));
  L.push('');
  L.push('----------------------------------------------------------');
  L.push('KUIS DIAGNOSTIK');
  L.push('----------------------------------------------------------');
  const dg = obj.jawaban.diagnostic || {};
  DIAGNOSTIC_QUESTIONS.forEach(function(q, i){
    const pick = dg.picks ? dg.picks[q.id] : undefined;
    const benar = dg.correct ? dg.correct[q.id] : false;
    L.push((i + 1) + '. ' + q.q);
    L.push('   Jawabanmu : ' + (pick === undefined ? 'belum dijawab' : q.options[pick]) +
      '  [' + (benar ? 'BENAR' : 'BELUM TEPAT') + ']');
  });
  L.push('');
  L.push('----------------------------------------------------------');
  L.push('MISI TERAKHIR (ASESMEN SUMATIF)');
  L.push('----------------------------------------------------------');
  const sm = obj.jawaban.summative || {};
  SUMMATIVE_QUESTIONS.forEach(function(q, i){
    L.push('Soal ' + (i + 1) + ': ' + q.text);
    L.push('Jawaban : ' + ((sm.texts && sm.texts[q.id]) || '-'));
    const checks = (sm.checks && sm.checks[q.id]) || [];
    L.push('Penilaian diri : ' + (checks.length
      ? checks.map(function(k){ return SELF_ASSESS_INDICATORS[k]; }).join('; ')
      : '-'));
    L.push('');
  });
  L.push('----------------------------------------------------------');
  L.push('EXIT TICKET / REFLEKSI');
  L.push('----------------------------------------------------------');
  const rf = obj.jawaban.reflection || {};
  EXIT_TICKET.forEach(function(q, i){
    L.push((i + 1) + '. ' + q.text);
    L.push('   ' + (((rf.answers || {})[q.id]) || '-'));
  });
  L.push('4. ' + EXIT_RATING_TEXT);
  L.push('   Nilai: ' + (rf.rating || '-') + ' dari 4');
  L.push('');
  L.push('==========================================================');
  L.push('LKPD Informatika Kelas 9 · Pemecahan Masalah Terpadu Graf & Tree');
  L.push('© 2026 SMP Negeri 19 Kota Bekasi');
  L.push('==========================================================');
  return L.join('\n');
}

function downloadFile(filename, content, mime){
  try{
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function(){ URL.revokeObjectURL(url); }, 1500);
    toast('Berkas berhasil diunduh.', 'success');
  }catch(err){
    toast('Maaf, berkas gagal diunduh di peramban ini.', 'danger');
  }
}

function safeFileName(){
  const nama = (state.student.name || 'murid').replace(/[^a-zA-Z0-9_-]+/g, '_').slice(0, 30);
  const kelas = (state.student.kelas || 'kelas').replace(/[^a-zA-Z0-9_-]+/g, '_').slice(0, 12);
  const tgl = new Date().toISOString().slice(0, 10);
  return 'LKPD_Graf_Tree_' + nama + '_' + kelas + '_' + tgl;
}

function downloadTxt(){
  downloadFile(safeFileName() + '.txt', buildResultText(), 'text/plain;charset=utf-8');
}

function downloadJson(){
  downloadFile(safeFileName() + '.json', JSON.stringify(buildResultObject(), null, 2), 'application/json;charset=utf-8');
}

/* =========================================================
   36. LOGO FALLBACK (agar tidak ada gambar rusak)
   ========================================================= */
function attachLogoFallbacks(){
  $$('img.logo-img').forEach(function(img){
    if(img.dataset.bound === '1') return;
    img.dataset.bound = '1';

    img.addEventListener('error', function(){
      img.style.display = 'none';
      const wrap = img.closest('.brand-logo') || img.closest('.hero-logo');
      if(wrap) wrap.classList.add('logo-missing');
    });

    /* Jika gambar sudah gagal dimuat sebelum listener terpasang */
    if(img.complete && img.naturalWidth === 0){
      img.style.display = 'none';
      const wrap = img.closest('.brand-logo') || img.closest('.hero-logo');
      if(wrap) wrap.classList.add('logo-missing');
    }
  });
}

/* =========================================================
   37. RENDER UTAMA
   ========================================================= */
const RENDERERS = {
  welcome: renderWelcome,
  briefing: renderBriefing,
  icebreaking: renderIceBreaking,
  graphtree: renderGraphTree,
  vocab: renderVocab,
  steps: renderSteps,
  case1: renderCase1,
  case2: renderCase2,
  case3: renderCase3,
  choosemodel: renderChooseModel,
  change: renderChange,
  diagnostic: renderDiagnostic,
  summative: renderSummative,
  reflection: renderReflection,
  result: renderResult
};

function render(){
  const root = $('#screenRoot');
  if(!root) return;

  /* Pastikan current valid */
  const valid = SCREENS.some(function(s){ return s.id === state.current; });
  if(!valid) state.current = 'welcome';

  /* Jika murid belum mengisi identitas, kunci ke welcome */
  if(!state.student.name && state.current !== 'welcome'){
    state.current = 'welcome';
  }

  /* Pastikan current sudah terbuka */
  if(state.unlocked.indexOf(state.current) === -1){
    state.current = state.unlocked[state.unlocked.length - 1] || 'welcome';
  }

  root.innerHTML = '';
  const fn = RENDERERS[state.current] || renderWelcome;
  fn(root);

  updateHeader();
  updateNav();
  attachLogoFallbacks();

  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
}

/* =========================================================
   38. RESET PROGRESS
   ========================================================= */
function resetProgress(){
  showModal({
    title: 'Reset Progress (Atur Ulang Kemajuan)',
    body: '<p>Yakin ingin menghapus semua progress? Semua jawaban, skor, dan refleksi akan hilang dan tidak dapat dikembalikan.</p>',
    actions: [
      { label: 'Batal', cls: 'btn-ghost', onClick: hideModal },
      {
        label: 'Ya, Hapus Semua',
        cls: 'btn-warning',
        onClick: function(){
          try{ localStorage.removeItem(STORAGE_KEY); }catch(err){ /* diabaikan */ }
          state = createDefaultState();
          saveState();
          hideModal();
          render();
          toast('Progress sudah dihapus. Misi dimulai dari awal.', 'warning');
        }
      }
    ]
  });
}

/* =========================================================
   39. RESUME (LANJUTKAN MISI TERAKHIR)
   ========================================================= */
function tawarkanResume(saved){
  showModal({
    title: 'Lanjutkan misi terakhir?',
    body: '<p>Kami menemukan progress sebelumnya untuk <strong>' +
      escapeHtml(saved.student && saved.student.name ? saved.student.name : 'murid') +
      '</strong>.</p>' +
      '<p>Kamu bisa melanjutkan dari misi terakhir, atau memulai dari awal.</p>',
    actions: [
      {
        label: 'Mulai dari Awal',
        cls: 'btn-ghost',
        onClick: function(){
          try{ localStorage.removeItem(STORAGE_KEY); }catch(err){ /* diabaikan */ }
          state = createDefaultState();
          saveState();
          hideModal();
          render();
          toast('Misi baru dimulai.', 'warning');
        }
      },
      {
        label: 'Lanjutkan / Resume',
        cls: 'btn-primary',
        onClick: function(){
          state = saved;
          hideModal();
          render();
          toast('Melanjutkan misi terakhir.', 'success');
        }
      }
    ]
  });
}

/* =========================================================
   40. EVENT GLOBAL
   ========================================================= */
document.addEventListener('click', function(ev){
  /* Navigasi sidebar */
  const navBtn = ev.target.closest('[data-nav]');
  if(navBtn && !navBtn.disabled){
    goTo(navBtn.getAttribute('data-nav'));
    return;
  }

  /* Hint */
  const hintBtn = ev.target.closest('[data-hint]');
  if(hintBtn){
    useHint(hintBtn.getAttribute('data-hint'));
    return;
  }
});

document.addEventListener('keydown', function(ev){
  if(ev.key === 'Escape'){
    const backdrop = $('#modalBackdrop');
    if(backdrop && !backdrop.hidden) hideModal();
  }
});

/* =========================================================
   41. INISIALISASI
   ========================================================= */
function initGame(){
  /* Tombol reset & print di sidebar */
  const btnReset = $('#btnReset');
  if(btnReset) btnReset.addEventListener('click', resetProgress);

  const btnPrintNav = $('#btnPrintNav');
  if(btnPrintNav) btnPrintNav.addEventListener('click', function(){ window.print(); });

  /* Modal: klik latar untuk menutup */
  const backdrop = $('#modalBackdrop');
  if(backdrop){
    backdrop.addEventListener('click', function(ev){
      if(ev.target === backdrop) hideModal();
    });
  }

  const saved = loadState();

  if(saved && (saved.student && saved.student.name) && Object.keys(saved.completed || {}).length > 0){
    /* Tampilkan dulu layar kosong dengan tombol, lalu tawarkan resume */
    state = createDefaultState();
    render();
    tawarkanResume(saved);
  }else{
    if(saved) state = saved;
    render();
  }

  /* Simpan saat halaman ditutup */
  window.addEventListener('beforeunload', function(){
    saveState();
  });
}

/* Jalankan setelah DOM siap */
if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', initGame);
}else{
  initGame();
}