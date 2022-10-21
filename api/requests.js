import axios from "./axios";

const API_KEY = "AIzaSyBax1XFWr1OYyqNxC9GjzmVI0zkjWIBk64";

export async function createUser(email, password) {
  const { data } = await axios.post("/accounts:signUp?key=" + API_KEY, {
    email: email,
    password: password,
    returnSecureToken: true,
  });
  return data.idToken;
}

export async function login(email, password) {
  const { data } = await axios.post(
    "/accounts:signInWithPassword?key=" + API_KEY,
    {
      email: email,
      password: password,
      returnSecureToken: true,
    }
  );
  return data.idToken;
}
