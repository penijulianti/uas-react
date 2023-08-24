import {  useRef} from "react";
import {MdExpandMore} from "react-icons/md"
import { Link } from "react-router-dom";
import {BsFillSkipStartFill,BsFillPlayFill} from "react-icons/bs"
import {BsFillSkipEndFill} from "react-icons/bs";

export default function Musik({audioId, isPlaying, setIsPlaying, currentSong, setCurrentSong, lagu}){
    // const data=[{
    //     id:1,
        
    // }]
    // const [lagu, setLagu] = useState([]);

 
    // useEffect(() => {
    //     fetch(`http://localhost:3001/api/musik`)
    //       .then((response) => response.json())
    //       .then((lagu) => setLagu(lagu))
    //       .catch((error)=> console.log("disini:",error));
    //   },[] );

    const clickRef = useRef();

    const playPause = ()=>
    {
      setIsPlaying(!isPlaying);
  
    }
  
  
    const checkWidth = (e)=>
    {
      let width = clickRef.current.clientWidth;
      const offset = e.nativeEvent.offsetX;
  
      const divprogress = offset / width * 100;
      audioId.current.currentTime = divprogress / 100 * currentSong.length;
  
    }
  
    const skipBack = ()=>
    {
      const index = lagu.findIndex(x=>x.title == currentSong.title);
      if (index == 0)
      {
        setCurrentSong(lagu[lagu.length - 1])
      }
      else
      {
        setCurrentSong(lagu[index - 1])
      }
      audioId.current.currentTime = 0;
      
    }
  
  
    const skiptoNext = ()=>
    {
      const index = lagu.findIndex(x=>x.title == currentSong.title);
  
      if (index == lagu.length-1)
      {
        setCurrentSong(lagu[0])
      }
      else
      {
        setCurrentSong(lagu[index + 1])
      }
      audioId.current.currentTime = 0;
      
    }
    return(
        // <div id="cardMusik" className="">
        //     <div  id="navmusik">
        //         <i><MdExpandMore/>More</i>
        //         <span>Sedang Diputar</span>
        //     </div>
        // </div>
        <div className="h-full pt-60"> 
            <div className="">
                <div>
                    <div>
                        <p>{currentSong.title}</p>
                    </div>
                    <div>
                        <div onClick={checkWidth} ref={clickRef}>
                            <div className="w-1/2"
                            style={{width: `${currentSong.progress+"%"}`}}></div>
                        </div>
                    </div>
                    <div >
                        <button onClick={skipBack}><BsFillSkipStartFill/></button>
                        <button onClick={playPause}><BsFillPlayFill/></button>
                        <button onClick={skiptoNext}><BsFillSkipEndFill/></button>
                    </div>
                </div>
            </div>


        </div>

    )
}