import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../utils";
import {FaRegHandPointDown} from "react-icons/fa";
import {BiEdit} from "react-icons/bi";
import {RiDeleteBin5Line} from "react-icons/ri";
import { useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import {MdClose} from "react-icons/md"
import { styled } from "styled-components";

export default function Home() {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [showAdd, setShowAdd]= useState(false);
  const [page, setPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10);
  const [keyword, setKeyword] = useState("");


  const [form, setForm] = useState({
    file: null,
    nama: "",
    agensi: "",
    message: "",
  });
  const handleChange = (e) => {
    setForm({ ...form, file: e.target.files[0] });
  };
  const Submit = async () => {

    const { file, nama, agensi } = form;

    const formDataObj = new FormData();
    formDataObj.append("img", file);
    formDataObj.append("nama", nama);
    formDataObj.append("agensi", agensi);
    console.log(formDataObj.file);

    try {
      const response = await fetch("http://localhost:3001/api/groups/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formDataObj,
      });

      if (response.status === 201) {
        setForm({ ...form, message: "Image uploaded successfully." });
      } else {
        setForm({ ...form, message: "Error uploading image." });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setForm({ ...form, message: "An error occurred." });
    }
  };

  const akun = useOutletContext()[0];

  useEffect(() => {
    api("/groups").then((groups) => setGroups(groups));
  }, [akun, navigate]);

  if(akun){
  const filterPrd = groups
    .filter(
      (groups) =>
      groups.nama.toLowerCase().includes(keyword)
    );
    
  return (
  <>
  
    <div className="w-full fixed font-extrabold text-3xl flex flex-row justify-center gap-x-96 mb-8 bg-gray-800">
    <div className="grid grid-col place-items-center mt-4">
    <header className="flex items-center justify-between bg-rose-200 rounded-2xl gap-6 px-5 py-1">
            <label className="flex flex-col gap-2 text-sm">
          Cari:
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </label>
    <h2>Choose your Favorite</h2>
    <h2><span className="text-blue-300">Boyband </span> or <span className="text-pink-300"> Girlband</span></h2>
    <p className=""><FaRegHandPointDown/></p>
    </header>

    <div className="my-4">
    <button onClick={()=> setShowAdd(true)} className="inline-block no-underline py-1 px-2 rounded   items-center justify-center">Tambah</button>
    </div>
    </div>
    </div>
    <div className="h-full pt-16 place-content-center"> 
        <div id="gallery" className="pt-32 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 sm:grid-cols-1
                    gap-8 max-w-sm mx-auto md:max-w-none md-mx-0">
                {filterPrd.length > 0
          ? filterPrd
              .filter(
                (_product, i) =>
                  i >= productsPerPage * page - productsPerPage &&
                  i < productsPerPage * page
              ).map((gr) => (
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
                        </div>
                      </figcaption>
                    </figure>
                  </article>
                  </div>
                ))
                :"Tidak Ditemukan"}


</div>
<footer>
        <label>
          Produk per halaman:
          <input
            type="number"
            value={productsPerPage}
            onChange={(e) => setProductsPerPage(parseInt(e.target.value))}
          />
        </label>
        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Sebelumnya
        </Button>
        {filterPrd
          .filter((_groups, i) => i % productsPerPage === 0)
          .map((_groups, i) => (
            <Button
              key={i}
              className="page-number"
              onClick={() => setPage(i + 1)}
              disabled={i + 1 === page}
            >
              {i + 1}
            </Button>
          ))}
        <Button
          onClick={() => setPage(page + 1)}
          disabled={
            page === Math.ceil(filterPrd.length / productsPerPage)
          }
        >
          Berikutnya
        </Button>
      </footer>

            <div className="flex  pt-44 justify-center">
              {showAdd && ( <form
              onSubmit={Submit}
              className="dialog"
            > 
             <button 
             onClick={()=>setShowAdd(false)}
            className="flex justify-center items-center w-10 h-10 bg-pink-200 rounded-2xl" >
            <MdClose />
            </button>
          <h1  className="text-center text-xl">Tambah Boyband/Girlband</h1>
          <input
          type="text"
          placeholder="Nama"
          value={form.nama}
          onChange={(e) => setForm({ ...form, nama: e.target.value })}
        />
            <input
          type="text"
          placeholder="Agensi"
          value={form.agensi}
          onChange={(e) => setForm({ ...form, agensi: e.target.value })}
        />
        <input type="file" accept="image/*" onChange={handleChange} />
          <button onClick={()=>setShowAdd(false)}>Batal</button>
          <button type="submit">Simpan</button>
        </form>
        )}
           
        </div>

     </div>
     </>
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
