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
  const token = localStorage.getItem("jwt");

  const data = await fetchData(token, userNameQuery);
  console.log("data =====>", data.data.data.user[0]);

  const user = data.data.data.user[0];
  const firstName = user.firstName 
  const lastName = user.lastName 

  greetingDiv.innerText = `Welcome, ${firstName} ${lastName}`;
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
// You need to do at least two different statistic graphs for the data given
// Your profile must display three pieces of information which you may choose