import"./ItemCard.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import likeButton from "../../assets/day/likeButton.png";
import darkLikeButton from "../../assets/day/darkLikeButton.png";

function ItemCard({ item, onCardClick, onCardLike }) {
  const handleCardClick = () => {
    onCardClick(item);
  };
  const currentUser = useContext(CurrentUserContext);
  const isLiked = item.likes?.some((userId) => userId === currentUser._id) || false;
  
  const handleLike = () => {
    onCardLike({ id: item._id, isLiked: isLiked });
  };

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <button onClick={handleLike} className="card__like-button">
          <img
            src={isLiked ? darkLikeButton : likeButton}
            alt="card like"
            className="card__like"
          />
        </button>
        
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.link || item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}
export default ItemCard;