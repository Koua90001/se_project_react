const TOKEN_KEY = "jwt";
import { baseUrl } from "./constants";

export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => { 
  localStorage.removeItem(TOKEN_KEY); 
}

export const checkToken = (token = getToken()) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return res.json().then((err) => {
      throw err;
    });
  });
};