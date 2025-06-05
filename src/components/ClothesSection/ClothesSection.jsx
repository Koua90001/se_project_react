import React from "react";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

const ClothesSection = ({
  onCardClick,
  clothingItems,
  handleCardClick,
  onCardLike,
  
}) => {
  return (
    <div className="clothes-section">
      <div className="clothes-section__items">
        <p className="clothes-section__item">Your Items</p>
        <button onClick={handleCardClick} className="clothes-section__btn">
          + Add New
        </button>
      </div>
      <ul className="clothes-section__list ">
        {clothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
            />
          );
        })}
      </ul>
    </div>
  );
};
export default ClothesSection;