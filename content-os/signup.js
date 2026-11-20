const signup = document.querySelector("[data-content-os-signup]");
const fields = signup.querySelector("fieldset");
const submitButton = signup.querySelector("button");
const feedback = signup.querySelector("[role=status]");
let submitting = false;

signup.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (submitting || fields.disabled) return;

  submitting = true;
  submitButton.setAttribute("aria-disabled", "true");
  feedback.textContent = "Submitting…";

  const timeout = new AbortController();
  const timer = setTimeout(() => timeout.abort(), 12_000);
  try {
    const response = await fetch(signup.action, {
      method: signup.method,
      headers: { Accept: "application/json" },
      body: new FormData(signup),
      credentials: "omit",
      signal: timeout.signal,
    });
    const result = await response.json();
    if (!response.ok || result?.error || result?.errors || typeof result?.next !== "string") {
      throw new Error("Signup failed");
    }

    signup.reset();
    fields.disabled = true;
    feedback.textContent = "Thanks. Your email is on the early-access list.";
  } catch {
    feedback.textContent = "Your signup couldn’t be confirmed. Please try again.";
  } finally {
    clearTimeout(timer);
    submitting = false;
    submitButton.removeAttribute("aria-disabled");
  }
});
