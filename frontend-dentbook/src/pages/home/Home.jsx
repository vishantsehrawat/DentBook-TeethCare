import React from "react";
import dentistImage from "../../assets/images/dentistMain.png";
import Searchbox from "./Searchbox";
import "./Home.module.css";

function Home() {
  return (
    <>
      {/* <Header /> will import it after creating header component  */}
      <div className="homeContainer bg-gray-200 w-full">
        <div className="mainSection container flex mx-auto py-8">
          <div className="leftSection flex flex-col md:flex-row">
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
