import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import { defaultClothingItems } from "../../utils/constants";

function Profile({onCardClick, clothingItems, weatherData, handleAddClick}) {

  return (
    <div className="profile">
        <section className="profile__sidebar">
            <SideBar />
        </section>
        <section className="profile__clothing-items">
            <ClothesSection 
            clothingItems={clothingItems}
             onCardClick={onCardClick}
             handleAddClick={handleAddClick}
             weatherData={weatherData}
              />
        </section>
    </div>
  );
}

export default Profile;