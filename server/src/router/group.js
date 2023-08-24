import express from "express";
import { client } from "../db.js";

const groups=[
    {
        id:1,
        nama:"TREASURE",
        agensi:"YG Entertainment",
        img:"https://f.ptcdn.info/426/073/000/qstxelndozicl1M6z4a-o.jpg"
    },
    {
        id:2,
        nama:"BLACKPINK",
        agensi:"YG Entertainment",
        img: "https://www.youngontop.com/wp-content/uploads/2023/03/Blackpink-2023-members-01-9d67ffe25a474456b4be77adedb057b0.jpg"
    },
    {
        id:3,
        nama:"ITZY",
        agensi:"JYP Entertainment",
        img:"http://res.heraldm.com/content/image/2022/11/25/20221125000501_0.jpg"
    },
    {
        id:4,
        nama:"EVERGLOW",
        agensi:"Yuehua Entertainment",
        img:"https://oreosandpeanutbuttercom.files.wordpress.com/2021/01/everglow-group-dun-dun-profile-image.jpeg?w=1024"
    },
    {
        id:5,
        nama:"SEVENTEEN",
        agensi:"Pledis Entertainment",
        img:"https://s3.cosmopolitan.co.id/yuk-dengar-10-lagu-grup-seventeen-yang-siap-bikin-kamu-bersemangat_64_20211026175136fcSKoY.jpg"
    },
    
]

const groupsRoute = express.Router();
  // tampilkan semua
//   groupsRoute.get("/",async (_req,res)=>{
//     const ang = await client.query("SELECT * FROM anggota");
//     res.json(ang);
// })
// // post semua
// groupsRoute.post("/all", async (_req, res) => {
//     for await (const gr of groups) {
//     await client.query(
//         `INSERT INTO anggota (nama, agensi, gambar) VALUES ('${gr.nama}','${gr.agensi}', '${gr.img}')`
//       );
//     }
//     res.send("Semua Group berhasil disimpan.");
//   });

// // //   tambah
// // groupsRoute.post("/", async (_req,res)=>{
    
// // })
// groupsRoute.delete("/", async (req, res) => {
//     try {
//        await client.query("DELETE FROM anggota");

//       res.send("Planet berhasil dihapus.");
//     } catch (error) {
//       res.status(500);
//       res.send(error);
//     }
//   });



// tanpa db
groupsRoute.get("/", (_req, res) => {
    res.json(
      groups.map((gr) => {
        return { id: gr.id, nama: gr.nama, agensi: gr.agensi, gambar: gr.img };
      })
    );
  });
  
  // tampilkan satu berdasarkan ID
  groupsRoute.get("/:id", (req, res) => {
    const gr = groups.find((p) => p.id == req.params.id);
    if (gr) {
      res.json(gr);
    } else {
      res.status(404);
      res.send("Planet tidak ditemukan.");
    }
  });
  
  // buat
  groupsRoute.post("/", (req, res) => {
    try {
      groups.push({ id: ++id, ...req.body });
      res.send("Planet berhasil disimpan.");
    } catch (error) {
      res.status(500);
      res.send(error);
    }
  });
  
  // edit
  groupsRoute.put("/:id", (req, res) => {
    try {
      groups.forEach((gr) => {
        if (gr.id == req.params.id) {
          for (const property in req.body) {
            gr[property] = req.body[property];
          }
        }
      });
      res.send("Planet berhasil disimpan.");
    } catch (error) {
      res.status(500);
      res.send(error);
    }
  });
  
  // hapus berdasarkan ID
  groupsRoute.delete("/:id", (req, res) => {
    try {
      const index = groups.findIndex((p) => p.id == req.params.id);
      planets.splice(index, 1);
      res.send("Planet berhasil dihapus.");
    } catch (error) {
      res.status(500);
      res.send(error);
    }
  });
  
export default groupsRoute;