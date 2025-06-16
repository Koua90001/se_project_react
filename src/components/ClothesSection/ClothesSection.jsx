import React from "react";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";



const ClothesSection = ({
  onCardClick,
  clothingItems,
  handleCardLike,
  handleAddClick,
  isLoggedIn
}) => {

  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div className="clothes-section">
      <div className="clothes-section__items">
        <p className="clothes-section__item">Your Items</p>
        <button onClick={handleAddClick} className="clothes-section__btn">
          + Add New
        </button>
      </div>
      <ul className="clothes-section__list ">
        {clothingItems
          .filter((item) => item && item.owner === currentUser._id)
          .map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={onCardClick}
                onCardLike={handleCardLike}
                handleAddClick={handleAddClick} 
                isLoggedIn={isLoggedIn}
              />
            );
          })}
      </ul>
    </div>
  );
};
export default ClothesSection;