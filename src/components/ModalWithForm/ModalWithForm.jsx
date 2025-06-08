import "./ModalWithForm.css";
import closeBtn from "../../assets/closeBtn.svg";

function ModalWithForm({
  children, 
  buttonText, 
  title, 
  isOpen, 
  onClose,
  onSubmit
}) {
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
          >
          <img src={closeBtn} alt="close button" />
        </button>
        <form onSubmit={onSubmit} className="modal__form">
          {children}
        </form>
      </div>
    </div>
  );
}
export default ModalWithForm;
