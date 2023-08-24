
  
//   const [open, setOpen] = useState(false);


//   return (
//     <>
//       <section className="z-50 fixed">
//         <div
//           className={`bg-[#0e0e0e] min-h-screen ${
//             open ? "w-68" : "w-16"
//           } duration-500 px-4`}
//         >
//           <div
//             className={`py-3 flex justify-end text-white sm:block ${
//               "hidden" ? "hidden" : "block"
//             }`}
//           >
//             <HiMenuAlt3
//               size={30}
//               className="cursor-pointer"
//               onClick={() => setOpen(!open)}
//             />
//             <br />
//             {/* <ScrollButton /> */}
//           </div>
//           <div className={`pt-4 text-white flex flex-col gap-4 relative`}>
//           {/* <Theme/> */}
//             {menus.map((elem, ind) => {
//               return (
//                 <Link
//                   to={elem.link}
//                   key={ind}
//                   className={`${
//                     elem.margin && "mt-5"
//                   } group overflow-hidden flex item-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800`}
//                 >
//                   <div>{React.createElement(elem.icon, { size: "20" })}</div>
//                   <h2
//                     style={{ transitionDelay: `${ind + 3}00ms` }}
//                     className={`whitespace-pre duration-500 ${
//                       !open && "opacity-0 translate-x-28 overflow-hidden"
//                     }`}
//                   >
//                     {elem.name}
//                   </h2>

//                   <h2
//                     className={`${
//                       open && "hidden"
//                     } absolute left-48 bg-white fons-semi-bold whitespace-pre text-gray-800 rounded drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-500 group-hover:w-fit`}
//                   >
//                     {elem.name}
//                   </h2>
//                 </Link>
//               );
//             })}
//           </div>
//         </div>
//       </section>
//     </>
//   );









import React, { createContext, useContext, useState } from "react";
import {CiMenuKebab} from "react-icons/ci"
import { TbHomeHeart,TbUserHeart } from "react-icons/tb";
import{GiMusicSpell} from "react-icons/gi"
import { RiSettings4Line } from "react-icons/ri";
import {FiShoppingBag } from "react-icons/fi";
import {AiTwotoneShop} from "react-icons/ai"
import { Link } from "react-router-dom";
import { TemaContext } from "../App";
import Tema from "./Tema";

export const SidebarContext = createContext();

export default function Sidebar(){
    const {tema} = useContext(TemaContext);


  const menus = [
    { name: "Login", link: "/log", icon:TbUserHeart},
    { name: "Home", link: "/", icon: TbHomeHeart},
    { name: "Shop", link: "/shop", icon: AiTwotoneShop},
    { name: "Cart", link: "/cart", icon: FiShoppingBag },
    { name: "Setting", link: "/", icon: RiSettings4Line },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div className="text-pink-300 ">
    <section className="z-50 fixed">
      <div
        className={`bg-gradient-to-b from-gray-600 to-gray-500 min-h-screen ${
          open ? "w-68" : "w-20"
        } duration-500 px-4`}
      >
        <div
      className={`py-3 flex justify-end sm:block ${
        "hidden" ? "hidden" : "block"
      }`}
    >
            <GiMusicSpell
            size={50} 
            className="cursor-pointer "/>KZone
        <div className="py-3 flex justify-end">
        
          <CiMenuKebab
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        </div>
        <div className="pt-4 flex flex-col gap-4 relative">
          {menus?.map((menu, i) => (
            <Link
              to={menu?.link}
              key={i}
              className={` ${
                menu?.margin && "mt-5"
              } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-pink-100 rounded-md`}
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-pink-100 font-semibold whitespace-pre  rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
        </div>
        <Tema/>
      </div>
    </section>
    </div>
  );
}

