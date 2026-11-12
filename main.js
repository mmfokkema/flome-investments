// Shared background waves + contact pop-up for every page.
(function () {
  const PHONE = '+31629051806';
  const PHONE_LABEL = '+31 (0) 6 2905 1806';
  const LINKEDIN = 'https://www.linkedin.com/in/menno-fokkema/';

  const TEXT = {
    en: { title: "Let's Talk", call: 'Call', dm: 'Send a DM on LinkedIn', close: 'Close' },
    nl: { title: "Let's Talk", call: 'Bel', dm: 'Stuur een DM op LinkedIn', close: 'Sluiten' },
  };
  const t = TEXT[document.documentElement.lang] || TEXT.en;

  const wave = (d, cls, glow) => `
    <g class="${cls}">
      <path d="${d} L1700 1100 L-200 1100 Z" fill="url(#fill)"/>
      <path d="${d}" fill="none" stroke="url(#edge)" stroke-width="60" filter="url(#blur)" opacity="${glow}"/>
      <path d="${d}" fill="none" stroke="url(#edge)" stroke-width="1.5" opacity=".9"/>
    </g>`;

  const waves = document.createElement('div');
  waves.className = 'waves';
  waves.setAttribute('aria-hidden', 'true');
  waves.innerHTML = `
  <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="edge" x1="0" x2="1">
        <stop offset="0" stop-color="#1d4dff" stop-opacity="0"/>
        <stop offset=".35" stop-color="#2f6dff"/>
        <stop offset=".6" stop-color="#38b6ff"/>
        <stop offset="1" stop-color="#1d4dff" stop-opacity=".2"/>
      </linearGradient>
      <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#0b1d5c" stop-opacity=".55"/>
        <stop offset=".35" stop-color="#02030a" stop-opacity="0"/>
      </linearGradient>
      <filter id="blur" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="22"/></filter>
    </defs>
    ${wave('M-200 -40 C 300 120 700 140 1000 60 S 1500 -60 1700 20', 'w2', .35)}
    ${wave('M-200 560 C 150 420 450 220 820 200 S 1350 330 1700 470', 'w1', .5)}
    ${wave('M500 960 C 800 820 1150 780 1700 820', 'w3', .45)}
  </svg>`;
  document.body.prepend(waves);

  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-labelledby', 'talk');
  modal.innerHTML = `
    <div class="box">
      <button class="close" aria-label="${t.close}">×</button>
      <h2 id="talk">${t.title}</h2>
      <a class="btn primary" href="tel:${PHONE}"><span>${t.call} ${PHONE_LABEL}</span><span>→</span></a>
      <a class="btn" href="${LINKEDIN}" target="_blank" rel="noopener"><span>${t.dm}</span><span>↗</span></a>
    </div>`;
  document.body.append(modal);

  const open = (e) => { if (e) e.preventDefault(); modal.classList.add('open'); };
  const close = () => modal.classList.remove('open');
  document.querySelectorAll('[data-contact]').forEach((el) => el.addEventListener('click', open));
  modal.addEventListener('click', (e) => { if (e.target === modal || e.target.closest('.close')) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  if (location.hash === '#contact') open();
})();
