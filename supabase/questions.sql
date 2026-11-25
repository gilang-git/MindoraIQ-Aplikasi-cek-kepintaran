-- Jalankan di Dashboard Supabase > SQL Editor > New query > Run.
-- Bank soal MindoraIQ (20 soal, 4 kategori x 5 soal). Skrip ini aman dijalankan ulang.

create table if not exists categories (
  id text primary key,
  name text not null,
  description text not null,
  icon text not null,
  accent_color text not null,
  sort_order integer not null default 0
);

create table if not exists questions (
  id integer primary key,
  category text not null references categories(id) on delete cascade,
  question text not null,
  options jsonb not null,
  correct_answer integer not null check (correct_answer between 0 and 3),
  explanation text
);

-- RLS: bank soal bersifat baca-saja untuk pengguna yang sudah login (tanpa kebijakan tulis).
alter table categories enable row level security;
alter table questions enable row level security;

drop policy if exists "Authenticated users can read categories" on categories;
create policy "Authenticated users can read categories"
on categories for select to authenticated using (true);

drop policy if exists "Authenticated users can read questions" on questions;
create policy "Authenticated users can read questions"
on questions for select to authenticated using (true);

-- Seed data (dikosongkan dulu agar tidak duplikat saat dijalankan ulang)
delete from questions;
delete from categories;

insert into categories (id, name, description, icon, accent_color, sort_order) values
('logika', 'Logika', 'Uji kemampuan deduksi, silogisme, dan analisis premis berpikir.', 'bulb-outline', '#3B82F6', 1),
('pola-angka', 'Pola Angka', 'Analisis deret bilangan, ritme aritmatika, dan pola matematika.', 'calculator-outline', '#10B981', 2),
('penalaran-verbal', 'Penalaran Verbal', 'Ketahui daya nalar analogi kata, hubungan semantik, dan bahasa.', 'chatbubbles-outline', '#8B5CF6', 3),
('pola-gambar', 'Pola Gambar', 'Uji persepsi spasial, rotasi bangun, dan kesinambungan bentuk visual.', 'shapes-outline', '#F59E0B', 4);

insert into questions (id, category, question, options, correct_answer, explanation) values
(1, 'logika', 'Semua burung memiliki sayap. Merpati adalah burung. Kesimpulan yang paling tepat adalah:',
 '["Merpati tidak bisa terbang","Merpati memiliki sayap","Semua yang bersayap adalah merpati","Sebagian burung tidak bersayap"]', 1,
 'Karena semua burung bersayap dan merpati adalah burung, maka merpati pasti memiliki sayap.'),
(2, 'logika', 'Jika server mati, maka situs tidak dapat dibuka. Saat ini situs dapat dibuka. Kesimpulan logisnya adalah:',
 '["Server sedang mati","Server tidak mati","Situs sedang diperbaiki","Koneksi pengguna lambat"]', 1,
 'Modus tollens: P -> Q, ~Q maka ~P. Situs dapat dibuka (~Q), sehingga server tidak mati (~P).'),
(3, 'logika', 'Rina lebih tinggi dari Sari. Sari lebih tinggi dari Tia. Umar lebih pendek dari Tia. Siapakah yang paling tinggi?',
 '["Rina","Sari","Tia","Umar"]', 0,
 'Urutan dari tertinggi: Rina > Sari > Tia > Umar. Jadi yang tertinggi adalah Rina.'),
(4, 'logika', 'Semua anggota tim lulus tes seleksi. Dito tidak lulus tes seleksi. Maka:',
 '["Dito anggota tim yang gagal","Dito bukan anggota tim","Semua orang lulus tes seleksi","Tidak ada anggota tim yang lulus"]', 1,
 'Jika semua anggota tim pasti lulus, orang yang tidak lulus dipastikan bukan anggota tim.'),
(5, 'logika', 'Tiga kotak berwarna disusun dalam satu baris. Kotak merah berada di kiri kotak biru. Kotak hijau berada di kanan kotak biru. Kotak manakah yang berada di tengah?',
 '["Merah","Biru","Hijau","Tidak dapat ditentukan"]', 1,
 'Urutan dari kiri ke kanan: Merah, Biru, Hijau. Kotak biru berada di tengah.'),

(6, 'pola-angka', 'Berapakah angka berikutnya pada deret: 2, 4, 8, 16, 32, ...?',
 '["48","56","64","72"]', 2,
 'Setiap angka dikalikan 2. 32 x 2 = 64.'),
(7, 'pola-angka', 'Tentukan kelanjutan deret bilangan: 1, 4, 9, 16, 25, ...?',
 '["30","34","36","49"]', 2,
 'Deret bilangan kuadrat: 1^2, 2^2, 3^2, 4^2, 5^2, maka berikutnya 6^2 = 36.'),
(8, 'pola-angka', 'Berapakah angka berikutnya: 3, 7, 11, 15, 19, ...?',
 '["21","22","23","25"]', 2,
 'Setiap suku bertambah 4 (beda aritmatika = 4). 19 + 4 = 23.'),
(9, 'pola-angka', 'Lengkapi deret berikut: 1, 1, 2, 3, 5, 8, ...?',
 '["11","12","13","15"]', 2,
 'Deret Fibonacci: setiap suku adalah jumlah dua suku sebelumnya. 5 + 8 = 13.'),
(10, 'pola-angka', 'Berapakah angka berikutnya: 200, 100, 50, 25, ...?',
 '["10","12.5","15","20"]', 1,
 'Setiap angka dibagi 2. 25 / 2 = 12.5.'),

(11, 'penalaran-verbal', 'PILOT : PESAWAT = SOPIR : ...?',
 '["Jalan","Bus","Bensin","Terminal"]', 1,
 'Pilot mengemudikan pesawat, sedangkan sopir mengemudikan bus.'),
(12, 'penalaran-verbal', 'Persamaan kata (sinonim) dari kata "EFISIEN" adalah:',
 '["Boros","Berdaya guna","Rumit","Lambat"]', 1,
 'Efisien berarti tepat dan berdaya guna tanpa membuang waktu atau tenaga.'),
(13, 'penalaran-verbal', 'Lawan kata (antonim) dari kata "TRANSPARAN" adalah:',
 '["Jernih","Tembus pandang","Buram","Terang"]', 2,
 'Transparan berarti tembus pandang, lawannya adalah buram (tidak tembus pandang).'),
(14, 'penalaran-verbal', 'Manakah kata yang TIDAK termasuk dalam kelompok yang sama?',
 '["Apel","Jeruk","Wortel","Mangga"]', 2,
 'Apel, jeruk, dan mangga adalah buah, sedangkan wortel adalah sayuran umbi.'),
(15, 'penalaran-verbal', 'PENA : MENULIS = PISAU : ...?',
 '["Dapur","Memotong","Tajam","Makan"]', 1,
 'Pena berfungsi untuk menulis, pisau berfungsi untuk memotong.'),

(16, 'pola-gambar', E'Perhatikan rotasi 90 derajat berlawanan arah jarum jam berikut:\n[ ⬆️ ] ➔ [ ⬅️ ] ➔ [ ⬇️ ] ➔ [ ? ]\nSimbol apakah yang tepat mengisi tanda tanya?',
 '["➡️ (Panah Kanan)","⬆️ (Panah Atas)","⬅️ (Panah Kiri)","↙️ (Panah Serong)"]', 0,
 'Rotasi berlawanan jarum jam: Atas -> Kiri -> Bawah -> Kanan (➡️).'),
(17, 'pola-gambar', E'Perhatikan pola warna berikut:\n[ 🔴 ] ➔ [ 🔵 ] ➔ [ 🔴 ] ➔ [ 🔵 ] ➔ [ 🔴 ] ➔ [ ? ]\nWarna apakah yang melanjutkan pola?',
 '["🔴 (Merah)","🔵 (Biru)","🟢 (Hijau)","🟡 (Kuning)"]', 1,
 'Pola berselang-seling merah dan biru, sehingga setelah merah adalah biru.'),
(18, 'pola-gambar', E'Perhatikan deret bangun datar berdasarkan jumlah sisinya:\nPersegi (4 sisi) ➔ Segienam (6 sisi) ➔ Segidelapan (8 sisi) ➔ [ ? ]\nBangun apakah yang berikutnya?',
 '["Segisembilan (9 sisi)","Segisepuluh (10 sisi)","Segilima (5 sisi)","Segitiga (3 sisi)"]', 1,
 'Jumlah sisi bertambah 2 setiap langkah: 4 -> 6 -> 8 -> 10 (Segisepuluh).'),
(19, 'pola-gambar', E'Perhatikan jumlah bintang berikut:\n[ ⭐ ] ➔ [ ⭐⭐ ] ➔ [ ⭐⭐⭐⭐ ] ➔ [ ? ]\nBerapakah jumlah bintang pada langkah berikutnya?',
 '["5 bintang","6 bintang","8 bintang","10 bintang"]', 2,
 'Jumlah bintang berlipat dua setiap langkah: 1 -> 2 -> 4 -> 8.'),
(20, 'pola-gambar', E'Perhatikan hubungan pencerminan vertikal berikut:\n[ ◀️ ] ➔ [ ▶️ ]  dan  [ 🔼 ] ➔ [ ? ]\nSimbol apakah yang tepat mengisi tanda tanya?',
 '["🔼","🔽","◀️","▶️"]', 1,
 'Pencerminan membalik arah panah: kiri menjadi kanan, maka atas menjadi bawah (🔽).');
