<div align="center">

# ✉️ Sealed Letter

**An Elegant Interactive Wax-Sealed Digital Letter Experience**

[![License: MIT](https://img.shields.io/badge/License-MIT-881337.svg?style=for-the-badge&labelColor=FAF7F2)](./LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5)
[![CSS3](https://img.shields.io/badge/CSS3_Editorial_Craft-881337?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Vanilla JS](https://img.shields.io/badge/Vanilla_JS-E5DDD0?style=for-the-badge&logo=javascript&logoColor=261C18)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-Live-9F1239?style=for-the-badge&logo=github&logoColor=white)](https://4jeeh.github.io/sealed-letter/)

<p align="center">
  <em>"Break the Royal Burgundy wax seal, watch the Muted Taupe envelope unfold, and read a timeless parchment letter personalized dynamically via URL query parameters."</em>
</p>

[🌐 **Live Demo (GitHub Pages)**](https://4jeeh.github.io/sealed-letter/) · [🔗 **URL Generator Guide**](#-url-generator-guide-github-pages) · [🚀 **Quick Start**](#-quick-start-local-development)

</div>

---

## ✨ Overview

**Sealed Letter** is a zero-backend, single-page interactive correspondence web application designed in a **Warm Editorial & Vintage Wax Seal** aesthetic:

- **Warm Cream Parchment:** `#FAF7F2` → `#F3ECE2`
- **Muted Taupe Stationery Envelope:** `#E5DDD0`
- **Royal Burgundy Embossed Wax Seal:** `#881337` / `#9F1239`
- **Editorial & Handwritten Typography:** `Playfair Display` for display titles, `Cormorant Garamond` & `Caveat` for literary letter prose and handwritten ink notes, and `Plus Jakarta Sans` for tactile UI controls.

Whether celebrating a birthday, marking a milestone, or sending a quiet note of gratitude, anyone can customize the recipient, sender, and message directly through URL query parameters (`?to=Name&from=Sender`) or the built-in **Personalize Link** composer—with zero code changes or server setup.

---

## 🎨 Design & Micro-Interaction Highlights

- **Single-Page Correspondence Flow:** Consolidates the entire journey—from the sealed tabletop envelope to the unfolded archival parchment manuscript—into one seamless single-page experience.
- **Tactile Wax Seal Fracture & Parchment Glide:**
  - Clicking the **Royal Burgundy (`#881337` / `#9F1239`)** wax seal splits the embossed vector seal cleanly into two halves with subtle wax fracture shards and synthesized acoustic foley.
  - The hinged triangular top flap unfolds in 3D perspective (`rotateX(180deg)`), and the inner parchment sheet glides smoothly upward out of the **Muted Taupe (`#E5DDD0`)** pocket using a custom `cubic-bezier(0.22, 1, 0.36, 1)` curve before unfolding into the full reading view.
- **Universal Appreciation Fallback (100% Privacy-Safe):**
  - Visiting the base URL without parameters renders a heartfelt, universal letter of appreciation and celebration in standard international English.
- **Gentle Instrumental Audio with Smooth Fade-In:**
  - Automatically fades in the soft instrumental soundtrack (`audio/Interlude.mp3`) from `0` to `0.45` volume when the wax seal breaks, paired with a floating **Sound On / Sound Off** mute/unmute toggle in the bottom-right corner.

---

## 🔗 URL Generator Guide (GitHub Pages)

You can personalize **Sealed Letter** for any recipient and sender by appending query parameters to your GitHub Pages URL:

| Parameter | Required | Description | Fallback (When Omitted) | Example |
| :--- | :---: | :--- | :--- | :--- |
| `?to=` | Optional | Recipient's name displayed on the envelope address plate, hero header, salutation, and postscript | `Someone Worth Celebrating` | `?to=Eleanor` |
| `?from=` | Optional | Sender's name displayed on the dispatch line and handwritten ink signature | `Someone Who Appreciates You` | `?from=Julian` |
| `?msg=` | Optional | Custom letter body paragraphs (use line breaks or `%0A` for multiple paragraphs) | *Curated 4-paragraph universal appreciation letter* | `?msg=Wishing+you+joy+and+peace.` |

### Example Shareable URLs

1. **Universal Default (No Parameters):**
   ```text
   https://4jeeh.github.io/sealed-letter/
   ```
   *Renders the universal appreciation letter addressed to **"Someone Worth Celebrating"** and signed **"Someone Who Appreciates You"**.*

2. **Personalized Recipient & Sender (`?to=Name&from=Sender`):**
   ```text
   https://4jeeh.github.io/sealed-letter/?to=Eleanor&from=Julian
   ```
   *Addresses the sealed envelope to **"For Eleanor"**, opens with **"Dearest Eleanor,"**, and signs the parchment manuscript in handwritten ink from **"Julian"**.*

3. **Built-In Visual Link Composer:**
   Click **Personalize Link** in the top navigation bar (or **Create & Share Your Own Sealed Letter** at the foot of the letter) to type the `Recipient` and `Sender` names, preview the envelope live, and copy the ready-to-share URL in one click.

---

## 📂 Project Structure

```text
sealed-letter/
├── audio/
│   └── Interlude.mp3               # Gentle instrumental background soundtrack (fades in on unseal)
├── css/
│   └── style.css                   # Warm Editorial & Vintage Wax Seal design system
├── images/
│   ├── favicon.ico                 # Classic fallback icon
│   └── favicon.svg                 # Bespoke Royal Burgundy wax seal vector icon
├── js/
│   └── app.js                      # URL query parser, wax seal choreography, audio fade-in & URL composer
├── .gitignore                      # Standard web Git ignore rules
├── index.html                      # Unified Single-Page Experience (Envelope, Wax Seal, Manuscript, Composer)
├── LICENSE                         # Official MIT License
└── README.md                       # Project documentation & URL generator guide
```

---

## 🚀 Quick Start (Local Development)

**Sealed Letter** is built with pure HTML5, CSS3, and Vanilla JavaScript—requiring zero dependencies or build tools.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/4jeeh/sealed-letter.git
   cd sealed-letter
   ```

2. **Run a local HTTP server:**
   ```bash
   # Using Python 3
   python -m http.server 8080
   ```
   *(Or use `npx serve .` / VS Code Live Server)*

3. **Open in your browser:**
   - Universal Default: `http://localhost:8080`
   - Personalized Demo: `http://localhost:8080/?to=Eleanor&from=Julian`

---

## 🌐 Deploying to GitHub Pages

1. Push the repository to GitHub (`https://github.com/4jeeh/sealed-letter`).
2. Open **Settings** → **Pages** in your GitHub repository.
3. Under **Build and deployment**, select **Deploy from a branch** (`main` / `/ (root)`).
4. Your live site will be available at:
   ```text
   https://4jeeh.github.io/sealed-letter/
   ```

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](./LICENSE) for full details.
