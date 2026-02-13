const INACTIVITY_MS = 2 * 60 * 1000;
let timer = null;
let blurredByInactivity = false;

function pingActivity() {
  if (blurredByInactivity) {
    blurredByInactivity = false;
    chrome.runtime.sendMessage({ type: "ACTIVITY_RESUME" });
  }
  resetTimer();
}

function resetTimer() {
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    blurredByInactivity = true;
    chrome.runtime.sendMessage({ type: "INACTIVITY_BLUR" });
  }, INACTIVITY_MS);
}

["mousemove", "mousedown", "keydown", "scroll", "wheel", "touchstart", "touchmove"].forEach((evt) => {
  window.addEventListener(evt, pingActivity, { passive: true, capture: true });
});

resetTimer();
