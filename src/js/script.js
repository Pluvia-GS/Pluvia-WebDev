let imagens = [
  '/src/assets/banner.png',
  '/src/assets/area-alagada.png',
  '/src/assets/voluntarios.png'
];

let i = 0;
let tempo = 5000;

function slideShow() {
  const banner = document.getElementById('banner-container');
  banner.style.backgroundImage = `url('${imagens[i]}')`;
  i++;
  if (i === imagens.length) {
    i = 0;
  }
  setTimeout(slideShow, tempo);
}

slideShow();

