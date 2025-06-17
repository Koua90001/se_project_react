const baseUrl = "http://localhost:3001";

export function request(url, options) {
  return fetch(url, options).then(checkResponse);
}
export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((err) => {
    throw err; 
  });
}
function getItems(token = localStorage.getItem("jwt")) {
  return request(`${baseUrl}/items`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });

}
function addItem(item, token) {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token || localStorage.getItem('jwt')}`,
    },
    body: JSON.stringify(item),
  });
}
function deleteItem(item, token) {

  return request(`${baseUrl}/items/${item._id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
}

function updateUserProfile(token, userData) {
  return request(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token || localStorage.getItem('jwt')}`,
    },
    body: JSON.stringify(userData),
  });
}
function addCardLike(id, token, userId) {
  return request(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token || localStorage.getItem('jwt')}`,
    },
    body: JSON.stringify({ userId: userId })
  });
}
function removeCardLike(id, token) {
  return request(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token || localStorage.getItem('jwt')}`,
    },
  });
}
export {
  getItems,
  addItem,
  deleteItem,
  updateUserProfile,
  addCardLike,
  removeCardLike,
  
};