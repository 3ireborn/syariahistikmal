document.getElementById("formIstikmal").addEventListener("submit", function(e) {
  e.preventDefault();
  const nama = document.getElementById("nama").value;
  const ibu = document.getElementById("ibu").value;
  const leaderWA = getLeaderNumber();

  const pesan = `Assalamu’alaikum kak, saya ${nama} baru daftar Istikmal Syariah via link kakak. Mohon bimbingannya ya 😊\n\nNama Ibu Kandung: ${ibu}`;
  
  // simpan ke localStorage agar bisa dibaca di sukses.html
  localStorage.setItem("waPesan", encodeURIComponent(pesan));
  localStorage.setItem("leaderWA", leaderWA);

  window.location.href = "sukses.html";
});
