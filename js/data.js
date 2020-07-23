
// Initialize Firebase 
var config = {
    apiKey: "AIzaSyB5usrQKua0zDoUMWS-NoMf6wGoihAz4rE",
    authDomain: "warmat-9d32d.firebaseapp.com",
    databaseURL: "https://warmat-9d32d.firebaseio.com",
    projectId: "warmat-9d32d",
    storageBucket: "warmat-9d32d.appspot.com",
    messagingSenderId: "124927091557",
    appId: "1:124927091557:web:531ed441a700752f5df78c",
    measurementId: "G-KB1D9J96DN"
};
firebase.initializeApp(config);

let db , dataRef;

// referensi ke database
db = firebase.database();
dataRef = db.ref('products/data');
// menampilkan data ke halaman browser
const DataProduk = () => {
    dataRef.on('value' , dataBerhasil , dataGagal);
}

const dataBerhasil = (data) => {
    // console.log(data);
    let tampilkan = "";
    let ambilData = document.getElementById("tampilData");
        data.forEach(function(konten) {
            // console.log(konten.val()); //output Bandung
            let str = konten.val().Image;
            let nama = konten.val().Name;
            let hasil = str.replace(/\\/g, '');
            let replacenama = nama.replace(/"/g, '');
            let harga = konten.val().Harga.replace(/"/g, '');
            // konversi harga ke format rupiah
            var	number_string = harga.toString(),
                sisa 	= number_string.length % 3,
                rupiah 	= number_string.substr(0, sisa),
                ribuan 	= number_string.substr(sisa).match(/\d{3}/g);
                    
            if (ribuan) {
                separator = sisa ? '.' : '';
                rupiah += separator + ribuan.join('.');
            }

            tampilkan += `
            <div class="col s12 m4 l3" style="padding-top:15px;">
                <div class="card" style="border-bottom: solid 2px #d81b60;">
                    <div class="card-image">
                        <a href="/detail.html?id=${konten.val().ID.replace(/"/g,'')}"><img src="${hasil.replace(/""/g,'')}" height="200px"></a>
                    </div>
                    <div class="card-content" style="margin: -15px -10px;">
                        <a href="/detail.html?id=${konten.val().ID.replace(/"/g,'')}"><span class="card-title" style="font-size:16px; line-height: 16px;">${replacenama}</span></a>
                        <p style="font-size:13px;">Rp ${rupiah}</p>         
                    </div>
                </div>
            </div>`;
    });
    ambilData.innerHTML += tampilkan;  
}

const dataGagal = (err) => {
  console.log(err);
}


// Menampilkan kategori 
let db_kategori , dataRef_kategori;

// referensi ke database
db_kategori = firebase.database();
dataRef_kategori = db_kategori.ref('cms/setting');
// menampilkan data ke halaman browser
const DataKategori = () => {
    dataRef_kategori.on('value' , dataKategoriBerhasil , dataKategoriGagal );
}

const dataKategoriBerhasil = (data) => {
    // console.log(data);
    let tampilkan = "";
    let ambilData = document.getElementById("tampilKategori");
        data.forEach(function(konten) {
            // console.log(konten.val()); //output data 
            let a = konten.val().Tag.replace(/"/g, '');
            if(a == "category") {
                // console.log(konten.val());
                let image = konten.val().Image.replace(/\\/g, '');
                let imageJadi = image.replace(/,/g, '');
                tampilkan += `
                <div class="col s6 m3 l2" style="float:center; padding-top:15px;">
                    <div class="card" style="border-bottom: solid 2px #d81b60;">
                        <div class="card-image">
                            <a href="/category.html?category=${konten.val().Name.replace(/"/g, '').toLowerCase()}"><img src=${imageJadi.replace(/""/g,'')}" height="100px;"></a>
                        </div>
                        
                        <div class="card-content" style="margin: -15px -10px;">
                            <a href="/category.html?category=${konten.val().Name.replace(/"/g, '')}"><span class="card-title" style="font-size:12px; line-height:16px;">${konten.val().Name.replace(/"/g, '')}</span></a>       
                        </div>
                    </div>
                </div>`;
            }
    });
    ambilData.innerHTML = tampilkan;
}

const dataKategoriGagal = (err) => {
  console.log(err);
}

// kontak
const Kontak = () => {
    let kontak = document.getElementById("tampilKontak");
    let data = "";
    data = `
    <div class="col l12 s12 m12">
        <div class="card">
            <div class="card-content">
                <p><strong>Telp:</strong> 0877-2203-0654 - 0812-6031-0084</p>
                <p><strong>Tokopedia:</strong> <a href="https://www.tokopedia.com/olives-bakery">olives-bakery</a></p>
                <p><strong>Instagram:</strong> <a href="https://www.instagram.com/olives_bakery">olives_bakery</a></p>
            </div>
        </div>
    </div>
    `;
    kontak.innerHTML = data;
}

// tentang
const Tentang = () => {
    var tentang = document.getElementById("tampilTentang");
    let data = "";
    data = `
    <div class="col l12 s12 m12">
        <div class="card">
            <div class="card-content">
                <p><strong>Alamat:</strong> Jalan PH.H. Mustofa No.39, Pasirlayung, Cibeunying Kidul, Surapati core, Blok J3-J5, Pasirlayung, Kec. Cibeunying Kidul, Kota Bandung, Jawa Barat 40192</p>    
            </div>
        </div>
    </div>
    `;
    tentang.innerHTML = data;
}