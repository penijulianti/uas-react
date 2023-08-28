import express from "express";
import { client } from "../db.js";


const audios=[
    {
        id:1,
        artis:"BLACKPINK",
        title:"BLACKPINK-Don-t_Know_What_to_do",
        musik:"../BLACKPINK_-__Don_t_Know_What_To_Do__DANCE_PRACTICE_VIDEO_(MOVING_VER.).mp3",
        kode:29
    },
    {
        id:2,
        artis:"BLACKPINK",      
        title:"BLACKPINK-Rose_Fix_You",
        musik:"../BLACKPINK_Rosé_Fix_You_Cover_Lyrics(128k).mp3",
        kode:29
    },
    {
        id:3,
        artis:"EXO",
        title:"EXO Chanyeol All of Me",
        musik:"../EXO_Chanyeol_-_All_of_Me_-_www.Okelagu.com.mp3",
        kode:34
    },
    {
        id:4,
        artis:"BLACKPINK",
        title:"BLACPINK-So_Hot",
        musik:"../BLACKPINK SO HOT (THEBLACKLABEL Remix).mp3",
        kode:29
    },
    {
        id:5,
        artis:"BLACKPINK",
       title:"BLACKPINK-Rose&Lisa-LOVE",
        musik:"../BLACKPINK_(Rosé_&_Lisa)_-_LOVE_(Nat_King_Cole_cover)_Lyrics(128k).mp3",
        kode:29
    },
    {
        id:6,
        artis:"EXO",
        title:"EXO Promise",
        musik:"../EXO_-_약속_(Promise)_(EXO_2014).mp3",
        kode:34
    }
]

const audioRoute = express.Router();

  // tampilkan semua
  audioRoute.get("/",async (_req,res)=>{
    const mus = await client.query("SELECT * FROM musik");
    res.json(mus.rows);
})
// tampilkan berdasarkan kode
audioRoute.get("/:id",async (req,res)=>{
  const mus = await client.query(`SELECT musik, judul FROM musik WHERE kode IN (SELECT id FROM anggota WHERE id=${req.params.id})`);
  res.json(mus.rows);
})
// post semua
audioRoute.post("/all", async (_req, res) => {
    for await (const aud of audios) {
    await client.query(
        `INSERT INTO musik (artis,judul,musik,kode) VALUES ('${aud.artis}', '${aud.title}','${aud.musik}','${aud.kode}')`
      );
    }
    res.send("Semua musik berhasil disimpan.");
  });
// tampilkan satu berdasarkan kode
audioRoute.get("/satu/:id", async (req, res) => {
    const mus = await client.query(`SELECT * FROM musik WHERE id =${req.params.id}`)
    res.json(mus.rows);
  });
  audioRoute.get("/:id/:kode", async (req, res) => {
    const mus = await client.query(`SELECT * FROM musik WHERE kode IN `)
    res.json(mus.rows);
  });

//  // //   tambah
audioRoute.post("/", async (req,res)=>{
  try {
      await client.query(
        `INSERT INTO musik (artis,judul,musik,kode) VALUES ('${req.body.artis}', '${req.body.title}','${req.body.musik}','${req.body.kode}')`
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
      `UPDATE musik SET artis = '${req.body.artis}', judul = '${req.body.title}', musik = '${req.body.musik}' , kode='${req.body.kode}' WHERE id = '${req.params.id}'`
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
      await client.query(`
        DELETE FROM musik WHERE id = ${req.params.id})
      `);
      res.send("Musik berhasil dihapus.");
    } catch (error) {
      res.status(500).send(error);
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