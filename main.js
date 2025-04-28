import { HandleLogin } from "./js/login.js";
import { Profile } from "./js/profile.js";

document.addEventListener("DOMContentLoaded", async () => {
  await handleRoutes();
});

function auth() {
  const token = localStorage.getItem("jwt");
  return token !== null && token !== "";
}

async function handleRoutes() {
  const path = window.location.pathname;
  const isAuth = auth();
  let targetPath;

  if (isAuth && path !== "/") {
    targetPath = "/";
  } else if (!isAuth) {
    targetPath = "/login";
  } else if (router[path]) {
    return await router[path]();
  } else {
    targetPath = "/login";
  }

  history.pushState(null, null, targetPath);
  await router[targetPath]();
}

const router = {
  "/login": HandleLogin,
  "/": Profile,
};

document.addEventListener("click", async (event) => {
  const link = event.target.closest("[data-link]");
  if (link) {
    event.preventDefault();
    const path = link.getAttribute("href");
    history.pushState(null, null, path);
    await handleRoutes();
  }
});

window.addEventListener("popstate", async () => {
  await handleRoutes();
});

