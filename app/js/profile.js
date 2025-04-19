import { logout } from "./logout.js";
import { graphUrl, userNameQuery } from "./const.js";

export async function Profile() {
  const header = document.getElementById("hdr");
  let btn = document.createElement("button");
  btn.id = "logoutBtn";
  btn.innerHTML = /*html*/ `<i class="fa-solid fa-right-from-bracket"></i> logout`;
  header.appendChild(btn);

  logout();

  const app = document.getElementById("app");

  // greeting user
  const greetingDiv = document.createElement("div");
  greetingDiv.className = "greeting-user";

  // Fetch user data and update greeting
  const token = localStorage.getItem("jwt").trim();
  
  console.log("Token format check:", token ? token.split('.').length : "No token");


  const data = await fetchData(token, userNameQuery);
  greetingDiv.innerText = `welocme, ${data.user}`;
  app.appendChild(greetingDiv);
}

async function fetchData(token, query) {
    try {
        const resp = await fetch(graphUrl, {
          method: "post",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ query }),
        });
    
        const data = await resp.json();
        if (!resp.ok) {
          return { success: false, err: data.error };
        }
    
        return { success: true, data };
      } catch (err) {
        return { success: false, err };
      }
}


