export function darkMode() {
  const toggleBtn = document.getElementById("darkModeToggle");

  if (!toggleBtn) return;

  // Set initial icon
  updateDarkModeIcon();

  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    updateDarkModeIcon();
  });

  function updateDarkModeIcon() {
    toggleBtn.innerHTML = document.body.classList.contains("dark")
      ? '<i class="fa-solid fa-sun"></i>'
      : '<i class="fa-solid fa-moon"></i>';
  }
}
