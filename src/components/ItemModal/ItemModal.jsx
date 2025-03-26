import "./ItemModal.css";
import { useContext } from "react";

function ItemModal({ activeModal, onClose, card, handleDeleteClick }) {

  const onDelete = () => {
    handleDeleteClick(card)
  }

  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content  modal__content_type_image">
        <button
          onClick={onClose}
          type="button"
          className="item-modal__close"
        ></button>
        <img src={card.link} alt="Modal__image" className="item-modal__image" />
        <div className="item-modal__footer">
          <h2 className="item-modal__caption">{card.name}</h2>
          <p className="item-modal__weather">Weather:{card.weather}</p>
        </div>
        <button 
        className="item-modal__delete-btn"
        type="button"
        onClick={onDelete}>
          Delete item
        </button>
      </div>
    </div>
  );
}

export default ItemModal;