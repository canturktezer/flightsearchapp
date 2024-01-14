import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Search from "../../components/search/Search";
import Services from "../../components/services/Services";

const Homepage = () => {
  return (
    <>
      <Navbar />
      <Search />
      <Services />
    </>
  );
};

export default Homepage;
