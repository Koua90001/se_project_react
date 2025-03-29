import { useEffect, useState } from "react";
import {Routes, Route} from "react-router-dom";

import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Profile from "../Profile/Profile";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import Footer from "../Footer/Footer";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureunit";
import AddItemModal from "../AddItemModal/AddItemModal";
import { defaultClothingItems } from "../../utils/constants";
import { getItems, addItem, deleteItem } from "../../utils/api";


function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });

  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
 

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F"? "C":"F");
  }

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleDeleteClick = (card) => {
    deleteItem(card._id)
    .then((res) => {
      const updatedItems = clothingItems.filter((item) => {
        return item._id !== card._id;
      });
      setClothingItems(updatedItems);
      closeActiveModal();
    })
    .catch(console.error);
  };


  useEffect(() => {

    if (!activeModal) return; // stop the effect not to add the listener if there is no active modal

    const handleEscClose = (e) => {  // define the function inside useEffect not to lose the reference on rerendering
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {  // don't forget to add a clean up function for removing the listener
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal])

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleAddItemModalSubmit = (({ name, imageUrl, weather}) => {
    addItem({ name, imageUrl, weather })
    .then((data) => {
      setClothingItems((prev) => [data, ...prev]);
    closeActiveModal();
  })
    .catch(console.error);
}, []);


  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
    .then((data) => {
      setClothingItems(data);
    })
    .catch(console.error);
  }, []);

  console.log({selectedCard})

  return (
    <CurrentTemperatureUnitContext.Provider 
    value= {{currentTemperatureUnit, handleToggleSwitchChange}}
    >
      <div className="page">
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route 
            path="/" 
            element={
            <Main 
          weatherData={weatherData} 
          onCardClick={handleCardClick} 
          clothingItems={clothingItems} />} 
          />
            <Route 
            path="/profile" 
            element={<Profile 
              onCardClick={handleCardClick}
              handleAddClick={handleAddClick}
              clothingItems={clothingItems}
              weatherData={weatherData}
             />} 
             />
          </Routes>

          <Footer />
        </div>
        <AddItemModal 
        onClose={closeActiveModal}
        isOpen={activeModal === "add-garment"}
        onAddItemModalSubmit={handleAddItemModalSubmit}

        />
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onClose={closeActiveModal}
          handleDeleteClick={handleDeleteClick}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
    
  );
}


export default App;
