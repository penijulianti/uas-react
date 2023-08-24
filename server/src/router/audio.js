import express from "express";


const audios=[
    {
        id:1,
        artis:"TREASURE",
        img:"https://f.ptcdn.info/426/073/000/qstxelndozicl1M6z4a-o.jpg",
        title:"BLACKPINK-Don-t_Know_What_to_do",
        musik:"../BLACKPINK_-__Don_t_Know_What_To_Do__DANCE_PRACTICE_VIDEO_(MOVING_VER.).mp3"
    },
    {
        id:2,
        artis:"BLACKPINK",      
        img: "https://www.youngontop.com/wp-content/uploads/2023/03/Blackpink-2023-members-01-9d67ffe25a474456b4be77adedb057b0.jpg",
        title:"BLACKPINK-Rose_Fix_You",
        musik:"../BLACKPINK_Rosé_Fix_You_Cover_Lyrics(128k).mp3"
    },
    {
        id:3,
        artis:"ITZY",
        img:"http://res.heraldm.com/content/image/2022/11/25/20221125000501_0.jpg",
        title:"BLACKPINK-Forever_Young",
        musik:"../BLACKPINK - 'Forever Young' DANCE PRACTICE VIDEO (MOVING VER.).mp3"
    },
    {
        id:4,
        artis:"EVERGLOW",
        img:"https://oreosandpeanutbuttercom.files.wordpress.com/2021/01/everglow-group-dun-dun-profile-image.jpeg?w=1024",
        title:"BLACPINK-So_Hot",
        musik:"../BLACKPINK SO HOT (THEBLACKLABEL Remix).mp3"
    },
    {
        id:5,
        artis:"SEVENTEEN",
        img:"https://s3.cosmopolitan.co.id/yuk-dengar-10-lagu-grup-seventeen-yang-siap-bikin-kamu-bersemangat_64_20211026175136fcSKoY.jpg",
       title:"BLACKPINK-Rose&Lisa-LOVE",
        musik:"../BLACKPINK_(Rosé_&_Lisa)_-_LOVE_(Nat_King_Cole_cover)_Lyrics(128k).mp3"
    },
    
]

const audioRoute = express.Router();

audioRoute.get("/",(_req,res)=>{
    res.json(audios);
})
audioRoute.get("/:id", (req,res)=> {
    const gr = audios.find((p)=> p.id == req.params.id);
    if (gr){
        res.json(gr);
    }else{
        res.status(404);
        res.send("Musik Tidak Ditemukan atau belum ditambahkan");
    }
    
})

export default audioRoute;