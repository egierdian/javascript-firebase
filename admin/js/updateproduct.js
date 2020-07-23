let dbs , dataRefs;

// membuat id parameter
let urlParams = new URLSearchParams(window.location.search);
let idParams = urlParams.get("id");

// referensi ke database
dbs = firebase.database();
dataRefs = dbs.ref('products/data/' + idParams);

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
  var file = e.target.files[0];
  var storageRef = storage.ref('products/'+ idParams + '/' + file.name);
  // storageRef.put(file);
  storageRef.put(file).then(function(snapshot){
    console.log(snapshot.downloadURL);
    const img = document.getElementById('myimg');
    img.src = snapshot.downloadURL;
  });
});

simpanData.addEventListener('click' , function(e) {
    var img = document.getElementById('myimg').src;
  
    var urlImgs = img.replace(/\//g, '\/');
    var urlImg = urlImgs.replace(/\//g, '\\/');
    e.preventDefault();

    // menyimpan data
    dataRef.set({
        ID : "\""+idParam+"\"",
        Category : "\""+txtKategori.value+"\"",
        Image : "\"\\\"" + urlImg +"\"\\\"",
        Name : "\""+txtNama.value+"\"",
        Harga : "\""+txtHarga.value+"\"",
        Stok : "\""+txtStok.value+"\"",
        Berat : "\""+txtBerat.value+"\"",
        Unit : "\""+txtUnit.value+"\""
    });

    // update deskripsi
    db.ref('products/description/' + idParam).set("\""+ txtDeskripsi.value+ "\"");

    window.alert('berhasil');
    window.location.href = '/admin/produk/produk.html';
});

// selain push , bisa juga set . tapi hanya untuk
dataRef.on('child_changed' , dataBerubah , dataGagal);

function dataBerubah() {
  console.log('Data berhasil diperbaharui!');  
}

function dataGagal() {
  console.log("isi data");
}