import { React, useState, useContext, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const EditProfileModal = ({ onClose, isOpen, handleEditProfile }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const [userData, setUserData] = useState({
    name: currentUser.name || "",
    avatar: currentUser.avatar || "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((preProfile) => ({
      ...preProfile,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleEditProfile(userData);
  };
  useEffect(() => {
    if (currentUser) {
      setUserData({
        name: currentUser.name,
        avatar: currentUser.avatar,
      });
    }
  }, [currentUser]);
  return (
    <ModalWithForm
      title="edit-profile"
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      handleEditProfile={handleEditProfile}
    >
      <label className="modal__label">
        name*
      <input
        type="text"
        name="name"
        id="edit-profile-name"
        className="modal__input"
        placeholder="name"
        value={userData.name}
        onChange={handleChange}
      />
      </label>
      <label className="modal__label">
        avatar*
        <input
          id="edit-profile-avatar"
          className="modal__input"
          name="avatar"
          type="url"
          placeholder="avatar"
          value={userData.avatar}
          onChange={handleChange}
        />
      </label>
      <button type="submit" className="modal__save-button">
        Save changes
      </button>
    </ModalWithForm>
  );
};
export default EditProfileModal;