/* ═══════════════════════════════════════════════════
   IMPULSO WEB — JavaScript
═══════════════════════════════════════════════════ */

// ── HEADER SCROLL ──
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

// ── MOBILE MENU ──
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
menuToggle.addEventListener('click', () => {
  nav.classList.toggle('open');
  document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
});
nav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    nav.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ── SCROLL REVEAL ──
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

// Stagger children in grids
document.querySelectorAll('.services-grid, .nichos-grid, .portfolio-grid').forEach(grid => {
  grid.querySelectorAll('.reveal').forEach((el, i) => {
    el.dataset.delay = i * 80;
  });
});

revealEls.forEach(el => revealObserver.observe(el));

// ── CAROUSEL / TESTIMONIALS ──
const testimonials = document.querySelectorAll('.testimonial-card');
const dotsContainer = document.getElementById('carouselDots');
let currentPage = 0;
const perPage = window.innerWidth < 900 ? 1 : 3;
const totalPages = Math.ceil(testimonials.length / perPage);

function buildDots() {
  dotsContainer.innerHTML = '';
  for (let i = 0; i < totalPages; i++) {
    const dot = document.createElement('div');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goToPage(i));
    dotsContainer.appendChild(dot);
  }
}

function goToPage(page) {
  currentPage = (page + totalPages) % totalPages;
  const start = currentPage * perPage;
  testimonials.forEach((t, i) => {
    t.classList.toggle('active', i >= start && i < start + perPage);
  });
  document.querySelectorAll('.dot').forEach((d, i) => {
    d.classList.toggle('active', i === currentPage);
  });
}

function moveCarousel(dir) { goToPage(currentPage + dir); }

buildDots();
goToPage(0);

// Auto-advance
setInterval(() => moveCarousel(1), 5000);

// ── NICHE MODAL ──
const nichoData = {
  delivery: {
    emoji: '🍕',
    title: 'Delivery & Restaurantes',
    desc: 'Sites e landing pages especializados para o setor alimentício. Cardápio digital interativo, botão de pedido pelo WhatsApp e presença no Google Maps.',
    examples: [
      { name: 'Cardápio Online', desc: 'Página com todos os pratos e preços' },
      { name: 'Pedidos via WhatsApp', desc: 'Botão integrado para pedidos rápidos' },
      { name: 'Chat Bot', desc: 'Atendimento rápido por aqui!' },
      { name: 'Promoções do Dia', desc: 'Destaque seus combos e ofertas' },
    ]
  },
  representantes: {
    emoji: '💼',
    title: 'Representantes Comerciais',
    desc: 'Portfólio digital profissional para representantes. Catálogo de produtos, formulário de contato e página institucional para impressionar clientes.',
    examples: [
      { name: 'Catálogo Digital', desc: 'Seus produtos organizados e acessíveis' },
      { name: 'Portfólio de Clientes', desc: 'Mostre suas parcerias e marcas' },
      { name: 'Captação de Leads', desc: 'Formulário para novos contatos comerciais' },
      { name: 'Apresentação Profissional', desc: 'Sua credibilidade em formato digital' },
    ]
  },
  clinicas: {
    emoji: '🏥',
    title: 'Clínicas & Saúde',
    desc: 'Sites que transmitem confiança e profissionalismo para clínicas, consultórios e profissionais de saúde. Agendamento online e apresentação de serviços.',
    examples: [
      { name: 'Agendamento Online', desc: 'Consultas marcadas 24h por dia' },
      { name: 'Apresentação da Equipe', desc: 'Transmita credibilidade e confiança' },
      { name: 'Serviços e Especialidades', desc: 'Explique seus tratamentos' },
      { name: 'Depoimentos de Pacientes', desc: 'Prova social para novos clientes' },
    ]
  },
  barbearias: {
    emoji: '✂️',
    title: 'Barbearias & Beleza',
    desc: 'Sites modernos e estilosos para barbearias e salões. Galeria de trabalhos, agendamento online e divulgação nas redes sociais.',
    examples: [
      { name: 'Galeria de Trabalhos', desc: 'Mostre seus melhores cortes' },
      { name: 'Agendamento de Horários', desc: 'Clientes marcam sem ligar' },
      { name: 'Equipe de Barbeiros', desc: 'Perfil de cada profissional' },
      { name: 'Promoções e Planos', desc: 'Fidelização de clientes' },
    ]
  },
  lojas: {
    emoji: '🛍️',
    title: 'Lojas Locais',
    desc: 'Vitrine digital para sua loja. Catálogo de produtos online, vendas pelo WhatsApp e presença digital que aumenta suas vendas.',
    examples: [
      { name: 'Catálogo de Produtos', desc: 'Vitrine online com fotos e preços' },
      { name: 'Vendas pelo WhatsApp', desc: 'Botão de compra direto no site' },
      { name: 'Localização e Horários', desc: 'Facilite a visita presencial' },
      { name: 'Promoções e Novidades', desc: 'Divulgue ofertas automaticamente' },
    ]
  },
  outros: {
    emoji: '⚡',
    title: 'Outros Segmentos',
    desc: 'Atendemos qualquer tipo de negócio local! Seja qual for seu segmento, criamos soluções digitais personalizadas para seu público e objetivos.',
    examples: [
      { name: 'Academia & Fitness', desc: 'Planos, horários e captação de alunos' },
      { name: 'Advogados & Escritórios', desc: 'Site profissional e captação de clientes' },
      { name: 'Pet Shops', desc: 'Serviços, produtos e agendamento' },
      { name: 'Imobiliárias', desc: 'Portfólio de imóveis e captação de leads' },
    ]
  }
};

function openNicho(key) {
  const data = nichoData[key];
  if (!data) return;
  const modal = document.getElementById('nichoModal');
  const content = document.getElementById('modalContent');
  content.innerHTML = `
    <div class="modal-emoji">${data.emoji}</div>
    <h2>${data.title}</h2>
    <p>${data.desc}</p>
    <div class="modal-examples">
      ${data.examples.map(e => `
        <div class="modal-example">
          <h4>${e.name}</h4>
          <span>${e.desc}</span>
        </div>
      `).join('')}
    </div>
    <a href="https://wa.me/5531988077126?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Impulso%20Web%20e%20tenho%20interesse%20em%20um%20site%20para%20${encodeURIComponent(data.title)}." target="_blank" class="btn btn-gold" style="width:100%;justify-content:center">
      Quero um site para ${data.title} →
    </a>
  `;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeNicho(event) {
  if (event && event.target !== document.getElementById('nichoModal')) return;
  document.getElementById('nichoModal').classList.remove('open');
  document.body.style.overflow = '';
}
// Allow close button to work without event arg
document.querySelector('.modal-close')?.addEventListener('click', () => {
  document.getElementById('nichoModal').classList.remove('open');
  document.body.style.overflow = '';
});

// ── CHATBOT ──
let chatOpen = false;

function toggleChat() {
  chatOpen = !chatOpen;
  const box = document.querySelector('.chatbot-box');
  const iconOpen = document.getElementById('chatIconOpen');
  const iconClose = document.getElementById('chatIconClose');
  box.classList.toggle('open', chatOpen);
  iconOpen.style.display = chatOpen ? 'none' : 'block';
  iconClose.style.display = chatOpen ? 'block' : 'none';
}

const botAnswers = {
  contato: {
    q: '📱 Qual o contato?',
    a: 'Você pode falar conosco diretamente pelo WhatsApp: <a href="https://wa.me/5531988077126" target="_blank" style="color:var(--gold)"><strong>(31) 98807-7126</strong></a>. Respondemos em minutos! 🚀'
  },
  funciona: {
    q: '⚙️ Como funciona?',
    a: 'É simples! Primeiro entendemos seu negócio e objetivos. Depois criamos um site profissional personalizado para atrair mais clientes. Você acompanha tudo e aprova antes de publicar. ✅'
  },
  preco: {
    q: '💰 Quanto custa um site?',
    a: 'O valor varia conforme o projeto. Trabalhamos com planos acessíveis para negócios locais. <a href="https://wa.me/5531988077126?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20o%20pre%C3%A7o%20de%20um%20site." target="_blank" style="color:var(--gold)">Clique aqui</a> para receber um orçamento personalizado e gratuito! 💛'
  },
  prazo: {
    q: '⏱️ Qual o prazo de entrega?',
    a: 'Normalmente um site simples fica pronto entre 3 e 7 dias úteis. Projetos maiores podem levar de 10 a 15 dias. Trabalhamos com agilidade sem abrir mão da qualidade! ⚡'
  }
};

function askBot(key) {
  const answer = botAnswers[key];
  if (!answer) return;

  // For contato, redirect directly to WhatsApp
  if (key === 'contato') {
    window.open('https://wa.me/5531988077126', '_blank');
    return;
  }

  const messages = document.getElementById('chatMessages');

  // User message
  const userMsg = document.createElement('div');
  userMsg.className = 'chat-msg user';
  userMsg.innerHTML = `<span>${answer.q}</span>`;
  messages.appendChild(userMsg);

  // Typing indicator
  const typingMsg = document.createElement('div');
  typingMsg.className = 'chat-msg bot';
  typingMsg.innerHTML = `<span style="opacity:0.5">digitando...</span>`;
  messages.appendChild(typingMsg);
  messages.scrollTop = messages.scrollHeight;

  setTimeout(() => {
    typingMsg.innerHTML = `<span>${answer.a}</span>`;
    messages.scrollTop = messages.scrollHeight;
  }, 900);
}

// ── CONTACT FORM ──
function submitForm(e) {
  e.preventDefault();
  const name = document.getElementById('formName').value;
  const email = document.getElementById('formEmail').value;
  const msg = document.getElementById('formMsg').value;
  const btn = e.target.querySelector('button[type=submit]');
  btn.textContent = 'Enviando...';
  btn.disabled = true;

  // Simulate send + redirect to WhatsApp
  setTimeout(() => {
    const waMsg = encodeURIComponent(`Olá! Meu nome é ${name} (${email}). ${msg}`);
    document.getElementById('formSuccess').style.display = 'block';
    btn.textContent = 'Enviado com sucesso! ✓';
    // Open WhatsApp with form data
    setTimeout(() => {
      window.open(`https://wa.me/5531988077126?text=${waMsg}`, '_blank');
    }, 800);
  }, 1200);
}

// ── ACTIVE NAV HIGHLIGHT ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav#nav a');
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${entry.target.id}`
          ? 'var(--gold)' : '';
      });
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => navObserver.observe(s));
