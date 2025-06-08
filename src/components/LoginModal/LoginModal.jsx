import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LoginModal = ({
  onClose,
  isOpen,
  handleLogin,
  onClickRegister,
}) => {
  const [data, setData] = useState({
    email: "",
    password: "",
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
    handleLogin(data);
  };

  return (
    <ModalWithForm
      title="Log in"
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
    >
      <label className="modal__label">
        Email*
        <input
          type="email"
          name="email"
          id="login-modal-email"
          className="modal__input"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
        />
      </label>

      <label className="modal__label">
        Password*
        <input
          id="login-modal-password"
          className="modal__input"
          name="password"
          type="password"
          placeholder="password"
          value={data.password}
          onChange={handleChange}
        />
      </label>

      <div className="modal__login-container">
        <button className="modal__login-btn" onClick={onClose}>
          Log in
        </button>
        <button onClick={onClickRegister} className="modal__signup-btn">
          or Register
        </button>
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;