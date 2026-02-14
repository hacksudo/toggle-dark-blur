// 0 = OFF, 1 = DARK, 2 = BLUR
let tabMode = {};

async function clearAll(tabId) {
  try { await browser.tabs.removeCSS(tabId, { file: "styles.css" }); } catch (e) {}
  try { await browser.tabs.removeCSS(tabId, { file: "blur.css" }); } catch (e) {}
}

async function applyMode(tabId, mode) {
  await clearAll(tabId);

  if (mode === 1)
    await browser.tabs.insertCSS(tabId, { file: "styles.css" });

  if (mode === 2)
    await browser.tabs.insertCSS(tabId, { file: "blur.css" });

  tabMode[tabId] = mode;
}

browser.browserAction.onClicked.addListener(async (tab) => {
  const tabId = tab.id;
  const current = tabMode[tabId] ?? 0;
  const next = (current + 1) % 3;
  await applyMode(tabId, next);
});

browser.tabs.onRemoved.addListener((tabId) => {
  delete tabMode[tabId];
});
