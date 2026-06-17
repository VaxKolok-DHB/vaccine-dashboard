// =========================
// 🔥 Firebase
// =========================
const firebaseConfig = {
  apiKey: "HnOSpjSHma268VX3glsVJ9idzj9Uc1jjcqkJ7P11",
  authDomain: "vaccine-dashboard-bc687.firebaseapp.com",
  databaseURL: "https://vaccine-dashboard-bc687-default-rtdb.firebaseio.com/",
  projectId: "vaccine-dashboard-bc687",
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// =========================
// 📍 ตำบล (แสดงไทย)
// =========================
const tambonMap = {
  all: "ทั้งหมด",
  kolok: "สุไหงโก-ลก",
  munoh: "มูโนะ",
  pasemas: "ปาเสมัส",
  puyoh: "ปูโยะ"
};

// =========================
// 💉 รายการวัคซีน
// =========================
const vaccineList = [
  "BCG",
  "HBV1",
  "HBV2",
  "IPV1",
  "IPV2",
  "DTP1",
  "DTP2",
  "DTP3",
  "DTP4",
  "DTP5",
  "OPV1",
  "OPV2",
  "OPV3",
  "OPV4",
  "OPV5",
  "MMR1",
  "MMR2",
  "JE1",
  "JE2",
  "Rota1",
  "Rota2",
  "Rota3",
  "HPV1",
  "HPV2",
  "dT"
];

const vaccineLabel = {
  "BCG":   "BCG",
  "HBV1":  "HBV1",
  "HBV2":  "HBV2",
  "IPV1":  "IPV1",
  "IPV2":  "IPV2",
  "DTP1":  "DTP-HB-Hib1",
  "DTP2":  "DTP-HB-Hib2",
  "DTP3":  "DTP-HB-Hib3",
  "DTP4":  "DTP4",
  "DTP5":  "DTP5",
  "OPV1":  "OPV1",
  "OPV2":  "OPV2",
  "OPV3":  "OPV3",
  "OPV4":  "OPV4",
  "OPV5":  "OPV5",
  "MMR1":  "MMR1",
  "MMR2":  "MMR2",
  "JE1":   "JE1",
  "JE2":   "JE2",
  "Rota1": "Rota1",
  "Rota2": "Rota2",
  "Rota3": "Rota3",
  "HPV1": "HPV เข็มที่ 1",
  "HPV2": "HPV เข็มที่ 2",
  "dT":   "dT (ป.6)",
};

// =========================
// 📅 เกณฑ์อายุเริ่มฉีดของวัคซีนแต่ละตัว (หน่วย: เดือน)
// ใช้เป็น "ฐานเทียบ" สำหรับคำนวณ ฉีดแล้ว/ตกหล่น ใน loadvaccineChart()
// เด็กที่อายุยังไม่ถึงเกณฑ์จะไม่ถูกนับเป็นฐาน (ไม่ใช่ "ตกหล่น")
// =========================
const vaccineAgeSchedule = {
  BCG: 0, HBV1: 0,
  DTP1: 2, IPV1: 2, OPV1: 2, Rota1: 2,
  DTP2: 4, IPV2: 4, OPV2: 4, Rota2: 4,
  DTP3: 6, OPV3: 6, Rota3: 6,
  MMR1: 9, JE1: 9,
  DTP4: 18, OPV4: 18,
  MMR2: 30, JE2: 30,
  DTP5: 72, OPV5: 72,
  HPV1: 132, HPV2: 132,
  dT: 132
};

// =========================
// 🏥 หน่วยบริการ — แหล่งข้อมูลเดียว (single source of truth)
// ใช้แทน hospitalMap เดิม + object ซ้ำใน updateHospitalFilter() + getHospitalName()
// =========================
const hospitalData = {
  kolok: [
    { id: "77729", name: "ศูนย์แพทย์ใกล้ใจ1 (เทศบาล)" },
    { id: "77728", name: "ศูนย์แพทย์ใกล้ใจ2 (เจริญเขต)" }
  ],
  munoh: [
    { id: "10169", name: "รพ.สต.มูโนะ" }
  ],
  puyoh: [
    { id: "10170", name: "รพ.สต.ปูโยะ" }
  ],
  pasemas: [
    { id: "10168", name: "รพ.สต.ปาเสมัส" },
    { id: "10658", name: "รพ.สต.บ้านกวาลอซีรา" }
  ]
};

function getHospitalName(id) {
  for (const list of Object.values(hospitalData)) {
    const h = list.find(x => x.id === id);
    if (h) return h.name;
  }
  return "-";
}

// =========================
// รายชื่อหมู่/ชุมชน
// =========================
const villageData = {
  pasemas: {
    "1": { name: "บ้านซรายอ",      leader: "ฮารีมคาน" },
    "2": { name: "บ้านตือระ",       leader: "นาซูฮา"   },
    "3": { name: "บ้านปาเสมัส",     leader: "ณรงค์"    },
    "4": { name: "บ้านน้ำตก",       leader: "มาฮาโซ"   },
    "5": { name: "บ้านกวาลอซีรา",   leader: "มะรอดี"   },
    "6": { name: "บ้านซรายอออก",    leader: "ปฏิวัติ"  },
    "7": { name: "บ้านกูแบอีแก",    leader: "อัสมี"    },
    "8": { name: "บ้านศาลาใหม่",    leader: "รุสวา"    }
  },
  munoh: {
    "1": { name: "บ้านมูโนะ",       leader: "สาลีมี"   },
    "2": { name: "บ้านลูโบะลือซง",  leader: "นาทวี"    },
    "3": { name: "บ้านปาดังยอ",     leader: "มุสตอปา"  },
    "4": { name: "บ้านปูโปะ",       leader: "ประเสริฐ" },
    "5": { name: "บ้านบูเก๊ะ",      leader: "อามาซะ"   }
  },
  puyoh: {
    "1": { name: "บ้านลาแล",        leader: "เฉลิมพล"  },
    "2": { name: "บ้านปูโยะ",       leader: "อาหามะ"   },
    "3": { name: "บ้านฆอแย",        leader: "ไซมี"     },
    "4": { name: "บ้านน้ำตก",       leader: "นรวีร์"   },
    "5": { name: "บ้านตอออ",        leader: "สมนึก"    },
    "6": { name: "บ้านกูยิ",        leader: "มะยูนุ"   }
  }
};

const kolokCommunity = {
  "1":  { name: "ชุมชนกูโบร์" },
  "2":  { name: "ชุมชนโต๊ะลือเบ" },
  "3":  { name: "ชุมชนตันหยงมะลิ" },
  "4":  { name: "ชุมชนโก-ลกวิลเลจ" },
  "5":  { name: "ชุมชนบือเร็ง" },
  "6":  { name: "ชุมชนกือดำบำรู" },
  "7":  { name: "ชุมชนกือบงกำแม" },
  "8":  { name: "ชุมชนหัวสะพาน" },
  "9":  { name: "ชุมชนเสาสัญญาณ" },
  "10": { name: "ชุมชนดงงูเห่า" },
  "11": { name: "ชุมชนหลังด่าน" },
  "12": { name: "ชุมชนมัสยิดกลาง" },
  "13": { name: "ชุมชนจือแลตูลี" },
  "14": { name: "ชุมชนสันติสุข" },
  "15": { name: "ชุมชนปาโงปิเมง" },
  "16": { name: "ชุมชนปาโงเปาะเล็ง" },
  "17": { name: "ชุมชนโปฮงยามู" },
  "18": { name: "ชุมชนอริศรา" },
  "19": { name: "ชุมชนเจริญสุข" },
  "20": { name: "ชุมชนหัวกุญแจ" },
  "21": { name: "ชุมชนสวนมะพร้าว" },
  "22": { name: "ชุมชนท่ากอไผ่" },
  "23": { name: "ชุมชนท่าประปา" },
  "24": { name: "ชุมชนท่าโรงเลื่อย" },
  "25": { name: "ชุมชนหลังล้อแม็ก" },
  "26": { name: "ชุมชนศรีอามาน" },
  "27": { name: "ชุมชนทรายทอง" },
  "28": { name: "ชุมชนบือเร็งใน" },
  "29": { name: "ชุมชนซรีจาฮายา" },
  "30": { name: "ชุมชนเจริญทรัพย์" },
  "31": { name: "ชุมชนเจริญเขต" }
};

// =========================
// 🏥 Hospital filter (dropdown) — ใช้ hospitalData ตัวเดียว
// =========================
function updateHospitalFilter() {
  const tambon = document.getElementById("tambonFilter").value;
  const hospitalSelect = document.getElementById("hospitalFilter");

  hospitalSelect.innerHTML = `<option value="all"> ทุกหน่วยบริการ</option>`;
  hospitalSelect.value = "all"; // reset ทุกครั้งที่เปลี่ยนตำบล ป้องกัน hospital เก่าค้าง

  if (!hospitalData[tambon]) return;
  hospitalData[tambon].forEach(h => {
    hospitalSelect.innerHTML += `<option value="${h.id}">${h.name}</option>`;
  });
}

// =========================
// 🔓 ล็อกอิน
// =========================
function login() {
  let cid = document.getElementById("cid").value.replace(/\D/g, '');
  const msg = document.getElementById("msg");
  msg.innerText = "";

  if (cid.length !== 13) {
    msg.innerText = "กรอกเลขบัตรให้ครบ 13 หลัก";
    return;
  }

  db.ref("users").once("value", snap => {
    const data = snap.val() || {};
    let foundUser = null;

    for (let id in data) {
      const dbCid = (data[id].cid || "").replace(/\D/g, '');
      if (dbCid === cid) {
        foundUser = { id, ...data[id] };
        break;
      }
    }

    if (!foundUser) { msg.innerText = "ไม่พบผู้ใช้"; return; }
    if (foundUser.status === "rejected") { msg.innerText = "บัญชีถูกปฏิเสธ"; return; }
    if (foundUser.status !== "approved") { msg.innerText = "รอผู้ดูแลอนุมัติ"; return; }

    const fullName = foundUser.name + " " + (foundUser.lastname || "");

    localStorage.setItem("user",     foundUser.cid);
    localStorage.setItem("name",     fullName);
    localStorage.setItem("username", fullName);
    localStorage.setItem("role",     foundUser.role || "user");

    db.ref("loginLogs").push({
      cid:       foundUser.cid,
      name:      fullName,
      role:      foundUser.role || "user",
      date:      new Date().toLocaleDateString("th-TH"),
      loginTime: new Date().toLocaleTimeString("th-TH")
    });

    window.location.href = "index.html";
  });
}

function loadKPI()  { console.log("โหลด KPI"); }
function goTambon() { console.log("โหลดตำบล"); }

// =========================
// 📑 สมัคร
// =========================
function register() {
  const name     = document.getElementById("name").value.trim();
  const lastname = document.getElementById("lastname").value.trim();
  const cid      = document.getElementById("cid").value.trim();
  const email    = document.getElementById("email").value.trim();
  const phone    = document.getElementById("phone").value.trim();
  const position = getPosition();
  const msg      = document.getElementById("msg");

  msg.style.color = "red";

  if (!name || !lastname || !cid) { msg.innerText = "❌ กรุณากรอกข้อมูลให้ครบ"; return; }
  if (cid.length !== 13)          { msg.innerText = "❌ เลขบัตรต้อง 13 หลัก";    return; }
  if (!position)                  { msg.innerText = "❌ กรุณาเลือกหรือระบุตำแหน่งงาน"; return; }

  db.ref("users/" + cid).once("value", snap => {
    if (snap.exists()) { msg.innerText = "❌ มีผู้ใช้นี้แล้ว"; return; }

    db.ref("users/" + cid).set({
      cid, name, lastname, email, phone, position,
      role: "user",
      status: "pending",
      createdAt: new Date().toISOString()
    }).then(() => {
      msg.style.color = "green";
      msg.innerText = "✅ สมัครสำเร็จ รอผู้ดูแลอนุมัติ";
      setTimeout(() => { window.location.href = "login.html"; }, 1500);
    });
  });
}

// ฟังก์ชันช่วยหน้าสมัคร (register.html)
function getPosition() {
  const sel = document.getElementById("position");
  if (!sel) return "";
  if (sel.value === "other") return (document.getElementById("position-other")?.value || "").trim();
  return sel.value;
}

function handlePosChange() {
  const sel       = document.getElementById("position");
  const otherWrap = document.getElementById("other-wrap");
  const preview   = document.getElementById("pos-preview");
  const previewText = document.getElementById("pos-preview-text");

  if (sel.value === "other") {
    otherWrap.style.display = "block";
    preview.style.display   = "none";
    document.getElementById("position-other")?.focus();
  } else if (sel.value) {
    otherWrap.style.display = "none";
    if (previewText) previewText.textContent = sel.value;
    if (preview)     preview.style.display   = "block";
  } else {
    otherWrap.style.display = "none";
    if (preview) preview.style.display = "none";
  }
}

function toggleBtn() {
  const agreed = document.getElementById("pdpa-agree")?.checked;
  const btn    = document.getElementById("btn-reg");
  if (btn) btn.disabled = !agreed;
}

// =========================
// 📊 โหลดข้อมูล + ตาราง + กราฟ
// =========================
let currentPage = 1;
const rowsPerPage = 30;
let followChart;
let chartMode = "percent";
let childRef  = null;
let allChildren = [];
let ROW_HEIGHT   = 65;
let VISIBLE_ROWS = 40;
const PAGE_SIZE  = 6000;
let lastKey   = null;
let isLoading = false;
let statusFilter = "all";
let selectedVaccine = "all"; // ประกาศไว้ที่นี่ ใช้ร่วมกันทั้ง loadFollow และ loadvaccineChart

function loadFollow() {
  const keyword        = (document.getElementById("searchInput")?.value  || "").toLowerCase();
  const tambonFilter   = document.getElementById("tambonFilter")?.value  || "all";
  const hospitalFilter = document.getElementById("hospitalFilter")?.value || "all";
  const typeAreaFilter = document.getElementById("typeAreaFilter")?.value || "all";
  const ageFilter      = document.getElementById("ageFilter")?.value     || "all";
  const mobileList     = document.getElementById("mobileList");
  const isMobile       = window.innerWidth < 768;

  if (mobileList) mobileList.innerHTML = "";
  if (childRef)   childRef.off();

  childRef = db.ref("children").orderByKey().limitToFirst(PAGE_SIZE);

  childRef.once("value", snap => {
    const data         = snap.val() || {};
    const html         = [];
    const mobileHtml   = [];
    const filteredData = [];
    let done = 0, notdone = 0;
    let villageMap = {};
    let vaccineFilterActive = (selectedVaccine !== "all"); // ใช้บอกผู้ใช้ว่ากำลังกรองอยู่

    for (let id in data) {
      let c = data[id] || {};

      // หมายเหตุ: การกรองด้วย selectedVaccine ในตารางติดตาม (loadFollow)
      // มีความหมายต่างจากกราฟวัคซีน (loadvaccineChart) — ที่นี่คือ
      // "แสดงเฉพาะเด็กที่ได้รับวัคซีนนี้แล้ว" ไม่ใช่ฐานเทียบฉีด/ตกหล่น
      if (selectedVaccine !== "all") {
        if (!c.vaccines || !c.vaccines[selectedVaccine]) continue;
      }

      if (!c.name?.trim() || !c.cid?.trim()) continue;

      const age = getAgeMonths(c.birth);

      if (ageFilter !== "all") {
        const target = parseInt(ageFilter);
        if (!(age >= target - 1 && age <= target + 1)) continue;
      }

      if (tambonFilter   !== "all" && c.tambon   !== tambonFilter)   continue;
      if (hospitalFilter !== "all" && c.hospital !== hospitalFilter) continue;

      if (typeAreaFilter !== "all") {
        const cType = c.typeArea || "1"; // default = Type 1 ถ้าไม่มีค่า
        if (cType !== typeAreaFilter) continue;
      }

      const hn   = (c.hn   || "").toLowerCase();
      const name = (c.name || "").toLowerCase();
      const cid  = (c.cid  || "").toLowerCase();

      if (keyword && !name.includes(keyword) && !cid.includes(keyword) && !hn.includes(keyword)) continue;

      const count = c.vaccines ? Object.keys(c.vaccines).length : 0;

      const isDone = count >= 10;
      if (statusFilter === "done"    && !isDone) continue;
      if (statusFilter === "notdone" &&  isDone) continue;

      if (isDone) { done++; } else { notdone++; }

      let v = c.village || "ไม่ระบุ";
      if (!villageMap[v]) villageMap[v] = { done: 0, notdone: 0 };
      if (isDone) { villageMap[v].done++; } else { villageMap[v].notdone++; }

      if (isMobile) {
        mobileHtml.push(`
<div class="child-card">
  <div class="child-top">
    <div>
      <div class="child-name">👶 ${c.name || '-'}</div>
      <div class="child-hn">HN : ${c.hn || '-'}</div>
    </div>
    <span class="status-badge ${isDone ? 'done' : 'notdone'}">
      ${isDone ? '✔︎ ฉีดครบ' : '✘ ยังไม่ครบ'}
    </span>
  </div>
  <div class="child-info">📍 ${getTambonName(c.tambon)}</div>
  <div class="child-info">🏠 บ้าน ${c.house || "-"} | หมู่ ${c.village || "-"}</div>
  <div class="child-meta">
    <span class="age-badge">${getAgeBadge(c.birth)}</span>
    <span class="vaccine-count">💉 ${count} เข็ม</span>
  </div>
  <div class="child-footer">
    <button onclick="openVaccineModal('${id}')" class="btn btn-primary">💉 ดูวัคซีน</button>
  </div>
</div>`);
      }

      filteredData.push({ id, c, count, isDone });
    }

    const start    = (currentPage - 1) * rowsPerPage;
    const pageData = filteredData.slice(start, start + rowsPerPage);

    pageData.forEach(row => {
      const { id, c, count, isDone } = row;
      html.push(`
<tr data-id="${id}">
<td><input value="${c.hn   || ''}" onchange="autoSave('${id}','hn',this.value)"></td>
<td><input value="${c.cid  || ''}" onchange="autoSave('${id}','cid',this.value)"></td>
<td><input value="${c.name || ''}" onchange="autoSave('${id}','name',this.value)"></td>
<td>
  <select class="form-select" style="min-width:130px" onchange="changeTambon(this)">
    <option value="">-- เลือกตำบล --</option>
    <option value="kolok"   ${c.tambon === "kolok"   ? "selected" : ""}>สุไหงโก-ลก</option>
    <option value="munoh"   ${c.tambon === "munoh"   ? "selected" : ""}>มูโนะ</option>
    <option value="puyoh"   ${c.tambon === "puyoh"   ? "selected" : ""}>ปูโยะ</option>
    <option value="pasemas" ${c.tambon === "pasemas" ? "selected" : ""}>ปาเสมัส</option>
  </select>
</td>
<td>
  <select class="form-select" style="min-width:160px" onchange="autoSave('${id}','hospital',this.value)">
    <option value="">-- เลือกรพ.สต --</option>
    <option value="10170" ${c.hospital === "10170" ? "selected" : ""}>รพ.สต.ปูโยะ</option>
    <option value="10169" ${c.hospital === "10169" ? "selected" : ""}>รพ.สต.มูโนะ</option>
    <option value="10168" ${c.hospital === "10168" ? "selected" : ""}>รพ.สต.ปาเสมัส</option>
    <option value="77729" ${c.hospital === "77729" ? "selected" : ""}>ศูนย์แพทย์ใกล้ใจ1</option>
    <option value="77728" ${c.hospital === "77728" ? "selected" : ""}>ศูนย์แพทย์ใกล้ใจ2</option>
    <option value="10658" ${c.hospital === "10658" ? "selected" : ""}>รพ.สต.บ้านกวาลอซีรา</option>
  </select>
</td>
<td><input value="${c.house || ''}" onchange="autoSave('${id}','house',this.value)"></td>
<td>${buildVillageDropdown(c.tambon, c.village, id)}</td>
<td>
  <input type="date"
    value="${formatDateInput(c.birth)}"
    onchange="autoSave('${id}','birth',this.value)">
</td>
<td class="age-cell">${getAgeBadge(c.birth)}</td>
<td onclick="openVaccineModal('${id}')" style="cursor:pointer;text-align:center">
  <div style="display:inline-flex;align-items:center;justify-content:center;min-width:70px;height:36px;border-radius:10px;border:1px solid #ddd;background:${count === 0 ? '#fee2e2' : '#dcfce7'};color:${count === 0 ? '#dc2626' : '#059669'};">
    💉 ${count}
  </div>
</td>
<td><input value="${c.caregiver || ''}" onchange="autoSave('${id}','caregiver',this.value)" placeholder="ชื่อผู้ดูแล"></td>

<td><input value="${c.note || ''}" onchange="autoSave('${id}','note',this.value)"></td>

<td>${c.updatedAt || "-"}</td><td><button onclick="deleteChild('${id}')" title="ลบ" style="border:none;background:none;cursor:pointer;font-size:18px;color:#e24b4a;">
  <i class="ti ti-trash"></i>
</button></td>
<td>
  <select onchange="updateStatus('${id}',this.value)">
    <option value="pending" ${!isDone ? 'selected' : ''}>ยังไม่ครบ</option>
    <option value="done"    ${isDone ? 'selected' : ''}>ฉีดครบ</option>
  </select>
</td>
<td>
  <select class="form-select" style="min-width:130px" onchange="autoSave('${id}','typeArea',this.value)">
    <option value="1" ${(!c.typeArea || c.typeArea === "1") ? "selected" : ""}>Type 1: อยู่จริงตามทะเบียน</option>
    <option value="2" ${c.typeArea === "2" ? "selected" : ""}>Type 2: มีชื่อ ไม่อยู่จริง</option>
    <option value="3" ${c.typeArea === "3" ? "selected" : ""}>Type 3: ไม่มีชื่อ แต่อยู่จริง</option>
    <option value="4" ${c.typeArea === "4" ? "selected" : ""}>Type 4: นอกเขต มารับบริการ</option>
  </select>
</td>
</tr>
`
      );
    });

    const followTable = document.getElementById("followTable");
    if (mobileList)   mobileList.innerHTML  = mobileHtml.join("");
    if (followTable)  followTable.innerHTML  = html.join("");

    renderPagination(filteredData.length);

    document.getElementById("total").innerText   = done + notdone;
    document.getElementById("done").innerText    = done;
    document.getElementById("notdone").innerText = notdone;

    const percent = done + notdone > 0 ? ((done / (done + notdone)) * 100).toFixed(1) : 0;
    document.getElementById("percent").innerText = percent + "%";

    let title = "📊 สรุปภาพรวมข้อมูลการฉีดวัคซีน";
    if (tambonFilter !== "all") title = "📊 สรุปข้อมูลการฉีดวัคซีนรายตำบล";

    const chartDesc = document.getElementById("chartDescription");
    if (chartDesc) {
      let descHtml = `<b>${title}</b><br>🟢 ฉีดแล้ว (ครบ 10 เข็มขึ้นไป): ${done} คน (${percent}%)<br>🔴 ยังไม่ครบ: ${notdone} คน`;
      if (vaccineFilterActive) {
        descHtml += `<br><small style="color:gray">* กำลังแสดงเฉพาะเด็กที่ได้รับ ${vaccineLabel[selectedVaccine] || selectedVaccine} แล้ว</small>`;
      }
      chartDesc.innerHTML = descHtml;
    }

    if (followChart && typeof followChart.destroy === "function") followChart.destroy();

    let labels = [], datasets = [], type = "bar";

    if (chartMode === "percent") {
      type = "doughnut";
      const total          = done + notdone || 1;
      const donePercent    = ((done    / total) * 100).toFixed(1);
      const notdonePercent = ((notdone / total) * 100).toFixed(1);
      labels   = ['ฉีดครบ', 'ยังไม่ครบ'];
      datasets = [{ data: [donePercent, notdonePercent], backgroundColor: ["rgba(0,255,153,0.6)", "rgba(253,0,0,0.64)"], borderWidth: 3 }];

      followChart = new Chart(document.getElementById("followChart"), {
        type, data: { labels, datasets },
        options: {
          responsive: true, maintainAspectRatio: false, cutout: '55%',
          plugins: { legend: { position: 'bottom' }, tooltip: { callbacks: { label: (ctx) => ctx.label + " : " + ctx.raw + "%" } } }
        },
        plugins: [{
          id: 'centerText',
          beforeDraw(chart) {
            const { ctx, chartArea: { width, height } } = chart;
            ctx.save();
            ctx.font = "bold 20px sans-serif";
            ctx.fillStyle = "#374151";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(donePercent + "%", width / 2, height / 2);
            ctx.restore();
          }
        }]
      });
    } else {
      type = "bar";
      let vLabels = Object.keys(villageMap);
      let maxVillage = "", maxValue = 0;

      Object.keys(villageMap).forEach(v => {
        if (villageMap[v].notdone > maxValue) { maxValue = villageMap[v].notdone; maxVillage = v; }
      });

      if (tambonFilter !== "all") {
        document.getElementById("chartDescription").innerHTML +=
          `<br><b>📍 หมู่ที่ต้องติดตามมากที่สุด:</b> หมู่ ${maxVillage} (${maxValue} คน)`;
      }

      vLabels = vLabels.sort((a, b) => {
        if (a === "ไม่ระบุ") return 1;
        if (b === "ไม่ระบุ") return -1;
        return a - b;
      });

      labels = vLabels;
      const doneData    = vLabels.map(v => villageMap[v].done);
      const notdoneData = vLabels.map(v => villageMap[v].notdone);
      const totalData   = vLabels.map(v => villageMap[v].done + villageMap[v].notdone);

      datasets = [
        { label: 'ฉีดครบ',    data: doneData,    backgroundColor: '#5ee991', borderRadius: 12, barThickness: 16 },
        { label: 'ยังไม่ครบ', data: notdoneData, backgroundColor: '#ff5757', borderRadius: 12, barThickness: 16 }
      ];

      if (followChart) followChart.destroy();

      followChart = new Chart(document.getElementById("followChart"), {
        type, data: { labels, datasets },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: {
            legend: { position: 'bottom', labels: { boxWidth: 12, padding: 15 } },
            tooltip: {
              backgroundColor: "#111827",
              callbacks: {
                label:      (ctx) => `${ctx.dataset.label}: ${ctx.raw} คน`,
                afterLabel: (ctx) => "รวม: " + totalData[ctx.dataIndex] + " คน"
              }
            }
          },
          scales: {
            x: { stacked: true, grid: { display: false } },
            y: { stacked: true, beginAtZero: true, ticks: { precision: 0 } }
          }
        }
      });
    }
  });
}

function setMode(mode) { chartMode = mode; loadFollow(); }

function renderPagination(totalRows) {
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  let html = `<button class="btn btn-sm btn-secondary me-1" ${currentPage === 1 ? "disabled" : ""} onclick="changePage(${currentPage - 1})">◀</button>`;

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= 2) {
      html += `<button class="btn btn-sm ${i === currentPage ? "btn-primary" : "btn-outline-primary"} me-1" onclick="changePage(${i})">${i}</button>`;
    }
  }

  html += `<button class="btn btn-sm btn-secondary" ${currentPage === totalPages ? "disabled" : ""} onclick="changePage(${currentPage + 1})">▶</button>`;
  document.getElementById("pagination").innerHTML = html;
}

function changePage(page) { currentPage = page; loadFollow(); }

// =========================
// 🗓 Helper: วันที่ไทย ↔ ISO
// =========================

// วันนี้เป็น ISO yyyy-mm-dd
function todayISO() {
  return new Date().toISOString().split("T")[0];
}

// แปลง ISO หรือ dd/mm/yyyy จาก DB → ISO สำหรับ input[type=date]
function toInputDate(val) {
  if (!val) return "";
  val = String(val).trim();

  // ISO yyyy-mm-dd → คืนเลย
  if (/^\d{4}-\d{2}-\d{2}$/.test(val)) return val;

  // dd/mm/yyyy หรือ d/m/yyyy (รองรับทั้ง ค.ศ. และ พ.ศ.)
  if (val.includes("/")) {
    const parts = val.split("/");
    if (parts.length === 3) {
      let [d, m, y] = parts.map(Number);
      if (y >= 2500) y -= 543;
      return `${y}-${String(m).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
    }
  }

  // Excel serial number
  if (!isNaN(val) && Number(val) > 40000) {
    return new Date((Number(val) - 25569) * 86400 * 1000)
      .toISOString().split("T")[0];
  }

  return val;
}

// =========================
// 💉 เปิด Modal วัคซีน
// =========================
let currentId = "";

function openVaccineModal(id) {
  currentId = id;

  db.ref("children/" + id).once("value").then(snap => {
    const data    = snap.val() || {};
    const current = data.vaccines || {};
    let html = "";

    vaccineList.forEach(v => {
      const saved   = current[v] || "";
      const checked = saved ? "checked" : "";
      const dateVal = toInputDate(saved);

      html += `
        <div class="vaccine-item mb-2 d-flex align-items-center gap-2 flex-wrap">
          <input type="checkbox"
            value="${v}"
            ${checked}
            onchange="toggleDateInline(this,'${v}')">
          <label style="width:120px; margin:0;">${vaccineLabel[v] || v}</label>
          <input type="date"
            id="modal-date-${v}"
            value="${dateVal}"
            style="max-width:160px; ${saved ? '' : 'display:none;'}"
            class="form-control form-control-sm"
            onclick="this.focus()"
            onfocus="this.showPicker && this.showPicker()">
        </div>`;
    });

    document.getElementById("vaccineEditor").innerHTML = html;

    // ✅ แก้ปัญหา overflow บน modal
    const modalEl = document.getElementById("vaccineModal");
    modalEl.addEventListener("shown.bs.modal", () => {
      modalEl.querySelector(".modal-body").style.overflowY = "visible";
      modalEl.querySelector(".modal-dialog").style.overflow = "visible";
    }, { once: true });

    new bootstrap.Modal(modalEl).show();
  });

}

// toggle แสดง/ซ่อน date picker + เปิดปฏิทินทันทีเมื่อติ๊ก
function toggleDateInline(checkbox, vaccine) {
  const item = checkbox.closest('.vaccine-item') || checkbox.parentElement;
  const dateInput = item.querySelector('input[type="date"]');
  if (!dateInput) return;

  if (checkbox.checked) {
    dateInput.style.display = "";
    if (!dateInput.value) dateInput.value = todayISO();
  } else {
    dateInput.style.display = "none";
    dateInput.value = "";
  }
}

// =========================
// 💾 บันทึกวัคซีน
// =========================
function saveVaccines() {
  let newVaccines = {};

  document.querySelectorAll("#vaccineEditor .vaccine-item").forEach(item => {
    const cb        = item.querySelector("input[type=checkbox]");
    const name      = cb.value;
    const dateInput = item.querySelector("input[type=date]");
    let dateVal     = (dateInput ? dateInput.value : "").trim();

    if (!cb.checked) return;

    if (!dateVal) {
      dateVal = todayISO();
      if (dateInput) {
        dateInput.value = dateVal;
        dateInput.style.display = "";
      }
    }

    newVaccines[name] = dateVal;
  });

  db.ref("children/" + currentId).once("value").then(snap => {
    const child = snap.val() || {};

    return Promise.all([
      db.ref("children/" + currentId).update({
        vaccines:  newVaccines,
        updatedAt: new Date().toLocaleString("th-TH")
      }),
      db.ref("symptoms/" + currentId).update({
        name:         child.name  || "",
        hn:           child.hn    || "",
        cid:          child.cid   || "",
        birth:        child.birth || "",
        house:        child.house || "",
        vaccines:     newVaccines,
        symptom:      "ยังไม่ระบุ",
        level:        "🟠 รอติดตาม",
        status:       "รอติดตาม",
        priority:     1,
        followStep:   1,
        normalCount:  0,
        nextFollowUp: Date.now() + 60000,
        time:         Date.now()
      })
    ]);
  }).then(() => {
    alert("บันทึกแล้ว ✅");
    try { sendLineFollowUp(currentId); } catch (e) { console.log(e); }
    try { loadFollow(); }               catch (e) { console.log(e); }
    try { loadvaccineChart(); }         catch (e) { console.log(e); }
  }).catch(err => {
    console.error(err);
    alert("บันทึกไม่สำเร็จ ❌");
  });
}

// =========================
// 🔄 เปลี่ยนสถานะ
// =========================
function updateStatus(id, status) {
  if (status === "pending") {
    db.ref("children/" + id + "/vaccines").remove();
    loadFollow();
    loadvaccineChart();
  } else {
    openVaccineModal(id);
  }
}

// =========================
// 📝 autosave
// =========================
let saveTimer = {};

function autoSave(id, field, value) {
  clearTimeout(saveTimer[id + field]);
  saveTimer[id + field] = setTimeout(() => {
    db.ref("children/" + id).once("value").then(snap => {
      const oldData  = snap.val() || {};
      const oldValue = oldData[field] || "-";
      return db.ref("children/" + id).update({
        [field]:   value,
        updatedAt: new Date().toLocaleString("th-TH")
      }).then(() => {
        saveLog("แก้ไขข้อมูล", field, oldValue, value);
        showSaved();
      });
    });
  }, 800);
}

function showSaved() {
  let toast = document.getElementById("saveToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "saveToast";
    Object.assign(toast.style, {
      position: "fixed", bottom: "20px", right: "20px",
      background: "#16a34a", color: "white", padding: "10px 16px",
      borderRadius: "8px", boxShadow: "0 4px 10px rgba(0,0,0,0.2)", zIndex: "9999"
    });
    document.body.appendChild(toast);
  }
  toast.innerText    = "💾 บันทึกแล้ว";
  toast.style.display = "block";
  setTimeout(() => { toast.style.display = "none"; }, 1500);
}

// =========================
// ➕ เพิ่มข้อมูล
// =========================
function getFormData() {
  return {
    hn:       document.getElementById("hn").value.trim(),
    cid:      document.getElementById("cid").value.trim(),
    name:     document.getElementById("name").value.trim(),
    tambon:   document.getElementById("tambon").value,
    hospital: document.getElementById("hospital").value,
    house:    document.getElementById("house").value,
    birth:    document.getElementById("birth").value,
    note:     document.getElementById("note").value,
    village:  document.getElementById("village")?.value || "",
    soi:      document.getElementById("soi")?.value    || "",
    phone:    document.getElementById("phone").value.trim(),
    typeArea: document.getElementById("typeArea")?.value || "1"
  };
}

function getVaccines() {
  let vaccines = {};
  document.querySelectorAll(".vaccine-container input[type=checkbox]:checked").forEach(cb => {
    const name = cb.value;
    let date   = document.getElementById("date-" + name)?.value;
    if (!date) date = new Date().toISOString().split("T")[0];
    vaccines[name] = date;
  });
  return vaccines;
}

function validateChild(c) {
  if (!c.name || !c.cid)                    { alert("กรุณากรอกชื่อและเลขบัตร");    return false; }
  if (!c.tambon || !c.hospital || !c.village) { alert("กรุณากรอกข้อมูลให้ครบ");    return false; }
  return true;
}

function resetForm() {
  ["hn", "cid", "name", "house", "birth", "note", "phone"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });
  const villageEl = document.getElementById("village");
  const soiEl     = document.getElementById("soi");
  if (villageEl) villageEl.value = "";
  if (soiEl)     soiEl.value     = "";

  document.querySelectorAll(".vaccine-container input[type=checkbox]").forEach(cb => cb.checked = false);
  document.querySelectorAll(".vaccine-container input[type=date]").forEach(d => { d.value = ""; d.style.display = "none"; });
}

function saveChild(data) { return db.ref("children").push(data); }

function addChildFull() {
  const c        = getFormData();
  const vaccines = getVaccines();

  if (!validateChild(c)) return;

  const data   = { ...c, vaccines, updatedAt: new Date().toLocaleString("th-TH") };
  const newRef = db.ref("children").push();
  const childId = newRef.key;

  newRef.set(data).then(() => {
    return db.ref("symptoms/" + childId).set({
      name: c.name || "", hn: c.hn || "", phone: c.phone || "",
      vaccines, symptom: "ยังไม่ระบุ", level: "🟢 ปกติ",
      status: "รอติดตาม", priority: 99, time: Date.now()
    });
  }).then(() => {
    alert("✅ บันทึกแล้ว");
    resetForm();
    loadFollow();
    loadvaccineChart();
    if (confirm("ไปหน้าติดตามอาการไหม?")) window.location.href = "symptoms.html";
  }).catch(err => {
    console.error("ERROR:", err);
    alert("เกิดข้อผิดพลาด:\n" + err.message);
  });
}

function buildVillageDropdown(tambon, selected, id) {
  let data = tambon === "kolok" ? kolokCommunity : (villageData[tambon] || {});
  return `
  <select id="village" class="form-select" style="min-width:130px" onchange="autoSave('${id}','village',this.value)">
    <option value="">-- เลือกหมู่ --</option>
    ${Object.keys(data).map(v => `
      <option value="${v}" ${v == selected ? "selected" : ""}>
        ${tambon === "kolok" ? data[v].name : `หมู่ ${v} - ${data[v].name}`}
      </option>`).join("")}
  </select>`;
}

// =========================
// 🗑 ลบ
// =========================
function deleteChild(id) {
  if (confirm("ลบข้อมูลนี้?")) {
    db.ref("children/" + id).remove().then(() => {
      loadFollow();
      loadvaccineChart();
    });
  }
}

// =========================
// 🚪 logout
// =========================
function logout() {
  db.ref("loginLogs").push({
    name:       localStorage.getItem("name"),
    role:       localStorage.getItem("role"),
    action:     "ออกจากระบบ",
    date:       new Date().toLocaleDateString("th-TH"),
    logoutTime: new Date().toLocaleTimeString("th-TH")
  }).then(() => { localStorage.clear(); location.href = "login.html"; });
}

// =========================
// 📥 importExcel
// =========================
const vaccineMap = {
  "041": "BCG",
  "D21": "DTP1", "D22": "DTP2", "D23": "DTP3", "D24": "DTP4", "D25": "DTP5",
  "IP1": "IPV1", "IP2": "IPV2",
  "R21": "OPV1", "R22": "OPV2", "R23": "OPV3", "R24": "OPV4", "R25": "OPV5",
  "081": "MMR1", "082": "MMR2",
  "061": "JE1",  "062": "JE2"
};

function convertHDCtoVaccines(text) {
  let vaccines = {};
  if (!text) return vaccines;
  text = text.replace(/<br>/g, '');
  text.split("},").forEach(p => {
    try {
      if (!p.endsWith("}")) p += "}";
      const obj  = JSON.parse(p);
      const name = vaccineMap[obj.VACCINTYPE];
      if (name) vaccines[name] = obj.DATE_SERV;
    } catch (e) {}
  });
  return vaccines;
}

function getTambonByHospital(code) {
  const map = {
    "10170": "puyoh", "10168": "pasemas", "10658": "pasemas",
    "10169": "munoh", "77729": "kolok",   "77728": "kolok"
  };
  return map[String(code)] || "";
}

async function importExcel() {
  const file = document.getElementById("excelFile").files[0];
  if (!file) { alert("กรุณาเลือกไฟล์"); return; }

  const reader = new FileReader();
  reader.onload = async e => {
    const workbook = XLSX.read(e.target.result, { type: "binary" });
    const sheet    = workbook.Sheets[workbook.SheetNames[0]];
    const rows     = XLSX.utils.sheet_to_json(sheet);

    const snap    = await db.ref("children").once("value");
    const oldData = snap.val() || {};
    const hnMap   = {};

    Object.entries(oldData).forEach(([key, c]) => {
      const hn  = String(c.hn       || "").trim();
      const hos = String(c.hospital || "").trim();
      if (hn && hos) hnMap[hn + "_" + hos] = key;
    });

    let updates = {}, addCount = 0, updateCount = 0;

    rows.forEach(r => {
      const hn  = cleanValue(r.pid);
      const hos = cleanValue(r.hoscode);
      if (!hn) return;

      const uniqueKey = hn + "_" + hos;
      let id = hnMap[uniqueKey];
      if (id) { updateCount++; } else { id = db.ref().child("children").push().key; addCount++; }

      const child = {
        hn, cid: cleanValue(r.cid),
        name:    (cleanValue(r.name) + " " + cleanValue(r.lname)).trim(),
        birth:   cleanValue(r.birth),
        hospital: cleanValue(r.hoscode),
        tambon:  getTambonByHospital(r.hoscode),
        house:   cleanValue(r.addr),
        vaccines: {},
        updatedAt: new Date().toLocaleString("th-TH")
      };

      const vaccineFields = {
        BCG: "bcg_date", HBV1: "hbv1_date", HBV2: "hbv2_date",
        DTP1: "dtp1_date", DTP2: "dtp2_date", DTP3: "dtp3_date",
        IPV1: "ipv1_date", IPV2: "ipv2_date",
        OPV3: "opv3_date", OPV4: "opv4_date", OPV5: "opv5_date",
        Rota1: "rota1_date", Rota2: "rota2_date", Rota3: "rota3_date",
        MMR1: "mmr1_date", MMR2: "mmr2_date",
        JE1: "je1_date",   JE2: "je2_date",
        DTP4: "dtp4_date", DTP5: "dtp5_date",
        HPV1: "hpv1_date",
        HPV2: "hpv2_date",
        dT:   "dt_date",
      };

      Object.entries(vaccineFields).forEach(([name, field]) => {
        const value = cleanValue(r[field]);
        if (value) child.vaccines[name] = value;
      });

      // ✅ แก้ไข bug: เดิมเช็ค hnMap[hn] (ผิด คีย์ไม่มีจริง) — ตอนนี้เช็ค hnMap[uniqueKey] ให้ตรงกับที่ build ไว้ด้านบน
      if (hnMap[uniqueKey]) {
        const oldChild = oldData[id] || {};
        child.name     = oldChild.name     || child.name;
        child.birth    = oldChild.birth    || child.birth;
        child.cid      = oldChild.cid      || child.cid;
        child.hospital = oldChild.hospital || child.hospital;
        child.tambon   = oldChild.tambon   || child.tambon;
        child.house    = oldChild.house    || child.house;
        child.vaccines = { ...(oldChild.vaccines || {}), ...(child.vaccines || {}) };
      }

      updates[id] = child;
    });

    db.ref("children").update(updates).then(() => {
      alert(`✅ เพิ่มใหม่ ${addCount} รายการ\n🔄 อัปเดต ${updateCount} รายการ`);
      loadFollow();
      loadvaccineChart();
    }).catch(err => { console.log(err); alert("❌ นำเข้าไม่สำเร็จ"); });
  };

  reader.readAsBinaryString(file);
}

function cleanValue(v) {
  if (v === null || v === undefined) return "";
  v = String(v).trim();
  if (["<NA>", "NaN", "null", "undefined"].includes(v)) return "";
  return v;
}

function getValueSmart(row, keywords) {
  for (let key in row) {
    let clean = key.replace(/\s/g, '').replace(/-/g, '').toLowerCase();
    for (let k of keywords) {
      if (clean === k.replace(/\s/g, '').replace(/-/g, '').toLowerCase()) return row[key];
    }
  }
  return "";
}

function cleanRow(row) {
  let newRow = {};
  for (let key in row) newRow[key.replace(/\s/g, '').replace(/-/g, '')] = row[key];
  return newRow;
}

function formatVillage(tambon, village) {
  if (!village) return "-";
  if (!isNaN(village)) return "หมู่ " + parseInt(village);
  if (tambon === "kolok") return village;
  return village;
}

function updateVillage(id, value) {
  db.ref("children/" + id).update({ village: value.replace("หมู่ ", ""), updatedAt: new Date().toLocaleString("th-TH") });
}

function reloadRealtime() { db.ref("children").off(); loadFollow(); }

function changeTambon(el) {
  let tr = el.closest("tr");
  let id = tr.getAttribute("data-id");
  autoSave(id, "tambon", el.value);
  autoSave(id, "village", "");
  loadFollow();
}

function autoSaveVillage(id, value) {
  db.ref("children/" + id).update({ village: value, updatedAt: new Date().toLocaleString("th-TH") });
}

// =========================
// 📊 กราฟวัคซีนรายตำบล (นับฉีดแล้ว / ตกหล่น ตามเกณฑ์อายุของวัคซีนแต่ละตัว)
// =========================
function loadvaccineChart() {
  const vaccineFilter = document.getElementById("vaccineFilter")?.value || "all";
  const tambonFilter  = document.getElementById("tambonFilter")?.value  || "all";
  selectedVaccine = vaccineFilter;

  db.ref("children").once("value").then(snapshot => {
    const data = snapshot.val() || {};
    if (Object.keys(data).length === 0) return;

    const allTambons = ["munoh", "puyoh", "pasemas", "kolok"];
    const tambonName = { munoh: "มูโนะ", puyoh: "ปูโยะ", pasemas: "ปาเสมัส", kolok: "สุไหงโก-ลก" };
    const tambons    = tambonFilter === "all" ? allTambons : [tambonFilter];

    const chartEl = document.getElementById("vaccineChart");
    if (!chartEl) return;
    if (window.vaccineChart && typeof window.vaccineChart.destroy === "function") window.vaccineChart.destroy();

    const chartCtx   = chartEl.getContext("2d");
    const gradGreen  = chartCtx.createLinearGradient(0, 0, 0, 400);
    gradGreen.addColorStop(0, "rgba(16,185,129,0.95)");
    gradGreen.addColorStop(1, "rgba(6,182,212,0.75)");
    const gradRed    = chartCtx.createLinearGradient(0, 0, 0, 400);
    gradRed.addColorStop(0, "rgba(239,68,68,0.95)");
    gradRed.addColorStop(1, "rgba(251,146,60,0.75)");

    let labels, doneData = [], notdoneData = [], eligibleData = [];

    if (vaccineFilter !== "all") {
      // วัคซีนตัวเดียว แยกตำบล — ฐานเทียบ = เฉพาะเด็กที่อายุถึงเกณฑ์ของวัคซีนนี้
      const minAge = vaccineAgeSchedule[vaccineFilter] ?? 0;
      labels = tambons.map(t => tambonName[t] || t);
      tambons.forEach(t => {
        let done = 0, eligible = 0;
        for (let id in data) {
          if (data[id].tambon !== t) continue;
          const age = getAgeMonths(data[id].birth);
          if (age < minAge) continue; // ยังไม่ถึงวัย ไม่นับเป็นฐาน
          eligible++;
          if (data[id].vaccines?.[vaccineFilter]) done++;
        }
        doneData.push(done);
        eligibleData.push(eligible);
        notdoneData.push(eligible - done); // ตกหล่น = ถึงวัยแล้วแต่ไม่ฉีด
      });
    } else {
      // ทุกวัคซีน แยกตามชื่อวัคซีน — แต่ละแท่งใช้ฐานอายุของวัคซีนตัวนั้น
      labels = vaccineList.map(v => vaccineLabel[v] || v);
      vaccineList.forEach(v => {
        const minAge = vaccineAgeSchedule[v] ?? 0;
        let done = 0, eligible = 0;
        for (let id in data) {
          if (tambonFilter !== "all" && data[id].tambon !== tambonFilter) continue;
          const age = getAgeMonths(data[id].birth);
          if (age < minAge) continue;
          eligible++;
          if (data[id].vaccines?.[v]) done++;
        }
        doneData.push(done);
        eligibleData.push(eligible);
        notdoneData.push(eligible - done);
      });
    }

    const barThick = vaccineFilter !== "all" ? 32 : 14;

    const topLabelPlugin = {
      id: "topLabel",
      afterDatasetsDraw(chart) {
        const { ctx } = chart;
        chart.data.datasets.forEach((dataset, i) => {
          chart.getDatasetMeta(i).data.forEach((bar, j) => {
            const val = dataset.data[j];
            if (!val) return;
            const tot = eligibleData[j] || 1;
            const pct = tot > 0 ? ((val / tot) * 100).toFixed(0) : 0;
            const text = vaccineFilter !== "all" ? `${val} (${pct}%)` : `${val}`;

            ctx.save();
            ctx.font         = `bold ${vaccineFilter !== "all" ? 11 : 10}px 'IBM Plex Sans Thai', sans-serif`;
            ctx.shadowColor  = "rgba(0,0,0,0.12)";
            ctx.shadowBlur   = 3;
            ctx.shadowOffsetY = 1;

            const tw = ctx.measureText(text).width;
            const ph = 17, pw = tw + 12;
            const px = bar.x - pw / 2;
            const py = bar.y - ph - 5;

            ctx.fillStyle = i === 0 ? "rgba(16,185,129,0.15)" : "rgba(239,68,68,0.15)";
            ctx.beginPath();
            const r = 6;
            ctx.moveTo(px + r, py);
            ctx.lineTo(px + pw - r, py);
            ctx.quadraticCurveTo(px + pw, py, px + pw, py + r);
            ctx.lineTo(px + pw, py + ph - r);
            ctx.quadraticCurveTo(px + pw, py + ph, px + pw - r, py + ph);
            ctx.lineTo(px + r, py + ph);
            ctx.quadraticCurveTo(px, py + ph, px, py + ph - r);
            ctx.lineTo(px, py + r);
            ctx.quadraticCurveTo(px, py, px + r, py);
            ctx.closePath();
            ctx.fill();

            ctx.shadowColor  = "transparent";
            ctx.fillStyle    = i === 0 ? "#065f46" : "#7f1d1d";
            ctx.textAlign    = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(text, bar.x, py + ph / 2);
            ctx.restore();
          });
        });
      }
    };

    window.vaccineChart = new Chart(chartEl, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "✔︎ฉีดแล้ว",
            data: doneData,
            backgroundColor: gradGreen,
            borderWidth: 1.5,
            borderRadius: 0,
            borderSkipped: false,
            barThickness: barThick,
          },
          {
            label: "✘ตกหล่น",
            data: notdoneData,
            backgroundColor: gradRed,
            borderWidth: 1.5,
            borderRadius: 0,
            borderSkipped: false,
            barThickness: barThick,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 700, easing: "easeOutQuart" },
        plugins: {
          legend: {
            position: "bottom",
            labels: { boxWidth: 14, padding: 20, font: { size: 13 }, color: "#374151" }
          },
          tooltip: {
            backgroundColor: "rgba(17,24,39,0.92)",
            titleFont: { size: 13, weight: "bold" },
            bodyFont: { size: 12 },
            padding: 12,
            cornerRadius: 10,
            callbacks: {
              label: (ctx) => {
                const tot = eligibleData[ctx.dataIndex] || 1;
                const pct = tot > 0 ? ((ctx.raw / tot) * 100).toFixed(1) : 0;
                return ` ${ctx.dataset.label}: ${ctx.raw} คน (${pct}% ของผู้มีสิทธิ์)`;
              },
              afterLabel: (ctx) => `ผู้มีสิทธิ์ (ถึงเกณฑ์อายุ): ${eligibleData[ctx.dataIndex]} คน`
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            border: { display: false },
            ticks: {
              font: { size: vaccineFilter !== "all" ? 13 : 11 },
              color: "#6b7280",
              maxRotation: vaccineFilter !== "all" ? 0 : 45
            }
          },
          y: {
            beginAtZero: true,
            grid: { color: "rgba(0,0,0,0.05)", lineWidth: 1 },
            border: { display: false },
            ticks: { precision: 0, font: { size: 11 }, color: "#9ca3af" },
            title: { display: true, text: "จำนวนคน", color: "#6b7280", font: { size: 12 } }
          }
        }
      },
      plugins: [topLabelPlugin]
    });

    const el = document.getElementById("vaccineDescription");
    if (!el) return;
    const totalDone     = doneData.reduce((a, b) => a + b, 0);
    const totalNotdone  = notdoneData.reduce((a, b) => a + b, 0);
    const totalEligible = eligibleData.reduce((a, b) => a + b, 0) || 1;
    const tambonText    = tambonFilter !== "all" ? tambonName[tambonFilter] : "ทุกตำบล";

    if (vaccineFilter !== "all") {
      el.innerHTML = `<b>💉 ${vaccineLabel[vaccineFilter] || vaccineFilter}</b> | ${tambonText}<br>
        🟢 ฉีดแล้ว: ${totalDone} คน (${((totalDone/totalEligible)*100).toFixed(1)}%) &nbsp;
        🔴 ตกหล่น (ถึงวัยแล้วแต่ยังไม่ฉีด): ${totalNotdone} คน (${((totalNotdone/totalEligible)*100).toFixed(1)}%)<br>
        <small style="color:gray">ฐานคำนวณ: เด็กที่อายุถึงเกณฑ์ฉีด ${vaccineLabel[vaccineFilter]} แล้วเท่านั้น (${totalEligible} คน) ไม่รวมเด็กที่ยังไม่ถึงวัย</small>`;
    } else {
      el.innerHTML = `<b>📊 เปรียบเทียบวัคซีนทั้งหมด</b> | ${tambonText}<br>
        🟢 รวมฉีดแล้ว: ${totalDone} ครั้ง &nbsp; 🔴 รวมตกหล่น: ${totalNotdone} ครั้ง<br>
        <small style="color:gray">แต่ละวัคซีนใช้ฐานเทียบเฉพาะเด็กที่ถึงเกณฑ์อายุของวัคซีนนั้น ๆ</small>`;
    }
  });
}

// =========================
// 🔲 Sidebar
// =========================
function toggleSidebar(btn) {
  if (btn) btn.classList.toggle("active");
  const sb = document.getElementById("sidebar");
  const bg = document.getElementById("backdrop");
  if (sb) sb.classList.toggle("show");
  if (bg) bg.classList.toggle("show");
}

function closeSidebar() {
  document.getElementById("sidebar")?.classList.remove("show");
  document.getElementById("backdrop")?.classList.remove("show");
  document.querySelector(".menu-btn")?.classList.remove("active");
}

// =========================
// 🗺 แผนที่
// =========================
function openMap(tambon, house, village) {
  const tambonTH = getTambonName(tambon);
  const address  = `บ้านเลขที่ ${house} หมู่ ${village} ตำบล ${tambonTH} อำเภอสุไหงโก-ลก จังหวัดนราธิวาส`;
  window.open("https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(address), "_blank");
}

function getTambonName(t) {
  const map = { all: "ทั้งหมด", kolok: "สุไหงโก-ลก", munoh: "มูโนะ", puyoh: "ปูโยะ", pasemas: "ปาเสมัส" };
  return map[t] || t || "-";
}

// =========================
// 👵 คำนวณอายุ
// =========================
function calculateAge(birth) {
  if (!birth) return "-";
  const [d, m, y] = birth.split("/");
  const birthDate = new Date(y - 543, m - 1, d);
  const today     = new Date();
  let years  = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth()    - birthDate.getMonth();
  if (months < 0) { years--; months += 12; }
  return years > 0 ? `${years} ปี ${months} เดือน` : `${months} เดือน`;
}

function parseThaiDate(birth) {
  if (!birth) return null;
  if (typeof birth === "number") return new Date((birth - 25569) * 86400 * 1000);
  birth = String(birth);
  if (birth.includes("-")) return new Date(birth);
  if (birth.includes("/")) {
    let [d, m, y] = birth.split("/").map(Number);
    if (y > 2500) y -= 543;
    return new Date(y, m - 1, d);
  }
  return null;
}

function getAgeMonths(birth) {
  const birthDate = parseThaiDate(birth);
  if (!birthDate || isNaN(birthDate)) return 0;
  const today = new Date();
  let months = (today.getFullYear() - birthDate.getFullYear()) * 12 + (today.getMonth() - birthDate.getMonth());
  if (today.getDate() < birthDate.getDate()) months--;
  return Math.max(0, months);
}

function getAgeBadge(birth) {
  if (!birth) return `<span class="badge bg-secondary">-</span>`;
  const months       = getAgeMonths(birth);
  const years        = Math.floor(months / 12);
  const remainMonths = months % 12;
  const text  = years > 0 ? `${years} ปี ${remainMonths} ด.` : `${months} ด.`;
  let   color = "bg-success";
  if      (months <= 6)  color = "bg-info";
  else if (months <= 12) color = "bg-primary";
  else if (months <= 24) color = "bg-warning";
  else                   color = "bg-secondary";
  return `<span class="badge ${color}">${text}</span>`;
}

// =========================
// 👥 ผู้ดูแลรายตำบล
// =========================
function openCareByTambon() {
  const tambon = document.getElementById("tambonFilter")?.value || "kolok";
  db.ref("villageCare/" + tambon).once("value", snap => {
    const data = snap.val() || {};
    let html = "";
    Object.keys(data).forEach(v => {
      const group = data[v];
      html += `
        <div style="border:1px solid #eee;border-radius:14px;padding:12px;margin-bottom:12px;background:#fafafa;">
          <div style="font-weight:600;margin-bottom:6px;color:#374151;">🏡 หมู่ ${v}</div>
          ${group.care.map(c => `
          <div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #eee;">
            <div>👤 ${c.name}<br><small style="color:#6b7280;">${c.role || "-"}</small></div>
            <a href="tel:${c.tel}" style="color:#16a34a;">📞 ${c.tel}</a>
          </div>`).join("")}
        </div>`;
    });
    if (!html) html = "❌ ไม่มีข้อมูลผู้ดูแลในตำบลนี้";
    document.getElementById("careTitle").innerText = "👥 ผู้ดูแล - " + getTambonName(tambon);
    document.getElementById("careBody").innerHTML  = html;
    new bootstrap.Modal(document.getElementById("careModal")).show();
  });
}

// =========================
// 🌱 Seed ข้อมูลผู้ดูแลรายตำบล (รันครั้งเดียว — ไม่เขียนทับถ้ามีข้อมูลอยู่แล้ว)
// =========================
function seedVillageCareIfEmpty() {
  db.ref("villageCare").once("value", snap => {
    if (snap.exists()) return; // มีข้อมูลอยู่แล้ว ไม่ต้อง seed ซ้ำ

    db.ref("villageCare").set({
      puyoh: {
        1: { care: [{ name: "นายเฉลิมพล อำพันธ์",    tel: "0807047038", role: "ผู้ใหญ่บ้าน" }] },
        2: { care: [{ name: "นายอาหามะ อูเซ็ง",       tel: "0892947402", role: "กำนัน / ผู้ใหญ่บ้าน" }] },
        3: { care: [{ name: "นายไซมี มะ",             tel: "0810842978", role: "ผู้ใหญ่บ้าน" }] },
        4: { care: [{ name: "นายนรวีร์ เจ๊ะเมาะ",     tel: "0808466067", role: "ผู้ใหญ่บ้าน" }] },
        5: { care: [{ name: "นายสมนึก แดงดี",         tel: "0872951817", role: "ผู้ใหญ่บ้าน" }] },
        6: { care: [{ name: "นายมะยูนุ มะเย็ง",       tel: "0849971802", role: "ผู้ใหญ่บ้าน" }] }
      },
      munoh: {
        1: { care: [{ name: "นายสาลีมี สาและ",        tel: "0894620868", role: "ผู้ใหญ่บ้าน" }] },
        2: { care: [{ name: "นายนาทวี ตันเหมนายู",    tel: "0894646467", role: "ผู้ใหญ่บ้าน" }] },
        3: { care: [{ name: "นายมุสตอปา อาบะ",        tel: "0850770975", role: "ผู้ใหญ่บ้าน" }] },
        4: { care: [{ name: "ร.ต.ประเสริฐ อาแว",      tel: "0873999709", role: "กำนัน / ผู้ใหญ่บ้าน" }] },
        5: { care: [{ name: "นายอามาซะ สามะ",         tel: "0806303427", role: "ผู้ใหญ่บ้าน" }] }
      },
      pasemas: {
        1: { care: [{ name: "นายฮารีมคาน โอระสะมันนี", tel: "0817677605", role: "ผู้ใหญ่บ้าน" }] },
        2: { care: [{ name: "นายนาซูฮา หะยีอาแว",     tel: "0850787676", role: "ผู้ใหญ่บ้าน" }] },
        3: { care: [{ name: "นายณรงค์ อาแวสือแม",     tel: "0629988149", role: "ผู้ใหญ่บ้าน" }] },
        4: { care: [{ name: "นายมาฮาโซ มือเยาะ",      tel: "0801382240", role: "ผู้ใหญ่บ้าน" }] },
        5: { care: [{ name: "นายมะรอดี บินสะมะแอ",    tel: "0896594425", role: "ผู้ใหญ่บ้าน" }] },
        6: { care: [{ name: "นายปฏิวัติ เด่นอร่ามคาน", tel: "0813686863", role: "กำนัน / ผู้ใหญ่บ้าน" }] },
        7: { care: [{ name: "นายอัสมี เจ๊ะอาแว",      tel: "0824159376", role: "ผู้ใหญ่บ้าน" }] },
        8: { care: [{ name: "นายรุสวา ดอเลาะ",        tel: "0649500655", role: "ผู้ใหญ่บ้าน" }] }
      },
      kolok: {
        community: {
          care: [
            { name: "น.ส.สุมิตร อูมา",         tel: "0993633100", role: "ผู้นำชุมชน" },
            { name: "น.ส.สะปีน๊ะ มะแซ",        tel: "0869695313", role: "ผู้นำชุมชน" },
            { name: "นางละมัย การุโณ",          tel: "0827038733", role: "ผู้นำชุมชน" },
            { name: "นางวิลาวัลย์ คชกาล",       tel: "0831682610", role: "ผู้นำชุมชน" },
            { name: "นายธงชัย บือราเฮง",        tel: "0634853736", role: "ผู้นำชุมชน" },
            { name: "นายวราวุธ มาหามะ",         tel: "0634245389", role: "ผู้นำชุมชน" },
            { name: "นายสาเหะ มาหะมะ",         tel: "0897378241", role: "ผู้นำชุมชน" },
            { name: "น.ส.โนรีซา มะแซ",         tel: "0814394057", role: "ผู้นำชุมชน" },
            { name: "นายอาเดอร์นันต์ เบ็ญสนิ",  tel: "0813059321", role: "ผู้นำชุมชน" },
            { name: "นายบุญภาค สุขโร",          tel: "0902100194", role: "ผู้นำชุมชน" },
            { name: "น.ส.สุกัญญา จันทร์มุณี",   tel: "0994739179", role: "ผู้นำชุมชน" },
            { name: "นายสุฮายมิง อารง",         tel: "0869640838", role: "ผู้นำชุมชน" },
            { name: "นายวัชริศ เจ๊ะเลาะ",       tel: "0815433221", role: "ผู้นำชุมชน" },
            { name: "นายธรรมมูญ ขุนนุ้ย",       tel: "0894684098", role: "ผู้นำชุมชน" },
            { name: "นายมุสเล็ม ซามะ",          tel: "0622482484", role: "ผู้นำชุมชน" },
            { name: "นางสารีป๊ะ ยะโก๊ะ",        tel: "0827313077", role: "ผู้นำชุมชน" },
            { name: "นายอัสมิง สะแม",           tel: "0873924515", role: "ผู้นำชุมชน" },
            { name: "นางอัญชลี ยะโลมพันธ์",     tel: "0880693892", role: "ผู้นำชุมชน" },
            { name: "นายประทิว แก้วคง",         tel: "0923595039", role: "ผู้นำชุมชน" },
            { name: "นายอาแว แวหะมะ",           tel: "0894641319", role: "ผู้นำชุมชน" }
          ]
        }
      }
    });
  });
}

// =========================
// 🗓 formatDate / formatDateInput
// =========================
function formatDate(dateStr) {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("th-TH", { year: "numeric", month: "short", day: "numeric" });
}

function formatDateInput(dateStr) {
  if (!dateStr) return "";
  if (typeof dateStr === "number") return new Date((dateStr - 25569) * 86400 * 1000).toISOString().split("T")[0];
  dateStr = String(dateStr);
  if (dateStr.includes("/")) {
    const parts = dateStr.split("/");
    return `${parts[2]}-${parts[1].padStart(2, "0")}-${parts[0].padStart(2, "0")}`;
  }
  return dateStr;
}

// =========================
// ♾ Infinite scroll
// =========================
function loadMore() {
  if (!lastKey) return;
  isLoading = true;
  db.ref("children").orderByKey().startAfter(lastKey).limitToFirst(PAGE_SIZE).once("value", snap => {
    const data = snap.val();
    if (!data) { isLoading = false; return; }
    renderChildren(data);
    lastKey   = Object.keys(data).pop();
    isLoading = false;
  });
}

window.addEventListener("scroll", () => {
  if (isLoading) return;
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 300) loadMore();
});

// =========================
// 🖼 Profile upload
// =========================
function handleUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    document.getElementById("profileImg").src = ev.target.result;
    localStorage.setItem("profileImg", ev.target.result);
  };
  reader.readAsDataURL(file);
}

function filterData() {
  const vaccine = document.getElementById("vaccineFilter").value;
  const quarter = document.getElementById("quarterFilter").value;
  let filtered  = vaccineData.filter(item =>
    (vaccine === "all" || item.name    === vaccine) &&
    (quarter === "all" || item.quarter === quarter)
  );
  updateChart(filtered);
}

function setStatusFilter(mode) {
  statusFilter = mode;

  document.querySelectorAll('#btn-status-all,#btn-status-notdone,#btn-status-done')
    .forEach(b => b.classList.remove('btn-primary'));

  const activeBtn = document.getElementById('btn-status-' + mode);
  if (activeBtn) activeBtn.classList.add('btn-primary');

  loadFollow();
}

// =========================
// 🚀 Init — รวม DOMContentLoaded เป็นจุดเดียว
// ลำดับสำคัญ: build dropdown ก่อน → ผูก event → โหลดข้อมูล/กราฟ
// =========================
document.addEventListener("DOMContentLoaded", () => {
  // 1) tambon dropdown (หน้าเพิ่มข้อมูล)
  const tambonEl = document.getElementById("tambon");
  if (tambonEl) {
    tambonEl.addEventListener("change", function () {
      document.getElementById("villageBox").innerHTML = buildVillageDropdown(this.value, "", "");
      document.getElementById("soiBox").style.display = this.value === "kolok" ? "block" : "none";
    });
  }

  // 2) build vaccineFilter dropdown ก่อนใครเรียกใช้ selectedVaccine
  const vaccineSelect = document.getElementById("vaccineFilter");
  if (vaccineSelect) {
    vaccineSelect.innerHTML = `<option value="all">ทุกวัคซีน</option>`;
    vaccineList.forEach(v => {
      const op = document.createElement("option");
      op.value = v;
      op.textContent = vaccineLabel[v] || v;
      vaccineSelect.appendChild(op);
    });
    vaccineSelect.addEventListener("change", () => {
      selectedVaccine = vaccineSelect.value;
      loadvaccineChart();
      loadFollow();
    });
  }

  // 3) tambonFilter → ผูกทั้ง hospital dropdown + ทั้งสองกราฟให้ sync กัน
  const tambonSel = document.getElementById("tambonFilter");
  if (tambonSel) {
    tambonSel.addEventListener("change", () => {
      updateHospitalFilter();
      loadvaccineChart();
      loadFollow();
    });
  }

  // 4) hospitalFilter → ทำให้ตารางอัปเดตเมื่อเปลี่ยนหน่วยบริการ
  const hospitalSel = document.getElementById("hospitalFilter");
  if (hospitalSel) {
    hospitalSel.addEventListener("change", () => { loadFollow(); });
  }

  // 5) seed ข้อมูลผู้ดูแล (รันครั้งเดียว ไม่ทับของเดิม)
  seedVillageCareIfEmpty();

  // 6) โหลดข้อมูลครั้งแรกหลังทุกอย่าง build เสร็จแล้ว
  loadFollow();
  loadvaccineChart();
  if (document.getElementById("symptomList")) loadSymptoms();
});
