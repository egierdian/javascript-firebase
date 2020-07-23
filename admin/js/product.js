let db , dataRef;

// referensi ke database
db = firebase.database();
dataRef = db.ref('products/data');
// menampilkan data ke halaman browser

dataRef.on('value' , dataBerhasil , dataGagal);

function dataBerhasil(data){
    let tampilkan = "";
    let tampilData ="";
    let ambilData = document.getElementById("data-show");
        data.forEach(function(konten) {
            console.log(konten.val());
            let str = konten.val().Image;
            let nama = konten.val().Name;
            
            let hasil = str.replace(/\\/g, '');
            console.log(hasil);
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
            // ${hasil.replace(/""/g,'')}
            tampilData += `
            
            <tr>
                <td width="20%"><img src="${hasil.replace(/"/g,'')}" height="150px" width="150px"></td>
                <td width="20%">${replacenama}</td>
                <td>${rupiah}</td>
                <td>${konten.val().Stok.replace(/"/g,'')}</td>
                <td>
                    ${konten.val().Berat.replace(/"/g,'')} 
                    ${konten.val().Unit.replace(/"/g,'')}
                </td>
                <td width="20%">
                    <a class="waves-effect orange btn-small" href="edit.html?id=${konten.val().ID.replace(/"/g,'')}">Ubah</a>
                    <a class="waves-effect red darken-1 btn-small" onclick="hapus(${konten.val().ID.replace(/"/g,'')})">Hapus</a>
                </td>
            </tr>
            `;
    });
    tampilkan = `
    <table class="highlight">
        <thead>
        <tr>
            <th>Gambar</th>
            <th>Nama</th>
            <th>Harga</th>
            <th>Stok</th>
            <th>Berat</th>
            <th>Aksi</th>
        </tr>
        </thead>
        <tbody>
        ${tampilData}
        </tbody>
    </table>
    `;
    ambilData.innerHTML = tampilkan;  
}

function dataGagal(err){
  console.log(err);
}

function hapus(ID){
    var cek_hapus = confirm('Apakah anda yakin ingin menghapus data ?');
    if (cek_hapus) {
        // hapus data produk
        dataRef.child(ID).remove();
        // hapus data deskripsi
        db.ref('products/description').child(ID).remove();

        // var storage = firebase.storage();
        // var storageRef = storage.ref('products/'+ ID + '/');
        // storageRef.delete();
    }
}
// menampilkan data ke halaman browser
dataRef.on('child_removed' , dataDihapus , dataGagal);
function dataDihapus() {
    alert('Data berhasil dihapus !');  
}