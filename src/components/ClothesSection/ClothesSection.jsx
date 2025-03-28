import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({onCardClick, clothingItems, handleAddClick, weatherData}) {
  return (
    <div className="clothes-section">
        <div className="clothes-section__text-container">
        <p className="clothes-section__your-items">Your items</p>
        <button 
        onClick={handleAddClick}
        type="button"
        className="clothes-section__add-btn"
        >
          + Add New 
          </button>
        </div>
        <ul className="clothes-section__items">
  {clothingItems &&
    clothingItems.map((item, index) => (
      <ItemCard
        key={`${item._id}-${index}`}
        item={item}
        onCardClick={onCardClick}
        />
      ))}
        </ul>
    </div>
  );
}

export default ClothesSection;