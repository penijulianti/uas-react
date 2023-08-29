import express, { json } from "express"
import groupsRoute from "./router/group.js";
import cors from "cors";
import audioRoute from "./router/audio.js";
import {client} from "./db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import productRouter from "./router/product.js";
import bcrypt from "bcryptjs";
import multer from "multer";
import cookieParser from "cookie-parser";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      path.parse(file.originalname).name +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });
dotenv.config();
const mem = express();
mem.use(cors({origin:"http://localhost:5173"}))
mem.use(express.json());
mem.use(cookieParser());

const router = express.Router();

router.get("/akun", async (req, res)=>{
  try{
    const data = await client.query("SELECT *FROM akun");
    res.send(data.rows)
  }catch(error){
    res.send("kosong")
  }
})
// register
router.post('/registrasi', async (req, res) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    const query = 'INSERT INTO akun (nama, email, password) VALUES ($1, $2, $3)';
    const values = [req.body.nama, req.body.email, hashedPassword];
    
    await client.query(query, values);

    res.json({ message: 'Pendaftaran berhasil' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Terjadi kesalahan saat mendaftarkan akun');
  }
});
// login
router.post("/login", async (req,res)=>{
  try{
    const akun = await client.query(`SELECT * FROM akun WHERE email='${req.body.email}' `)
    if(akun.rows){
      if(await bcrypt.compare(req.body.password, akun.rows[0].password)){
        const token = jwt.sign(akun.rows[0],process.env.SECRET_KEY);
        // res.cookie("token",token);
        res.json({
          token: jwt.sign(akun.rows[0], process.env.SECRET_KEY),
          akun:akun.rows[0],
        });
      }else{
        res.json("Password yang kamu masukkan salah!!!")
      }
    }else{
      res.json("Akun tidak ditemukan!!!")
    }
  }catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }

})
// middleware otentikasi
router.use((req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      const akun = jwt.verify(token, process.env.SECRET_KEY);
      req.akun = akun;
      next();
    } catch {
      res.status(401);
      res.send("Token salah.");
    }
  } else {
    res.status(401).json({error:"woy Token belum diisi su."});
  }
});

router.get("/me", (req, res) => {
  res.json(req.akun);
});



router.use("/groups", groupsRoute);
router.use("/musik", audioRoute);
router.use("/product",productRouter);

mem.use("/api",router);


mem.listen(3001, ()=> console.log("Server berhasil dijalankan di port 3000"));


