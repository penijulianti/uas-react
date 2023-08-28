import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import {BiSolidCartAdd } from "react-icons/bi";
import {ImEyePlus} from "react-icons/im";
import { Link } from "react-router-dom";
import {TfiShoppingCartFull} from "react-icons/tfi";
import {BiCartAdd,BiEdit} from "react-icons/bi";
import {MdClose,MdOutlineRemoveShoppingCart} from "react-icons/md";
import {RiDeleteBin5Line} from "react-icons/ri";
import { styled } from "styled-components";
import { TextField } from "@mui/material";
import { api } from "../utils";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

export default function Barang(){
    const [product,setProd] = useState([]);
    const navigate = useNavigate();
    const {id} = useParams();
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    // const [idSequence, setIdSequence] = useState(product.length);
    const [keyword, setKeyword] = useState("");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(Infinity);
    const [category, setCategory] = useState("Semua");
    const [sortBy, setSortBy] = useState("id");
    const [sortOrder, setSortOrder] = useState("asc");
    const [page, setPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(10);
    const akun = useOutletContext()[0];


    const filterPrd = product
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a[sortBy] < b[sortBy] ? -1 : 1;
      } else {
        return a[sortBy] > b[sortBy] ? -1 : 1;
      }
    })
    .filter(
      (product) =>
        product.nama.toLowerCase().includes(keyword) &&
        product.harga >= minPrice &&
        product.harga <= maxPrice &&
        (category === "Semua" || product.kategori == category)
    );

    useEffect(() => {
        api("/product").then((product) => setProd(product));
      }, [akun, navigate]);

      if(akun){ 
    return(
       <div className=" pt-5"> 
        <header className="flex items-center justify-between bg-rose-200 rounded-2xl gap-6 px-5 py-1">
        <TomatoButton >Tambah Barang</TomatoButton>
            <label className="flex flex-col gap-2 text-sm">
          Cari:
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </label>
        <section>
          Harga:
          <label className="flex flex-col gap-2 text-sm">
            Minimal:
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Maksimal:
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value || Infinity)}
            />
          </label>
        </section>
        <label>
          Kategori:
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Semua</option>
            <option>Ring</option>
            <option>Gel Pen</option>
            <option>T-Shirt</option>
          </select>
        </label>
        <section>
          Urutkan:
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="id">Normal</option>
            <option value="nama">Nama</option>
            <option value="harga">Harga</option>
          </select>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Naik</option>
            <option value="desc">Turun</option>
          </select>
        </section>
        <button 
        onClick={() => setIsCartOpen(true)}
        className="flex justify-center items-center w-10 h-10 bg-pink-200 rounded-2xl"
        >
          <TfiShoppingCartFull />
          {cart.reduce((a, p) => a + p.count, 0)}
        </button>
            </header>

            {isCartOpen && (
        <div className="absolute bg-gray-100 flex flex-col gap-5 p-10 rounded-2xl top-1/2 left-1/4 min-w-[200px]">
          <button onClick={() => setIsCartOpen(false)}>
            <div className="flex justify-center items-center w-10 h-10 bg-pink-200 rounded-2xl" >
            <MdClose />
            </div>
          </button>
          <h1>Keranjang</h1>
          <table className="table-fixed">
            <thead>
              <tr>
                <th> ID </th>
                <th> Nama </th>
                <th> Jumlah </th>
                <th> Tindakan</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((product) => (
                <tr key={product.id} className="table-fixed">
                  <td>{product.id}</td>
                  <td>{product.nama}</td>
                  <td>{product.count.toLocaleString()}</td>
                  <td className="flex flex-row gap-3 m">
                    <button
                      onClick={() => {
                        if (product.count > 1) {
                          setCart(
                            cart.map((p) =>
                              p.id === product.id
                                ? { ...p, count: p.count - 1 }
                                : p
                            )
                          );
                        } else {
                          setCart(cart.filter((p) => p.id !== product.id));
                        }
                      }}
                      title="Kurangi"
                    >
                      <MdOutlineRemoveShoppingCart size={20}/>
                    </button>
                    <button
                      onClick={() => {
                        setCart(
                          cart.map((p) =>
                            p.id === product.id
                              ? { ...p, count: p.count + 1 }
                              : p
                          )
                        );
                      }}
                      title="Tambah"
                    >
                      <BiCartAdd size={20}/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            Total bayar:{" "}
            {cart
              .reduce((a, p) => a + p.harga * p.count, 0)
              .toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
                maximumFractionDigits: 0,
              })}
          </div>
        </div>
      )} 
    {/* </div> */}
   
        <section className="py-16">
                <div className="continer mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  
                    gap-8 max-w-sm mx-auto md:max-w-none md-mx-0">
        {filterPrd.length > 0
          ? filterPrd
              .filter(
                (_product, i) =>
                  i >= productsPerPage * page - productsPerPage &&
                  i < productsPerPage * page
              )
              .map((prd)=>(
                    <div key={prd.id}>
                        <div  className="mb-4 overflow-hidden group transition">
                        <div className="w-full h-full flex justify-center items-center">
                           <div className="w-52 mx-auto flex justify-center items-center" >
                            <img src={prd.gambar} alt="Gagal dimuat" className="w-52 max-h-52 group-hover:scale-150 transition-none duration-300" />
                            </div> 
                        <div className=" top-6 -right-11 
                        group-hover:right-5 
                        p-2 flex flex-col items-center justify-center gap-y-2 opacity-0 
                        group-hover:opacity-100 transition-all duration-300">
                            <button title="Tambahkan ke keranjang" onClick={() => {
                                    if (cart.find((p) => p.id === prd.id)) {
                                    setCart(
                                        cart.map((p) =>
                                        p.id === prd.id
                                            ? {
                                                ...p,
                                                count: p.count + 1,
                                            }
                                            : p
                                        )
                                    );
                                    } else {
                                    setCart([...cart, { ...prd, count: 1 }]);
                                    }
                               }}>

                                <div className="flex w-10 h-10 rounded-2xl bg-pink-100 justify-center items-center text-primary drop-shadow-xl">
                                    <BiSolidCartAdd size={25} className="text-3xl"/>
                                </div>
                            </button>
                            <Link to={`/${id}`} className="flex w-10 h-10 rounded-2xl bg-pink-100 justify-center items-center text-primary drop-shadow-xl">
                                <ImEyePlus size={25}/>
                            </Link>
                        </div>
                        </div>
                        <div>
                        <h5 className="text-sm capitalize text-pink-200 mt-1 mb-1 ">{prd.band}</h5>
                        <h1 className="font-extrabold mb-1">{prd.nama}</h1>
                       
                        <p>{prd.harga.toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR",
                            maximumFractionDigits: 0,
                    })}
                        </p>
                        <Link to={`/product/edit/${prd.id}`}>
                        <BiEdit/>
                        </Link>
                        <button id="card_button" 
                            className="inline-block no-underline py-1 px-2 rounded bg-purple-400 text-pink-800"
                            onClick={async () => {
                                if (
                                  confirm(`Apakah Anda yakin ingin menghapus ${prd.nama}?`)
                                ) {
                                  const message = await api(`/product/del/${prd.id}`, "DELETE");
                                  const group = await api("/product");
                                  setProd(group);
                                  alert(message);
                                }
                              }}
                            ><RiDeleteBin5Line/></button>
                        </div>
                     </div>
                     </div>
                    
                    ))
                    :"Tidak Ditemukan"}
                    </div>
                </div>
            </section>
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
      </footer>

        </div>
    )   }else{
        return <navigate to="/log"/>
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