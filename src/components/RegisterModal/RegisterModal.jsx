import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterModal = ({
  handleCloseClick,
  isOpen,
  signup,
  handleLoginClick,
}) => {
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(data);
  };
  return (
    <ModalWithForm
      title="Sign Up"
      onSubmit={handleSubmit}
      isOpen={isOpen}
      handleCloseClick={handleCloseClick}
      handleLoginClick={handleLoginClick}
    >
      <label className="modal__label">
        Email*
        <input
          type="text"
          name="email"
          id="register-modal-email"
          className="modal__input"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
          autoComplete="email"
        />
      </label>
      <label className="modal__label">
        Password*
        <input
          id="register-modal-password"
          className="modal__input"
          name="password"
          type="password"
          placeholder="password"
          value={data.password}
          onChange={handleChange}
          autoComplete="password"
        />
      </label>
      <label className="modal__label">
        Name
        <input
          id="register-modal-name"
          className="modal__input"
          name="name"
          type="text"
          placeholder="Name"
          value={data.name}
          onChange={handleChange}
          autoComplete="username"
        />
      </label>
      <label className="modal__label">
        Avatar
        <input
          id="register-modal-avatar"
          className="modal__input"
          name="avatar"
          type="url"
          placeholder="Avatar URL"
          value={data.avatar}
          onChange={handleChange}
          autoComplete="url"
        />
      </label>
      <div className="modal__login-container">
        <button type="submit" className="modal__next-btn">
          next
        </button>
        <button
          onClick={handleLoginClick}
          type="button"
          className="modal__register-login"
        >
          {" "}
          or Log in
        </button>
      </div>
    </ModalWithForm>
  );
};
export default RegisterModal;