import { fetchData } from "../fetchData.js";

export async function userSkills(token, query) {
    const app = document.getElementById("app");
    const result = await fetchData(token, query);
    const transactions = result?.data?.data?.user?.[0]?.transactions || [];
    const maxMap = new Map();
  
    for (const tx of transactions) {
      const { type, amount } = tx;
      if (!maxMap.has(type) || amount > maxMap.get(type)) {
        maxMap.set(type, amount);
      }
    }
  
    function getSkillBar() {
      const sortedSkills = [...maxMap.entries()]
        .map(([type, amount]) => ({ type: type.replace("skill_", ""), amount }))
        .sort((a, b) => b.amount - a.amount);
  
      const barSVGs = sortedSkills
        .map((skill) => {
          const percent = Math.min(skill.amount, 60); // max 100 for visual
  
          return /*html*/ `
                <div class="skill-bar">
                    <p class="skill-name">${skill.type}</p>
                    <svg class="bar-widit" width="60%" height="24">
                        <rect width="60%" height="24" fill="#e5e7eb" rx="12" />
                        <rect width="${percent}%" height="24" fill="black" rx="12" />
                    </svg>
                    <span class="skill-percent">${skill.amount}</span>
                </div>
            `;
        })
        .join("");
  
      return /*html*/ `
        <div class="project-section skill-bar-wrapper">
            <p class="stat-title">Skill Levels</p>
            <div class="skill-bar-container">
                ${barSVGs}
            </div>
        </div>
    `;
    }
  
    const skillBars = getSkillBar();
    const sDiv = document.createElement("div");
  
    sDiv.className = 'widit'
    sDiv.innerHTML = skillBars;
    sDiv.style.border = "2px solid black";
    app.appendChild(sDiv);
  }
  