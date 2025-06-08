import "./ItemModal.css";
import { useContext } from "react";
import closeBtn from "../../assets/closeBtn.svg";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemModal({ activeModal, onClose, selectedCard, handleDeleteClick }) {
  const { currentUser }   = useContext(CurrentUserContext);
  const isOwn = selectedCard.owner === currentUser._id; 
  const onDelete = () => {
    handleDeleteClick()
  }

  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content  modal__content_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
        >
          <img src={closeBtn} alt="close button" />
        </button>
        <img 
        src={selectedCard.link || selectedCard.imageUrl} 
        alt="Modal__image" 
        className="item-modal__image" 
        />
        <div className="item-modal__footer">
          <h2 className="item-modal__caption">{selectedCard.name}</h2>
          <p className="item-modal__weather">Weather:{selectedCard.weather}</p>
        </div>
        {isOwn && (
        <button 
        className="item-modal__delete-btn"
        type="button"
        onClick={onDelete}>
          Delete item
        </button>
        )}
      </div>
    </div>
  );
}

export default ItemModal;