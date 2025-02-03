const flipContainer = document.getElementById("flip-container");
const registerLink = document.getElementById("register-link");
const loginLink = document.getElementById("login-link");

registerLink.addEventListener("click", () => {
    flipContainer.classList.add("flip");
});

loginLink.addEventListener("click", () => {
    flipContainer.classList.remove("flip");
});
