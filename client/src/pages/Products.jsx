import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import {BiSolidCartAdd} from "react-icons/bi";
import {ImEyePlus} from "react-icons/im";
import { Link } from "react-router-dom";

export default function Products({
    addCart,
    category,
}){
    const [product,setProd] = useState([]);
    const {id} = useParams();

    useEffect(() => {
        fetch(`http://localhost:3001/api/product`)
          .then((response) => response.json())
          .then((product) => setProd(product));
      }, [id]);
    return(
        <div >
            <section className="py-16">
                <div className="continer mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 
                    gap-8 max-w-sm mx-auto md:max-w-none md-mx-0">
                    {product.map((prd)=>(
                    <div key={prd.id}>
                        <div  className="mb-4 relative overflow-hidden group transition">
                        <div className="w-full h-full flex justify-center items-center">
                           <div className="w-56 mx-auto flex justify-center items-center" >
                            <img src={prd.gbr} alt="Gagal dimuat" className="max-h-52 group-hover:scale-150 transition-none duration-300" />
                            </div> 
                        <div className="absolute top-6 -right-11 
                        group-hover:right-5 
                        p-2 flex flex-col items-center justify-center gap-y-2 opacity-0 
                        group-hover:opacity-100 transition-all duration-300">
                            <button onClick={addCart} title="Tambahkan ke keranjang">
                                <div className="flex justify-center items-center w-10 h-10 bg-pink-50 rounded-2xl">
                                    <BiSolidCartAdd size={25} className="text-3xl"/>
                                </div>
                            </button>
                            <Link to={`/${id}`} className="flex w-10 h-10 rounded-2xl bg-pink-100 justify-center items-center text-primary drop-shadow-xl">
                                <ImEyePlus size={25}/>
                            </Link>
                        </div>
                        </div>
                        <div>
                        <h5 className="text-sm capitalize text-pink-200 mt-1 mb-1 ">{prd.group}</h5>
                        <h1 className="font-extrabold mb-1">{prd.nama}</h1>
                        <p>Rp. {prd.harga}({category})</p>
                        </div>
                     </div>
                    </div>
                        
                    ))}
                    </div>
                </div>
            </section>

        </div>
    )
}