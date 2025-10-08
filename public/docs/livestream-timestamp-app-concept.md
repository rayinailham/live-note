# Konsep Aplikasi Timestamp Livestream

## Deskripsi Aplikasi
Aplikasi ini dirancang untuk membantu pembuat konten atau penonton livestream dalam mencatat momen penting selama siaran langsung. Dengan fitur timestamp otomatis, pengguna dapat menandai waktu spesifik dari livestream dan menambahkan catatan terkait, sehingga memudahkan untuk mereview atau membuat ringkasan konten nanti.

## Fitur Utama
- **Tombol Start**: Memulai penghitung waktu (timer) dari nol saat diklik.
- **Input Notes**: Kolom teks untuk menulis catatan atau deskripsi momen.
- **Tombol Add Note**: Menambahkan catatan baru dengan timestamp otomatis berdasarkan waktu yang telah berjalan sejak tombol start diklik.
- **List Notes**: Menampilkan semua catatan yang telah ditambahkan dalam urutan kronologis, berjajar ke bawah.
- **Penyimpanan Lokal**: Catatan disimpan secara otomatis di local storage browser untuk persistensi data antar sesi aplikasi.
- **Ekspor Catatan**: Opsi untuk mengekspor daftar catatan sebagai file .txt atau .md untuk penyimpanan eksternal atau berbagi.

## Alur Penggunaan
1. **Persiapan**: Buka aplikasi dan pastikan siaran livestream sedang berjalan di perangkat terpisah atau tab lain.
2. **Memulai Timer**: Klik tombol "Start" untuk memulai penghitung waktu. Timer akan mulai berjalan dari 00:00:00.
3. **Mencatat Momen**: Saat ada momen penting dalam livestream, tulis deskripsi singkat di kolom input notes.
4. **Menambahkan Catatan**: Klik tombol "Add Note" untuk menyimpan catatan tersebut. Catatan akan otomatis disertai dengan timestamp saat ini (misalnya, "00:05:23 - Deskripsi momen").
5. **Melihat Daftar Catatan**: Semua catatan akan muncul dalam daftar yang berjajar ke bawah, memungkinkan pengguna untuk melihat kronologi peristiwa selama livestream.
6. **Mengulangi Proses**: Ulangi langkah 3-4 untuk setiap momen yang ingin dicatat. Timer terus berjalan hingga aplikasi ditutup atau direset.
7. **Menyimpan atau Mengekspor**: Catatan disimpan otomatis di local storage browser. Klik tombol ekspor untuk mengunduh daftar catatan sebagai file .txt atau .md.

## Manfaat
- Memudahkan pembuatan ringkasan atau highlight dari livestream.
- Membantu dalam editing video atau podcast dengan referensi waktu yang akurat.
- Cocok untuk penggunaan pribadi atau kolaboratif dalam tim produksi konten.

## Catatan Teknis
- Timestamp dihitung berdasarkan waktu real-time sejak tombol start diklik, bukan waktu absolut sistem.
- Data catatan disimpan secara otomatis di local storage browser untuk persistensi antar sesi, memungkinkan pengguna melanjutkan pekerjaan tanpa kehilangan data.
- Aplikasi dapat diintegrasikan dengan platform livestream seperti YouTube Live, Twitch, atau lainnya untuk pengalaman yang lebih seamless.

## Phase Pengembangan
Berikut adalah rencana pengembangan aplikasi secara terstruktur dalam beberapa phase untuk memastikan implementasi yang efisien dan dapat diuji secara bertahap.

### [x] Phase 1: Setup Proyek dan UI Dasar
- **Deskripsi**: Siapkan struktur proyek Next.js, buat layout halaman utama dengan komponen dasar: tombol Start, input untuk notes, tombol Add Note, dan area kosong untuk list notes. Pastikan styling menggunakan Tailwind CSS sesuai dengan pola proyek.
- **Tujuan**: Memiliki fondasi UI yang siap untuk interaksi dasar.

### [x] Phase 2: Timer dan Add Notes
- **Deskripsi**: Implementasi state untuk timer (mulai dari 00:00:00 saat tombol Start diklik), fungsi untuk menambahkan note dengan timestamp otomatis berdasarkan waktu berjalan, dan tampilkan list notes dalam format "timestamp - teks note" yang berjajar ke bawah.
- **Tujuan**: Fungsionalitas inti aplikasi (timer dan pencatatan) berjalan.

### [x] Phase 3: Local Storage Integration
- **Deskripsi**: Tambahkan penyimpanan otomatis catatan di local storage browser. Gunakan `useEffect` untuk memuat data saat aplikasi dimuat dan menyimpan perubahan saat note ditambahkan, memastikan persistensi antar sesi.
- **Tujuan**: Data tidak hilang saat browser ditutup atau aplikasi direfresh.

### [x] Phase 4: Fitur Ekspor
- **Deskripsi**: Tambahkan tombol ekspor yang memungkinkan pengguna mengunduh daftar catatan sebagai file .txt atau .md. Format file: daftar notes dengan timestamp dan teks, menggunakan API Blob dan link download.
- **Tujuan**: Pengguna dapat menyimpan atau berbagi catatan secara eksternal.

### [x] Phase 5: Testing dan Polish
- **Deskripsi**: Lakukan testing menyeluruh untuk semua fitur, handle edge cases (misalnya reset timer, clear semua notes, atau input kosong), dan perbaiki UI/UX (responsivitas, error handling, animasi sederhana). Jalankan build dan test di browser.
- **Tujuan**: Aplikasi stabil, user-friendly, dan siap produksi.