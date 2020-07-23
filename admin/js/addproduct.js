let db , dataRef;

let date = new Date();

let tahun = ""+date.getFullYear();
let iniId = tahun.substring(2) + (date.getMonth()<10?'0':'') + (date.getMonth() + 1)  + (date.getDate()<10?'0':'') + date.getDate() /* InIBATAS*/ + (date.getHours()<10?'0':'') + date.getHours() + (date.getMinutes()<10?'0':'') + date.getMinutes() + (date.getSeconds()<10?'0':'') + date.getSeconds();

// console.log(iniId);

// referensi ke database
db = firebase.database();
dataRef = db.ref('products/data/' + iniId);
// Tambah data
let simpanData  = document.getElementById('Simpan');
let txtNama     = document.getElementById('nama_field');
let txtHarga    = document.getElementById('harga_field');
let txtStok     = document.getElementById('stok_field');
let txtBerat    = document.getElementById('berat_field');
let txtUnit     = document.getElementById('unit_field');
let images      = document.getElementById('fileImages');
let txtDeskripsi= document.getElementById('deskripsi_field');
let txtKategori = document.getElementById('kategori_field');

const storage = firebase.storage();
images.addEventListener('change', function(e){
  // var url = "";
  var file = e.target.files[0];
  var storageRef = storage.ref('products/'+ iniId+ '/' + file.name);
  // storageRef.put(file);
  storageRef.put(file).then(function(snapshot){
    console.log(snapshot.downloadURL);
    const img = document.getElementById('myimg');
    img.src = snapshot.downloadURL;
  });
});



// const storage = firebase.storage();
simpanData.addEventListener('click' , function(e) {
  var img = document.getElementById('myimg').src;
  
	var urlImgs = img.replace(/\//g, '\/');
  var urlImg = urlImgs.replace(/\//g, '\\/');
  e.preventDefault();
  dataRef.set({
        ID : "\""+iniId+"\"",
        Category : "\""+txtKategori.value+"\"",
        Image : "\"\\\"" + urlImg +"\"\\\"",
        Name : "\""+txtNama.value+"\"",
        Harga : "\""+txtHarga.value+"\"",
        Stok : "\""+txtStok.value+"\"",
        Berat : "\""+txtBerat.value+"\"",
        Unit : "\""+txtUnit.value+"\""
  });

  db.ref('products/description/' + iniId).set("\""+ txtDeskripsi.value+ "\"");
  window.alert('berhasil');
  window.location.href = '/admin/produk/produk.html';
});

// selain push , bisa juga set . tapi hanya untuk
dataRef.on('child_changed' , dataBerubah , dataGagal);

function dataBerubah() {
  alert('Data berhasil diperbaharui!');  
}

function dataGagal() {
  console.log("isi data");
}