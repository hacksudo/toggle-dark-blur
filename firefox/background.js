// 0 = OFF, 1 = DARK, 2 = BLUR
const tabMode = {};           // manual/current mode
const autoBlurState = {};     // { wasAuto: bool, prevMode: 0|1|2 }

async function clearAll(tabId) {
  try { await browser.tabs.removeCSS(tabId, { file: "styles.css" }); } catch (e) {}
  try { await browser.tabs.removeCSS(tabId, { file: "blur.css" }); } catch (e) {}
}

async function applyMode(tabId, mode) {
  await clearAll(tabId);
  if (mode === 1) await browser.tabs.insertCSS(tabId, { file: "styles.css" });
  if (mode === 2) await browser.tabs.insertCSS(tabId, { file: "blur.css" });
  tabMode[tabId] = mode;
}

browser.browserAction.onClicked.addListener(async (tab) => {
  const tabId = tab.id;

  // If it was auto-blurred, clear that state because user manually clicked
  autoBlurState[tabId] = { wasAuto: false, prevMode: 0 };

  const current = tabMode[tabId] ?? 0;
  const next = (current + 1) % 3; // OFF -> DARK -> BLUR -> OFF
  await applyMode(tabId, next);
});

browser.runtime.onMessage.addListener(async (msg, sender) => {
  const tabId = sender?.tab?.id;
  if (!tabId) return;

  if (msg?.type === "INACTIVITY_BLUR") {
    const current = tabMode[tabId] ?? 0;
    if (current !== 2) {
      autoBlurState[tabId] = { wasAuto: true, prevMode: current };
      await applyMode(tabId, 2); // Blur
    }
  }

  if (msg?.type === "ACTIVITY_RESUME") {
    const st = autoBlurState[tabId];
    if (st?.wasAuto) {
      autoBlurState[tabId] = { wasAuto: false, prevMode: 0 };
      await applyMode(tabId, st.prevMode ?? 0); // restore
    }
  }
});

browser.tabs.onRemoved.addListener((tabId) => {
  delete tabMode[tabId];
  delete autoBlurState[tabId];
});
