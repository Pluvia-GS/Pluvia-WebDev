let imagens = [
  "/src/assets/banner.png",
  "/src/assets/area-alagada.png",
  "/src/assets/voluntarios.png",
];

let i = 0;
let tempo = 5000;

function slideShow() {
  const banner = document.getElementById("banner-container");
  banner.style.backgroundImage = `url('${imagens[i]}')`;
  i++;
  if (i === imagens.length) {
    i = 0;
  }
  setTimeout(slideShow, tempo);
}

slideShow();

const toggleBtn = document.getElementById("menu-toggle");
const menu = document.querySelector("#menu nav ul");

toggleBtn.addEventListener("click", () => {
  if (menu.style.display === "flex") {
    menu.style.display = "none";
  } else {
    menu.style.display = "flex";
  }
});

const buttons = document.querySelectorAll(".theme-btn");

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const color = btn.getAttribute("data-color");
    document.body.style.backgroundColor = color;
  });
});
