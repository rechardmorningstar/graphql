import { logout } from "./logout.js";
import { auditAndLevelQuery, userNameQuery } from "./const.js";
import { greetingBox, levelBox, auditBox } from "./templates.js";

export async function Profile() {
  const header = document.getElementById("hdr");
  let btn = document.createElement("button");
  btn.id = "logoutBtn";
  btn.innerHTML = /*html*/ `<i class="fa-solid fa-right-from-bracket"></i> logout`;
  header.appendChild(btn);

  logout();

  const app = document.getElementById("app");
  const token = localStorage.getItem("jwt");

  // greeting user
  await greetingBox(token, userNameQuery)

  // displaying level
  await levelBox(token, auditAndLevelQuery)


  // displaying audit ratio
  await auditBox(token, auditAndLevelQuery)


  // xp section
  const xpDiv = document.createElement("div");
  xpDiv.className = "xpDiv";
  xpDiv.innerText = "630k";
  xpDiv.style.border = "2px solid black";
  app.appendChild(xpDiv)

}

// You need to do at least two different statistic graphs for the data given
// Your profile must display three pieces of information which you may choose
// add dark mode to the circle
