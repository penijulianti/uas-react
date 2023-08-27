import express from "express";
import { client } from "../db.js";

const product=[
    {
        id:1,
        nama:"ITZY Film Keyring",
        band:"ITZY",
        gbr:"https://cafe24img.poxo.com/jyp3602022/web/product/big/202302/a5bed51bd3e688823b28a8d13ffb971a.jpg",
        harga:"150000",
        kategori:"Ring",
        kode:3
    },
    {
        id:2,
        nama:"ITZY Acrylic Pendant Gel Pen",
        band:"ITZY",
        gbr:"https://cafe24img.poxo.com/jyp3602022/web/product/MD/8809932170223/detail/detail.jpg",
        harga:"25000",
        kategori:"Gel Pen",
        kode:3
    },
    {
        id:3,
        nama:"ITZY Paper Scent",
        band:"ITZY",
        gbr:"https://cafe24img.poxo.com/jyp3602022/web/product/medium/202302/3349e2ad32add0d08e8b8abb67ff4092.jpg",
        harga:"50000",
        kategori:"Paper",
        kode:3
    },
    {
        id:4,
        nama:"ITZY Fleece Pouch",
        band:"ITZY",
        gbr:"https://kpop2u-unnie.com/cdn/shop/products/detail02_d6664160-650e-4714-822d-d5ade95c420f.jpg?v=1676022843",
        harga:"200000",
        kategori:"Pouch",
        kode:3
    },
    {
        id:5,
        nama:"ITZY Light Ring Band Ring",
        band:"ITZY",
        gbr:"https://kpopmart.com/wp-content/uploads/2023/02/33923-ITZY-To-Wonder-World-LIGHT-RING-BAND-RING.jpg",
        harga:"150000",
        kategori:"Ring",
        kode:3
    }
]

let id=product.length;

const productRouter=express.Router();
// tampilkan semua
  productRouter.get("/",async (_req,res)=>{
    const brg = await client.query("SELECT * FROM barang");
    res.json(brg.rows);
})

// post semua
productRouter.post("/all", async (_req, res) => {
    for await (const prd of product) {
    await client.query(
        `INSERT INTO barang (nama,band,gambar,harga,kode,kategori) VALUES ('${prd.nama}','${prd.band}', '${prd.gbr}','${prd.harga}','${prd.kode}','${prd.kategori}')`
      );
    }
    res.send("Semua barang berhasil disimpan.");
  });
// tampilkan satu berdasarkan kode
productRouter.get("/:kode", async (req, res) => {
    const prd = await client.query(`SELECT * FROM barang WHERE kode = ${req.params.kode}`);
    res.json(prd.rows);
  });

//  // //   tambah
productRouter.post("/", async (req,res)=>{
  try {
      await client.query(
        `INSERT INTO barang (nama, band,gambar,harga,kode,kategori) VALUES ('${req.body.nama}','${req.body.band}', '${req.body.gbr}','${req.body.harga}','${req.body.kode}','${prd.kategori}')`
);
      res.send("Barang berhasil disimpan.");
    } catch (error) {
      res.status(500);
      res.send(error);
    }
  });

// // edit
productRouter.put("/:id", async (req, res) => {
  try {
   await client.query(
      `UPDATE barang SET nama = '${req.body.nama}',gambar = '${req.body.gbr}', harga = '${req.body.harga}' , kode='${req.body.kode}', band = '${req.body.band}' kategori = '${prd.kategori}'WHERE id = '${req.params.id}'`
    )
    res.send("Barang berhasil diedit.");
  } catch (error) {
    res.status(500);
    res.send(error);
  }
});

// // hapus berdasarkan ID
productRouter.delete("/:id", async (req, res) => {
  try {
    await client.query(`DELETE FROM barang WHERE id = '${req.params.id}'`);
    res.send("barang berhasil dihapus.");
  } catch (error) {
    res.status(500);
    res.send(error);
  }
});

// // hapus
productRouter.delete("/", async (req, res) => {
    try {
       await client.query("DELETE FROM barang");
      res.send("Semua barang berhasil dihapus.");
    } catch (error) {
      res.status(500);
      res.send(error);
    }
  });


// tanpadb
// // tampilkan semua
// productRouter.get("/",(_rea,res)=>{
//     res.json( product)
// })

// // tampilkan satu berdasarkan ID
// productRouter.get("/:id", (req, res) => {
//     const prd = product.find((p) => p.id == req.params.id);
//     if (prd) {
//       res.json(prd);
//     } else {
//       res.status(404);
//       res.send("Produk tidak ditemukan.");
//     }
//   });
//   productRouter.get("/", (req, res) => {
//     const prd = product.filter((p) => p.band === req.params.band);
//     if (prd) {
//       res.json(prd);
//     } else {
//       res.status(404);
//       res.send("Produk tidak ditemukan.");
//     }
//   });
//   // buat
// productRouter.post("/", (req, res) => {
//     try {
//       product.push({ id: ++id, ...req.body });
//       res.send("Produk berhasil disimpan.");
//     } catch (error) {
//       res.status(500);
//       res.send(error);
//     }
//   });
//   // edit
// productRouter.put("/:id", (req, res) => {
//     try {
//       product.forEach((prd) => {
//         if (prd.id == req.params.id) {
//           for (const property in req.body) {
//             prd[property] = req.body[property];
//           }
//         }
//       });
//       res.send("Produk berhasil disimpan.");
//     } catch (error) {
//       res.status(500);
//       res.send(error);
//     }
//   });
//   // hapus berdasarkan ID
// productRouter.delete("/:id", (req, res) => {
//     try {
//       const index = product.findIndex((p) => p.id == req.params.id);
//       product.splice(index, 1);
//       res.send("Produk berhasil dihapus.");
//     } catch (error) {
//       res.status(500);
//       res.send(error);
//     }
//   });
  
  export default productRouter;