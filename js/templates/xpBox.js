import { fetchData } from "../fetchData.js";

export async function xpBox(token, query) {
  const rb = document.querySelector(".right-boxe");
  const xpData = await fetchData(token, query);

  const xpDiv = document.createElement("div");
  xpDiv.className = "xpDiv";
  xpDiv.classList.add('card')
  xpDiv.style.border = "2px solid black";
  const xpValue =
    xpData.data.data.transaction_aggregate.aggregate.sum.amount / 1000;

  xpDiv.innerHTML = /*html*/ `
  <div class="xpValue">${xpValue} k</div>
  <div class="transactions-box">
    <!-- transaction containers -->
  </div>
  `;
  rb.appendChild(xpDiv);

  // transactons container
  const transBox = document.querySelector(".transactions-box");
  const txData = xpData.data.data.transaction;

  txData.forEach((t) => {
    const transaction_container = document.createElement("div");
    transaction_container.className = "transaction_container";

    const pathSpan = document.createElement("span");
    pathSpan.className = "pathSpan";
    const p = formatPath(t.path);
    pathSpan.innerText = `${p}`; // project/exam
    transaction_container.appendChild(pathSpan);

    const amountSpan = document.createElement("span");
    amountSpan.className = "amountSpan";
    amountSpan.textContent = `${t.amount / 1000} k`; // xp
    transaction_container.appendChild(amountSpan);

    const dateSpan = document.createElement("span");
    dateSpan.className = "dateSpan";
    const d = new Date(t.createdAt).toLocaleDateString("en-GB");
    dateSpan.textContent = `${d}`; // date
    transaction_container.appendChild(dateSpan);

    transBox.appendChild(transaction_container);
  });
}

function formatPath(path) {
  if (path.includes("checkpoint")) {
    return path.slice(25);
  }
  return path.slice(14);
}