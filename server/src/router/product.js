import express from "express";
import { client } from "../db.js";

const product=[
    {
        id:1,
        nama:"ITZY Film Keyring",
        band:"ITZY",
        gbr:"https://cafe24img.poxo.com/jyp3602022/web/product/big/202302/a5bed51bd3e688823b28a8d13ffb971a.jpg",
        harga:"150000",
        kategori:"Ring"
    },
    {
        id:2,
        nama:"ITZY Acrylic Pendant Gel Pen",
        band:"ITZY",
        gbr:"https://cafe24img.poxo.com/jyp3602022/web/product/MD/8809932170223/detail/detail.jpg",
        harga:"25000",
        kategori:"Gel Pen"
    },
    {
        id:3,
        nama:"ITZY Paper Scent",
        band:"ITZY",
        gbr:"https://cafe24img.poxo.com/jyp3602022/web/product/medium/202302/3349e2ad32add0d08e8b8abb67ff4092.jpg",
        harga:"50000",
        kategori:"Paper"
    },
    {
        id:4,
        nama:"ITZY Fleece Pouch",
        band:"ITZY",
        gbr:"https://kpop2u-unnie.com/cdn/shop/products/detail02_d6664160-650e-4714-822d-d5ade95c420f.jpg?v=1676022843",
        harga:"200000",
        kategori:"Pouch"
    },
    {
        id:5,
        nama:"ITZY Light Ring Band Ring",
        band:"ITZY",
        gbr:"https://kpopmart.com/wp-content/uploads/2023/02/33923-ITZY-To-Wonder-World-LIGHT-RING-BAND-RING.jpg",
        harga:"150000",
        kategori:"Ring"
    } ,
    {
      id:6,
      nama:"WINNER Lightstick Black ver",
      band:"WINNER",
      gbr:"https://salt.tikicdn.com/cache/w400/ts/product/5d/4e/9d/60b943088c0c33caeddf394a71f8b857.jpg",
      harga:"678899",
      kategori:"Lightstick"
  },
  {
    id:7,
    nama:"WINNER Keyring",
    band:"WINNER",
    gbr:"https://www.prvarepublika.sk/4/thumb-33942_Kpop-v%C3%AD%C5%A5az-ikon-shinee-3-kusy-pr%C3%ADvesok-pr%C3%ADvesok/upload.jpg",
    harga:"14350",
    kategori:"Ring"
},
{
  id:8,
  nama:"TREASURE Lightstick",
  band:"TREASURE",
  gbr:"https://shopluxcardenas.com/wp-content/uploads/2022/07/TREASURE-OFFICIAL-LIGHT-STICK2.jpg",
  harga:"785899",
  kategori:"Lightstick"
},
{
  id:9,
  nama:"BLACKPINK Mini Keyring Lightstick",
  band:"BLACKPINK",
  gbr:"https://media.karousell.com/media/photos/products/2020/6/9/blackpink_official_mini_keyrin_1591699654_4f1b059f_progressive.jpg",
  harga:"15000",
  kategori:"Ring"
},
{
  id:10,
  nama:"EVERGLOW TShirt",
  band:"EVERGLOW",
  gbr:"https://verykpop.com/wp-content/uploads/2019/10/everglow-pink-shirt.jpg",
  harga:"150000",
  kategori:" TShirt"
},
{
  id:11,
  nama:"TWICE TShirt",
  band:"TWICE",
  gbr:"https://ih1.redbubble.net/image.353629308.6342/ssrco,slim_fit_t_shirt,flatlay,edbb3b:2ffb89aaee,back,wide_portrait,750x1000-bg,f8f8f8.u2.jpg",
  harga:"145000",
  kategori:" TShirt"
},
{
  id:12,
  nama:"SEVENTEEN 10th Mini Album FML",
  band:"SEVENTEEN",
  gbr:"hhttps://id.ktown4u.com/goods_files/SH0164/goods_images/000094/GD00093211.default.1.png",
  harga:"145000",
  kategori:" Album"
},
{
  id:13,
  nama:"EXO 7th Album EXIST",
  band:"EXO",
  gbr:"https://d3tvwjfge35btc.cloudfront.net/Assets/99/351/L_p0197035199.jpg",
  harga:"175600",
  kategori:" Album"
},
{
  id:14,
  nama:"AESPA Totebag",
  band:"AESPA",
  gbr:"https://ih1.redbubble.net/image.2535016756.1031/tb,840x840,medium-c,1,198,600,600-bg,f8f8f8.jpg",
  harga:"45000",
  kategori:"Totebag"
},
{
  id:15,
  nama:"TWICE Totebag",
  band:"TREASURE",
  gbr:"https://pbs.twimg.com/media/EwmUinvU8AgyrST.png",
  harga:"50000",
  kategori:" Totebag"
},
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
        `INSERT INTO barang (nama,band,gambar,harga,kategori) VALUES ('${prd.nama}','${prd.band}', '${prd.gbr}',${prd.harga},'${prd.kategori}')`
      );
    }
    res.send("Semua barang berhasil disimpan.");
  });
// tampilkan satu berdasarkan id
productRouter.get("/:id", async (req, res) => {
    const prd = await client.query(`SELECT * FROM barang WHERE id = ${req.params.id}`);
    res.json(prd.rows[0]);
  });

//  tambah
productRouter.post("/", async (req,res)=>{
  try {
      await client.query(
        `INSERT INTO barang (nama, band,gambar,harga,kategori) VALUES ('${req.body.nama}','${req.body.band}', '${req.body.gbr}','${req.body.harga}','${req.body.kategori}')`
      );
      res.send("Barang berhasil disimpan.");
    } catch (error) {
      res.status(500);
      res.send(error);
    }
  });

// // edit
productRouter.put("/edit/:id", async (req, res) => {
  try {
   await client.query(
      `UPDATE barang SET nama = '${req.body.nama}',gambar = '${req.body.gbr}', harga = '${req.body.harga}' , band = '${req.body.band}', kategori = '${req.body.kategori}' WHERE id = '${req.params.id}'`
    )
    res.send("Barang berhasil diedit.");
  } catch (error) {
    res.status(500);
    res.send(error);
  }
});

// // hapus berdasarkan ID
productRouter.delete("/del/:id", async (req, res) => {
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

  export default productRouter;