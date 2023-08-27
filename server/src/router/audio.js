import express from "express";
import { client } from "../db.js";


const audios=[
    {
        id:1,
        artis:"BLACKPINK",
        img:"https://f.ptcdn.info/426/073/000/qstxelndozicl1M6z4a-o.jpg",
        title:"BLACKPINK-Don-t_Know_What_to_do",
        musik:"../BLACKPINK_-__Don_t_Know_What_To_Do__DANCE_PRACTICE_VIDEO_(MOVING_VER.).mp3",
        kode:1
    },
    {
        id:2,
        artis:"BLACKPINK",      
        img: "https://www.youngontop.com/wp-content/uploads/2023/03/Blackpink-2023-members-01-9d67ffe25a474456b4be77adedb057b0.jpg",
        title:"BLACKPINK-Rose_Fix_You",
        musik:"../BLACKPINK_Rosé_Fix_You_Cover_Lyrics(128k).mp3",
        kode:1
    },
    {
        id:3,
        artis:"BLACKPINK",
        img:"http://res.heraldm.com/content/image/2022/11/25/20221125000501_0.jpg",
        title:"BLACKPINK-Forever_Young",
        musik:"../BLACKPINK - Forever Young DANCE PRACTICE VIDEO (MOVING VER.).mp3",
        kode:1
    },
    {
        id:4,
        artis:"BLACKPINK",
        img:"https://oreosandpeanutbuttercom.files.wordpress.com/2021/01/everglow-group-dun-dun-profile-image.jpeg?w=1024",
        title:"BLACPINK-So_Hot",
        musik:"../BLACKPINK SO HOT (THEBLACKLABEL Remix).mp3",
        kode:1
    },
    {
        id:5,
        artis:"BLACKPINK",
        img:"https://s3.cosmopolitan.co.id/yuk-dengar-10-lagu-grup-seventeen-yang-siap-bikin-kamu-bersemangat_64_20211026175136fcSKoY.jpg",
       title:"BLACKPINK-Rose&Lisa-LOVE",
        musik:"../BLACKPINK_(Rosé_&_Lisa)_-_LOVE_(Nat_King_Cole_cover)_Lyrics(128k).mp3",
        kode:1
    },
    
]

const audioRoute = express.Router();

  // tampilkan semua
  audioRoute.get("/",async (_req,res)=>{
    const mus = await client.query("SELECT * FROM musik");
    res.json(mus.rows);
})
// tampilkan semua
audioRoute.get("/:id",async (req,res)=>{
  const mus = await client.query(`SELECT musik, judul FROM musik WHERE kode IN (SELECT id FROM anggota WHERE id=${req.params.id})`);
  res.json(mus.rows);
})
// post semua
audioRoute.post("/all", async (_req, res) => {
    for await (const aud of audios) {
    await client.query(
        `INSERT INTO musik (artis, gambar,judul,musik,kode) VALUES ('${aud.artis}','${aud.img}', '${aud.title}','${aud.musik}','${aud.kode}')`
      );
    }
    res.send("Semua musik berhasil disimpan.");
  });
// tampilkan satu berdasarkan kode
audioRoute.get("/:kode", async (req, res) => {
    const mus = await client.query(`SELECT * FROM musik WHERE kode =${req.params.kode}`)
    res.json(mus.rows);
  });

//  // //   tambah
audioRoute.post("/", async (req,res)=>{
  try {
      await client.query(
        `INSERT INTO musik (artis, gambar,judul,musik,kode) VALUES ('${req.body.artis}','${req.body.img}', '${req.body.title}','${req.body.musik}','${req.body.kode}')`
);
      res.send("Musik berhasil disimpan.");
    } catch (error) {
      res.status(500);
      res.send(error);
    }
  });

// // edit
audioRoute.put("/:id", async (req, res) => {
  try {
   await client.query(
      `UPDATE musik SET artis = '${req.body.artis}', gambar = '${req.body.img}', judul = '${req.body.title}', musik = '${req.body.musik}' , kode='${req.body.kode}' WHERE id = '${req.params.id}'`
    );
    res.send("Musik berhasil diedit.");
  } catch (error) {
    res.status(500);
    res.send(error);
  }
});

// // hapus berdasarkan ID
audioRoute.delete("/:id", async (req, res) => {
  try {
    await client.query(`DELETE FROM musik WHERE id = '${req.params.id}'`);
    res.send("Musik berhasil dihapus.");
  } catch (error) {
    res.status(500);
    res.send(error);
  }
});

// // hapus
audioRoute.delete("/", async (req, res) => {
    try {
       await client.query("DELETE FROM musik");
      res.send("Musik berhasil dihapus.");
    } catch (error) {
      res.status(500);
      res.send(error);
    }
  });

// tanpa db
// audioRoute.get("/",(_req,res)=>{
//     res.json(audios);
// })
// audioRoute.get("/:id", (req,res)=> {
//     const gr = audios.find((p)=> p.id == req.params.id);
//     if (gr){
//         res.json(gr);
//     }else{
//         res.status(404);
//         res.send("Musik Tidak Ditemukan atau belum ditambahkan");
//     }
    
// })

export default audioRoute;