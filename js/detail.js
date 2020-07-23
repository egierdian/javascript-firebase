
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

var db , dataRef;

// referensi ke database
db = firebase.database();
dataRef = db.ref('products');

console.log(dataRef);

// menampilkan data ke halaman browser
dataRef.on('value' , dataBerhasil , dataGagal);

function dataBerhasil(data) {
    let urlParam = new URLSearchParams(window.location.search);
    let idParam = urlParam.get("id");
    let tampilkan = "";
    let deskripsi = "";
    var ambilData = document.getElementById("body-content");
        // console.log(data.val().description[idParam]);

        // isi deskripsi 
        deskripsi = `<p>${data.val().description[idParam]}</p>`;

        data.forEach(function(data) {
            data.forEach(function(konten) {
                if(konten.val().ID !== undefined){         
                    // console.log(konten.val());
                    var c = konten.val().ID.replace(/"/g, '');
                    // console.log(c);
                    if(c == idParam){
                        let image = konten.val().Image;
                        let arrayImage = image.split(',');
                        let tampilImage = "";
                        let potong = arrayImage[0].replace(/\\/g, '');
                        let harga = konten.val().Harga.replace(/"/g, '');
                        // konversi harga ke format rupiah
                        let	number_string = harga.toString(),
                            sisa 	= number_string.length % 3,
                            rupiah 	= number_string.substr(0, sisa),
                            ribuan 	= number_string.substr(sisa).match(/\d{3}/g); 
                        if (ribuan) {
                            separator = sisa ? '.' : '';
                            rupiah += separator + ribuan.join('.');
                        }
                        var img = potong.replace(/""/g, '');
                        for(var i=0; i<arrayImage.length; i++){
                            // console.log(arrayImage[i]);
                            var imageReplace = []; 
                            imageReplace = arrayImage[i].replace(/\\/g, '');
                            // console.log(imageReplace);
                            var imageJadi = []; 
                            imageJadi = imageReplace.replace(/""/g, '');
                            tampilImage += `
                            <img class="circle responsive-img" style="margin:10px; width:250px; height:250px;"src="${imageJadi.replace(/"/g, "")}">
                            `;
                        }
                        // console.log("Image " +konten.val().Image);
                        tampilkan += `
                        <div class="row"> 
                            <div class="col l12 m12 s12 center" style="padding-top:10px;">
                                ${tampilImage}
                            </div>
                            <div class="col l12 m12 s12" style="padding-top:10px;">
                                <div class="card" >
                                    <div class="card-content">
                                        <h5 class="left">${konten.val().Name.replace(/"/g,'')}</h5>
                                        <a href="" class="btn right">Beli</a>
                                        <br><br>
                                        <table class="striped" >
                                            <tbody>
                                            <tr>
                                                <td>Deskripsi Produk</td>
                                                <td>${deskripsi.replace(/"/g,'')}</td>
                                            </tr>
                                            <tr>
                                                <td>Kategori</td>
                                                <td>${konten.val().Category.replace(/"/g,'')}</td>
                                            </tr>
                                            <tr>
                                                <td>Berat</td>
                                                <td>${konten.val().Berat.replace(/"/g,'')} ${konten.val().Unit.replace(/"/g,'')}</td>
                                            </tr>
                                            <tr>
                                                <td>Stok</td>
                                                <td>${konten.val().Stok.replace(/"/g,'')}</td>
                                            </tr>
                                            <tr>
                                                <td>Harga</td>
                                                <td>Rp ${rupiah}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                
                            </div>  
                        </div>`;
                    }
                }
        });
    });
    ambilData.innerHTML = tampilkan;  
}

function dataGagal(err) {
  console.log(err);
}