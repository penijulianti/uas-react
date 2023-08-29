import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../utils';
import { useOutletContext } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

function Musik() {
  const [songs, setSongs] = useState([]);
  const { id } = useParams();
  const akun = useOutletContext()[0];
  const navigate = useNavigate();


  useEffect(() => {
    api(`/musik/${id}`).then((songs)=> setSongs(songs));
  },[id,akun,navigate] );


if(akun){
  return (
    <>
    <div>
      <h1>Song List</h1>
      <ul>
        {songs.map((song) => (
            <>
          <li key={song.id}>
            {song.judul}
          </li>
                    <audio controls src={song.musik}>
                    Your browser does not support the audio element.
                  </audio>
                          
        </>
        ))}
    </ul>
    </div>
    </>
  )  }else{
    return <Navigate to="/log"/>
  }
}

export default Musik;
