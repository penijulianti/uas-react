import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../utils";
import {TextField } from "@mui/material";
// import { TemaContext } from "../App";

export default function Home() {
  const [groups, setGroups] = useState([]);
  const [newGroups, setNewGroups] = useState([]);
  // const {tema} = useContext(TemaContext)


useEffect(() => {
    fetch(`http://localhost:3001/api/groups`)
      .then((response) => response.json())
      .then((groups) => setGroups(groups))
      .catch((error)=> console.log("disini:",error));
  },[] );
  return (
    <div className="h-full pt-60"> 
        <div id="gallery" className="mx-3 flex flex-wrap gap-7  h-full md:flex-row ">
                {groups.map((gr) => (
                  <div key={gr.id} className="">
                  <article id="foto" className="relative left-0 w-96 h-72 rounded-lg overflow-hidden hover:cursor-pointer">
                    <figure className="">
                      <img src={gr.gambar} alt=""  className="w-full h-72 object-cover rounded-md"/>
                      <figcaption className="flex flex-col">
                      <h3 id="card_category" className=" text-pink-400 font-bold text-3xl text-center  mt-8">{gr.nama}</h3>
                      <div className="flex flex-row gap-5 mt-6">
                      <p id="desc" >{gr.agensi}</p>
                        <Link to={`/musik/${gr.id}`}>
                            <button id="card_button" className="inline-block no-underline py-1 px-2 rounded bg-purple-400 text-pink-800">Detail</button>
                         </Link>
                         </div>
                      </figcaption>
                    </figure>
                  </article>
                  </div>
                ))}
             
</div>
            <div className="flex  pt-44 justify-center">
            <form
              className="sm-auto bg-gray-100 p-8 rounded-3xl w-96 flex flex-col gap-4"
          onSubmit={async (e) => {
            e.preventDefault();
            setNewGroups({});
            const message = await api("/groups", "POST", newGroups);
            const gr = await api("/groups");
            setGroups(gr);
            alert(message);
          }}
        >
          <h1  className="text-center text-xl">Tambah Boyband/Girlband</h1>
            <TextField label="Nama" helperText="Masukkan Nama Boyband/Girlband" 
              type="text"
              variant="outlined"
              value={newGroups.nama ?? ""}
              className="w-full"
              required
              autoFocus
              onChange={(e) =>
                setNewGroups({ ...newGroups, nama: e.target.value })
              }
             
            />
            <TextField label="Agensi" helperText="Masukkan Agensinya"
              type="text"
              variant="outlined"
              value={newGroups.agensi ?? ""}
              className="w-full"
              required
              onChange={(e) =>
                setNewGroups({...newGroups,agensi: e.target.value})
              }

            />
             <TextField
          id="outlined-multiline-static"
          helperText="Masukkan Link Foto dengan format .jpg"
          label="Link Foto"
          multiline
          rows={4}
          defaultValue="Masukkan Link Foto"
          variant="standard"
          value={newGroups.gambar ?? ""}
          onChange={(e) =>
            setNewGroups({
              ...newGroups,
              gambar: e.target.value,
            })
          }
          required
        />
          <button>Simpan</button>
        </form>
        </div>
     </div>
  );
}