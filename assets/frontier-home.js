(() => {
  const qs = (s, p = document) => p.querySelector(s);
  const qsa = (s, p = document) => Array.from(p.querySelectorAll(s));

  const menuButton = qs('[data-menu-button]');
  const mobileNav = qs('[data-mobile-nav]');
  if (menuButton && mobileNav) {
    menuButton.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });
    qsa('a', mobileNav).forEach((link) => link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    }));
  }

  qsa('[data-faq]').forEach((item) => {
    const button = qs('[data-faq-button]', item);
    if (!button) return;
    button.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');
      qsa('[data-faq]').forEach((node) => {
        node.classList.remove('open');
        const btn = qs('[data-faq-button]', node);
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });
      if (!wasOpen) {
        item.classList.add('open');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });

  const chatLaunch = qs('[data-chat-launch]');
  const chatPanel = qs('[data-chat-panel]');
  const chatClose = qs('[data-chat-close]');
  const chatForm = qs('[data-chat-form]');
  const chatInput = qs('[data-chat-input]');
  const chatBody = qs('[data-chat-body]');
  const chatEndpoint = 'https://saudi-whatsapp-chatbot-production.up.railway.app/web-chat';
  const rtl = document.documentElement.dir === 'rtl';

  const sessionId = (() => {
    const key = 'autoapply_sa_static_chat_session';
    try {
      const existing = localStorage.getItem(key);
      if (existing) return existing;
      const value = `autoapply-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
      localStorage.setItem(key, value);
      return value;
    } catch {
      return `autoapply-${Date.now()}`;
    }
  })();

  const addMessage = (text, role) => {
    if (!chatBody) return;
    const node = document.createElement('div');
    node.className = `chat-message ${role}`;
    node.textContent = text;
    chatBody.appendChild(node);
    chatBody.scrollTop = chatBody.scrollHeight;
  };

  const openChat = () => {
    if (!chatPanel) return;
    chatPanel.classList.add('open');
    chatLaunch?.setAttribute('aria-expanded', 'true');
    setTimeout(() => chatInput?.focus(), 50);
  };
  const closeChat = () => {
    chatPanel?.classList.remove('open');
    chatLaunch?.setAttribute('aria-expanded', 'false');
  };

  chatLaunch?.addEventListener('click', () => chatPanel?.classList.contains('open') ? closeChat() : openChat());
  chatClose?.addEventListener('click', closeChat);
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeChat(); });

  if (chatForm && chatInput) {
    chatForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const message = chatInput.value.trim();
      if (!message) return;
      addMessage(message, 'user');
      chatInput.value = '';
      chatInput.disabled = true;
      const loadingText = rtl ? 'جاري الرد…' : 'Thinking…';
      const loading = document.createElement('div');
      loading.className = 'chat-message bot';
      loading.textContent = loadingText;
      chatBody?.appendChild(loading);
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 15000);
        const response = await fetch(chatEndpoint, {
          method: 'POST',
          mode: 'cors',
          credentials: 'omit',
          signal: controller.signal,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message, session_id: sessionId }),
        });
        clearTimeout(timeout);
        const data = await response.json().catch(() => null);
        loading.remove();
        if (!response.ok || !data || typeof data.reply !== 'string' || !data.reply.trim()) throw new Error('no reply');
        addMessage(data.reply.trim(), 'bot');
      } catch {
        loading.remove();
        const fallback = rtl
          ? 'الدردشة غير متاحة مؤقتاً. يمكنك المتابعة عبر واتساب.'
          : 'Chat is temporarily unavailable. You can continue on WhatsApp.';
        addMessage(fallback, 'bot');
      } finally {
        chatInput.disabled = false;
        chatInput.focus();
      }
    });
  }

  const revealTargets = qsa('[data-reveal]');
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealTargets.forEach((node) => {
      node.style.opacity = '0';
      node.style.transform = 'translateY(22px)';
      node.style.transition = 'opacity .55s ease, transform .55s ease';
    });
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      });
    }, { threshold: .12, rootMargin: '0px 0px -5%' });
    revealTargets.forEach((node) => observer.observe(node));
  }

  const names = ['Khalid', 'Yusuf', 'Yassin', 'Renad', 'Yasmin'];
  const companies = ['PwC', 'Al-Roco', 'SAVOLA Group', 'Aramco', 'STC'];

  const socialProofStyle = document.createElement('style');
  socialProofStyle.textContent = `
    #autoapply-social-proof {
      position: fixed;
      left: 20px;
      bottom: 20px;
      z-index: 99999;
      width: min(340px, calc(100vw - 40px));
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 16px;
      background: #fff;
      color: #151515;
      border: 1px solid rgba(0,0,0,.08);
      border-radius: 12px;
      box-shadow: 0 12px 35px rgba(0,0,0,.14);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      opacity: 0;
      transform: translateX(-120%);
      pointer-events: none;
      transition: transform .45s cubic-bezier(.22,1,.36,1), opacity .35s ease;
    }

    #autoapply-social-proof.show {
      opacity: 1;
      transform: translateX(0);
    }

    #autoapply-social-proof.hide {
      opacity: 0;
      transform: translateX(-15px);
    }

    .asp-avatar {
      width: 42px;
      height: 42px;
      min-width: 42px;
      border-radius: 50%;
      background: #f1f1f1;
      display: grid;
      place-items: center;
      font-weight: 700;
      font-size: 15px;
      color: #555;
    }

    .asp-content {
      flex: 1;
      min-width: 0;
    }

    .asp-name {
      font-size: 14px;
      font-weight: 700;
      margin-bottom: 3px;
    }

    .asp-action {
      font-size: 13px;
      line-height: 1.4;
      color: #555;
    }

    .asp-action strong {
      color: #151515;
      font-weight: 600;
    }

    .asp-check {
      width: 24px;
      height: 24px;
      min-width: 24px;
      border-radius: 50%;
      display: grid;
      place-items: center;
      background: #e8f7ee;
      color: #168a45;
      font-size: 14px;
      font-weight: 800;
    }

    @media (max-width: 520px) {
      #autoapply-social-proof {
        left: 12px;
        bottom: 12px;
        width: calc(100vw - 24px);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      #autoapply-social-proof {
        transition: opacity .2s ease;
        transform: none;
      }
    }
  `;
  document.head.appendChild(socialProofStyle);

  const socialProofPopup = document.createElement('div');
  socialProofPopup.id = 'autoapply-social-proof';
  socialProofPopup.setAttribute('role', 'status');
  socialProofPopup.setAttribute('aria-live', 'polite');
  socialProofPopup.innerHTML = `
    <div class="asp-avatar"></div>
    <div class="asp-content">
      <div class="asp-name"></div>
      <div class="asp-action"></div>
    </div>
    <div class="asp-check">✓</div>
  `;
  document.body.appendChild(socialProofPopup);

  let previousSocialProofIndex = -1;

  const showSocialProofNotification = () => {
    let index;
    do {
      index = Math.floor(Math.random() * names.length);
    } while (index === previousSocialProofIndex && names.length > 1);

    previousSocialProofIndex = index;
    const name = names[index];
    const company = companies[index];

    qs('.asp-avatar', socialProofPopup).textContent = name.charAt(0).toUpperCase();
    qs('.asp-name', socialProofPopup).textContent = name;
    qs('.asp-action', socialProofPopup).innerHTML = `Just Auto-Applied to <strong>${company}</strong>`;

    socialProofPopup.classList.remove('hide');
    requestAnimationFrame(() => socialProofPopup.classList.add('show'));

    setTimeout(() => {
      socialProofPopup.classList.remove('show');
      socialProofPopup.classList.add('hide');
    }, 5000);

    const nextDelay = 60000 + Math.random() * 30000;
    setTimeout(showSocialProofNotification, nextDelay);
  };

  setTimeout(showSocialProofNotification, 10000);
})();
