import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../utils";
import {TextField } from "@mui/material";
import {FaRegHandPointDown} from "react-icons/fa";
import {BiEdit} from "react-icons/bi";
import {RiDeleteBin5Line} from "react-icons/ri";
import { useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { styled } from "styled-components";
import { useParams } from "react-router-dom";
// import { TemaContext } from "../App";

export default function Home() {
  const navigate = useNavigate();
  // const {id} = useParams();
  const [groups, setGroups] = useState([]);
  const [newGroups, setNewGroups] = useState([]);
  const [page, setPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10);

  // const [idSequence, setIdSequence] = useState(groups.length);


  // const {tema} = useContext(TemaContext)

  const akun = useOutletContext()[0];

  useEffect(() => {
    api("/groups").then((groups) => setGroups(groups));
  }, [akun, navigate]);
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setNewGroups({ ...newGroups, img: selectedFile});
    }
};

  if(akun){
  return (
    <div className="h-full pt-16 place-content-center"> 
    <div className="fixed font-extrabold text-3xl grid grid-col place-items-center mb-8">
      <h2>Choose your Favorite</h2>
      <h2><span className="text-blue-300">Boyband </span> or <span className="text-pink-300"> Girlband</span></h2>
      <p className=""><FaRegHandPointDown/></p>
      </div>
        {/* <div id="gallery" className="mx-3 flex flex-wrap gap-7  h-full md:flex-row md:flex-cols-2"> */}
        <div id="gallery" className="pt-32 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 sm:grid-cols-1
                    gap-8 max-w-sm mx-auto md:max-w-none md-mx-0">
                {groups.map((gr) => (
                  <div key={gr.id} className="">
                  <article id="foto" className="left-0 w-96 h-72 rounded-lg overflow-hidden hover:cursor-pointer">
                    <figure className="">
                      <img src={gr.gambar} alt=""  className="w-full h-72 object-cover rounded-md"/>
                      <figcaption className="flex flex-col">
                      <h3 id="card_category" className=" text-pink-400 font-bold text-5xl text-center  mt-8">{gr.nama}</h3>
                      <div className="flex flex-row gap-5 mt-3 text-lg">
                      <p id="desc" >{gr.agensi}</p>
                        <Link to={`/musik/${gr.id}`}>
                            <button id="card_button" className="inline-block no-underline py-1 px-2 rounded bg-purple-400 text-pink-800">Detail</button>
                         </Link>
                         <Link to={`/groups/edit/${gr.id}`}>
                            <button id="card_button" className="inline-block no-underline py-1 px-2 rounded bg-purple-400 text-pink-800"><BiEdit/></button>
                         </Link>
                          <button id="card_button" 
                            className="inline-block no-underline py-1 px-2 rounded bg-purple-400 text-pink-800"
                            onClick={async () => {
                              if (
                                confirm(`Apakah Anda yakin ingin menghapus ${gr.nama}?`)
                              ) {
                                const message = await api(`/groups/del/${gr.id}`, "DELETE");
                                const group = await api("/groups");
                                setGroups(group);
                                alert(message);
                              }
                            }}
                        ><RiDeleteBin5Line/></button>
                         {/* </Link> */}
                         </div>
                      </figcaption>
                    </figure>
                  </article>
                  </div>
                ))}
 {/* {filterPrd
          .filter((_product, i) => i % productsPerPage === 0)
          .map((_product, i) => (
            <button
              key={i}
              className="page-number"
              onClick={() => setPage(i + 1)}
              disabled={i + 1 === page}
            >
              {i + 1}
            </button>
          ))}
        <Button
          onClick={() => setPage(page + 1)}
          disabled={
            page === Math.ceil(filterPrd.length / productsPerPage)
          }
        >
          Berikutnya
        </Button>
      </footer> */}

</div>

            <div className="flex  pt-44 justify-center">
            <form
              className="sm-auto bg-gray-100 p-8 rounded-3xl w-96 flex flex-col gap-4"
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData();
                formData.append("nama", newGroups.nama)
                formData.append("agensi", newGroups.agensi)
                formData.append("gambar", newGroups.img)
                const token = localStorage.getItem("token");
                const response = await fetch(
                  "http://localhost:3001/api/groups/upload",{
                    method:"POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                    },
                    body:formData,
                  }
                );
                await response.json();
                const anggotaResponse = api("/groups")
                const anggotaData = await anggotaResponse.json();
                setGroups(anggotaData);
                setNewGroups({
                  nama:"",
                  agensi:"",
                  img:null,
                })
              }}
            > 
          <h1  className="text-center text-xl">Tambah Boyband/Girlband</h1>
            <TextField label="Nama" helperText="Masukkan Nama Boyband/Girlband" 
              type="text"
              variant="outlined"
              value={newGroups.nama}
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
              value={newGroups.agensi}
              className="w-full"
              required
              onChange={(e) =>
                setNewGroups({...newGroups,agensi: e.target.value})
              }

            />
             <TextField
          id="outlined-multiline-static"
          // helperText="Masukkan Link Foto dengan format .jpg"
          // label="Link Foto"
          // multiline
          type="file"
          name="img"
          // rows={4}
          // variant="standard"
          value={newGroups.gambar}
          onClick={handleFileChange }
          required
        />
          <button type="submit">Simpan</button>
        </form>
        </div>

     </div>
     
  );
  
        }else{
          return <Navigate to="/log"/>
        }
        
}
const Button = styled.button`
  color: #BF4F74;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #BF4F74;
  border-radius: 3px;
`;

// A new component based on Button, but with some override styles
const TomatoButton = styled(Button)`
  color: tomato;
  border-color: tomato;
`;