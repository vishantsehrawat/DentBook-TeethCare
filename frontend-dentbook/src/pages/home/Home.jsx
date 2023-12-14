import React from "react";
import dentistImage from "../../assets/images/dentistMain.png";
import Searchbox from "./Searchbox";

function Home() {
  return (
    <>
      {/* <Header /> will import it after creating header component  */}
      <div className="bg-gray-200 w-full bg-gradient-to-br from-purple-600 via-pink-500 to-red-500">
        <div className="mainContainer flex h-screen border-red-800 border-6">
          <div className="leftSection flex w-2/4 justify-center items-center border-green-500 border ">
            <div className="searchWrapper flex justify-center items-center w-full md:w-1/2 p-4">
              <Searchbox />
            </div>
          </div>
          <div className="rightSection w-2/4 md:w-1/2 p-4 flex justify-center items-center border border-yellow-500">
            <img
              src={dentistImage}
              alt="Dentist"
              className="rounded-md h-96"
            />
          </div>
        </div>
      </div>

      {/* <Footer /> will import it after creating footer component  */}
    </>
  );
}

export default Home;
