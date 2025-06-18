import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Profile from "../Profile/Profile";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import { setToken, getToken, removeToken, checkToken } from "../../utils/token";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import Footer from "../Footer/Footer";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureunit";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import {
  getItems,
  addItem,
  deleteItem,
  updateUserProfile,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import { signup, signin } from "../../utils/auth";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });

  const [clothingItems, setClothingItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    password: "",
    _id: "",
    avatar: "",
  });
  
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = getToken() 

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (selectedCard) => {
    setActiveModal("preview");
    setSelectedCard(selectedCard);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const editProfileClick = () => {
    setActiveModal("edit-profile");
  };

  const onSignUp = (data) => {
    setIsLoading(true);
    return signup(data)
      .then((currentUser) => {
        return signin(data).then((response) => {
          const token = response.token;
          setToken(token);
          return checkToken(token).then((user) => {
            setCurrentUser(user);
            setIsLoggedIn(true);
            closeActiveModal();
          });
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };
  const onAddItem = (item) => {
    setIsLoading(true);
    const token = getToken();
    return addItem(item, token)
      .then((newItem) => {
        setClothingItems((prevItems) => [newItem, ...prevItems]);
        closeActiveModal();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };

  const handleDeleteItem = () => {
    console.log("selectedCard:", selectedCard);

    const token = getToken();
    if (!token) {
      console.error("No authentication token found");
      setError("Please log in to delete items");
      return;
    }

    if (!selectedCard || !selectedCard._id) {
      console.error("No valid item selected for deletion");
      setError("No item selected for deletion");
      return;
    }

    console.log("Token:", token);
    console.log("Deleting item with ID:", selectedCard._id);

    setIsLoading(true);

    deleteItem(selectedCard, token)
      .then((response) => {
        console.log("Delete response:", response);

        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== selectedCard._id)
        );

        setSelectedCard({});
        closeActiveModal();

        console.log("Item deleted successfully");
      })
      .catch((err) => {
        console.error("Error deleting item:", err);
        setError(err.message || "Failed to delete item. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleDeleteClick = () => {
    const token = localStorage.getItem("jwt");
    deleteItem(selectedCard, token)
      .then((res) => {
        const updatedItems = clothingItems.filter((item) => {
          return item._id !== selectedCard._id;
        });
        setClothingItems(updatedItems);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    const token = getToken();
    addItem({ name, imageUrl, weather }, token)
      .then((response) => {
        const newItem = response.data;
  
        if (!newItem || !newItem._id) throw new Error("Invalid item returned");
        setClothingItems((prev) => [newItem, ...prev]);
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Failed to add item:", err);
      });
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = getToken();
    getItems(token)
      .then((data) => {
        setClothingItems(data.reverse());
      })
      .catch((err) => {
        console.error("Error fetching items:", err);
        setError("Unable to fetch items. Please log in.");
      });
  }, [isLoggedIn]);

  const handleEditProfile = ({ name, avatar }) => {
    const token = getToken();
    updateUserProfile(token, { name, avatar })
      .then((res) => {
        const updatedUser = res.user || res; 
        setCurrentUser(updatedUser);
        closeActiveModal();
      })
      .catch((err) => setError(err.message || "Name and avatar required."));
  };


  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      setError("email and password are required.");
      return;
    }
    signin({ email, password }).then((data) => {
      if (data.token) {
        setToken(data.token);
        checkToken(data.token) 
          .then((data) => {
            setIsLoggedIn(true);
            setCurrentUser(data);
            closeActiveModal();
            const redirectPath = location.state?.from?.pathname || "/profile";
            navigate(redirectPath);
          })
          .catch((err) => {
            console.error("Error fectching user info:", err);
            setIsLoggedIn(false);
            setError("Session expired.  Please log in again.");
          });
      }
    });
  };
  const logout = () => {
    removeToken();
    setCurrentUser({});
    setIsLoggedIn(false);
    navigate("/");
  };
  const handleRegisterClick = () => {
    setActiveModal("Sign Up");
  };
  const handleLoginClick = () => {
    setActiveModal("login");
  };

  useEffect(() => {
    const jwt = getToken();
    if (!jwt) return;
    checkToken(jwt)
      .then((data) => {
        setIsLoggedIn(true);
        setCurrentUser(data);
        const redirectPath = location.state?.from?.pathname || "/profile";
        navigate(redirectPath);
      })
      .catch((err) => {
        console.error("Error fectching user info:", err);
        setIsLoggedIn(false);
        setError("Session expired.  Please log in again.");
      });
  }, [isLoggedIn]);

  const handleCardLike = ({ id, isLiked }) => {
    const token = getToken();
    if (!token) {
      console.warn("User must be logged in to like");
      return;
    }
  
    const action = isLiked ? removeCardLike : addCardLike;
  
    action(id, token, currentUser._id)
      .then((res) => {
        console.log("Like response:", res);
        const updatedCard = res?.likedItem || res; 
        if (!updatedCard || !updatedCard._id) {
          console.warn("Invalid card returned");
          return;
        }
        setClothingItems((cards) =>
          cards.map((item) => (item._id === id ? updatedCard : item))
        );
      })
      .catch((err) => console.log("Like error:", err));
  };

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn }}
    >
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page">
            <div className="page__content">
              <Header
                handleLoginClick={handleLoginClick}
                handleRegisterClick={handleRegisterClick}
                handleAddClick={handleAddClick}
                weatherData={weatherData}
                isLoggedIn={isLoggedIn}
              />
              <Routes>
                <Route
                  path="/"
                  element={
                    <Main
                      weatherData={weatherData}
                      onCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handleCardLike={handleCardLike}
                      handleAddClick={handleAddClick}
                      isLoggedIn={isLoggedIn}
                    />
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                      <Profile
                        editProfileClick={editProfileClick}
                        onCardClick={handleCardClick}
                        clothingItems={clothingItems}
                        handleCardLike={handleCardLike}
                        currentUser={currentUser}
                        handleAddClick={handleAddClick}
                        logout={logout}
                        isLoggedIn={isLoggedIn}
                      />
                    </ProtectedRoute>
                  }
                />
              </Routes>

              <Footer />
            </div>
            <AddItemModal
              onClose={closeActiveModal}
              isOpen={activeModal === "add-garment"}
              onAddItemModalSubmit={handleAddItemModalSubmit}
              
            />
            <ItemModal
              activeModal={activeModal}
              selectedCard={selectedCard}
              onClose={closeActiveModal}
              onClick={handleCardClick}
              handleDeleteClick={handleDeleteClick}
            />
            <RegisterModal
              isOpen={activeModal === "Sign Up"}
              onClose={closeActiveModal}
              signup={onSignUp}
              handleLoginClick={handleLoginClick}
            />
            <LoginModal
              isOpen={activeModal === "login"}
              onClose={closeActiveModal}
              handleLogin={handleLogin}
              onClickRegister={handleRegisterClick}
            />
            <ConfirmDeleteModal
              onClose={closeActiveModal}
              isOpen={activeModal === "delete"}
              onConfirmDeleteClick={handleDeleteItem}
            />
            <EditProfileModal
              isOpen={activeModal === "edit-profile"}
              onClose={closeActiveModal}
              editProfileClick={editProfileClick}
              handleEditProfile={handleEditProfile}
            />
          </div>
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
