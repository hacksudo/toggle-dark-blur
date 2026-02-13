# 🌓 Hacksudo Dark & Blur Toggle (Firefox + Chrome Extension)

A lightweight browser extension for **Firefox and Chrome** that lets you switch between:

- 🌙 Dark Mode  
- 🌫 Blur Mode (Privacy Screen)  
- ☀ Normal Mode  

Click the toolbar icon to cycle through modes.

---

## 🚀 Features

✔ One-click toggle (cycles modes)  
✔ Works on all websites  
✔ No tracking / no analytics  
✔ No remote scripts  
✔ Fully client-side  

---

## 🛠 How It Works

The extension injects local CSS into the active tab using the browser extension APIs.

Modes:

1. **Dark Mode** → Applies `invert + hue-rotate` CSS filter  
2. **Blur Mode** → Applies full-page blur effect  
3. **Normal Mode** → Removes all injected styles  

No user data is collected, stored, or transmitted.

---

## 📦 Installation (Firefox)

### Temporary install (Developer Mode)
1. Open Firefox  
2. Go to: `about:debugging#/runtime/this-firefox`  
3. Click **Load Temporary Add-on**  
4. Select `manifest.json` (Firefox version)  
5. Right click the add-on → **Pin to Toolbar**  
6. Done ✅  

> Note: Temporary add-ons are removed when Firefox restarts.

---

## 📦 Installation (Chrome / Edge / Brave)

### Developer Mode install (Unpacked)
1. Open Chrome  
2. Go to: `chrome://extensions/`  
3. Enable **Developer mode** (top right)  
4. Click **Load unpacked**  
5. Select the **Chrome build folder**  
6. Pin the extension from the puzzle icon ✅  

---

## 📁 Project Structure

This repo contains separate builds for each browser:

/firefox
manifest.json
background.js
content.js
styles.css
blur.css
icon.png

/chrome
manifest.json
background.js
content.js
styles.css
blur.css
icon.png


---

## 🧠 Permissions Used

### Firefox
- `activeTab` → Inject CSS into the current tab
- `tabs` → Track per-tab mode state
- `<all_urls>` → Allow styling on all websites

### Chrome
- `activeTab` → Access the current tab when clicked
- `scripting` → Insert/remove CSS in the tab
- `<all_urls>` (host permissions) → Allow styling on all websites

---

## 🔐 Privacy

This extension:

- Does **NOT** collect user data  
- Does **NOT** track browsing activity  
- Does **NOT** communicate with external servers  
- Does **NOT** store personal information  

---

## 📄 License

MIT License

---

## ✨ Author

**Vishal Waghmare**  
Hacksudo.com
