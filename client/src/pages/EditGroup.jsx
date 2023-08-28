import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import { Navigate } from "react-router-dom";
import { api } from "../utils";
import { useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function EditGroup(){
    const [editGroup, setEditGroup] = useState();
  const { id } = useParams();
  const akun = useOutletContext()[0];
  const navigate = useNavigate();



  useEffect(() => {
    api(`/groups/${id}`).then((editGroup)=>setEditGroup(editGroup))
  }, [id,akun,navigate]);

  if(akun){
    return(
        <main>
              {editGroup     ? (
                <div className="flex flex-col gap-4 items-center h-full pt-60">
         <form
                  className="dialog"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const message = await api(`/groups/edit/${editGroup.id}`, "PUT", editGroup);
                    alert(message);
                    <Navigate to="/"/>
        
                  }}
                >
                  {/* <h1>{editGroup.id ? "Edit" : "Buat"} Produk</h1> */}
                  <h1  className="text-center text-xl">Edit Boyband/Girlband</h1>
                    <TextField label="Nama" helperText="Masukkan Nama Boyband/Girlband" 
                      variant="outlined"
                      className="w-full"
                      type="text"
                      value={editGroup.nama}
                      onChange={(e) =>
                        setEditGroup({ ...editGroup, nama: e.target.value })
                      }
                     
                    />
                    <TextField label="Agensi" helperText="Masukkan Agensinya"
                      type="text"
                      value={editGroup.agensi}
                      onChange={(e) =>
                        setEditGroup({...editGroup, agensi: e.target.value
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
                  value={editGroup.gambar}
                  onChange={(e) =>
                    setEditGroup({...editGroup,gambar: e.target.value,
                    })
                  }
                  required
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
    )
  } else{
    return <Navigate to="/log"/>
  }
// </>
    
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