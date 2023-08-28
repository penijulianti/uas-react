import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Musik from "../pages/Musik";

export default function Detail(){
    const [det, setDet] = useState();
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3001/api/groups/${id}`)
      .then((response) => response.json())
      .then((det) => setDet(det) );
  }, [id]);

return(
<main>
      {det ? (
        <div className="flex flex-col gap-4 items-center h-full pt-60">
          <h1 className="text-4xl font-bold">
            Playlist dari  {det.nama}
          </h1>
            <img
              src={det.gambar}
              className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
            />
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
               {" "}
                {det.agensi}
              </h5>
            </div> 
            <Musik/>     
        </div>
      ) : (
        "Loading..."
      )}
</main>
// </>
    )
}