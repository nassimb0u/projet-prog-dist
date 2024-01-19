// Recent.jsx

import React, { useState, useEffect } from "react";
import Heading from "../../common/Heading";
import RecentCard from "./RecentCard";
import { fetchData } from "../../data/Data";

const Recent = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        const apiData = await fetchData();
        setData(apiData);
      } catch (error) {
        setError("Une erreur s'est produite lors de la récupération des données.");
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchDataFromAPI();
  }, []); // Le tableau vide signifie que cet effet s'exécute une seule fois lors du montage du composant
// TestData.js



  return (
    <>
      <section className='recent padding'>
        <div className='container'>
          <Heading title='Recent Property Listed' subtitle='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.' />
          {error ? (
            <p style={{ color: "red", textAlign: "center" }}>{error}</p>
          ) : (
            <RecentCard data={data} />
          )}
        </div>
      </section>
    </>
  );
};

export default Recent;
