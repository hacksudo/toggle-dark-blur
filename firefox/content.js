const INACTIVITY_MS = 2 * 60 * 1000; // 2 minutes
let timer = null;
let blurredByInactivity = false;

function pingActivity() {
  if (blurredByInactivity) {
    blurredByInactivity = false;
    browser.runtime.sendMessage({ type: "ACTIVITY_RESUME" });
  }
  resetTimer();
}

function resetTimer() {
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    blurredByInactivity = true;
    browser.runtime.sendMessage({ type: "INACTIVITY_BLUR" });
  }, INACTIVITY_MS);
}

// Activity events (desktop + mobile touch)
["mousemove", "mousedown", "keydown", "scroll", "wheel", "touchstart", "touchmove"].forEach((evt) => {
  window.addEventListener(evt, pingActivity, { passive: true, capture: true });
});

// start timer
resetTimer();
