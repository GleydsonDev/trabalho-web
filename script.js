// ================================================
//   PORTFÓLIO - GLEYDSON RANIERY
//   Arquivo: script.js
//   Descrição: Interações e validações em JavaScript puro
// ================================================


// ================================================
// 1. MENU RESPONSIVO (hamburguer)
// Faz o menu aparecer/desaparecer em dispositivos móveis
// ================================================

// Seleciona os elementos do menu pelo id
const menuToggle = document.getElementById('menuToggle');
const navLinks   = document.getElementById('navLinks');

// Adiciona o evento de clique no botão hamburguer
menuToggle.addEventListener('click', function() {
  // Alterna a classe 'aberto' na lista de links
  // Quando 'aberto' está presente, o CSS exibe o menu
  navLinks.classList.toggle('aberto');
});

// Fecha o menu ao clicar em qualquer link (melhoria de usabilidade no mobile)
const todosOsLinks = document.querySelectorAll('.nav-links a');
todosOsLinks.forEach(function(link) {
  link.addEventListener('click', function() {
    navLinks.classList.remove('aberto');
  });
});


// ================================================
// 2. ALTERNADOR DE TEMA (claro / escuro)
// Permite ao usuário escolher entre tema claro e escuro
// ================================================

const temaBtn = document.getElementById('temaBtn');

temaBtn.addEventListener('click', function() {
  // Alterna a classe 'tema-escuro' no body
  // O CSS usa essa classe para aplicar as cores escuras via variáveis CSS
  // Padrão é escuro; ao clicar ativa tema claro
  document.body.classList.toggle('tema-claro');

  // Muda o ícone do botão conforme o tema ativo
  if (document.body.classList.contains('tema-claro')) {
    temaBtn.textContent = '🌙'; // Ícone de lua — clica para voltar ao escuro
  } else {
    temaBtn.textContent = '☀️'; // Ícone de sol — clica para ir ao claro
  }
});


// ================================================
// 3. VALIDAÇÃO DO FORMULÁRIO DE CONTATO
// Verifica os campos antes de "enviar" a mensagem
// ================================================

// Seleciona o formulário de contato
const formulario = document.getElementById('formContato');

// Aguarda o evento de envio do formulário
formulario.addEventListener('submit', function(evento) {

  // Impede o comportamento padrão do formulário (que recarregaria a página)
  evento.preventDefault();

  // Pega o valor de cada campo, removendo espaços extras com trim()
  const nome     = document.getElementById('nome').value.trim();
  const email    = document.getElementById('email').value.trim();
  const mensagem = document.getElementById('mensagem').value.trim();

  // Limpa mensagens de erro anteriores antes de validar novamente
  document.getElementById('erroNome').textContent     = '';
  document.getElementById('erroEmail').textContent    = '';
  document.getElementById('erroMensagem').textContent = '';

  // Variável que controla se o formulário é válido
  let formularioValido = true;

  // --- Validação do campo Nome ---
  if (nome === '') {
    // Se o nome estiver vazio, exibe mensagem de erro e marca como inválido
    document.getElementById('erroNome').textContent = 'Por favor, informe seu nome.';
    formularioValido = false;
  }

  // --- Validação do campo E-mail ---
  if (email === '') {
    document.getElementById('erroEmail').textContent = 'Por favor, informe seu e-mail.';
    formularioValido = false;
  } else {
    // Valida o formato do e-mail usando uma expressão regular
    // A expressão verifica: texto@texto.texto
    const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formatoEmail.test(email)) {
      document.getElementById('erroEmail').textContent = 'E-mail inválido. Use o formato: usuario@dominio.com';
      formularioValido = false;
    }
  }

  // --- Validação do campo Mensagem ---
  if (mensagem === '') {
    document.getElementById('erroMensagem').textContent = 'Por favor, escreva sua mensagem.';
    formularioValido = false;
  }

  // --- Se todos os campos estiverem válidos ---
  if (formularioValido) {
    // Simula o envio: limpa os campos do formulário
    formulario.reset();

    // Exibe a mensagem de sucesso (estava com display:none no CSS)
    const msgSucesso = document.getElementById('mensagemSucesso');
    msgSucesso.style.display = 'block';

    // Oculta a mensagem de sucesso automaticamente após 5 segundos
    setTimeout(function() {
      msgSucesso.style.display = 'none';
    }, 5000);
  }
});


// ================================================
// 4. ROLAGEM SUAVE AO CLICAR NOS LINKS DO MENU
// Faz a página rolar suavemente até a seção clicada
// ================================================

// Seleciona todos os links que apontam para âncoras (href começa com #)
const linksAncora = document.querySelectorAll('a[href^="#"]');

linksAncora.forEach(function(link) {
  link.addEventListener('click', function(evento) {
    evento.preventDefault(); // Impede o comportamento padrão (pulo brusco)

    // Pega o id da seção alvo a partir do href do link (ex: "#sobre" → "sobre")
    const alvo = document.querySelector(this.getAttribute('href'));

    if (alvo) {
      // Calcula a posição da seção, descontando a altura do menu fixo (65px)
      const posicao = alvo.getBoundingClientRect().top + window.pageYOffset - 65;

      // Rola a página suavemente até a seção
      window.scrollTo({
        top: posicao,
        behavior: 'smooth'
      });
    }
  });
});


// ================================================
// 5. EFEITO DIGITANDO NO TÍTULO
// Simula o texto sendo digitado letra por letra
// ================================================

// Texto que será "digitado" na tela
const textoDigitando = 'Olá! Sou Gleydson Raniery 👋';
const elementoTitulo = document.getElementById('titulo-digitando');
let indiceLetra = 0; // Controla qual letra está sendo digitada

function digitar() {
  if (indiceLetra < textoDigitando.length) {
    // Adiciona uma letra por vez ao elemento
    elementoTitulo.textContent += textoDigitando.charAt(indiceLetra);
    indiceLetra++;
    setTimeout(digitar, 70); // 70ms entre cada letra
  }
}

// Inicia o efeito assim que a página carrega
digitar();


// ================================================
// 6. FADE-IN AO ROLAR A PÁGINA
// Cards aparecem suavemente conforme o usuário rola
// ================================================

// Adiciona a classe 'fade-in' em todos os cards automaticamente
const todosOsCards = document.querySelectorAll('.card, .sobre-card, .projeto');
todosOsCards.forEach(function(card) {
  card.classList.add('fade-in');
});

// IntersectionObserver: detecta quando o elemento entra na área visível da tela
const observador = new IntersectionObserver(function(entradas) {
  entradas.forEach(function(entrada) {
    if (entrada.isIntersecting) {
      // Quando o card entra na tela, adiciona 'visivel' para acionar o CSS
      entrada.target.classList.add('visivel');
    }
  });
}, { threshold: 0.15 }); // Dispara quando 15% do card está visível

// Aplica o observador em cada card
todosOsCards.forEach(function(card) {
  observador.observe(card);
});


// ================================================
// 7. BARRAS DE HABILIDADES ANIMADAS
// Anima a largura das barras quando entram na tela
// ================================================

const barras = document.querySelectorAll('.barra-preenchimento');

const observadorBarras = new IntersectionObserver(function(entradas) {
  entradas.forEach(function(entrada) {
    if (entrada.isIntersecting) {
      // Lê o valor do atributo data-nivel (ex: 85) e define a largura em %
      const nivel = entrada.target.getAttribute('data-nivel');
      entrada.target.style.width = nivel + '%';
      // Para de observar após animar (evita repetição)
      observadorBarras.unobserve(entrada.target);
    }
  });
}, { threshold: 0.3 });

barras.forEach(function(barra) {
  observadorBarras.observe(barra);
});
