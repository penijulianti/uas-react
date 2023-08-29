import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import { api } from "../utils";
import { useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";


export default function EditGroup(){
    const [editProduct, seteditProduct] = useState();
  const { id } = useParams();
  const akun = useOutletContext()[0];
  const navigate = useNavigate();


  useEffect(() => {
    api(`/product/${id}`).then((editProduct)=>seteditProduct(editProduct))
  }, [id,akun,navigate]);

if(akun){
    return(
    <main>
      {editProduct ? (
 <div className="flex flex-col gap-4 items-center h-full pt-60">
 <form
          className="dialog"
          onSubmit={async (e) => {
            e.preventDefault();
            const message = await api(`/product/edit/${editProduct.id}`, "PUT", editProduct);
            alert(message);
            <Navigate to="/"/>
          }}
        >
          <h1>{editProduct.id ? "Edit" : "Buat"} Produk</h1>
          <h1  className="text-center text-xl">Edit Produk</h1>
            <TextField label="Nama" helperText="Masukkan Nama Boyband/Girlband" 
              variant="outlined"
              className="w-full"
              type="text"
              value={editProduct.nama}
              onChange={(e) =>
                seteditProduct({ ...editProduct, nama: e.target.value })
              }
             
            />
             <TextField
          id="outlined-multiline-static"
          helperText="Dilarang Masukkan Link Foto dengan format .png"
          label="Link Foto"
          multiline
          rows={4}
          variant="standard"
          type="text"
          placeholder={editProduct.gambar}
          onChange={(e) =>
            seteditProduct({...editProduct,gbr: e.target.value,
            })
          }
        />                                          
         <TextField label="Harga"
        type="text"
        value={editProduct.harga}
        onChange={(e) =>
          seteditProduct({...editProduct, harga: e.target.value
          })
        }
      />
       <TextField label="Band"
        type="text"
        value={editProduct.kode}
        onChange={(e) =>
          seteditProduct({...editProduct, band: e.target.value
          })
        }
      />
       <TextField label="Kategori"
        type="text"
        value={editProduct.kode}
        onChange={(e) =>
          seteditProduct({...editProduct, kategori: e.target.value
          })
        }
      />

        
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            {/* <TomatoButton
              type="reset"
            >
              Batal
            </TomatoButton> */}
            <TomatoButton type="submit">Simpan</TomatoButton>
          </div>       
          </form>
        </div>
      ) : (
        "Loading..."
      )}
</main>
// </>
    )
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