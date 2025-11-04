document.getElementById("mitraForm").addEventListener("submit", function(e){
  e.preventDefault();

  const nama = document.getElementById("nama").value;
  const wa = document.getElementById("wa").value;
  const leaderKey = document.getElementById("leader").value;
  const premi = document.getElementById("premi").value;
  const alamat = document.getElementById("alamat").value;

  const leaderPhone = leaders[leaderKey];
  if (!leaderPhone) {
    alert("Silakan pilih leader yang valid!");
    return;
  }

  const message = `📋 *FORMULIR PENDAFTARAN MITRA BARU 3iReborn*\n\n` +
                  `👤 Nama: ${nama}\n` +
                  `📱 WA: ${wa}\n` +
                  `👨‍💼 Leader: ${document.querySelector("#leader option:checked").text}\n` +
                  `💰 Premi: Rp${Number(premi).toLocaleString("id-ID")}\n` +
                  `🏠 Alamat: ${alamat}\n\n` +
                  `🕊️ Data mitra baru sudah masuk ke sistem 3iReborn.`;

  const encoded = encodeURIComponent(message);
  const waUrl = `https://wa.me/${leaderPhone}?text=${encoded}`;
  window.open(waUrl, "_blank");
});
