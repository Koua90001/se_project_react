const baseUrl = "http://localhost:3001";

export function request(url, options) {
  return fetch(url, options).then(checkResponse);
}
export function checkResponse(res) {
  if (res.ok) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }
}
function getItems() {
  return request(`${baseUrl}/items`);
}
function addItem(item, token) {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
    body: JSON.stringify(item),
  });
}
function deleteItem(item) {

  return request(`${baseUrl}/items/${item._id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
  });
}
function signup(data) {
  return request(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
function signin(email, password) {
  return request(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
}
function checkToken(token) {
  return request(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
  });
}
function updateUserProfile(token, userData) {
  return request(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
    body: JSON.stringify(userData),
  });
}
function addCardLike(id, token, userId) {
  return request(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
    body: JSON.stringify({ userId: userId })
  });
}
function removeCardLike(id, token) {
  return request(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
  });
}
export {
  getItems,
  addItem,
  deleteItem,
  signup,
  signin,
  checkToken,
  updateUserProfile,
  addCardLike,
  removeCardLike,
  
};