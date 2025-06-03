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

// Elementos do DOM
const quizForm = document.getElementById("quiz-form");
const resultContainer = document.getElementById("result-container");
const scoreText = document.getElementById("score-text");
const feedbackMessage = document.getElementById("feedback-message");
const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress-text");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const submitBtn = document.getElementById("submit-btn");
const restartBtn = document.getElementById("restart-btn");
const quizContainer = document.getElementById("quiz-container");

// Estado do quiz
let currentQuestion = 0;
let userAnswers = [];
let questionBlocks = [];

// Inicializar quiz
function initializeQuiz() {
  createQuestions();
  showQuestion(0);
  updateProgress();
  updateButtons();
}

// Criar todas as perguntas
function createQuestions() {
  quizForm.innerHTML = '';
  questionBlocks = [];

  quizQuestions.forEach((item, index) => {
    const questionBlock = document.createElement("div");
    questionBlock.className = "question-block";
    questionBlock.id = `question-${index}`;

    const questionTitle = document.createElement("h3");
    questionTitle.textContent = `${index + 1}. ${item.question}`;
    questionBlock.appendChild(questionTitle);

    item.options.forEach((option, i) => {
      const label = document.createElement("label");
      const input = document.createElement("input");
      
      input.type = "radio";
      input.name = `question${index}`;
      input.value = i;
      input.addEventListener('change', () => {
        handleAnswerChange(index, i);
        updateSelectedOption(questionBlock, label);
      });

      label.appendChild(input);
      label.append(` ${option}`);
      questionBlock.appendChild(label);
    });

    questionBlocks.push(questionBlock);
    quizForm.appendChild(questionBlock);
  });
}

// Mostrar pergunta específica
function showQuestion(index) {
  // Esconder todas as perguntas
  questionBlocks.forEach(block => {
    block.classList.remove('active');
  });

  // Mostrar pergunta atual
  if (questionBlocks[index]) {
    questionBlocks[index].classList.add('active');
  }

  currentQuestion = index;
  updateProgress();
  updateButtons();
}

// Atualizar resposta do usuário
function handleAnswerChange(questionIndex, answerIndex) {
  userAnswers[questionIndex] = answerIndex;
  updateButtons();
}

// Atualizar opção selecionada visualmente
function updateSelectedOption(questionBlock, selectedLabel) {
  // Remover seleção de todas as labels
  const labels = questionBlock.querySelectorAll('label');
  labels.forEach(label => label.classList.remove('selected'));
  
  // Adicionar seleção à label atual
  selectedLabel.classList.add('selected');
}

// Atualizar barra de progresso
function updateProgress() {
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
  progressBar.style.setProperty('--progress-width', `${progress}%`);
  progressText.textContent = `Pergunta ${currentQuestion + 1} de ${quizQuestions.length}`;
}

// Atualizar botões de navegação
function updateButtons() {
  // Botão anterior
  prevBtn.disabled = currentQuestion === 0;
  
  // Botão próximo
  const isLastQuestion = currentQuestion === quizQuestions.length - 1;
  
  if (isLastQuestion) {
    nextBtn.style.display = 'none';
    submitBtn.style.display = 'inline-block';
  } else {
    nextBtn.style.display = 'inline-block';
    submitBtn.style.display = 'none';
  }
  
  // Verificar se a pergunta atual foi respondida
  const currentAnswered = userAnswers[currentQuestion] !== undefined;
  nextBtn.disabled = !currentAnswered;
  
  // Verificar se todas as perguntas foram respondidas para habilitar submit
  const allAnswered = userAnswers.length === quizQuestions.length && 
                      userAnswers.every(answer => answer !== undefined);
  submitBtn.disabled = !allAnswered;
}

// Navegação entre perguntas
function goToPreviousQuestion() {
  if (currentQuestion > 0) {
    showQuestion(currentQuestion - 1);
  }
}

function goToNextQuestion() {
  if (currentQuestion < quizQuestions.length - 1 && userAnswers[currentQuestion] !== undefined) {
    showQuestion(currentQuestion + 1);
  }
}

// Finalizar quiz
function finishQuiz() {
  let score = 0;

  quizQuestions.forEach((item, index) => {
    if (userAnswers[index] === item.correct) {
      score++;
    }
  });

  // Esconder container do quiz
  quizContainer.style.display = "none";
  
  // Mostrar resultados
  resultContainer.classList.remove("hidden");
  document.getElementById("progress-container").style.display = "none";

  scoreText.textContent = `Sua pontuação: ${score} de ${quizQuestions.length}`;

  // Feedback baseado na pontuação
  let feedback = "";
  const percentage = (score / quizQuestions.length) * 100;

  if (percentage <= 40) {
    feedback = "É hora de aprender mais sobre enchentes! 📚 Informação também salva vidas. Continue estudando e se preparando.";
  } else if (percentage <= 70) {
    feedback = "Você está no caminho certo! 👍 Continue se informando sobre prevenção de enchentes para proteger sua comunidade.";
  } else {
    feedback = "Parabéns! Você é um verdadeiro agente da prevenção! 🌟 Compartilhe seu conhecimento e ajude a salvar vidas.";
  }

  feedbackMessage.textContent = feedback;
}

// Reiniciar quiz
function restartQuiz() {
  currentQuestion = 0;
  userAnswers = [];
  
  // Mostrar elementos do quiz
  quizContainer.style.display = "block";
  document.getElementById("progress-container").style.display = "block";
  resultContainer.classList.add("hidden");
  
  // Limpar seleções
  const allInputs = document.querySelectorAll('input[type="radio"]');
  allInputs.forEach(input => input.checked = false);
  
  const allLabels = document.querySelectorAll('label');
  allLabels.forEach(label => label.classList.remove('selected'));
  
  // Reinicializar
  showQuestion(0);
}

// Event listeners
prevBtn.addEventListener("click", goToPreviousQuestion);
nextBtn.addEventListener("click", goToNextQuestion);
submitBtn.addEventListener("click", finishQuiz);
restartBtn.addEventListener("click", restartQuiz);

// Navegação por teclado
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft' && !prevBtn.disabled) {
    goToPreviousQuestion();
  } else if (e.key === 'ArrowRight' && !nextBtn.disabled) {
    goToNextQuestion();
  } else if (e.key === 'Enter' && !submitBtn.disabled && submitBtn.style.display !== 'none') {
    finishQuiz();
  }
});

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', initializeQuiz);
