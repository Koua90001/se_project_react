//import "./AddItemModal.css"
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";

export default function AddItemModal({onClose, isOpen, onAddItemModalSubmit}) {


const [name, setName]  = useState("");
const [imageUrl, setImageUrl] = useState("");
const [weather, setWeather] = useState("");


const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };  


  const handleWeathgerChange = (e) => {
    setWeather(e.target.value);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItemModalSubmit({name, imageUrl, weather});
    setName("");
    setImageUrl("");
    setWeather("");
  };



     return ( 
            <ModalWithForm
          isOpen={isOpen}
          title="New garment"
          buttonText="Add garment"
          onClose={onClose}
          onSubmit={handleSubmit}
        >
          <label htmlFor="name" className="modal__label">
            Name{" "}
            <input
              type="text"
              className="modal__input modal__input_type_card-name"
              id="clothing-name"
              placeholder="Name"
              required
              minLength="1"
              maxLength="30"
              onChange= {handleNameChange}
              value = {name}
            />
          </label>
          <label htmlFor="imageUrl" className="modal__label">
            Image{" "}
            <input
              type="url"
              name="link"
              className="modal__input modal__input_type_url"
              id="clothing-link"
              placeholder="image URL"
              required
              onChange = {handleImageUrlChange}
              value={imageUrl}
            />
          </label>
          <fieldset className="modal__radio-buttons">
            <legend className="modal__legend">Select the weather type:</legend>
            <label
              htmlFor="hot"
              className="modal__label modal__label_type_radio"
            >
              <input
                id="hot"
                type="radio"
                name="weather"
                className="modal__radio-input"
                value="hot"
                onChange={handleWeathgerChange}
                checked={weather === "hot"}
              />
              Hot
            </label>
            <label
              htmlFor="warm"
              className="modal__label modal__label_type_radio"
            >
              <input
                id="warm"
                type="radio"
                name="weather"
                className="modal__radio-input"
                value="warm"
                onChange={handleWeathgerChange}
                checked={weather === "warm"}
              />
              Warm
            </label>
            <label
              htmlFor="cold"
              className="modal__label modal__label_type_radio"
            >
              <input
                id="cold"
                type="radio"
                name="weather"
                className="modal__radio-input"
                value="cold"
                onChange={handleWeathgerChange}
                checked={weather === "cold"}
              />
              Cold
            </label>
          </fieldset>
          <button type="submit" className="modal__add-btn">
        Add garment
      </button>
        </ModalWithForm>
)
}