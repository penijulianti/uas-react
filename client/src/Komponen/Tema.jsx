import { useContext } from "react"
import { TemaContext } from "../App"
import { useState } from "react";
import { MdDarkMode, MdLightMode,} from "react-icons/md";
import { useEffect } from "react";

export default function Tema() {
    const {tema,setTema} = useContext(TemaContext);
    const [mode, setMode] = useState(false);

    useEffect(()=>{
        console.log(`Berhasil Ke Mode ${tema}`);
    },[tema])
    return(
    <div onClick={()=> setMode(!mode)}className="cursor-pointer">
    {mode? 
        <MdDarkMode
            size={30}
            onClick={() => setTema (tema=== "light" ? "dark" : "light")}
        />: 
        <MdLightMode
            size={30}
            onClick={() => setTema (tema=== "light" ? "dark" : "light")}
        />}
    </div>
    )
}