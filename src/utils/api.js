
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

function deleteItem(card) {
  return fetch(`${baseUrl}/items/${card}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(checkResponse);
}

export { getItems, addItem, deleteItem };