const themeButton = document.querySelector(".themes__toggle");

const toggleTheme = () => {
  themeButton.classList.toggle("themes__toggle--isActive");
};
const toggleThemeWithEnter = (event) => {
  event.key === "Enter" && toggleTheme();
};

themeButton.addEventListener("keydown", (e) => toggleThemeWithEnter(e));

themeButton.addEventListener("click", toggleTheme);
