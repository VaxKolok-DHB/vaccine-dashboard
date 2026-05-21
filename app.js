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
  "BCG","HBV1","HBV2","HBV3","DTP1","DTP2","DTP3",
  "OPV1","OPV2","OPV3","IPV","MMR1","JE1","JE2",
  "DTP4","OPV4","MMR2","dT","HPV"
];


const vaccineData = [
  { name: "BCG", quarter: "Q1", percent: 95 },
  { name: "HBV1", quarter: "Q1", percent: 90 },
  { name: "HBV2", quarter: "Q1", percent: 88 },
  { name: "HBV3", quarter: "Q1", percent: 85 },

  { name: "DTP1", quarter: "Q1", percent: 80 },
  { name: "DTP2", quarter: "Q1", percent: 78 },
  { name: "DTP3", quarter: "Q1", percent: 75 },
  { name: "DTP4", quarter: "Q1", percent: 70 },

  { name: "OPV1", quarter: "Q1", percent: 82 },
  { name: "OPV2", quarter: "Q1", percent: 79 },
  { name: "OPV3", quarter: "Q1", percent: 77 },
  { name: "OPV4", quarter: "Q1", percent: 72 },

  { name: "IPV", quarter: "Q1", percent: 68 },

  { name: "MMR1", quarter: "Q1", percent: 60 },
  { name: "MMR2", quarter: "Q1", percent: 55 },

  { name: "JE1", quarter: "Q1", percent: 50 },
  { name: "JE2", quarter: "Q1", percent: 45 },

  { name: "dT", quarter: "Q1", percent: 65 },
  { name: "HPV", quarter: "Q1", percent: 58 }
];
// =========================
// 💉 หน่วยบริการ
// =========================
const hospitalMap = {
  kolok: [
    { id:"77729", name:"ศูนย์แพทย์ใกล้ใจ1" },
    { id:"77728", name:"ศูนย์แพทย์ใกล้ใจ2" }
  ],
  munoh: [
    { id:"10169", name:"รพ.สต.มูโนะ" }
  ],
  puyoh: [
    { id:"10170", name:"รพ.สต.ปูโยะ" }
  ],
  pasemas: [
    { id:"10168", name:"รพ.สต.ปาเสมัส" },
    { id:"10658", name:"รพ.สต.บ้านกวาลอซีรา" }
  ]
};

// =========================
// รายชื่อหมู่/ชุมชน
// =========================

const villageData = {

  pasemas: {
    "1": { name:"บ้านซรายอ", leader:"ฮารีมคาน" },
    "2": { name:"บ้านตือระ", leader:"นาซูฮา" },
    "3": { name:"บ้านปาเสมัส", leader:"ณรงค์" },
    "4": { name:"บ้านน้ำตก", leader:"มาฮาโซ" },
    "5": { name:"บ้านกวาลอซีรา", leader:"มะรอดี" },
    "6": { name:"บ้านซรายอออก", leader:"ปฏิวัติ" },
    "7": { name:"บ้านกูแบอีแก", leader:"อัสมี" },
    "8": { name:"บ้านศาลาใหม่", leader:"รุสวา" },
   
  },

  munoh: {
    "1": { name:"บ้านมูโนะ", leader:"สาลีมี" },
    "2": { name:"บ้านลูโบะลือซง", leader:"นาทวี" },
    "3": { name:"บ้านปาดังยอ", leader:"มุสตอปา" },
    "4": { name:"บ้านปูโปะ", leader:"ประเสริฐ" },
    "5": { name:"บ้านบูเก๊ะ", leader:"อามาซะ" }
  },

  puyoh: {
    "1": { name:"บ้านลาแล", leader:"เฉลิมพล" },
    "2": { name:"บ้านปูโยะ", leader:"อาหามะ" },
    "3": { name:"บ้านฆอแย", leader:"ไซมี" },
    "4": { name:"บ้านน้ำตก", leader:"นรวีร์" },
    "5": { name:"บ้านตอออ", leader:"สมนึก" },
    "6": { name:"บ้านกูยิ", leader:"มะยูนุ" }
  }

};
const kolokCommunity = {
  "1": { name:"ชุมชนกูโบร์" },
  "2": { name:"ชุมชนโต๊ะลือเบ" },
  "3": { name:"ชุมชนตันหยงมะลิ" },
  "4": { name:"ชุมชนโก-ลกวิลเลจ" },
  "5": { name:"ชุมชนบือเร็ง" },
  "6": { name:"ชุมชนกือดำบำรู" },
  "7": { name:"ชุมชนกือบงกำแม" },
  "8": { name:"ชุมชนหัวสะพาน" },
  "9": { name:"ชุมชนเสาสัญญาณ" },
  "10": { name:"ชุมชนดงงูเห่า" },
  "11": { name:"ชุมชนหลังด่าน" },
  "12": { name:"ชุมชนมัสยิดกลาง" },
  "13": { name:"ชุมชนจือแลตูลี" },
  "14": { name:"ชุมชนสันติสุข" },
  "15": { name:"ชุมชนปาโงปิเมง" },
  "16": { name:"ชุมชนปาโงเปาะเล็ง" },
  "17": { name:"ชุมชนโปฮงยามู" },
  "18": { name:"ชุมชนอริศรา" },
  "19": { name:"ชุมชนเจริญสุข" },
  "20": { name:"ชุมชนหัวกุญแจ" },
  "21": { name:"ชุมชนสวนมะพร้าว" },
  "22": { name:"ชุมชนท่ากอไผ่" },
  "23": { name:"ชุมชนท่าประปา" },
  "24": { name:"ชุมชนท่าโรงเลื่อย" },
  "25": { name:"ชุมชนหลังล้อแม็ก" },
  "26": { name:"ชุมชนศรีอามาน" },
  "27": { name:"ชุมชนทรายทอง" },
  "28": { name:"ชุมชนบือเร็งใน" },
  "29": { name:"ชุมชนซรีจาฮายา" },
  "30": { name:"ชุมชนเจริญทรัพย์" },
  "31": { name:"ชุมชนเจริญเขต" }
};



function updateHospitalFilter(){

  const tambon = document.getElementById("tambonFilter").value;
  const hospitalSelect = document.getElementById("hospitalFilter");

  hospitalSelect.innerHTML = `<option value="all"> ทุกหน่วยบริการ</option>`;

  const map = {
    pasemas:[
      {id:"10168",name:"รพ.สต.ปาเสมัส"},
      {id:"10658",name:"รพ.สต.บ้านกวาลอซีรา"}
    ],
    munoh:[
      {id:"10169",name:"รพ.สต.มูโนะ"}
    ],
    puyoh:[
      {id:"10170",name:"รพ.สต.ปูโยะ"}
    ],
    kolok: [
      { id:"77729", name:"ศูนย์แพทย์ใกล้ใจ1 (เทศบาล)" },
      { id:"77728", name:"ศูนย์แพทย์ใกล้ใจ2 (เจริญเขต)" }
    ],
  };

  if(!map[tambon]) return;

  map[tambon].forEach(h=>{
    hospitalSelect.innerHTML += `<option value="${h.id}">${h.name}</option>`;
  });
}

function getHospitalName(id){

  const map = {
    "10170":"รพ.สต.ปูโยะ",
    "10168":"รพ.สต.ปาเสมัส",
    "10169" :"พ.สต.มูโนะ",
    "77729":"ศูนย์แพทย์ใกล้ใจ1",
    "77728":"ศูนย์แพทย์ใกล้ใจ2",
    "10658":"รพ.สต.บ้านกวาลอซีรา"
  };

  return map[id] || "-";
}


// =========================
// 🔓 ล็อกอิน
// =========================
function login(){

let cid=
document
.getElementById("cid")
.value
.replace(/\D/g,'');

const msg=
document.getElementById(
"msg"
);

msg.innerText="";


// ตรวจเลขบัตร

if(cid.length!==13){

msg.innerText=
"กรอกเลขบัตรให้ครบ 13 หลัก";

return;

}


// ค้นผู้ใช้

db.ref(
"users"
)

.once(
"value",
snap=>{

const data=
snap.val()||{};

let foundUser=
null;


for(let id in data){

const dbCid=

(data[id].cid||"")

.replace(
/\D/g,
''
);

if(
dbCid===cid
){

foundUser={

id:id,

...data[id]

};

break;

}

}


// ไม่พบผู้ใช้

if(!foundUser){

msg.innerText=
"ไม่พบผู้ใช้";

return;

}


// ถูกปฏิเสธ

if(
foundUser.status===
"rejected"
){

msg.innerText=
"บัญชีถูกปฏิเสธ";

return;

}


// ยังไม่อนุมัติ

if(
foundUser.status!==
"approved"
){

msg.innerText=
"รอผู้ดูแลอนุมัติ";

return;

}



// ===== ชื่อเต็ม =====

const fullName=

foundUser.name+

" "+

(foundUser.lastname||"");



// ===== บันทึก localStorage =====

localStorage.setItem(

"user",

foundUser.cid

);


localStorage.setItem(

"name",

fullName

);


// 🔥 ใช้กับระบบรับเคส

  localStorage.setItem(

  "username",

  fullName

  );


  localStorage.setItem(

  "role",

  foundUser.role||

  "user"

);



// ===== log =====

    db.ref(
    "loginLogs"
    )

    .push({

    cid:
    foundUser.cid,

    name:
    fullName,

    role:
    foundUser.role||

    "user",

    loginTime:
    new Date()
    .toISOString()

    });



// ===== ไปหน้าเว็บ =====

window.location.href=
"index.html";

});

}


function loadKPI(){
  console.log("โหลด KPI");
}

function goTambon(){
  console.log("โหลดตำบล");
}
// =========================
// 📑 สมัคร
// =========================
function register(){

  const name =
  document.getElementById("name")
  .value.trim();

  const lastname =
  document.getElementById("lastname")
  .value.trim();

  const cid =
  document.getElementById("cid")
  .value.trim();

  const email =
  document.getElementById("email")
  .value.trim();

  const phone =
  document.getElementById("phone")
  .value.trim();

  const msg =
  document.getElementById("msg");

  msg.style.color="red";

  // validate
  if(!name || !lastname || !cid){

    msg.innerText=
    "❌ กรุณากรอกข้อมูลให้ครบ";

    return;

  }

  if(cid.length!==13){

    msg.innerText=
    "❌ เลขบัตรต้อง 13 หลัก";

    return;

  }

  db.ref("users/"+cid)
  .once("value",snap=>{

    if(snap.exists()){

      msg.innerText=
      "❌ มีผู้ใช้นี้แล้ว";

      return;

    }

    db.ref("users/"+cid)
    .set({

      cid,
      name,
      lastname,
      email,
      phone,

      role:"user",

      status:"pending",

      createdAt:
      new Date().toISOString()

    })

    .then(()=>{

      msg.style.color=
      "green";

      msg.innerText=
      "✅ สมัครสำเร็จ รอผู้ดูแลอนุมัติ";

      setTimeout(()=>{

        window.location.href=
        "login.html";

      },1500);

    });

  });

}



// =========================
// 📊 โหลดข้อมูล + ตาราง + กราฟ
// =========================
let followChart;
let chartMode = "percent"; // percent | village

function loadFollow(){

  const filter = document.getElementById("tambonFilter")?.value || "all";
  const keyword = (document.getElementById("searchInput")?.value || "").toLowerCase();
  const tambonFilter = document.getElementById("tambonFilter")?.value || "all";
  const hospitalFilter = document.getElementById("hospitalFilter")?.value || "all";
  const ageFilter = document.getElementById("ageFilter")?.value || "all";
  const mobileList = document.getElementById("mobileList");
  if(mobileList){mobileList.innerHTML="";}
  const isMobile = window.innerWidth < 768;

  db.ref("children").on("value", snap => {

    const data = snap.val() || {};
    let html = "";
    let done = 0;
    let notdone = 0;

    // 🔥 ใช้เก็บข้อมูลหมู่
    let villageMap = {};
    
    for(let id in data){

    let c = data[id] || {};
    
    if(!c.name?.trim() || !c.cid?.trim()) continue;

     const age = getAgeMonths(c.birth);

      // 🔥 filter รายเดือน
      if(ageFilter !== "all"){
        const target = parseInt(ageFilter);

        // ให้ ±1 เดือน (กันข้อมูลคลาดเคลื่อน)
        if(!(age >= target-1 && age <= target+1)) continue;
      }
      // 🔍 filter ตำบล
      if(tambonFilter !== "all" && c.tambon !== tambonFilter) continue;

      // 🔍 filter รพ.สต
      if(hospitalFilter !== "all" && c.hospital !== hospitalFilter) continue;

      // 🔍 search
      const hn   = (c.hn || "").toLowerCase();
      const name = (c.name || "").toLowerCase();
      const cid  = (c.cid  || "").toLowerCase();

      if(
        keyword &&
        !name.includes(keyword) &&
        !cid.includes(keyword) &&
        !hn.includes(keyword)
      ){
        continue;
      }

      // ✅ นับวัคซีน
      const count = c.vaccines ? Object.keys(c.vaccines).length : 0;

      if(count > 0) done++;
      else notdone++;

      // 🔥 นับหมู่
      let v = c.village || "ไม่ระบุ";

      if(!villageMap[v]){
        villageMap[v] = {done:0, notdone:0};
      }

      if(count > 0){
        villageMap[v].done++;
      }else{
        villageMap[v].notdone++;
      }

      // 📱 MOBILE
      if(mobileList){

    mobileList.innerHTML += `
    <div class="child-card">

    <div class="child-header">
    <div>${c.name || '-'}</div>
    <div>${c.hn || '-'}</div>
    </div>

    <div class="child-info">
    📍 ${getTambonName(c.tambon)}
    | 🏠 ${c.house || "-"}
    | หมู่ ${c.village || "-"}
    </div>

    <div class="child-info">
    <span class="age">
    ${getAgeBadge(c.birth)}
    </span>
    | 💉 ${count} เข็ม
    </div>

    <div class="child-footer">

    <span class="status-badge ${count>0?'done':'notdone'}">
    ${count>0?'ฉีดแล้ว':'ยังไม่ฉีด'}
    </span>

    <button
    onclick="openVaccineModal('${id}')"
    class="btn btn-outline-primary">

    💉 วัคซีน

    </button>

    </div>

    </div>
    `;
    }

      // 🖥 TABLE
      html += `
<tr data-id="${id}">

<td><input value="${c.hn || ''}"onchange="autoSave('${id}','hn',this.value)"></td>

<td><input value="${c.cid || ''}"onchange="autoSave('${id}','cid',this.value)"></td>

<td><input value="${c.name || ''}"onchange="autoSave('${id}','name',this.value)"></td>

<td>
<select class="form-select" onchange="changeTambon(this)">
<option value="">-- เลือกตำบล --</option>
<option value="kolok" ${c.tambon==="kolok"?"selected":""}>สุไหงโก-ลก</option>
<option value="munoh" ${c.tambon==="munoh"?"selected":""}>มูโนะ</option>
<option value="puyoh" ${c.tambon==="puyoh"?"selected":""}>ปูโยะ</option>
<option value="pasemas" ${c.tambon==="pasemas"?"selected":""}>ปาเสมัส</option>
</select>
</td>

<td>
<select class="form-select"
onchange="autoSave('${id}','hospital',this.value)">
<option value="">-- เลือกรพ.สต --</option>
<option value="10170" ${c.hospital==="10170"?"selected":""}>รพ.สต.ปูโยะ</option>
<option value="10169" ${c.hospital==="10169"?"selected":""}>รพ.สต.มูโนะ</option>
<option value="10168" ${c.hospital==="10168"?"selected":""}>รพ.สต.ปาเสมัส</option>
<option value="77729" ${c.hospital==="77729"?"selected":""}>ศูนย์แพทย์ใกล้ใจ1</option>
<option value="77728" ${c.hospital==="77728"?"selected":""}>ศูนย์แพทย์ใกล้ใจ2</option>
<option value="10658" ${c.hospital==="10658"?"selected":""}>รพ.สต.บ้านกวาลอซีรา</option>
</select>
</td>

<td><input value="${c.house || ''}"onchange="autoSave('${id}','house',this.value)"></td>

<td>${buildVillageDropdown(c.tambon, c.village, id)}</td>

<td>
  <input type="date"
    value="${formatDateInput(c.birth)}"
    onchange="autoSave('${id}','birth',this.value)">
</td>
<td class="age-cell">${getAgeBadge(c.birth)}</td>

<td onclick="openVaccineModal('${id}')"
            style="cursor:pointer;text-align:center">

            <div style="
              display:inline-flex;
              align-items:center;
              justify-content:center;
              min-width:70px;
              height:36px;
              border-radius:10px;
              border:1px solid #ddd;
              background:${count===0?'#fee2e2':'#dcfce7'};
              color:${count===0?'#dc2626':'#059669'};
            ">
              💉 ${count}
            </div>

          </td>

<td><input value="${c.note||""}" onchange="autoSave('${id}','note',this.value)"></td>

<td>${c.updatedAt||"-"}</td>

<td><button onclick="deleteChild('${id}')">🗑</button></td>

<td>
<select onchange="updateStatus('${id}',this.value)">
<option value="pending" ${count===0?'selected':''}>ยังไม่ฉีด</option>
<option value="done" ${count>0?'selected':''}>ฉีดแล้ว</option>
</select>
</td>

</tr>
`;
    }

   const followTable = document.getElementById("followTable");

if(followTable){
   followTable.innerHTML = html;
}
    // 🔥 KPI
    document.getElementById("total").innerText = done + notdone;
    document.getElementById("done").innerText = done;
    document.getElementById("notdone").innerText = notdone;

    const percent = done + notdone > 0
      ? ((done/(done+notdone))*100).toFixed(1)
      : 0;

    document.getElementById("percent").innerText = percent + "%";

    // 🔥 description
    let title = "📊 สรุปภาพรวมข้อมูลการฉีดวัคซีน";

      // 🔥 ถ้าเลือกตำบล → เปลี่ยนหัวข้อ
      if(tambonFilter !== "all"){
        title = "📊 สรุปข้อมูลการฉีดวัคซีนรายตำบล";
      }

      const chartDesc =document.getElementById("chartDescription");

      if(chartDesc){
        chartDesc.innerHTML=`
        <b>${title}</b><br>
        🟢 ฉีดแล้ว: ${done} คน (${percent}%)<br>
        🔴 ยังไม่ฉีด: ${notdone} คน
        `;
      }



// 🔥 สลับกราฟ
if(followChart) followChart.destroy();

let labels = [];
let datasets = [];
let type = "bar";

// // 🍩 โดนัท %
if(chartMode === "percent"){

  type = "doughnut";

  let total = done + notdone || 1;

  const donePercent = ((done/total)*100).toFixed(1);
  const notdonePercent = ((notdone/total)*100).toFixed(1);


  labels = ['ฉีดแล้ว','ยังไม่ฉีด'];

  datasets = [{
    data:[donePercent, notdonePercent],
     backgroundColor: [
        "rgba(0, 255, 153, 0.6)",
        "rgba(253, 0, 0, 0.64)",
        
      ],

      
      borderWidth: 3
    }]
  followChart = new Chart(document.getElementById("followChart"),{
    type: type,
    data:{ labels, datasets },
    options:{
      responsive:true,
      maintainAspectRatio: false,
      cutout:'55%', // 🔥 วงหนาสวย
      plugins:{
        legend:{position:'bottom'},

        // 🔥 ใส่ % กลางวง
        tooltip:{
          callbacks:{
            label:(ctx)=> ctx.label + " : " + ctx.raw + "%"
          }
        }
      }
    },
    plugins:[{
      id:'centerText',
      beforeDraw(chart){
        const {ctx, chartArea:{width, height}} = chart;
        ctx.save();

        ctx.font = "bold 20px sans-serif";
        ctx.fillStyle = "#374151";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.fillText(donePercent + "%", width/2, height/2);

        ctx.restore();
      }
    }]
  });
}

// 📊 แท่งรายหมู่
else{

  type = "bar";

let vLabels = Object.keys(villageMap);
let maxVillage = "";
let maxValue = 0;

// 🔥 หาหมู่ที่ยังไม่ฉีดเยอะสุด
Object.keys(villageMap).forEach(v=>{
  if(villageMap[v].notdone > maxValue){
    maxValue = villageMap[v].notdone;
    maxVillage = v;
  }
});

// 🔥 แสดงเฉพาะตอนเลือกตำบล
if(tambonFilter !== "all"){
  document.getElementById("chartDescription").innerHTML += `
  <br><b>📍 หมู่ที่ต้องติดตามมากที่สุด:</b> หมู่ ${maxVillage} (${maxValue} คน)
  `;
}

// 🔥 เรียง + เอา "ไม่ระบุ" ไปท้าย
vLabels = vLabels.sort((a,b)=>{
  if(a==="ไม่ระบุ") return 1;
  if(b==="ไม่ระบุ") return -1;
  return a - b;
});

labels = vLabels;

// 🔥 data
const doneData = vLabels.map(v=>villageMap[v].done);
const notdoneData = vLabels.map(v=>villageMap[v].notdone);
const totalData = vLabels.map(v=> 
  villageMap[v].done + villageMap[v].notdone
);

// 🔥 dataset (สวยแบบ mobile)
datasets = [
{
  label:'ฉีดแล้ว',
  data: doneData,
  backgroundColor:'#5ee991',
  borderRadius:12,
  barThickness:16
},
{
  label:'ยังไม่ฉีด',
  data: notdoneData,
  backgroundColor:'#ff5757',
  borderRadius:12,
  barThickness:16
}
];

// 🔥 destroy กันซ้อน
if(followChart){
  followChart.destroy();
}

// 🔥 chart
followChart = new Chart(document.getElementById("followChart"),{
  type: type,
  data:{ labels, datasets },
  options:{
    responsive:true,
    maintainAspectRatio:false,

    plugins:{
      legend:{
        position:'bottom',
        labels:{
          boxWidth:12,
          padding:15
        }
      },
      tooltip:{
        backgroundColor:"#111827",
        callbacks:{
          label:(ctx)=>{
            return `${ctx.dataset.label}: ${ctx.raw} คน`;
          },
          afterLabel:(ctx)=>{
            const i = ctx.dataIndex;
            return "รวม: " + totalData[i] + " คน";
          }
        }
      }
    },

    // 🔥 จุดสำคัญ: stacked = สวยขึ้นมาก
    scales:{
      x:{
        stacked:true,
        grid:{display:false}
      },
      y:{
        stacked:true,
        beginAtZero:true,
        ticks:{
          precision:0
        }
      }
    }
  }
});
}
  });

}

function setMode(mode){
  chartMode = mode;
  loadFollow();
}

// =========================
// 💉 เปิด Modal วัคซีน
// =========================
let currentId = "";

function openVaccineModal(id){
  currentId = id;

  db.ref("children/"+id).once("value").then(snap=>{

    const data = snap.val() || {};
    const current = data.vaccines || {};

    let html = "";

    vaccineList.forEach(v=>{

      const checked = current[v] ? "checked" : "";
      const dateVal = current[v] || "";

      html += `
        <div class="vaccine-item mb-2">

          <input type="checkbox"
            value="${v}"
            ${checked}
            onchange="toggleDateInline(this,'${v}')">

          <label style="width:80px;">${v}</label>

          <input type="date"
            id="date-${v}"
            value="${dateVal}"
            style="max-width:140px; ${checked ? '' : 'display:none;'}">

        </div>
      `;
    });

    document.getElementById("vaccineEditor").innerHTML = html;

    new bootstrap.Modal(document.getElementById("vaccineModal")).show();

  });
}


function toggleDateInline(cb, name){
  const input = document.getElementById("date-"+name);

  if(!input) return;

  if(cb.checked){
    input.style.display = "block";

    if(!input.value){
      input.value = new Date().toISOString().split("T")[0];
    }

  }else{
    input.style.display = "none";
    input.value = "";
  }
}


function saveLog(action,detail){

db.ref("loginLogs")
.push({

name:
localStorage.getItem("name")
|| "Admin",

action:
action,

detail:
detail,

time:
new Date()
.toLocaleString(
"th-TH"
)

});

}
// =========================
// 💾 บันทึกวัคซีน
// =========================
function saveVaccines(){

  let newVaccines = {};
  let vaccineList = [];

  document.querySelectorAll("#vaccineEditor .vaccine-item").forEach(item=>{
    const cb = item.querySelector("input[type=checkbox]");
    const name = cb.value;
    const date = item.querySelector("input[type=date]").value;

    // 🔥 ถ้าติ๊กแต่ไม่มีวันที่ → auto วันนี้
    let finalDate = date;
    if(cb.checked && !date){
      finalDate = new Date().toISOString().split("T")[0];
    }

    if(cb.checked){
      newVaccines[name] = finalDate;
      vaccineList.push(name);
    }
  });

  // 🔥 ดึงของเก่าก่อน
  db.ref("children/"+currentId+"/vaccines").once("value")
  .then(snap=>{

    const oldVaccines = snap.val() || {};

    // 🔥 รวมของเก่า + ใหม่
    const merged = {
      ...oldVaccines,
      ...newVaccines
    };

    // 🔥 save แบบไม่ลบของเดิม
    return Promise.all([

// อัปเดตวัคซีนเด็ก
db.ref(
"children/"+currentId
)
.update({

vaccines:merged,

updatedAt:
new Date()
.toLocaleString("th-TH")

}),


    // 🔥 รีเซ็ตติดตามอาการใหม่ทุกครั้ง
    db.ref(
    "symptoms/"+currentId
    )
.update({

    vaccines:merged,
    symptom:"ยังไม่ระบุ",

    level:"🟠 รอติดตาม",

    status:"รอติดตาม",

    priority:1,

    time:Date.now(),

    followedAt:null

})

]);







sendLineFollowUp(currentId);

alert("บันทึกแล้ว ✅");

loadFollow();

})
  .catch(err=>{
    console.error(err);
    alert("บันทึกไม่สำเร็จ ❌");
  });

}



// =========================
// 🔄 เปลี่ยนสถานะ
// =========================
function updateStatus(id,status){
  if(status === "pending"){
    db.ref("children/"+id+"/vaccines").remove();
    loadFollow();
  }else{
    openVaccineModal(id);
  }
}

// =========================
// 📝 autosave
// =========================
let saveTimer = {};

function autoSave(id, field, value){

  clearTimeout(saveTimer[id + field]);

  saveTimer[id + field] = setTimeout(()=>{

    db.ref("children/"+id).update({
      [field]: value,
      updatedAt: new Date().toLocaleString("th-TH")
    })
    .then(()=>{
      showSaved(); // 🔥 แสดงว่าบันทึกแล้ว
    });

  }, 500);

}

function showSaved(){

  let toast = document.getElementById("saveToast");

  if(!toast){
    toast = document.createElement("div");
    toast.id = "saveToast";
    toast.style.position = "fixed";
    toast.style.bottom = "20px";
    toast.style.right = "20px";
    toast.style.background = "#16a34a";
    toast.style.color = "white";
    toast.style.padding = "10px 16px";
    toast.style.borderRadius = "8px";
    toast.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
    toast.style.zIndex = "9999";

    document.body.appendChild(toast);
  }

  toast.innerText = "💾 บันทึกแล้ว";
  toast.style.display = "block";

  setTimeout(()=>{
    toast.style.display = "none";
  },1500);
}
// =========================
// ➕ เพิ่มข้อมูล
// =========================
function getFormData(){
  return {
    hn: document.getElementById("hn").value.trim(),
    cid: document.getElementById("cid").value.trim(),
    name: document.getElementById("name").value.trim(),
    tambon: document.getElementById("tambon").value,
    hospital: document.getElementById("hospital").value,
    house: document.getElementById("house").value,
    birth: document.getElementById("birth").value,
    note: document.getElementById("note").value,
    village: document.getElementById("village")?.value || "",
    soi: document.getElementById("soi")?.value || "",
    phone: document.getElementById("phone").value.trim()
  };
}

function getVaccines(){
  let vaccines = {};

  document.querySelectorAll(".vaccine-container input[type=checkbox]:checked")
  .forEach(cb=>{
    const name = cb.value;
    let date = document.getElementById("date-"+name)?.value;

    // 🔥 ถ้าไม่มีวันที่ → ใส่วันนี้
    if(!date){
      date = new Date().toISOString().split("T")[0];
    }

    vaccines[name] = date;
  });

  return vaccines;
}

function validateChild(c){

  if(!c.name || !c.cid){
    alert("กรุณากรอกชื่อและเลขบัตร");
    return false;
  }

  if(!c.tambon || !c.hospital || !c.village){
    alert("กรุณากรอกข้อมูลให้ครบ");
    return false;
  }

  return true;
}

function resetForm(){

  ["hn","cid","name","house","birth","note","phone"]
  .forEach(id=>{
    const el = document.getElementById(id);
    if(el) el.value = "";
  });

  const villageEl = document.getElementById("village");
  const soiEl = document.getElementById("soi");

  if(villageEl) villageEl.value = "";
  if(soiEl) soiEl.value = "";

  // 🔥 reset checkbox
  document.querySelectorAll(".vaccine-container input[type=checkbox]")
  .forEach(cb=>cb.checked=false);

  // 🔥 reset date
  document.querySelectorAll(".vaccine-container input[type=date]")
  .forEach(d=>{
    d.value = "";
    d.style.display = "none";
  });
}
function saveChild(data){
  return db.ref("children").push(data);
}
function addChildFull(){

    const c=getFormData();
    const vaccines=getVaccines();

    if(!validateChild(c)) return;

    const data={

    ...c,
    vaccines,
    updatedAt:new Date()
    .toLocaleString("th-TH")

    };

    // สร้าง key ก่อน
    const newRef=
    db.ref("children")
    .push();

    const childId=
    newRef.key;


    newRef.set(data)

    .then(()=>{

    // สร้างข้อมูลติดตามอัตโนมัติ

    return db.ref(
    "symptoms/"+childId
    )

    .set({

    name:c.name||"",
    hn:c.hn||"",
    phone:c.phone||"",

    vaccines:vaccines,

    symptom:"ยังไม่ระบุ",

    level:"🟢 ปกติ",

    status:"รอติดตาม",

    priority:99,

    time:Date.now()

    });

    })

    .then(()=>{

    alert("✅ บันทึกแล้ว");

    resetForm();

    loadFollow();

    if(confirm(
    "ไปหน้าติดตามอาการไหม?"
    )){

    window.location.href=
    "symptoms.html";

    }

    })

    .catch(err=>{

    console.error(err);

    alert(
    "❌ บันทึกไม่สำเร็จ"
    );

    });

    }



function buildVillageDropdown(tambon, selected, id){

  let data = tambon === "kolok"
    ? kolokCommunity
    : (villageData[tambon] || {});

  return `
    <select id="village" class="form-select"
      onchange="autoSave('${id}','village',this.value)">

      <option value="">-- เลือกหมู่ --</option>

      ${Object.keys(data).map(v=>`
        <option value="${v}" ${v==selected?"selected":""}>
          ${tambon==="kolok" ? data[v].name : `หมู่ ${v} - ${data[v].name}`}
        </option>
      `).join("")}

    </select>
  `;
}

document.addEventListener("DOMContentLoaded", ()=>{

  const tambonEl = document.getElementById("tambon");

  if(tambonEl){
    tambonEl.addEventListener("change", function(){

      const tambon = this.value;

      document.getElementById("villageBox").innerHTML =
        buildVillageDropdown(tambon, "", "");

      document.getElementById("soiBox").style.display =
        tambon === "kolok" ? "block" : "none";

    });
  }

  // 🔥 โหลดตารางตอนเปิดหน้า
  loadFollow();
 
  if(document.getElementById("symptomList")){
      loadSymptoms();
   }
   
});





// =========================
// 🗑 ลบ
// =========================
function deleteChild(id){
  if(confirm("ลบข้อมูลนี้?")){
    db.ref("children/"+id).remove();
  }
}



// =========================
// logout
// =========================
function logout(){
  localStorage.removeItem("user");
  localStorage.removeItem("name"); 
  location.href="login.html";
}


// =========================
// importExcel
// =========================
// 🔥 map วัคซีน
const vaccineMap = {
  "041":"BCG",
  "D21":"DTP1",
  "D22":"DTP2",
  "D23":"DTP3",
  "081":"MMR1",
  "082":"MMR2",
  "061":"JE1",
  "062":"JE2",
  "R21":"OPV1",
  "R22":"OPV2",
  "R23":"OPV3"
};

// 🔥 แปลง JSON → vaccines
function convertHDCtoVaccines(text){

  let vaccines = {};

  if(!text) return vaccines;

  text = text.replace(/<br>/g,'');
  const parts = text.split("},");

  parts.forEach(p=>{
    try{
      if(!p.endsWith("}")) p += "}";
      const obj = JSON.parse(p);

      let name = vaccineMap[obj.VACCINTYPE];
      if(name){
        vaccines[name] = obj.DATE_SERV;
      }

    }catch(e){}
  });

  return vaccines;
}


// 🔥 IMPORT EXCEL
function importExcel(){

  const file = document.getElementById("fileInput").files[0];
  if(!file){
    alert("กรุณาเลือกไฟล์");
    return;
  }

  const reader = new FileReader();

  reader.onload = function(e){

    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, {type:'array'});
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet, {header:1});

    let countSave = 0;

    rows.forEach(r=>{

      if(!r || r.length < 2) return;

      let hn="", cid="", name="", tambon="", house="", village="", birth="", note="";
      let hospital = "";
      let vaccines = {};

      r.forEach(cell=>{

        let val = (cell+"").trim();
        if(!val) return;

        // 🔹 CID
        if(/^\d{13}$/.test(val)){
          cid = val;
          return;
        }

        // 🔹 HN
        if(/^\d{4,6}$/.test(val) && !hn){
          hn = val;
        }

        // 🔥 hospital code (10168,10170)
        if(/^\d{5}$/.test(val)){
          hospital = val;
        }

        // 🔥 วันเกิด
        let d = val.replace(/-/g,'/');
        if(/\d{1,2}\/\d{1,2}\/\d{4}/.test(d)){
          birth = d;
          return;
        }

        // 🔥 บ้าน
        if(/\d+\/\d+/.test(val)){
          house = val;
          return;
        }
        else if(/^\d{2,4}$/.test(val) && !house){
          house = val;
        }

        // 🔥 หมู่
        if(/^\d{1,2}$/.test(val) && !val.includes("/") && !village){
          village = val.padStart(2,'0');
          return;
        }

        // 🔹 ชื่อ
        if(val.includes("ด.ช") || val.includes("ด.ญ")){
          name = val;
        }

        // 🔹 หมายเหตุ
        if(val.includes("ปฏิเสธ") || val.includes("ย้าย") || val.includes("ป่วย")){
          note = val;
        }

        // 🔹 ตำบล
        let t = val.replace(/\s/g,'');
        if(t.includes("โก-ลก")) tambon = "kolok";
        else if(t.includes("มูโนะ")) tambon = "munoh";
        else if(t.includes("ปูโยะ")) tambon = "puyoh";
        else if(t.includes("ปาเสมัส")) tambon = "pasemas";

        // 🔥 วัคซีนจาก JSON
        if(typeof cell === "string" && cell.includes("VACCINTYPE")){
          vaccines = {
            ...vaccines,
            ...convertHDCtoVaccines(cell)
          };
        }

      });

      // 🔥 ลบ **** ออกจากชื่อ
      name = name.replace(/\*+/g,"");

      // 🔥 กันข้อมูลขยะ
      if(!name || !cid){
        return;
      }

      // 🔥 fallback HN
      if(!hn){
        hn = Date.now() + Math.floor(Math.random()*1000);
      }

      // 🔥 map hospital → tambon
      if(!tambon){
        if(hospital === "10168") tambon = "pasemas";
        else if(hospital === "10170") tambon = "puyoh";
        else if(hospital === "10169") tambon = "munoh";
        else if(hospital === "77729" || hospital === "77728") tambon = "kolok";
        else tambon = "kolok";
      }

      // 🔥 format หมู่
      if(village){
        village = parseInt(village).toString();
      }

      // 🔥 save ลง Firebase
      db.ref("children").push({
        hn,
        cid,
        name,
        tambon,
        hospital,
        house,
        village,
        birth,
        note,
        vaccines,
        updatedAt: new Date().toLocaleString("th-TH")
      });

      countSave++;

    });

    alert("นำเข้าแล้ว " + countSave + " รายการ ✅");

    loadFollow();
  };

  reader.readAsArrayBuffer(file);
}




function getValueSmart(row, keywords){

  for(let key in row){

    let clean = key
      .replace(/\s/g,'')
      .replace(/-/g,'')
      .toLowerCase();

    for(let k of keywords){

      let target = k
        .replace(/\s/g,'')
        .replace(/-/g,'')
        .toLowerCase();

      if(clean === target){
        return row[key];
      }
    }
  }

  return "";
}
function cleanRow(row){
  let newRow = {};
  for(let key in row){
    let k = key.replace(/\s/g,'').replace(/-/g,'');
    newRow[k] = row[key];
  }
  return newRow;
}






function formatVillage(tambon, village){

  if(!village) return "-";

  // 👉 ถ้าเป็นตัวเลข เช่น 01, 02
  if(!isNaN(village)){
    return "หมู่ " + parseInt(village);
  }

  // 👉 ถ้าเป็นโกลก (ชุมชน)
  if(tambon === "kolok"){
    return village; // เช่น กูโบร์
  }

  return village;
}

function updateVillage(id, value){

  // แปลงกลับเป็นเลข
  let v = value.replace("หมู่ ","");

  db.ref("children/" + id).update({
    village: v,
    updatedAt: new Date().toLocaleString("th-TH")
  });

}

function reloadRealtime(){
  db.ref("children").off();
  loadFollow();
}


function changeTambon(el){

  let tr = el.closest("tr");
  let id = tr.getAttribute("data-id");

  let newTambon = el.value;

  db.ref("children/"+id).update({
    tambon: newTambon,
    village: "", // reset หมู่
    updatedAt: new Date().toLocaleString("th-TH")
  });

  loadFollow(); // รีเฟรช dropdown หมู่ทันที
}

function autoSaveVillage(id, value){

  db.ref("children/"+id).update({
    village: value,
    updatedAt: new Date().toLocaleString("th-TH")
  });

}






function loadvaccineChart(){

  console.log("🔥 vaccine chart working");

  const vaccineFilter = document.getElementById("vaccineFilter")?.value || "all";
  const quarterFilter = document.getElementById("quarterFilter")?.value || "all";

  db.ref("children").once("value", snapshot => {

    const data = snapshot.val();

    if(!data || Object.keys(data).length === 0){
      console.log("ไม่มีข้อมูล");
      return;
    }

    let total = Object.keys(data).length;

    let vaccines = {
      BCG:0, HBV1:0, HBV2:0, HBV3:0,
      DTP1:0, DTP2:0, DTP3:0, DTP4:0,
      OPV1:0, OPV2:0, OPV3:0, OPV4:0,
      IPV:0,
      MMR1:0, MMR2:0,
      JE1:0, JE2:0,
      dT:0, HPV:0
    };

    for(let id in data){
      let c = data[id];

      for(let v in vaccines){

        // 🔹 filter วัคซีน
        if(vaccineFilter !== "all" && v !== vaccineFilter) continue;

        if(c.vaccines && c.vaccines[v]){

          // 🔹 filter ไตรมาส
          if(quarterFilter !== "all"){
            const date = c.vaccines[v];
            const month = new Date(date).getMonth()+1;

            let q = "Q1";
            if(month>=4 && month<=6) q="Q2";
            else if(month>=7 && month<=9) q="Q3";
            else if(month>=10) q="Q4";

            if(q !== quarterFilter) continue;
          }

          vaccines[v]++;
        }
      }
    }

    let labels = [];
    let values = [];

    for(let v in vaccines){

      if(vaccineFilter !== "all" && v !== vaccineFilter) continue;

      labels.push(v);

      let percent = total > 0 ? (vaccines[v]/total)*100 : 0;
      values.push(percent);
    }

    const ctx = document.getElementById("vaccineChart");
    if(!ctx){
      console.log("ไม่เจอ canvas");
      return;
    }

    // 🔥 กันกราฟซ้อน
    if(window.vaccineChart && typeof window.vaccineChart.destroy === "function"){
    window.vaccineChart.destroy();
    }
    window.vaccineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: "% การฉีดวัคซีน",
          data: values,
          tension: 0.4,
          borderColor: "#4CAF50"
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales:{
          y:{
            beginAtZero:true,
            max:100
          }
        }
      }
    });
// =========================
// 📊 DESCRIPTION
// =========================
const max = Math.max(...values);
const min = Math.min(...values);
const maxIndex = values.indexOf(max);
const minIndex = values.indexOf(min);
const maxVaccine = labels[maxIndex];
const minVaccine = labels[minIndex];


const el = document.getElementById("vaccineDescription");
if(!el) return;

// 🔹 กันไม่มีข้อมูล
if(values.length === 0){
  el.innerHTML = `❌ ไม่มีข้อมูล`;
  return;
}

// 🔥 กรณีเลือกวัคซีนเดียว
if(values.length === 1){

  let text = `
  <b>💉 ${labels[0]}</b><br>
  Coverage: ${values[0].toFixed(1)}%<br>
  🟢 สูงสุด: ${maxVaccine} (${max.toFixed(1)}%)<br>
  🔴 ต่ำสุด: ${minVaccine} (${min.toFixed(1)}%)<br>
  `;

  // 🔴 ยังไม่มีการฉีด
  if(values[0] === 0){
    text += `<br><span style="color:#dc2626"> ‼️ ยังไม่มีการฉีดวัคซีน</span>`;
  }

  // 🟡 ต่ำกว่าเกณฑ์
  else if(values[0] < 80){
    text += `<br><span style="color:#f59e0b">⚠️ ต่ำกว่าเกณฑ์ (80%)</span>`;
  }

  // 🟢 ผ่านเกณฑ์
  else{
    text += `<br><span style="color:#16a34a">✅ ผ่านเกณฑ์</span>`;
  }

  el.innerHTML = text;
  return;
}
// 🔥 ถ้าทุกค่ามันเท่ากัน
if(max === min){

  let text = `
  <b>📊 สรุปความครอบคลุมวัคซีน</b><br>
  📌 ค่าทุกวัคซีนเท่ากัน (${max.toFixed(1)}%)<br>
  📈 จำนวนวัคซีน: ${labels.length}
  `;

  if(max === 0){
    text += `<br><span style="color:#dc2626">🔴 ยังไม่มีการฉีดวัคซีน</span>`;
  }

  el.innerHTML = text;
  return;
}

// 🔥 ปกติ (หลายตัว)
let text = `
<b>📊 สรุปความครอบคลุมวัคซีน</b><br>
📈 จำนวนวัคซีน: ${labels.length}<br>
🟢 สูงสุด: ${maxVaccine} (${max.toFixed(1)}%)<br>
🔴 ต่ำสุด: ${minVaccine} (${min.toFixed(1)}%)<br>
`;
// 🔥 แจ้งเตือนต่ำกว่าเกณฑ์
if(min < 80){
  text += `<br><span style="color:#f59e0b">⚠️ มีวัคซีนต่ำกว่าเกณฑ์</span>`;
}

el.innerHTML = text;
      
  });
}

document.addEventListener("DOMContentLoaded", ()=>{

  const select = document.getElementById("vaccineFilter");

  if(!select) return;

  vaccineList.forEach(v=>{
    const op = document.createElement("option");
    op.value = v;
    op.textContent = v;
    select.appendChild(op);
  });

});



function toggleSidebar(btn){

  btn.classList.toggle("active");

  const sb = document.getElementById("sidebar");
  const bg = document.getElementById("backdrop");

  sb.classList.toggle("show");
  bg.classList.toggle("show");
}

function closeSidebar(){
  document.getElementById("sidebar").classList.remove("show");
  document.getElementById("backdrop").classList.remove("show");
  document.querySelector(".menu-btn").classList.remove("active");
}

function openMap(tambon, house, village){

  const tambonTH = getTambonName(tambon);

  let address = `บ้านเลขที่ ${house} หมู่ ${village} ตำบล ${tambonTH} อำเภอสุไหงโก-ลก จังหวัดนราธิวาส`;

  let url = "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(address);

  window.open(url, "_blank");
}

function getTambonName(t){
  const map = {
    all: "ทั้งหมด",
    kolok: "สุไหงโก-ลก",
    munoh: "มูโนะ",
    puyoh: "ปูโยะ",
    pasemas: "ปาเสมัส"
  };
  return map[t] || t || "-";
}


function calculateAge(birth){

  if(!birth) return "-";

  const [d,m,y] = birth.split("/");
  const birthDate = new Date(y-543, m-1, d);
  const today = new Date();

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();

  if(months < 0){
    years--;
    months += 12;
  }

  return years > 0 
    ? `${years} ปี ${months} เดือน`
    : `${months} เดือน`;
}



function openCareByTambon(){

  const tambon = document.getElementById("tambonFilter")?.value || "kolok";

  db.ref("villageCare/"+tambon).once("value", snap=>{

    const data = snap.val() || {};

    let html = "";

    Object.keys(data).forEach(v=>{

      const group = data[v];

      html += `
        <div style="
          border:1px solid #eee;
          border-radius:14px;
          padding:12px;
          margin-bottom:12px;
          background:#fafafa;
        ">

          <div style="
            font-weight:600;
            margin-bottom:6px;
            color:#374151;
          ">
            🏡 หมู่ ${v}
          </div>

          ${group.care.map(c=>`
          <div style="
            display:flex;
            justify-content:space-between;
            padding:6px 0;
            border-bottom:1px solid #eee;
          ">
            <div>
              👤 ${c.name}<br>
              <small style="color:#6b7280;">${c.role || "-"}</small>
            </div>

            <a href="tel:${c.tel}" style="color:#16a34a;">
              📞 ${c.tel}
            </a>
          </div>

          `).join("")}

        </div>
      `;
    });

    if(!html){
      html = "❌ ไม่มีข้อมูลผู้ดูแลในตำบลนี้";
    }

    document.getElementById("careTitle").innerText =
      "👥 ผู้ดูแล - " + getTambonName(tambon);

    document.getElementById("careBody").innerHTML = html;

    new bootstrap.Modal(document.getElementById("careModal")).show();
  });

}

db.ref("villageCare").set({


  // 🟢 ปูโยะ
  puyoh:{
    1:{care:[{name:"นายเฉลิมพล อำพันธ์",tel:"0807047038",role:"ผู้ใหญ่บ้าน"}]},
    2:{care:[{name:"นายอาหามะ อูเซ็ง",tel:"0892947402",role:"กำนัน / ผู้ใหญ่บ้าน"}]},
    3:{care:[{name:"นายไซมี มะ",tel:"0810842978",role:"ผู้ใหญ่บ้าน"}]},
    4:{care:[{name:"นายนรวีร์ เจ๊ะเมาะ",tel:"0808466067",role:"ผู้ใหญ่บ้าน"}]},
    5:{care:[{name:"นายสมนึก แดงดี",tel:"0872951817",role:"ผู้ใหญ่บ้าน"}]},
    6:{care:[{name:"นายมะยูนุ มะเย็ง",tel:"0849971802",role:"ผู้ใหญ่บ้าน"}]}
  },

  // 🔵 มูโนะ
  munoh:{
    1:{care:[{name:"นายสาลีมี สาและ",tel:"0894620868",role:"ผู้ใหญ่บ้าน"}]},
    2:{care:[{name:"นายนาทวี ตันเหมนายู",tel:"0894646467",role:"ผู้ใหญ่บ้าน"}]},
    3:{care:[{name:"นายมุสตอปา อาบะ",tel:"0850770975",role:"ผู้ใหญ่บ้าน"}]},
    4:{care:[{name:"ร.ต.ประเสริฐ อาแว",tel:"0873999709",role:"กำนัน / ผู้ใหญ่บ้าน"}]},
    5:{care:[{name:"นายอามาซะ สามะ",tel:"0806303427",role:"ผู้ใหญ่บ้าน"}]}
  },

  // 🟡 ปาเสมัส
  pasemas:{
    1:{care:[{name:"นายฮารีมคาน โอระสะมันนี",tel:"0817677605",role:"ผู้ใหญ่บ้าน"}]},
    2:{care:[{name:"นายนาซูฮา หะยีอาแว",tel:"0850787676",role:"ผู้ใหญ่บ้าน"}]},
    3:{care:[{name:"นายณรงค์ อาแวสือแม",tel:"0629988149",role:"ผู้ใหญ่บ้าน"}]},
    4:{care:[{name:"นายมาฮาโซ มือเยาะ",tel:"0801382240",role:"ผู้ใหญ่บ้าน"}]},
    5:{care:[{name:"นายมะรอดี บินสะมะแอ",tel:"0896594425",role:"ผู้ใหญ่บ้าน"}]},
    6:{care:[{name:"นายปฏิวัติ เด่นอร่ามคาน",tel:"0813686863",role:"กำนัน / ผู้ใหญ่บ้าน"}]},
    7:{care:[{name:"นายอัสมี เจ๊ะอาแว",tel:"0824159376",role:"ผู้ใหญ่บ้าน"}]},
    8:{care:[{name:"นายรุสวา ดอเลาะ",tel:"0649500655",role:"ผู้ใหญ่บ้าน"}]}
  },

  // 🔴 สุไหงโก-ลก (ชุมชน)
  kolok:{
    community:{
      care:[
        {name:"น.ส.สุมิตร อูมา",tel:"0993633100",role:"ผู้นำชุมชน"},
        {name:"น.ส.สะปีน๊ะ มะแซ",tel:"0869695313",role:"ผู้นำชุมชน"},
        {name:"นางละมัย การุโณ",tel:"0827038733",role:"ผู้นำชุมชน"},
        {name:"นางวิลาวัลย์ คชกาล",tel:"0831682610",role:"ผู้นำชุมชน"},
        {name:"นายธงชัย บือราเฮง",tel:"0634853736",role:"ผู้นำชุมชน"},
        {name:"นายวราวุธ มาหามะ",tel:"0634245389",role:"ผู้นำชุมชน"},
        {name:"นายสาเหะ มาหะมะ",tel:"0897378241",role:"ผู้นำชุมชน"},
        {name:"น.ส.โนรีซา มะแซ",tel:"0814394057",role:"ผู้นำชุมชน"},
        {name:"นายอาเดอร์นันต์ เบ็ญสนิ",tel:"0813059321",role:"ผู้นำชุมชน"},
        {name:"นายบุญภาค สุขโร",tel:"0902100194",role:"ผู้นำชุมชน"},
        {name:"น.ส.สุกัญญา จันทร์มุณี",tel:"0994739179",role:"ผู้นำชุมชน"},
        {name:"นายสุฮายมิง อารง",tel:"0869640838",role:"ผู้นำชุมชน"},
        {name:"นายวัชริศ เจ๊ะเลาะ",tel:"0815433221",role:"ผู้นำชุมชน"},
        {name:"นายธรรมมูญ ขุนนุ้ย",tel:"0894684098",role:"ผู้นำชุมชน"},
        {name:"นายมุสเล็ม ซามะ",tel:"0622482484",role:"ผู้นำชุมชน"},
        {name:"นางสารีป๊ะ ยะโก๊ะ",tel:"0827313077",role:"ผู้นำชุมชน"},
        {name:"นายอัสมิง สะแม",tel:"0873924515",role:"ผู้นำชุมชน"},
        {name:"นางอัญชลี ยะโลมพันธ์",tel:"0880693892",role:"ผู้นำชุมชน"},
        {name:"นายประทิว แก้วคง",tel:"0923595039",role:"ผู้นำชุมชน"},
        {name:"นายอาแว แวหะมะ",tel:"0894641319",role:"ผู้นำชุมชน"}
      ]
    }
  }

});


function parseThaiDate(birth){
  if(!birth) return null;

  if(birth.includes("-")){
    return new Date(birth);
  }

  if(birth.includes("/")){
    let [d,m,y] = birth.split("/").map(Number);
    if(y > 2500) y -= 543; // พ.ศ → ค.ศ
    return new Date(y, m-1, d);
  }

  return null;
}

function getAgeMonths(birth){
  const birthDate = parseThaiDate(birth);
  if(!birthDate || isNaN(birthDate)) return 0;

  const today = new Date();

  let months =
    (today.getFullYear() - birthDate.getFullYear()) * 12 +
    (today.getMonth() - birthDate.getMonth());

  // ✅ เช็ควัน (สำคัญมาก)
  if(today.getDate() < birthDate.getDate()){
    months--;
  }

  return Math.max(0, months);
}

function getAgeBadge(birth){
  if(!birth) return `<span class="badge bg-secondary">-</span>`;

  const months = getAgeMonths(birth);

  const years = Math.floor(months / 12);
  const remainMonths = months % 12;

  let text = years > 0
    ? `${years} ปี ${remainMonths} ด.`
    : `${months} ด.`;

  // 🎨 สีตามช่วงอายุ
  let color = "bg-success";

  if(months <= 6) color = "bg-info";
  else if(months <= 12) color = "bg-primary";
  else if(months <= 24) color = "bg-warning";
  else color = "bg-secondary";

  return `<span class="badge ${color}">${text}</span>`;
}
// console.log("birth:", c.birth, "months:", getAgeMonths(c.birth));


function toggleSidebar(btn){

  // animation ปุ่ม
  if(btn){
    btn.classList.toggle("active");
  }

  // sidebar
  const sb = document.getElementById("sidebar");
  const bg = document.getElementById("backdrop");

  if(sb) sb.classList.toggle("show");
  if(bg) bg.classList.toggle("show");
}


function handleUpload(e){
  const file = e.target.files[0];
  if(!file) return;

  const reader = new FileReader();
  reader.onload = ev=>{
    document.getElementById("profileImg").src = ev.target.result;
    localStorage.setItem("profileImg", ev.target.result);
  };
  reader.readAsDataURL(file);
}


// const btn = document.querySelector('[data-bs-target="#addForm"]');
// const form = document.getElementById("addForm");

// const collapse = new bootstrap.Collapse(form, { toggle: false });

// btn.addEventListener("click", () => {
//   if(form.classList.contains("show")){
//     collapse.hide();
//   }else{
//     collapse.show();
//   }
// });

// // เปลี่ยนข้อความ
// form.addEventListener("show.bs.collapse", ()=>{
//   btn.innerText = "➖ ปิดฟอร์ม";
// });

// form.addEventListener("hide.bs.collapse", ()=>{
//   btn.innerText = "➕ เพิ่มข้อมูล";
// });

// const vaccineSelect = document.getElementById("vaccineFilter");

// vaccineList.forEach(v => {
//   const option = document.createElement("option");
//   option.value = v;
//   option.textContent = v;
//   vaccineSelect.appendChild(option);
// });

function filterData() {
  const vaccine = document.getElementById("vaccineFilter").value;
  const quarter = document.getElementById("quarterFilter").value;

  let filtered = vaccineData.filter(item => {
    return (vaccine === "all" || item.name === vaccine) &&
           (quarter === "all" || item.quarter === quarter);
  });

  updateChart(filtered);
}

if(vaccineFilter==="all") {
  // group ตามวัคซีน
  const grouped = {};

  filtered.forEach(d => {
    if (!grouped[d.name]) grouped[d.name] = 0;
    grouped[d.name] += d.percent;
  });

  const labels = Object.keys(grouped);
  const values = Object.values(grouped);

  updateChartCustom(labels, values);
}


function formatDate(dateStr){
  if(!dateStr) return "-";

  const d = new Date(dateStr);

  return d.toLocaleDateString("th-TH", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}

function formatDateInput(dateStr){
  if(!dateStr) return "";

  // ถ้าเป็น dd/mm/yyyy → แปลง
  if(dateStr.includes("/")){
    const parts = dateStr.split("/");
    if(parts.length === 3){
      return `${parts[2]}-${parts[1].padStart(2,"0")}-${parts[0].padStart(2,"0")}`;
    }
  }

  // ถ้าเป็น yyyy-mm-dd อยู่แล้ว
  return dateStr;
}








