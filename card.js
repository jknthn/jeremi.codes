// About page: on desktop "Open contact card" opens the card as a modal; on mobile the link goes to /card/.
// A modal <dialog> already traps focus and closes on Escape; this adds the close button,
// scrim click, and returning focus to the opener.
(() => {
  const dialog = document.querySelector(".card-dialog");
  const opener = document.querySelector("[data-open-card]");
  if (!dialog || !opener || !dialog.showModal) return;
  const desktop = window.matchMedia("(min-width: 640px)");

  opener.addEventListener("click", (e) => {
    if (!desktop.matches) return;
    e.preventDefault();
    dialog.showModal();
  });
  dialog.querySelector("[data-close-card]").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) dialog.close();
  });
  dialog.addEventListener("close", () => opener.focus());
})();
