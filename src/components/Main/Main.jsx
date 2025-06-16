import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureunit";
import { useContext } from "react";


function Main({ 
  weatherData, 
  onCardClick, 
  clothingItems, 
  handleCardLike,
  handleAddClick,
  isLoggedIn
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <p className="cards__text">
        Today is {weatherData.temp[currentTemperatureUnit]} &deg; {currentTemperatureUnit} / You may want to wear:
      </p>
      <section className="cards">
        <ul className="cards__list">
          {clothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={`${item._id}-${Math.random()}`}
                  item={item}
                  onCardClick={onCardClick}
                  onCardLike={handleCardLike}
                  handleAddClick={handleAddClick}
                  isLoggedIn={isLoggedIn}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;