CREATE DATABASE kzone;
USE kzone;
CREATE TABLE akun(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(150),
    email VARCHAR(150),
    PASSWORD VARCHAR(150)
);
CREATE TABLE anggota(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(150),
    agensi VARCHAR(150),
    gambar TEXT
);CREATE TABLE barang(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(150),
    band VARCHAR(150),
    gambar TEXT,
    harga VARCHAR(150),
    kategori VARCHAR(150)
);CREATE TABLE musik(
    id INT AUTO_INCREMENT PRIMARY KEY,
    artis VARCHAR(150),
    gambar VARCHAR(150),
    judul VARCHAR(150),
    musik VARCHAR(150),
    kode INT,
    CONSTRAINT kodetamu FOREIGN KEY (kode) REFERENCES anggota (id)
);