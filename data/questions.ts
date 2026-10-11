import { Question, CategoryItem } from '../types/quiz';

export const CATEGORIES: CategoryItem[] = [
  {
    id: 'logika',
    name: 'Logika',
    description: 'Uji kemampuan deduksi, silogisme, dan analisis premis berpikir.',
    icon: 'bulb-outline',
    questionCount: 5,
    accentColor: '#3B82F6',
  },
  {
    id: 'pola-angka',
    name: 'Pola Angka',
    description: 'Analisis deret bilangan, ritme aritmatika, dan pola matematika.',
    icon: 'calculator-outline',
    questionCount: 5,
    accentColor: '#10B981',
  },
  {
    id: 'penalaran-verbal',
    name: 'Penalaran Verbal',
    description: 'Ketahui daya nalar analogi kata, hubungan semantik, dan bahasa.',
    icon: 'chatbubbles-outline',
    questionCount: 5,
    accentColor: '#8B5CF6',
  },
  {
    id: 'pola-gambar',
    name: 'Pola Gambar',
    description: 'Uji persepsi spasial, rotasi bangun, dan kesinambungan bentuk visual.',
    icon: 'shapes-outline',
    questionCount: 5,
    accentColor: '#F59E0B',
  },
];

export const QUESTIONS_DATA: Question[] = [
  {
    id: 1,
    category: 'logika',
    question: 'Semua mamalia menyusui anaknya. Paus adalah mamalia. Kesimpulan yang paling tepat adalah:',
    options: [
      'Paus hidup di air tawar',
      'Paus menyusui anaknya',
      'Sebagian paus bukan mamalia',
      'Paus berkembang biak dengan bertelur'
    ],
    correctAnswer: 1,
    explanation: 'Karena semua mamalia menyusui dan paus adalah mamalia, maka paus pasti menyusui anaknya.'
  },
  {
    id: 2,
    category: 'logika',
    question: 'Jika hari hujan, maka lapangan basah. Saat ini lapangan tidak basah. Kesimpulan logisnya adalah:',
    options: [
      'Hari ini hujan deras',
      'Hari ini tidak hujan',
      'Lapangan sedang dikeringkan',
      'Mendung sepanjang hari'
    ],
    correctAnswer: 1,
    explanation: 'Modus tollens: P -> Q, ~Q maka kesimpulannya ~P (Hari ini tidak hujan).'
  },
  {
    id: 3,
    category: 'logika',
    question: 'Andi lebih tua dari Budi. Budi lebih tua dari Citra. Dani lebih tua dari Andi. Siapakah yang usianya paling muda?',
    options: [
      'Andi',
      'Budi',
      'Citra',
      'Dani'
    ],
    correctAnswer: 2,
    explanation: 'Urutan dari tertua ke termuda: Dani > Andi > Budi > Citra. Maka yang termuda adalah Citra.'
  },
  {
    id: 4,
    category: 'logika',
    question: 'Semua mahasiswa yang rajin belajar lulus ujian tepat waktu. Sebagian mahasiswa tidak lulus ujian tepat waktu. Maka:',
    options: [
      'Semua mahasiswa tidak rajin belajar',
      'Sebagian mahasiswa tidak rajin belajar',
      'Ujiannya terlalu sulit untuk mahasiswa',
      'Mahasiswa yang tidak lulus bukan mahasiswa aktif'
    ],
    correctAnswer: 1,
    explanation: 'Karena semua yang rajin pasti lulus tepat waktu, mahasiswa yang tidak lulus tepat waktu dipastikan tidak rajin belajar.'
  },
  {
    id: 5,
    category: 'logika',
    question: 'Di sebuah kantor, hanya staf berkartu identitas yang boleh masuk ruang server. Rian berada di dalam ruang server. Maka:',
    options: [
      'Rian adalah seorang teknisi',
      'Rian pasti memiliki kartu identitas staf',
      'Rian masuk tanpa izin',
      'Semua staf pasti berada di ruang server'
    ],
    correctAnswer: 1,
    explanation: 'Karena syarat masuk ruang server harus berkartu identitas, keberadaan Rian di sana memastikan ia memiliki kartu identitas staf.'
  },

  {
    id: 6,
    category: 'pola-angka',
    question: 'Berapakah angka berikutnya pada deret: 3, 6, 12, 24, 48, ...?',
    options: [
      '72',
      '84',
      '96',
      '108'
    ],
    correctAnswer: 2,
    explanation: 'Setiap angka dikalikan 2 (rasio geometri = 2). 48 * 2 = 96.'
  },
  {
    id: 7,
    category: 'pola-angka',
    question: 'Tentukan kelanjutan dari deret bilangan: 2, 5, 10, 17, 26, ...?',
    options: [
      '35',
      '37',
      '39',
      '41'
    ],
    correctAnswer: 1,
    explanation: 'Pola selisih: +3, +5, +7, +9, selisih berikutnya +11. 26 + 11 = 37 (atau n^2 + 1).'
  },
  {
    id: 8,
    category: 'pola-angka',
    question: 'Berapakah angka yang hilang: 5, 8, 13, 21, 34, ...?',
    options: [
      '47',
      '55',
      '58',
      '62'
    ],
    correctAnswer: 1,
    explanation: 'Deret Fibonacci: setiap suku adalah penjumlahan 2 suku sebelumnya. 21 + 34 = 55.'
  },
  {
    id: 9,
    category: 'pola-angka',
    question: 'Perhatikan pola selang-seling: 4, 12, 8, 24, 16, 48, ... Berapakah angka selanjutnya?',
    options: [
      '24',
      '32',
      '64',
      '96'
    ],
    correctAnswer: 1,
    explanation: 'Pola operasi bergantian: dikali 3, lalu dibagi 1.5 (atau deret ganjil 4, 8, 16, 32). Suku ke-7 adalah 16 * 2 = 32.'
  },
  {
    id: 10,
    category: 'pola-angka',
    question: 'Lengkapi deret penurunan berikut: 100, 95, 85, 70, 50, ...?',
    options: [
      '25',
      '30',
      '35',
      '20'
    ],
    correctAnswer: 0,
    explanation: 'Pola selisih bertingkat: -5, -10, -15, -20, maka langkah selanjutnya -25. 50 - 25 = 25.'
  },

  {
    id: 11,
    category: 'penalaran-verbal',
    question: 'MOBIL : BENSIN = MANUSIA : ...?',
    options: [
      'Air',
      'Makanan',
      'Oksigen',
      'Rumah'
    ],
    correctAnswer: 1,
    explanation: 'Mobil membutuhkan bensin sebagai sumber energi utama untuk beroperasi, sebagaimana manusia membutuhkan makanan sebagai energi.'
  },
  {
    id: 12,
    category: 'penalaran-verbal',
    question: 'Lawan kata (antonim) dari kata "ANTIPATI" adalah:',
    options: [
      'Apatis',
      'Simpati',
      'Kritik',
      'Curiga'
    ],
    correctAnswer: 1,
    explanation: 'Antipati berarti rasa tidak suka atau penolakan, sedangkan lawannya adalah simpati (rasa tertarik/kasih).'
  },
  {
    id: 13,
    category: 'penalaran-verbal',
    question: 'DOKTER : PASIEN = GURU : ...?',
    options: [
      'Sekolah',
      'Buku',
      'Murid',
      'Kelas'
    ],
    correctAnswer: 2,
    explanation: 'Dokter melayani dan membimbing pasien, sedangkan guru membimbing murid.'
  },
  {
    id: 14,
    category: 'penalaran-verbal',
    question: 'Manakah kata yang TIDAK termasuk dalam kelompok yang sama?',
    options: [
      'Gitar',
      'Biola',
      'Piano',
      'Harmonika'
    ],
    correctAnswer: 3,
    explanation: 'Gitar, biola, dan piano menghasilkan nada dari dawai/senar (string), sedangkan harmonika menggunakan tiupan lidah getar (aerofon).'
  },
  {
    id: 15,
    category: 'penalaran-verbal',
    question: 'HAUS : AIR = LAPAR : ...?',
    options: [
      'Nasi',
      'Dapur',
      'Kenyang',
      'Piring'
    ],
    correctAnswer: 0,
    explanation: 'Rasa haus dihilangkan dengan air, rasa lapar dihilangkan dengan nasi (makanan pokok).'
  },

  {
    id: 16,
    category: 'pola-gambar',
    question: 'Perhatikan rotasi arah panah 90 derajat searah jarum jam berikut:\n[ ⬆️ ] ➔ [ ➡️ ] ➔ [ ⬇️ ] ➔ [ ? ]\nSimbol apakah yang tepat mengisi tanda tanya?',
    options: [
      '⬅️ (Panah Kiri)',
      '⬆️ (Panah Atas)',
      '↗️ (Panah Serong)',
      '🔄 (Putar Balik)'
    ],
    correctAnswer: 0,
    explanation: 'Rotasi berputar 90 derajat searah jarum jam: Atas -> Kanan -> Bawah -> Kiri (⬅️).'
  },
  {
    id: 17,
    category: 'pola-gambar',
    question: 'Perhatikan deret jumlah elemen geometri berikut:\n[ ▲ ] ➔ [ ▲ ▲ ] ➔ [ ▲ ▲ ▲ ] ➔ [ ? ]\nBerapakah jumlah elemen pada langkah berikutnya?',
    options: [
      '▲ ▲ (Dua segitiga)',
      '▲ ▲ ▲ ▲ (Empat segitiga)',
      '▲ ▲ ▲ ▲ ▲ (Lima segitiga)',
      '■ ■ ■ ■ (Empat persegi)'
    ],
    correctAnswer: 1,
    explanation: 'Setiap langkah bertambah satu segitiga: 1 -> 2 -> 3 -> 4 buah segitiga.'
  },
  {
    id: 18,
    category: 'pola-gambar',
    question: 'Perhatikan hubungan matriks bangun 2x2 berikut:\n[ ⬛  🔷 ]\n[ ⬜   ?  ]\nJika kotak hitam berubah menjadi putih, maka belah ketupat biru padat (🔷) berubah menjadi:',
    options: [
      '🔶 (Warna oranye padat)',
      '💠 (Berlian bergaris luar)',
      '🔷 (Tetap biru padat)',
      '🔺 (Segitiga merah)'
    ],
    correctAnswer: 1,
    explanation: 'Aturan transformasi: bentuk terisi solid berubah menjadi bentuk bergaris/hampa (outline/diamond hampa).'
  },
  {
    id: 19,
    category: 'pola-gambar',
    question: 'Perhatikan urutan fase arsiran lingkaran:\n[ ⚪ ] ➔ [ 🌓 ] ➔ [ ⚫ ] ➔ [ ? ]\nSetelah lingkaran penuh hitam, siklus logis berikutnya adalah:',
    options: [
      '⚪ (Kembali ke lingkaran putih kosong)',
      '⚫ ⚫ (Dua lingkaran hitam)',
      '⬛ (Persegi hitam)',
      '🌗 (Separuh kanan hitam)'
    ],
    correctAnswer: 0,
    explanation: 'Siklus pengisian: kosong (0%) -> separuh (50%) -> penuh (100%) -> reset ke siklus awal (⚪ 0%).'
  },
  {
    id: 20,
    category: 'pola-gambar',
    question: 'Perhatikan deret bangun datar berdasarkan jumlah sudutnya:\nSegitiga (3 sudut) ➔ Persegi (4 sudut) ➔ Segilima (5 sudut) ➔ [ ? ]\nBangun apakah yang memiliki 6 sudut berikutnya?',
    options: [
      'Segitujuh (Heptagon)',
      'Segienam (Heksagon)',
      'Lingkaran',
      'Trapesium'
    ],
    correctAnswer: 1,
    explanation: 'Pola penambahan 1 sisi dan sudut: 3 -> 4 -> 5 -> 6 sudut, yaitu Segienam (Heksagon).'
  },
];
