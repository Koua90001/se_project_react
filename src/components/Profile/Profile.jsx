import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import { defaultClothingItems } from "../../utils/constants";

function Profile({
  editProfileClick,
  logout,
  onCardClick, 
  clothingItems, 
  currentUser, 
  handleCardLike}) {
    return (
      <div className="profile">
        <section className="profile__sidebar">
          <SideBar editProfileClick={editProfileClick} logout={logout} />
        </section>
        <section className="profile__clothing-items">
          <ClothesSection
        clothingItems={clothingItems}
        onCardClick={onCardClick}
        handleCardClick={onCardClick}
        handleCardLike={handleCardLike}
        currentUser={currentUser}
          />
        </section>
      </div>
    );
  }

export default Profile;