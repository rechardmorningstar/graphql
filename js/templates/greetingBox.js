import { fetchData } from "../fetchData.js";

export async function greetingBox(token, query) {
  const app = document.getElementById("app");
  const data = await fetchData(token, query);
  const greetingDiv = document.createElement("div");
  greetingDiv.className = "greeting-user";
  const user = data.data.data.user[0];
  const firstName = user.firstName;
  const lastName = user.lastName;

  greetingDiv.innerText = `Welcome, ${firstName} ${lastName}`;
  app.appendChild(greetingDiv);
}