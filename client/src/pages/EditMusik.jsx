import { TextField } from "@mui/material";
import { styled } from "styled-components";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export default function EditMusik(){
    const [editMusik, seteditMusik] = useState();
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3001/api/musik/${id}`)
      .then((response) => response.json())
      .then((editMusik) => seteditMusik(editMusik) );
  }, [id]);
    return(
        // console.log(det)
        // <h1>{det.nama}</h1>
//         <>
<main>
      {editMusik ? (
        <div className="flex flex-col gap-4 items-center h-full pt-60">
 <form
          className="dialog"
          onSubmit={async (e) => {
            e.preventDefault();
            const message = await fetch(`http://localhost:3001/api/musik/${editMusik.id}`, "PUT", editMusik);
            alert(message);
            <Navigate to="/"/>

          }}
        >
          <h1>{editMusik.id ? "Edit" : "Buat"} Produk</h1>
          <h1  className="text-center text-xl">Edit Boyband/Girlband</h1>
            <TextField label="Artis" helperText="Masukkan Nama Boyband/Girlband" 
              variant="outlined"
              className="w-full"
              type="text"
              value={editMusik.artis}
              onChange={(e) =>
                seteditMusik({ ...editMusik, artis: e.target.value })
              }
             
            />
            <TextField label="Judul" helperText="Masukkan Agensinya"
              type="text"
              value={editMusik.judul}
              onChange={(e) =>
                seteditMusik({...editMusik, judul: e.target.value
                })
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
          type="text"
          value={editMusik.gambar}
          onChange={(e) =>
            seteditMusik({...editMusik,gambar: e.target.value,
            })
          }
          required
        />            
         <TextField
        id="outlined-multiline-static"
        helperText="Masukkan Link Foto dengan format .jpg"
        label="Link Foto"
        multiline
        rows={4}
        defaultValue="Masukkan Link Foto"
        variant="standard"
        type="text"
        value={editMusik.musik}
        onChange={(e) =>
          seteditMusik({...editMusik,musik: e.target.value,
          })
        }
        required
      />
       <TextField label="Judul" helperText="Masukkan Agensinya"
              type="text"
              value={editMusik.kode}
              onChange={(e) =>
                seteditMusik({...editMusik, kode: e.target.value
                })
              }

            />
        
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            {/* <TomatoButton
              type="reset"
              variant="tonal"
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