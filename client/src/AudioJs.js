import { useEffect, useRef, useState } from "react";
import Musik from "./pages/Musik"


const AudioJs=()=>{
    const [lagu, setLagu] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSong,setCurrentSong] = useState(lagu[1]);
    const audioId = useRef();


useEffect(() => {
    fetch(`http://localhost:3001/api/musik`)
      .then((response) => response.json())
      .then((lagu) => setLagu(lagu))
    //   .then((currentSong) => setCurrentSong(lagu[1]))
      .catch((error)=> console.log("disini:",error));
  },[] );

  useEffect(() => {
    if (isPlaying) {
      audioId.current.play();
    }
    else {
        audioId.current.pause();
    }
  }, [isPlaying])

  const onPlaying = () => {
    const duration = audioId.current.duration;
    const ct = audioId.current.currentTime;

    setCurrentSong({ ...currentSong, "progress": ct / duration * 100, "length": duration })

  }
    return(
        <div>
            {lagu.map((gr) => (

            <div key={gr.id} className="">
                <audio src={gr.musik} ref={audioId} onTimeUpdate={onPlaying}/>
                </div>

          ))}
<Musik lagu={lagu} setLagu={setLagu} isPlaying={isPlaying} setIsPlaying={setIsPlaying} audioId={audioId} currentSong={currentSong} setCurrentSong={setCurrentSong}/>

        </div>
    )
}
export default AudioJs