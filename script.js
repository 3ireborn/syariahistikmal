/* =========================
   script.js - dynamic leader
   - Menyimpan data Page1 ke localStorage
   - Mengambil data di Page2
   - Membaca ?leader=ref dan memetakan ke nomor WA
   - Menggabungkan data menjadi pesan WA dan membuka wa.me link
   ========================= */

/* ---------- CONFIG: EDIT kalau mau ubah/menghapus leader ---------- */
/* Gunakan key lowercase tanpa spasi sebagai ref di URL, misal ?leader=sugiarto */
const LEADERS = {
  sugiarto: "6285218453131",
  agnes: "6285932684440",
  suwarti: "62881011823140",
  iyang: "6281388675615",
  queen: "6282199558169",
  rahmawan: "6281327498929",
  regina: "6281285949074",
  tasya: "966563414575",
  divawati: "6586210326",
  tohir: "6281236544821",
  alpiano: "6282252161911"
};
/* default leader jika param leader tidak tersedia: gunakan key 'sugiarto' */
const DEFAULT_LEADER_KEY = "sugiarto";

/* helper: baca query string */
function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

/* helper: capitalize first */
function capitalize(s){
  if(!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/* ---------- PAGE 1 (index.html) ---------- */
if (document.getElementById("toPage2")) {
  document.getElementById("toPage2").addEventListener("click", ()=> {
    // ambil data form
    const data = {
      nama: document.getElementById("nama").value.trim(),
      tempat: document.getElementById("tempat").value.trim(),
      ttl: document.getElementById("ttl").value,
      jk: document.getElementById("jk").value,
      alamat: document.getElementById("alamat").value.trim(),
      nik: document.getElementById("nik").value.trim(),
      hp: document.getElementById("hp").value.trim(),
      email: document.getElementById("email").value.trim(),
      pekerjaan: document.getElementById("pekerjaan").value.trim(),
      penghasilan: document.getElementById("penghasilan").value,
      tinggi: document.getElementById("tinggi").value,
      berat: document.getElementById("berat").value,
      ibu: document.getElementById("ibu").value.trim(),
      hubungan: document.getElementById("hubungan").value.trim()
    };

    // validasi sederhana: nama & hp & ibu wajib
    if(!data.nama){
      alert("Nama lengkap wajib diisi.");
      return;
    }
    if(!data.hp){
      alert("Nomor HP wajib diisi.");
      return;
    }
    if(!data.ibu){
      alert("Nama Ibu Kandung wajib diisi.");
      return;
    }

    // simpan ke localStorage sementara
    localStorage.setItem("ist_form_page1", JSON.stringify(data));

    // pindah ke page2.html tapi pertahankan query string (sehingga ?leader tetap ada)
    const qs = window.location.search || "";
    window.location.href = "page2.html" + qs;
  });
}

/* ---------- PAGE 2 (page2.html) ---------- */
if (document.getElementById("submitAll")) {
  // isi form2 dengan data page1 jika ada
  const saved = localStorage.getItem("ist_form_page1");
  if(saved){
    try{
      const d = JSON.parse(saved);
      if(d.nama) document.querySelector("#nama_preview")?.remove?.();
      // optionally show a little summary at top (skip for simplicity)
    }catch(e){/* ignore */}
  }

  document.getElementById("backTo1").addEventListener("click", ()=> {
    // kembali ke index.html sambil pertahankan query string
    const qs = window.location.search || "";
    window.location.href = "index.html" + qs;
  });

  document.getElementById("submitAll").addEventListener("click", ()=> {
    const page1 = JSON.parse(localStorage.getItem("ist_form_page1") || "{}");

    // ambil page2 data
    const page2 = {
      rekening: document.getElementById("rekening").value.trim(),
      npwp: document.getElementById("npwp").value.trim(),
      ahli: document.getElementById("ahli").value.trim(),
      ahli_ttl: document.getElementById("ahli_ttl").value,
      ahli_rel: document.getElementById("ahli_rel").value.trim(),
      rokok: document.getElementById("rokok").value,
      kronis: document.getElementById("kronis").value,
      alkohol: document.getElementById("alkohol").value
    };

    // baca leader param
    const leaderRef = (getQueryParam("leader") || getQueryParam("ref") || DEFAULT_LEADER_KEY).toLowerCase();
    const leaderNumber = LEADERS[leaderRef] || LEADERS[DEFAULT_LEADER_KEY];
    const leaderName = capitalize(leaderRef === "ref" ? DEFAULT_LEADER_KEY : leaderRef);

    // bangun pesan WA (encodeURIComponent)
    const lines = [];
    lines.push(`Assalamu'alaikum kak ${leaderName}, saya baru daftar Istikmal Syariah via link kakak. Mohon bimbingannya ya 😊`);
    lines.push("");
    lines.push(`Data Diri:`);
    lines.push(`- Nama: ${page1.nama || "-"}`);
    if(page1.ttl) lines.push(`- Tempat/Tgl Lahir: ${page1.tempat || "-"} / ${page1.ttl || "-"}`);
    lines.push(`- Jenis Kelamin: ${page1.jk || "-"}`);
    lines.push(`- Alamat: ${page1.alamat || "-"}`);
    lines.push(`- NIK: ${page1.nik || "-"}`);
    lines.push(`- HP: ${page1.hp || "-"}`);
    if(page1.email) lines.push(`- Email: ${page1.email}`);
    lines.push(`- Pekerjaan: ${page1.pekerjaan || "-"}`);
    lines.push(`- Penghasilan/Tahun: ${page1.penghasilan || "-"}`);
    lines.push(`- Tinggi/Berat: ${page1.tinggi || "-"} cm / ${page1.berat || "-"} kg`);
    lines.push(`- Nama Ibu Kandung: ${page1.ibu || "-"}`);
    lines.push(`- Hubungan CPP-CT: ${page1.hubungan || "-"}`);
    lines.push("");
    lines.push(`Data Tambahan:`);
    lines.push(`- Rekening: ${page2.rekening || "-"}`);
    lines.push(`- NPWP: ${page2.npwp || "-"}`);
    lines.push(`- Ahli Waris: ${page2.ahli || "-"}`);
    lines.push(`- Tgl Lahir Ahli Waris: ${page2.ahli_ttl || "-"}`);
    lines.push(`- Hubungan Ahli Waris: ${page2.ahli_rel || "-"}`);
    lines.push("");
    lines.push(`Kesehatan:`);
    lines.push(`- Merokok: ${page2.rokok || "-"}`);
    lines.push(`- Penyakit Kronis: ${page2.kronis || "-"}`);
    lines.push(`- Alkohol: ${page2.alkohol || "-"}`);

    const message = encodeURIComponent(lines.join("\n"));

    // buka wa.me
    const waUrl = `https://wa.me/${leaderNumber}?text=${message}`;
    window.open(waUrl, "_blank");

    // optional: hapus data sementara (atau biarkan)
    // localStorage.removeItem("ist_form_page1");
  });
  }
