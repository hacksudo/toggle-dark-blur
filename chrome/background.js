// 0 = OFF, 1 = DARK, 2 = BLUR
const tabMode = {};

async function clearAll(tabId) {
  try {
    await chrome.scripting.removeCSS({
      target: { tabId },
      files: ["styles.css"]
    });
  } catch (e) {}

  try {
    await chrome.scripting.removeCSS({
      target: { tabId },
      files: ["blur.css"]
    });
  } catch (e) {}
}

async function applyMode(tabId, mode) {
  await clearAll(tabId);

  if (mode === 1)
    await chrome.scripting.insertCSS({
      target: { tabId },
      files: ["styles.css"]
    });

  if (mode === 2)
    await chrome.scripting.insertCSS({
      target: { tabId },
      files: ["blur.css"]
    });

  tabMode[tabId] = mode;
}

chrome.action.onClicked.addListener(async (tab) => {
  const tabId = tab.id;
  const current = tabMode[tabId] ?? 0;
  const next = (current + 1) % 3;
  await applyMode(tabId, next);
});

chrome.tabs.onRemoved.addListener((tabId) => {
  delete tabMode[tabId];
});
