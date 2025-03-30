
import { checkResponse } from "../utils/utils";
const baseUrl = "http://localhost:3001";


function getItems() {
  return fetch(`${baseUrl}/items`).then(checkResponse);
}

function addItem({name, weather, imageUrl}) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({name, weather, imageUrl}),
  }).then(checkResponse);
}

function deleteItem(id) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then(checkResponse)
  .catch((error) => console.error('Error deleting item:', error));
}

export { getItems, addItem, deleteItem };