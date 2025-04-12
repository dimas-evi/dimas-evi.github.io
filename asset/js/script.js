// Tangkap elemen HTML yang dibutuhkan
const audio = document.getElementById('audio');
const playPauseBTN = document.getElementById('playPauseBTN');
let count = 0;

// Fungsi play/pause audio
function playPause() {
    if (count === 0) {
        count = 1;
        audio.pause();
    } else {
        count = 0;
        audio.play();
    }
}

// Fungsi stop audio
function stop() {
    playPause();
    audio.pause();
    audio.currentTime = 0;
}

function nama() {
    const mempelai = document.querySelectorAll('.nama-mempelai');
    mempelai.forEach(mempelai => {
        mempelai.textContent='Dimas & Evi';
    });

    const laki = document.querySelectorAll('.nama-laki');
    laki.forEach(laki => {
        laki.textContent='An. Dimas Wahyu Praharjo';
    });
    
    document.getElementById('nama-perempuan').textContent='Evi Nur Cahyaning Wahyuni';
    document.getElementById('nama-ortu-pr').textContent='Bapak Moh. Nur Cahyo Wahyudi & Ibu Tiyut (Sutiyem)';
    document.getElementById('nama-laki').textContent='Dimas Wahyu Praharjo';
    document.getElementById('nama-ortu-lk').textContent='Bapak Suharto & Ibu Solatinah';

}

function countdown() {
    const eventDate = new Date('2025-04-26T00:00:00'); // Set your event date here
    const now = new Date();
    const timeDifference = eventDate - now;

    // Fungsi untuk mendapatkan teks tanggal dengan format tertentu
    function getFormattedDate(date) {
        const hari = date.toLocaleDateString('id-ID', { weekday: 'long' });
        const tanggal = date.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });
        return `${hari}, ${tanggal}`;
    }

    // Tanggal utama (hari acara)
    const ids = ['tanggal', 'tanggal-detail', 'tanggal-resepsi'];
    const formattedEventDate = getFormattedDate(eventDate);
    ids.forEach(id => {
        document.getElementById(id).textContent = formattedEventDate;
    });

    // Tampilkan tanggal 1 hari sebelumnya
    const dayBefore = new Date(eventDate);
    dayBefore.setDate(dayBefore.getDate() - 7);
    document.getElementById('tanggal-akad').textContent = getFormattedDate(dayBefore);

    // Perhitungan countdown
    if (timeDifference > 0) {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        // Update nilai ke dalam elemen HTML
        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = seconds;
    } else {
        document.getElementById('tanggal').textContent = 'Acara Telah Dimulai';
    }
}

// Fungsi update penerima
function updateRecipient() {
    const urlParams = new URLSearchParams(window.location.search);
    const recipient = urlParams.get('to');
    const recipientElement = document.getElementById('recipient');

    if (recipient) {
        recipientElement.textContent = recipient;
    }
}

function salinRekening(button) {
    // Mendapatkan elemen nomor rekening terkait tombol
    const rekeningElement = button.previousElementSibling; // Elemen sebelumnya adalah nomor rekening
    const rekeningText = rekeningElement.textContent; // Mengambil teks nomor rekening

    // Membuat elemen textarea sementara
    const textarea = document.createElement("textarea");
    textarea.value = rekeningText; // Menyimpan nomor rekening ke textarea
    document.body.appendChild(textarea);

    // Menyalin teks ke clipboard
    textarea.select();
    document.execCommand("copy");

    // Menghapus textarea setelah menyalin
    document.body.removeChild(textarea);

    // Memberikan notifikasi
    alert("Nomor rekening berhasil disalin: " + rekeningText);
}

// Smooth Scroll dan Highlight Navigasi
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault(); // Mencegah perilaku default klik
        const targetID = this.getAttribute('href'); // Ambil ID target
        const targetSection = document.querySelector(targetID); // Temukan elemen target

        // Gulir halus ke elemen target
        targetSection.scrollIntoView({
            behavior: 'smooth', // Gulir halus
            block: 'start' // Posisikan elemen di bagian atas
        });

        // Tambahkan kelas aktif ke tautan yang diklik
        document.querySelectorAll('.nav-link').forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');
    });
});

// Event pada saat DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    updateRecipient();
    nama();
    countdown();
    setInterval(countdown, 1000);
    stop();
    salinRekening();
});