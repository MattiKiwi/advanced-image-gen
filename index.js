// Advanced NAI Image — UI only (Idle-style dropdown panel)
// Buttons only log to console for now, per your request.

(function () {
  const log = (...args) => console.log("[Advanced NAI Image]", ...args);

  function bindOnce(el, type, handler) {
    if (!el || el.dataset.bound === "1") return;
    el.addEventListener(type, handler);
    el.dataset.bound = "1";
  }

  function wireUp() {
    const btnDesc  = document.getElementById("ani-generate-desc");
    const btnImage = document.getElementById("ani-generate-image");

    const $prompt = document.getElementById("ani-prompt");
    const $scene  = document.getElementById("ani-scene");
    const $char   = document.getElementById("ani-char");
    const $user   = document.getElementById("ani-user");

    if (btnDesc && $prompt) {
      bindOnce(btnDesc, "click", () => {
        const prompt = $prompt.value ?? "";
        log("Generate Description → prompt:", prompt);
      });
    }

    if (btnImage && $scene && $char && $user) {
      bindOnce(btnImage, "click", () => {
        const payload = {
          scene: $scene.value ?? "",
          character: $char.value ?? "",
          user: $user.value ?? "",
        };
        log("Generate Image → inputs:", payload);
      });
    }
  }

  // Panels are injected; observe until our nodes exist.
  const obs = new MutationObserver(() => {
    if (
      document.getElementById("ani-generate-desc") ||
      document.getElementById("ani-generate-image")
    ) {
      wireUp();
    }
  });

  if (document.body) {
    obs.observe(document.body, { childList: true, subtree: true });
    wireUp();
  } else {
    document.addEventListener("DOMContentLoaded", () => {
      obs.observe(document.body, { childList: true, subtree: true });
      wireUp();
    });
  }
})();
