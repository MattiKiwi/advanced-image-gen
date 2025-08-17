// Advanced NAI Image — minimal UI wiring
// This file waits for the settings panel to exist and binds button clicks.
// It only logs to the console for now (no backend calls).

// If your template supports getContext(), you can import it,
// but to keep this template-agnostic we just bind directly once the DOM has our elements.

(function () {
  // Bind once elements appear (ST loads panels dynamically)
  const once = (el, type, handler) => {
    if (!el || el.dataset?.bound === "1") return;
    el.addEventListener(type, handler);
    el.dataset.bound = "1";
  };

  const wireUp = () => {
    const btnDesc  = document.getElementById("ani-generate-desc");
    const btnImage = document.getElementById("ani-generate-image");

    // Textareas
    const $prompt = document.getElementById("ani-prompt");
    const $scene  = document.getElementById("ani-scene");
    const $char   = document.getElementById("ani-char");
    const $user   = document.getElementById("ani-user");

    if (btnDesc && $prompt) {
      once(btnDesc, "click", () => {
        const prompt = $prompt.value ?? "";
        console.log("[Advanced NAI Image] Generate Description — prompt:", prompt);
      });
    }

    if (btnImage && $scene && $char && $user) {
      once(btnImage, "click", () => {
        const payload = {
          scene: $scene.value ?? "",
          character: $char.value ?? "",
          user: $user.value ?? "",
        };
        console.log("[Advanced NAI Image] Generate Image — inputs:", payload);
      });
    }
  };

  // Observe DOM because settings panels can be injected after load
  const obs = new MutationObserver(() => {
    // Only try wiring when at least one of our elements exists
    if (document.getElementById("ani-generate-desc") || document.getElementById("ani-generate-image")) {
      wireUp();
    }
  });

  // Kick off observer and also attempt an immediate bind
  if (document.body) {
    obs.observe(document.body, { childList: true, subtree: true });
    // Try immediately as well
    wireUp();
  } else {
    document.addEventListener("DOMContentLoaded", () => {
      obs.observe(document.body, { childList: true, subtree: true });
      wireUp();
    });
  }
})();
