import React from "react";
import dentistImage from "../../assets/images/dentistMain.png";
import Searchbox from "./Searchbox";

function Home() {
  return (
    <>
      {/* <Header /> will import it after creating header component  */}
      <div className="homeContainer bg-gray-200 w-full bg-gradient-to-br from-purple-600 via-pink-500 to-red-500">
        <div className="mainSection container flex  border-emerald-400">
          <div className="leftSection flex justify-center items-center border-red-100 ">
            <div className="searchWrapper flex justify-center items-center w-full md:w-1/2 p-4">
              <Searchbox />
            </div>
          </div>
          <div className="rightSection w-full md:w-1/2 p-4 flex justify-center items-center border-red-500 ">
            <img
              src={dentistImage}
              alt="Dentist"
              className="w-full h-auto rounded-md"
            />
          </div>
        </div>
      </div>

      
      {/* <Footer /> will import it after creating footer component  */}
    </>
  );
}

export default Home;
