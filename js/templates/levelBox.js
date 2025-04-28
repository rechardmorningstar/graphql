import { fetchData } from "../fetchData.js";

export async function levelBox(token, query) {
  const lb = document.querySelector(".left-boxe");
  const auditAndLevelData = await fetchData(token, query);
  const level =
    auditAndLevelData.data.data.transaction_aggregate.aggregate.max.amount;
  const levelDiv = document.createElement("div");
  levelDiv.className = "levelDiv";
  levelDiv.classList.add('card')
  levelDiv.style.border = "2px solid black";

  levelDiv.innerHTML = /*html*/ `
  <div class="lvlHeader">level</div>
   <div class="lvlCircle">${level}</div>
    `;
  lb.appendChild(levelDiv);
}