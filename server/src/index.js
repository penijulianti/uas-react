import express, { json } from "express"
import groupsRoute from "./router/group.js";
import cors from "cors";
import audioRoute from "./router/audio.js";
import productRoute from "./router/product.js";
import {client} from "./db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const mem = express();
mem.use(cors({origin:"http://localhost:5173"}))
mem.use(express.json());

const router = express.Router();

router.post("/daftar", async (req, res) => {
        await client.query(`INSERT INTO  akun (nama,email,password) VALUES ('${req.body.nama}','${req.body.email}','${req.body.password}')` );
        res.send("Data Berhasil");
  });

router.post("/akun", async (req, res) => {
    const user = await client.query(`SELECT  *  FROM akun WHERE email = '${req.body.email}'`);
    if (user) {
        console.log(user.rows[0].password);
        if (req.body.password === user.rows[0].password) {
          res.json({
            token: jwt.sign(user.rows[0], process.env.SECRET_KEY),
            user:user.rows[0],
          });
        res.send("berhasil")
        } else {
          res.status(401);
          res.send("Kata sandi salah.");
        }
      } else {
        res.status(401);
        res.send("Pengguna tidak ditemukan.");
      }
  });

  
  // middleware otentikasi
//   router.use((req, res, next) => {
//     if (req.headers.authorization) {
//       const token = req.headers.authorization.split(" ")[1];
//       try {
//         // const user = jwt.verify(token, process.env.SECRET_KEY);
//         req.user = user;
//         next();
//       } catch {
//         res.status(401);
//         res.send("Token salah.");
//       }
//     } else {
//       res.status(401);
//       res.send("Token belum diisi.");
//     }
//   });
  
  router.get("/me", (req, res) => {
    res.json(req.user);
  });

router.use("/groups", groupsRoute);
router.use("/musik", audioRoute);
router.use("/product",productRoute);

mem.use("/api",router);


mem.listen(3001, ()=> console.log("Server berhasil dijalankan di port 3000"));


