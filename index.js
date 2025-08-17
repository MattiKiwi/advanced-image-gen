// Advanced NAI Image — inject dropdown + wire minimal behavior
(function () {
  const MODULE_ID = 'ani-ext-root';
  const PANEL_TARGETS = ['#extensions_settings2', '#extensions_settings']; // fallback if DOM changes

  function findExtensionsPanel() {
    for (const sel of PANEL_TARGETS) {
      const el = document.querySelector(sel);
      if (el) return el;
    }
    return null;
  }

  async function injectPanel() {
    const panel = findExtensionsPanel();
    if (!panel) return; // panel not yet in DOM; observer will retry

    // Avoid duplicate injection
    if (panel.querySelector(`#${MODULE_ID}`)) return;

    try {
      const res = await fetch('./dropdown.html', { cache: 'no-cache' });
      const html = await res.text();
      const holder = document.createElement('div');
      holder.innerHTML = html;
      panel.appendChild(holder.firstElementChild);
      wireHandlers();
    } catch (e) {
      console.error('[Advanced NAI Image] Failed to load dropdown.html:', e);
    }
  }

  function wireHandlers() {
    const $prompt = document.getElementById('ani-prompt');
    const $scene  = document.getElementById('ani-scene');
    const $char   = document.getElementById('ani-char');
    const $user   = document.getElementById('ani-user');

    const btnDesc  = document.getElementById('ani-generate-desc');
    const btnImage = document.getElementById('ani-generate-image');

    if (btnDesc) {
      btnDesc.addEventListener('click', () => {
        console.log('[Advanced NAI Image] Generate Description — prompt:', ($prompt?.value ?? ''));
      }, { once: false });
    }

    if (btnImage) {
      btnImage.addEventListener('click', () => {
        const payload = {
          scene: $scene?.value ?? '',
          character: $char?.value ?? '',
          user: $user?.value ?? '',
        };
        console.log('[Advanced NAI Image] Generate Image — inputs:', payload);
      }, { once: false });
    }
  }

  // Observe for Extensions panel becoming available (ST loads drawers dynamically)
  const obs = new MutationObserver(() => injectPanel());
  if (document.body) {
    obs.observe(document.body, { childList: true, subtree: true });
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      obs.observe(document.body, { childList: true, subtree: true });
      injectPanel();
    });
  }
  // Try immediately too
  injectPanel();
})();
