import React from "react";
import closeBtn from "../../assets/closeBtn.svg";

const ConfirmDeleteModal = ({
  handleCloseClick,
  isOpen,
  onConfirmDeleteClick,
}) => {
  return (
    <div className={`modal modal__delete ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal_content modal_content_type_delete">
        <button
          onClick={handleCloseClick}
          type="button"
          className="modal__close"
        >
          <img src={closeBtn} alt="close button" />
        </button>
        <div className="modal__delete-box">
          <p className="modal__delete-description">
            Are you sure you want to delete this item?
            <span>This action is irreversible.</span>
          </p>
          <button
            onClick={onConfirmDeleteClick}
            type="button"
            className="modal__delete-confirm"
          >
            Yes, delete item
          </button>
          <button
            onClick={handleCloseClick}
            type="button"
            className="modal__delete-cancel"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;