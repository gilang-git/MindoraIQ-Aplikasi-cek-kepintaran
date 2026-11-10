# Dokumentasi Kolaborasi & Log Troubleshooting Proyek MindoraIQ
**Mata Kuliah:** Praktikum Pemrograman Mobile (Modul 2)  
**Aplikasi:** MindoraIQ (Aplikasi Cek Kepintaran & Kuis Kognitif)  
**Repositori GitHub:** https://github.com/gilang-git/MindoraIQ-Aplikasi-cek-kepintaran.git  

---

## 1. Pembagian Modul Tim (3 Anggota)

| Anggota | Tanggung Jawab / Fitur | File & Folder |
|---|---|---|
| **Gilang (Anggota 1)** | Setup proyek Expo, routing navigasi, context state, utilitas scoring, UI screens | `app/`, `context/`, `utils/`, `assets/`, `package.json`, `app.json`, `tsconfig.json` |
| **Teman 2 (Syahid)** | Komponen UI reusable & tema styling aplikasi | `components/`, `styles/` |
| **Teman 3** | Bank soal kognitif & interface TypeScript | `data/`, `types/` |

---

## 2. Alur Eksekusi Push Git Bertahap

### Tahap 1: Gilang (Inisialisasi & Modul Inti)
```bash
git init
git checkout -b main
git add app context utils assets package.json app.json tsconfig.json .gitignore README.md
git commit -m "feat(gilang): inisialisasi fondasi proyek, modul app, context, dan utils"
git remote add origin https://github.com/gilang-git/MindoraIQ-Aplikasi-cek-kepintaran.git
git push -u origin main --force
```

### Tahap 2: Teman 2 (Komponen & Styling)
```bash
git clone https://github.com/gilang-git/MindoraIQ-Aplikasi-cek-kepintaran.git
cd MindoraIQ-Aplikasi-cek-kepintaran
# Salin folder components dan styles ke dalam direktori proyek
git add components styles
git commit -m "feat(anggota-2): implementasi komponen UI dan tema styling"
git push origin main
```

### Tahap 3: Teman 3 (Bank Soal & Tipe Data)
```bash
git clone https://github.com/gilang-git/MindoraIQ-Aplikasi-cek-kepintaran.git
cd MindoraIQ-Aplikasi-cek-kepintaran
# Salin folder data dan types ke dalam direktori proyek
git add data types
git commit -m "feat(anggota-3): implementasi bank soal dan interface kuis"
git push origin main
```

---

## 3. Catatan Kendala Teknis & Solusi (Troubleshooting Log)

### Kendala 1: `nothing to commit, working tree clean`
- **Penyebab:** Perubahan file sudah pernah ter-commit sebelumnya di Git lokal sehingga tidak ada perubahan baru yang terdeteksi.
- **Solusi:** Melakukan unstage / reset cache Git lokal menggunakan `git rm -r --cached .` kemudian menambahkan file sesuai pembagian modul secara bertahap.

### Kendala 2: `error: src refspec main does not match any`
- **Penyebab:** Di laptop Windows, Git secara bawaan membuat branch awal bernama `master`, sedangkan remote repositori GitHub menggunakan `main`. Selain itu, direktori terminal masih berada di luar folder repo hasil clone.
- **Solusi:** Berpindah ke dalam folder hasil clone (`cd MindoraIQ-Aplikasi-cek-kepintaran`) dan memastikan commit dibuat di branch `main`.

### Kendala 3: `remote: Permission denied to syahid-project (HTTP 403 Forbidden)`
- **Penyebab:**
  1. Akun collaborator belum di-invite atau undangan belum di-accept via menu GitHub repository settings.
  2. Windows Credential Manager menyimpan sesi akun/token GitHub lama yang tidak memiliki izin write ke repositori.
- **Solusi:**
  1. Menambahkan akun sebagai collaborator di repo GitHub dan mengonfirmasi invitation link.
  2. Menghapus kredensial lama di Windows melalui perintah:
     ```powershell
     cmdkey /delete:LegacyGeneric:target=git:https://github.com
     ```
  3. Melakukan login ulang via web browser saat pop-up Git Credential Manager muncul.

### Kendala 4: `Error: Cannot find module './v3/external.cjs' (Zod / Expo start crash)`
- **Penyebab:** Folder `node_modules` disalin langsung dari macOS ke Windows. Library biner dan symlink dependency antar OS berbeda sehingga modul menjadi rusak (*corrupt*).
- **Solusi:** Menghapus `node_modules` dan melakukan instalasi ulang bersih khusus platform Windows:
  ```powershell
  Remove-Item -Recurse -Force node_modules, package-lock.json
  npm install
  npx expo start -c
  ```
