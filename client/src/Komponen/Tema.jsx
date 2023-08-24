import { useContext } from "react";
import { TemaContext } from "../App";

export default function Tema(){
    const {tema,setTema} = useContext(TemaContext);
    return(
        <button onClick={() => setTema (tema=== "light" ? "dark"  : "light")}>Tema</button>

    )
}