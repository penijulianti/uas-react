import { useState, useEffect } from 'react';
import {RiDeleteBin5Line} from "react-icons/ri";
import { useParams } from 'react-router-dom';
import { api } from '../utils';
import { useOutletContext } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Detail from '../Komponen/Detail';

function Musik() {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const { id } = useParams();
  const akun = useOutletContext()[0];
  const navigate = useNavigate();


  useEffect(() => {
    api(`/musik/${id}`).then((songs)=> setSongs(songs));
  },[id,akun,navigate] );

  const playSong = (song) => {
    setCurrentSong(song);
  };
if(akun){
  return (
    <>
    <div>
      <h1>Song List</h1>
      <ul>
        {songs.map((song) => (
            <>
          <li key={song.id} onClick={() => playSong(song)}>
            {song.judul}
          </li>
                    <audio controls src={song.musik}>
                    Your browser does not support the audio element.
                  </audio>
                          
        </>
        ))}
    </ul>
    <button id="card_button" 
            className="inline-block no-underline py-1 px-2 rounded bg-purple-400 text-pink-800"
            onClick={async () => {
            if (
            confirm(`Apakah Anda yakin ingin menghapus semua audio?`)
            ) {
            const message = await api(`/musik/`, "DELETE");
            const group = await api("/musik");
            setSongs(group);
            alert(message);
            }
            }}
            ><RiDeleteBin5Line/>
    </button>
    </div>
    </>
  )  }else{
    return <Navigate to="/log"/>
  }
}

export default Musik;
