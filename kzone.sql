CREATE DATABASE postgres;
USE DATABASE postgres;
CREATE TABLE akun(
    id INT auto-increment PRIMARY KEY,
    nama VARCHAR(150),
    email VARCHAR(150),
    password VARCHAR(150)
);
CREATE TABLE anggota(
    id int auto-increment PRIMARY KEY,
    nama VARCHAR(150),
    agensi VARCHAR(150),
    gambar text
);CREATE TABLE barang(
    id int auto-increment PRIMARY KEY,
    nama VARCHAR(150),
    band VARCHAR(150),
    gambar text,
    harga VARCHAR(150),
    kategori VARCHAR(150)
);CREATE TABLE musik(
    id INT auto-increment PRIMARY KEY,
    artis VARCHAR(150),
    gambar VARCHAR(150),
    judul VARCHAR(150),
    musik VARCHAR(150),
    kode INT,
    CONSTRAINT kodetamu FOREIGN KEY (id) REFERENCES anggota (id)
);