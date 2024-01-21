import React, { useState } from "react";
import Heading from "../../common/Heading";
import axios from 'axios'; // Import Axios at the beginning of your file

import "./hero.css";
const Hero = () => {
  const [formData, setFormData] = useState({
    CRIM: "",
    ZN: "",
    INDUS: "",
    CHAS: "",
    NOX: "",
    RM: "",
    AGE: "",
    DIS: "",
    RAD: "",
    TAX: "",
    PTRATIO: "",
    B: "",
    LSTAT: "",
    save: false, // Ajout de la variable save
  });
  const [showPopup, setShowPopup] = useState(false);
  const [predictedPrice, setPredictedPrice] = useState(null);
  const [saveData, setSaveData] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  // Fonction pour gérer le changement d'état de la sauvegarde
const handleSaveToggle = () => {
  setSaveData(!saveData);
  setFormData({
    ...formData,
    save: !saveData,
  });
}; const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const element = document.querySelector('#post-request-async-await .article-id');


    
    const response = await fetch('http://127.0.0.1:8000/predict-price', {
      method: 'POST'  ,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
            body: JSON.stringify(formData)
  });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Server error: ${response.status} - ${errorData.message}`);
    }

    const data = await response.json(); // Analyser la réponse JSON

    setPredictedPrice(data.MEDV);
    setShowPopup(true);

    // Update your UI element with the predicted price
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    setShowErrorPopup(true);
  } finally {
    setLoading(false);
  }
};
const closePopup = () => {
  setShowPopup(false);
  setPredictedPrice(null);
};

const closeErrorPopup = () => {
  setShowErrorPopup(false);
};

  return (
    <>
      <section className="hero">

        <div className="container">
          <Heading title="Add Your Home " />

          <form className="flex" onSubmit={handleSubmit}>
          <div className="row">
  <div className="box">
    <span>CRIM</span>
    <input
      type="text"
      name="CRIM"
      placeholder="CRIM"
      value={formData.CRIM}
      onChange={handleChange}
    />
  </div>
  <div className="box">
    <span>ZN</span>
    <input
      type="text"
      name="ZN"
      placeholder="ZN"
      value={formData.ZN}
      onChange={handleChange}
    />
  </div>
  <div className="box">
    <span>INDUS</span>
    <input
      type="text"
      name="INDUS"
      placeholder="INDUS"
      value={formData.INDUS}
      onChange={handleChange}
    />
  </div>
</div>
          <div className="row">
  <div className="box">
    <span>CHAS</span>
    <input
      type="text"
      name="CHAS"
      placeholder="CHAS"
      value={formData.CHAS}
      onChange={handleChange}
    />
  </div>
  <div className="box">
    <span>RM</span>
    <input
      type="text"
      name="RM"
      placeholder="RM"
      value={formData.RM}
      onChange={handleChange}
    />
  </div>
  <div className="box">
    <span>NOX</span>
    <input
      type="text"
      name="NOX"
      placeholder="NOX"
      value={formData.NOX}
      onChange={handleChange}
    />
  </div>
</div>
<div className="row">
  <div className="box">
    <span>AGE</span>
    <input
      type="text"
      name="AGE"
      placeholder="AGE"
      value={formData.AGE}
      onChange={handleChange}
    />
  </div>
  <div className="box">
    <span>   DIS</span>
    <input
      type="text"
      name="DIS"
      placeholder="DIS"
      value={formData.DIS}
      onChange={handleChange}
    />
  </div>
  <div className="box">
    <span>   RAD</span>
    <input
      type="text"
      name="RAD"
      placeholder="RAD"
      value={formData.RAD}
      onChange={handleChange}
    />
  </div>
</div>
<div className="row">
  <div className="box">
    <span>TAX</span>
    <input
      type="text"
      name="TAX"
      placeholder="TAX"
      value={formData.TAX}
      onChange={handleChange}
    />
  </div>
  <div className="box">
    <span>PTRATIO</span>
    <input
      type="text"
      name="PTRATIO"
      placeholder="PTRATIO"
      value={formData.PTRATIO}
      onChange={handleChange}
    />
  </div>
  <div className="box">
    <span>B</span>
    <input
      type="text"
      name="B"
      placeholder="B"
      value={formData.B}
      onChange={handleChange}
    />
  </div>
</div>
<div className="row">
  <div className="box">
    <span>LSTAT</span>
    <input
      type="text"
      name="LSTAT"
      placeholder="LSTAT"
      value={formData.LSTAT}
      onChange={handleChange}
    />
  </div>

  
</div>


            <div className="row">
            <div className="box">
                {/* Case à cocher pour enregistrer les données */}
                <label>
                  <input
                    type="checkbox"
                    checked={saveData}
                    onChange={handleSaveToggle}
                  />
                  Enregistrer les données
                </label>

              </div>
              <div className="box">
                {/* Adjust styling for the button if needed */}
                <button type="submit" className="btn1">
                  Envoyer
                </button>
              </div>
              <div className="scroll-arrow-container">
                <div className="scroll-arrow-circle">
                    <div className="scroll-arrow">↓</div>
                </div>
              </div>
            </div>
          </form>
          {/* Pop-up */}
          {/* Affichage du spinner pendant le chargement */}
      {loading && <div className="loading-spinner"></div>}
      {showPopup && (
        <div className="row">

        <div className="popup">
          <div className="popup-content">
            <p>Prix prédit : {predictedPrice}</p>
            <button onClick={closePopup}>Fermer</button>
          </div>
        </div>

        </div>
      )}
      {showErrorPopup && (
                <div className="row">

  <div className="error-popup">
    <div className="error-popup-content">
      <p>Une erreur s'est produite lors de la communication avec l'API.</p>
      <button onClick={closeErrorPopup}>Fermer</button>
    </div>
  </div>
  </div>

)}


        </div>
      </section>
    </>
  );
};

export default Hero;
