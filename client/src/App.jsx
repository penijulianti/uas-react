
import { createContext, useState } from 'react';
import { Outlet } from 'react-router-dom';
import SocialLinks from './Komponen/Social';
import { api } from './utils.js';
import Sidebar from './Komponen/Sidebar';
// import SideProv from './Komponen/SideContext';


export const SideContext = createContext();
export const TemaContext = createContext({
  tema: null,
  setTema: () => {},
})

function App() {
  const [tema,setTema] = useState("dark");
  const [user, setUser] = useState({});

  return (
    <TemaContext.Provider value={{tema,setTema}}>
      <Sidebar />
     <div className={tema === "light" ? "bg-gradient-to-r from-pink-400 to-pink-700" : "bg-gradient-to-b from-gray-800 to-black text-pink-400"}>
      <div className=" flex flex-col">
        <div className="flex flex-row">
        <div className="w-40"></div>
        <Outlet context={[user, setUser]}/>
        </div>
        </div>
      <SocialLinks/>
      </div>
    </TemaContext.Provider>
  )
}

export default App
