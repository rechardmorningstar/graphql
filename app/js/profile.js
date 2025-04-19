import { logout } from "./logout.js";
import { auditAndLevelQuery, graphUrl, userNameQuery } from "./const.js";

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
  const data = await fetchData(token, userNameQuery);
  const greetingDiv = document.createElement("div");
  greetingDiv.className = "greeting-user";
  const user = data.data.data.user[0];
  const firstName = user.firstName;
  const lastName = user.lastName;
  greetingDiv.innerText = `Welcome, ${firstName} ${lastName}`;
  app.appendChild(greetingDiv);

  // fetching level
  const auditAndLevelData = await fetchData(token, auditAndLevelQuery);
  const level =
  auditAndLevelData.data.data.transaction_aggregate.aggregate.max.amount;
  const levelDiv = document.createElement("div");
  levelDiv.className = "levelDiv";
  levelDiv.style.border = "2px solid black";

  levelDiv.innerHTML = /*html*/ `
                        <div>level </div>
                        <svg height="100" width="100">
                          <circle r="45" cx="50" cy="50" fill="transparent" stroke="black" stroke-width="10" />
                          <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="20" fill="black">${level}</text>
                        </svg>
  `;
  app.appendChild(levelDiv);

  // audit ratio
  const auditData = await fetchData(token, auditAndLevelQuery)
  const auditBox = document.createElement("div");
  auditBox.className = "auditBox";
  auditBox.style.border = "2px solid black";

  const received = auditData.data.data.user[0].totalDown
  const done = auditData.data.data.user[0].totalUp
  const auditRatio = auditData.data.data.user[0].auditRatio
 

  auditBox.innerHTML = /*html*/`
                <div class="audit-ratio">Audits ratio</div>
                <div class="box" style="width:300px;">
              	<div>Done</div>
                <div class="line1"> 
                  <svg height="50" width="294">
                    <line x1="5" y1="10" x2="294" y2="10" style="stroke:red;stroke-width:12" />
                  </svg>
                  <div class="prs">${String(done)[0]}.${String(done)[1]}</div>
                </div>
                <div>Received</div>
                <div class="line2"> 
                  <svg height="50" width="294">
                    <line x1="5" y1="10" x2="250" y2="10" style="stroke:red;stroke-width:12" />
                  </svg>
                  <div class="prs">${String(received)[0]}.${String(received)[1]}</div>
                </div>
                <div class="ratio">${String(auditRatio).slice(0, 3)}</div>
              </div>
  `;
  app.appendChild(auditBox)
  console.log(
    "auditData =====>",
    auditData.data.data.user[0].totalDown
  );
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
// add dark mode to the circle
