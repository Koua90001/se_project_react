import React from "react";
import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";


function Profile({
  editProfileClick,
  logout,
  onCardClick, 
  clothingItems, 
  handleAddClick,
  currentUser, 
  handleCardLike,
  isLoggedIn
}) {
    return (
      <div className="profile">
        <section className="profile__sidebar">
          <SideBar editProfileClick={editProfileClick} logout={logout} />
        </section>
        <section className="profile__clothing-items">
          <ClothesSection
        clothingItems={clothingItems}
        onCardClick={onCardClick}
        handleAddClick={handleAddClick}
        handleCardLike={handleCardLike}
        currentUser={currentUser}
        isLoggedIn={isLoggedIn}
          />
        </section>
      </div>
    );
  }

export default Profile;