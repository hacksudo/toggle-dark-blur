// 0 = OFF, 1 = DARK, 2 = BLUR
const tabMode = {};
const autoBlurState = {};

async function clearAll(tabId) {
  try { await chrome.scripting.removeCSS({ target: { tabId }, files: ["styles.css"] }); } catch (e) {}
  try { await chrome.scripting.removeCSS({ target: { tabId }, files: ["blur.css"] }); } catch (e) {}
}

async function applyMode(tabId, mode) {
  await clearAll(tabId);
  if (mode === 1) await chrome.scripting.insertCSS({ target: { tabId }, files: ["styles.css"] });
  if (mode === 2) await chrome.scripting.insertCSS({ target: { tabId }, files: ["blur.css"] });
  tabMode[tabId] = mode;
}

chrome.action.onClicked.addListener(async (tab) => {
  const tabId = tab?.id;
  if (!tabId) return;

  autoBlurState[tabId] = { wasAuto: false, prevMode: 0 };

  const current = tabMode[tabId] ?? 0;
  const next = (current + 1) % 3;
  await applyMode(tabId, next);
});

chrome.runtime.onMessage.addListener((msg, sender) => {
  const tabId = sender?.tab?.id;
  if (!tabId) return;

  (async () => {
    if (msg?.type === "INACTIVITY_BLUR") {
      const current = tabMode[tabId] ?? 0;
      if (current !== 2) {
        autoBlurState[tabId] = { wasAuto: true, prevMode: current };
        await applyMode(tabId, 2);
      }
    }

    if (msg?.type === "ACTIVITY_RESUME") {
      const st = autoBlurState[tabId];
      if (st?.wasAuto) {
        autoBlurState[tabId] = { wasAuto: false, prevMode: 0 };
        await applyMode(tabId, st.prevMode ?? 0);
      }
    }
  })();
});

chrome.tabs.onRemoved.addListener((tabId) => {
  delete tabMode[tabId];
  delete autoBlurState[tabId];
});
