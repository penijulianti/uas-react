import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function DelGroup(){
    const [det, setDet] = useState();
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3001/api/groups/del/${id}`)
      .then((response) => response.json())
      .then((det) => setDet(det) );
  }, [id]);
    return(
        // console.log(det)
        // <h1>{det.nama}</h1>
//         <>
<main>
     
        <div className="flex flex-col gap-4 items-center h-full pt-60">
       Berhasil di hapus     
       {det.map((gr) => (
                  <div key={gr.id} className="">
                  <article id="foto" className="left-0 w-96 h-72 rounded-lg overflow-hidden hover:cursor-pointer">
                    <figure className="">
                      <img src={gr.gambar} alt=""  className="w-full h-72 object-cover rounded-md"/>
                      <figcaption className="flex flex-col">
                      <h3 id="card_category" className=" text-pink-400 font-bold text-5xl text-center  mt-8">{gr.nama}</h3>
                      <div className="flex flex-row gap-5 mt-3 text-lg">
                      <p id="desc" >{gr.agensi}</p>
                         </div>
                      </figcaption>
                    </figure>
                  </article>
                  </div>
                ))}
        </div>
      
</main>
// </>
    )
}