// import {  useRef} from "react";
// import {MdExpandMore} from "react-icons/md"
// import { Link } from "react-router-dom";
// import {BsFillSkipStartFill,BsFillPlayFill} from "react-icons/bs"
// import {BsFillSkipEndFill} from "react-icons/bs";

// export default function Musik({audioId, isPlaying, setIsPlaying, currentSong, setCurrentSong, lagu}){
//     // const data=[{
//     //     id:1,
        
//     // }]
//     // const [lagu, setLagu] = useState([]);

 
//     // useEffect(() => {
//     //     fetch(`http://localhost:3001/api/musik`)
//     //       .then((response) => response.json())
//     //       .then((lagu) => setLagu(lagu))
//     //       .catch((error)=> console.log("disini:",error));
//     //   },[] );

//     const clickRef = useRef();

//     const playPause = ()=>
//     {
//       setIsPlaying(!isPlaying);
  
//     }
  
  
//     const checkWidth = (e)=>
//     {
//       let width = clickRef.current.clientWidth;
//       const offset = e.nativeEvent.offsetX;
  
//       const divprogress = offset / width * 100;
//       audioId.current.currentTime = divprogress / 100 * currentSong.length;
  
//     }
  
//     const skipBack = ()=>
//     {
//       const index = lagu.findIndex(x=>x.title == currentSong.title);
//       if (index == 0)
//       {
//         setCurrentSong(lagu[lagu.length - 1])
//       }
//       else
//       {
//         setCurrentSong(lagu[index - 1])
//       }
//       audioId.current.currentTime = 0;
      
//     }
  
  
//     const skiptoNext = ()=>
//     {
//       const index = lagu.findIndex(x=>x.title == currentSong.title);
  
//       if (index == lagu.length-1)
//       {
//         setCurrentSong(lagu[0])
//       }
//       else
//       {
//         setCurrentSong(lagu[index + 1])
//       }
//       audioId.current.currentTime = 0;
      
//     }
//     return(
//         <div className="h-full pt-60"> 
//             <div className="">
//                 <div>
//                     <div>
//                         <p>{currentSong.title}</p>
//                     </div>
//                     <div>
//                         <div onClick={checkWidth} ref={clickRef}>
//                             <div className="w-1/2"
//                             style={{width: `${currentSong.progress+"%"}`}}></div>
//                         </div>
//                     </div>
//                     <div >
//                         <button onClick={skipBack}><BsFillSkipStartFill/></button>
//                         <button onClick={playPause}><BsFillPlayFill/></button>
//                         <button onClick={skiptoNext}><BsFillSkipEndFill/></button>
//                     </div>
//                 </div>
//             </div>


//         </div>

//     )
// }
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import axios from 'axios';

function Musik() {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const { id } = useParams();
 
  useEffect(() => {
    fetch(`http://localhost:3001/api/musik/${id}`)
      .then((response) => response.json())
      .then((song) => setSongs(song))
      .catch((error)=> console.log("disini:",error));
  },[id] );

  const playSong = (song) => {
    setCurrentSong(song);
  };

  return (
    <div>
      <h1>Song List</h1>
      <ul>
        {songs.map(song => (
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
      {currentSong && (
        <div>
          <h2>Now Playing: {currentSong.title}</h2>

        </div>
      )}
    </div>
  );
}

// export default App;


// export default Musik;

// import  { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// // import axios from 'axios';

// function Musik() {  
//     const [isPlaying, setIsPlaying] = useState(false);
//     const { id } = useParams();
 
//   useEffect(() => {
//     fetch(`http://localhost:3001/api/musik/${id}`)
//       .then((response) => response.json())
//       .then((song) => setIsPlaying(song))
//       .catch((error)=> console.log("disini:",error));
//   },[id] );

// //   const fetchSongs = async () => {
// //     try {
// //       const response = await axios.get('http://localhost:5000/api/songs');
// //       setSongs(response.data);
// //     } catch (error) {
// //       console.error('Error fetching songs:', error);
// //     }
// //   };

// // const playSong = (song) => {
// //     if (currentSong && currentSong.id === song.id) {
// //       if (audio.paused) {
// //         audio.play();
// //       } else {
// //         audio.pause();
// //       }
// //     } else {
// //       audio.src = `http://localhost:3001/api/musik/${id}`;
// //       audio.play();
// //     }
// //     setCurrentSong(song);
// //   };

// //   return (
// //     <div>
// //       <h1>Song List</h1>
// //       <ul>
// //         {songs.map(song => (
// //           <li key={song.id}>
// //             {song.title} - {song.artist} 
// //             <button onClick={() => playSong(song)}>
// //               {currentSong && currentSong.id === song.id && !audio.paused ? 'Pause' : 'Play'}
// //             </button>
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// const toggleAudio = () => {
//     setIsPlaying(!isPlaying);
//   };

//   return (
//     <div>
//       <h1>MP3 Player</h1>
//       <audio controls>
//         <source src={`http://localhost:3001/api/musik/${id}`} type="audio/mpeg" />
//         Your browser does not support the audio element.
//       </audio>
//       <button onClick={toggleAudio}>{isPlaying ? 'Pause' : 'Play'}</button>
//     </div>
//   );
// }





export default Musik;
