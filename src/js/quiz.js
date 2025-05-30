const quizQuestions = [
  {
    question: "Qual é uma das principais causas das enchentes urbanas?",
    options: ["Falta de árvores em zonas rurais", "Excesso de construções em áreas de risco", "Presença de lagos e rios", "Altas temperaturas"],
    correct: 1,
  },
  {
    question: "Como o desmatamento contribui para as enchentes?",
    options: ["Aumentando a evaporação", "Diminuindo a infiltração da água no solo", "Reduzindo a temperatura do ar", "Melhorando a drenagem"],
    correct: 1,
  },
  {
    question: "O que é essencial para evitar alagamentos em áreas urbanas?",
    options: ["Construções altas", "Calçadas largas", "Sistema de drenagem eficiente", "Asfalto mais escuro"],
    correct: 2,
  },
  {
    question: "Qual é um dos impactos das enchentes?",
    options: ["Melhora na fertilidade do solo urbano", "Redução na poluição", "Deslocamento de famílias", "Aumento no turismo local"],
    correct: 2,
  },
  {
    question: "Como a comunidade pode ajudar na prevenção de enchentes?",
    options: ["Ignorando alertas", "Jogando lixo nas ruas", "Participando de mutirões de limpeza", "Construindo casas em áreas de risco"],
    correct: 2,
  },
  {
    question: "O que deve ser evitado durante uma enchente?",
    options: ["Atravessar áreas alagadas", "Manter documentos secos", "Ouvir orientações", "Ter um kit de emergência"],
    correct: 0,
  },
  {
    question: "Qual tecnologia pode ajudar na prevenção de desastres?",
    options: ["Monitoramento climático", "Iluminação pública", "Sinalização turística", "Câmeras de segurança"],
    correct: 0,
  },
  {
    question: "Por que a água da enchente é perigosa?",
    options: ["É potável", "Contém resíduos e doenças", "É usada para irrigação", "Refresca o ambiente"],
    correct: 1,
  },
  {
    question: "O que representa uma boa prática urbana para evitar enchentes?",
    options: ["Asfaltar margens de rios", "Reflorestar encostas", "Canalizar rios sem planejamento", "Construir estacionamentos"],
    correct: 1,
  },
  {
    question: "Qual atitude salva vidas em enchentes?",
    options: ["Filmar o evento", "Esperar o nível da água subir", "Planejar rotas de fuga", "Usar redes sociais"],
    correct: 2,
  }
];

const quizForm = document.getElementById("quiz-form");
const resultContainer = document.getElementById("result-container");
const scoreText = document.getElementById("score-text");
const feedbackMessage = document.getElementById("feedback-message");

quizQuestions.forEach((item, index) => {
  const questionBlock = document.createElement("div");
  questionBlock.className = "question-block";

  const questionTitle = document.createElement("h3");
  questionTitle.textContent = `${index + 1}. ${item.question}`;
  questionBlock.appendChild(questionTitle);

  item.options.forEach((option, i) => {
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.type = "radio";
    input.name = `question${index}`;
    input.value = i;
    label.appendChild(input);
    label.append(` ${option}`);
    questionBlock.appendChild(label);
    questionBlock.appendChild(document.createElement("br"));
  });

  quizForm.appendChild(questionBlock);
});

document.getElementById("submit-btn").addEventListener("click", () => {
  let score = 0;

  quizQuestions.forEach((item, index) => {
    const selected = document.querySelector(`input[name="question${index}"]:checked`);
    if (selected && parseInt(selected.value) === item.correct) {
      score++;
    }
  });

  quizForm.style.display = "none";
  resultContainer.classList.remove("hidden");

  scoreText.textContent = `Sua pontuação: ${score} de 10`;

  if (score <= 4) {
    feedbackMessage.textContent = "É hora de aprender mais. Informação também salva vidas.";
  } else if (score <= 7) {
    feedbackMessage.textContent = "Você está no caminho! Continue se informando.";
  } else {
    feedbackMessage.textContent = "Você é um agente da prevenção. Compartilhe o que sabe!";
  }
});
