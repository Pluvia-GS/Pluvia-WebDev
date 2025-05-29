document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const subject = document.getElementById('subject');
  const message = document.getElementById('message');
  const formMessage = document.getElementById('formMessage');

  formMessage.textContent = '';
  formMessage.style.color = 'red';

  if (!name.value.trim()) {
    formMessage.textContent = 'Por favor, preencha o nome.';
    name.focus();
    return;
  }

  if (!email.value.trim()) {
    formMessage.textContent = 'Por favor, preencha o e-mail.';
    email.focus();
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.value.trim())) {
    formMessage.textContent = 'Por favor, insira um e-mail válido.';
    email.focus();
    return;
  }

  if (!subject.value.trim()) {
    formMessage.textContent = 'Por favor, preencha o assunto.';
    subject.focus();
    return;
  }

  if (!message.value.trim()) {
    formMessage.textContent = 'Por favor, preencha a mensagem.';
    message.focus();
    return;
  }

  formMessage.style.color = 'green';
  formMessage.textContent = 'Formulário enviado com sucesso!';


});
