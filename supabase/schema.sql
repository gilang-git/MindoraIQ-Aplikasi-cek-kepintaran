-- Jalankan skrip ini di Dashboard Supabase Anda > SQL Editor > New query > Run.
-- Skema ini mendukung fitur Modul 4: Database Cloud & Autentikasi pada MindoraIQ.

-- 1. Buat tabel riwayat hasil kuis
create table if not exists quiz_results (
  id text primary key,
  user_id uuid references auth.users not null default auth.uid(),
  category text not null,
  total_questions integer not null,
  correct_answers integer not null,
  percentage integer not null,
  result_date text not null,
  user_name text,
  evaluation text,
  created_at timestamptz default timezone('utc'::text, now()) not null
);

-- 2. Aktifkan Row Level Security (RLS)
alter table quiz_results enable row level security;

-- 3. Kebijakan akses data khusus per pengguna (berdasarkan auth.uid())
create policy "Users can view their own quiz results"
on quiz_results for select using (auth.uid() = user_id);

create policy "Users can insert their own quiz results"
on quiz_results for insert with check (auth.uid() = user_id);

create policy "Users can update their own quiz results"
on quiz_results for update using (auth.uid() = user_id);

create policy "Users can delete their own quiz results"
on quiz_results for delete using (auth.uid() = user_id);
