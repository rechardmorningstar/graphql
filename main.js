import { HandleLogin } from "./js/login.js";
import { Profile } from "./js/profile.js";

function auth() {
  const token = localStorage.getItem("jwt");
  return token !== null && token !== "";
}

document.addEventListener("DOMContentLoaded", async () => {
  const isAuthenticated =  auth();
  if (isAuthenticated) {
    await Profile();
  } else {
     HandleLogin(); 
  }
});