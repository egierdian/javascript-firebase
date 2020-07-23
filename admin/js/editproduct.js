let db , dataRef, dataRefss, dbss;

// ini id
let date = new Date();
let tahun = ""+date.getFullYear();
let iniId = tahun.substring(2) + (date.getMonth()<10?'0':'') + (date.getMonth() + 1)  + (date.getDate()<10?'0':'') + date.getDate() /* InIBATAS*/ + (date.getHours()<10?'0':'') + date.getHours() + (date.getMinutes()<10?'0':'') + date.getMinutes() + (date.getSeconds()<10?'0':'') + date.getSeconds();

// membuat id parameter
let urlParam = new URLSearchParams(window.location.search);
let idParam = urlParam.get("id");

// database
db = firebase.database();
dataRef = db.ref('products/data/'+ idParam);

// menampilkan data ke halaman browser
dataRef.on('value' , dataBerhasil , dataGagal);

function dataBerhasil(data){
    // let simpanData  = document.getElementById('Simpan');
    let txtNama     = document.getElementById('nama_field');
    let txtHarga    = document.getElementById('harga_field');
    let txtStok     = document.getElementById('stok_field');
    let txtBerat    = document.getElementById('berat_field');
    let txtUnit     = document.getElementById('unit_field');
    let imagesUrl   = document.getElementById('myimg');
    let txtKtg = document.getElementById('kategori_field');

    // konversi data
    let dataCategory= data.val().Category.replace(/"/g, '');
    let dataNama    = data.val().Name.replace(/"/g, '');
    let dataStok    = data.val().Stok.replace(/"/g, '');
    let dataBerat   = data.val().Berat.replace(/"/g, '');
    let dataUnit    = data.val().Unit.replace(/"/g, '');
    let dataHarga   = data.val().Harga.replace(/"/g, '');
    let imagesURLs  = data.val().Image.replace(/\\/g, '');
    let imagesURL   = imagesURLs.replace(/"/g, '');
    console.log(dataCategory);

    // initialize
    imagesUrl.src   = imagesURL;
    txtNama.value   = dataNama;
    txtHarga.value  = dataHarga;
    txtStok.value   = dataStok;
    txtBerat.value  = dataBerat;
    txtUnit.value   = dataUnit;
    txtKtg.value    = dataCategory;
}

function dataGagal(err){
  console.log(err);
}


// ambil deskripsi
dbss = firebase.database();
dataRefss = dbss.ref('products');

// menampilkan data ke halaman browser
dataRefss.on('value' , dscBerhasil , dscGagal);

function dscBerhasil(data){
    // let simpanData   = document.getElementById('Simpan');
    let txtDsc          = document.getElementById('deskripsi_field');
    // console.log(data.val().description[idParam]);
    // konversi data
    let dataDeskripsi   = data.val().description[idParam].replace(/"/g, '');
    // console.log(imagesURL);

    // initialize
    txtDsc.value   = dataDeskripsi;
}

function dscGagal(err){
  console.log(err);
}


