import { logout } from "./logout.js";
import { auditAndLevelQuery, skillsQuery, userNameQuery, xpQuery } from "./const.js";
import { greetingBox } from "./templates/greetingBox.js";
import { levelBox } from "./templates/levelBox.js";
import { userSkills } from "./templates/skillsGraph.js";
import { xpBox } from "./templates/xpBox.js";
import { AuditRatio } from "./templates/auditRatio.js";

export async function Profile() {
  const header = document.getElementById("hdr");
  let btn = document.createElement("button");
  btn.id = "logoutBtn";
  btn.innerHTML = /*html*/ `<i class="fa-solid fa-right-from-bracket"></i> logout`;
  header.appendChild(btn);

  const token = localStorage.getItem("jwt");
  const app = document.getElementById("app");
  
  logout();
  await greetingBox(token, userNameQuery); // greeting user
  
  const container = document.createElement('div')
  container.className = "container";
  app.appendChild(container)

  const left_boxe = document.createElement("div");
  left_boxe.className = "left-boxe";
  left_boxe.classList.add('half')
  container.appendChild(left_boxe);

  const right_boxe = document.createElement("div");
  right_boxe.className = "right-boxe";
  right_boxe.classList.add('half')
  container.appendChild(right_boxe);
  
  await levelBox(token, auditAndLevelQuery); // displaying level
    
  await xpBox(token, xpQuery); // xp section

  await userSkills(token, skillsQuery) // skills section

  await AuditRatio(token, auditAndLevelQuery) // audit box
}


