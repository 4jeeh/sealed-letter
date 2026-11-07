/**
 * SEALED LETTER — Interactive Wax-Sealed Correspondence Controller
 * Handles:
 * 1. Dynamic URL Query Parameters (?to=Name&from=Sender & optional ?msg=)
 * 2. Universal Appreciation Letter Fallback (0% personal/ex references)
 * 3. Wax Seal Fracture & Smooth Parchment Slide-Up Choreography
 * 4. Smooth Instrumental Audio Fade-In & Floating Mute/Unmute Toggle
 * 5. Live Shareable URL Generator & Warm Parchment Ambient Canvas
 */

(function () {
  "use strict";

  const DEFAULTS = {
    to: "Someone Worth Celebrating",
    from: "Someone Who Appreciates You",
    salutation: "To Someone Truly Worth Celebrating,",
    title: "A Letter Held in Quiet Gratitude",
    callout:
      "“You have a rare way of making ordinary days feel worth keeping—never forget how far you have already come, or how deeply your presence is valued.”",
    paragraphs: [
      "In the quiet rush of passing seasons, we rarely pause long enough to put into ink what matters most. Today felt like the right moment to slow the clock, fold a sheet of warm parchment, and send you a reminder of the light, steadiness, and warmth you bring into the lives around you.",
      "Watching you navigate each new chapter with such quiet resilience and sincerity is a privilege. You carry bold dreams and an earnest heart, and even on the days that feel heavy or uncertain, your kindness leaves a lasting impression that no distance or time can dim.",
      "Please remember to be gentle with yourself along the way. Let go of the weight of overthinking, celebrate the small victories you have already earned, and give yourself permission to rest whenever the world asks too much at once. You do not have to rush to become extraordinary—you already are.",
      "May the chapters ahead bring you deep peace, health, and the quiet pride of seeing your hopes take root. Whatever season comes next, know that there is always someone cheering for your happiness and wishing you the very best that life can offer.",
    ],
  };

  // DOM References
  const bodyEl = document.body;
  const envelopeWidget = document.getElementById("envelopeWidget");
  const unsealTriggerBtn = document.getElementById("unsealTriggerBtn");
  const sealPromptText = document.getElementById("sealPromptText");
  const resealBtn = document.getElementById("resealBtn");
  const bottomResealBtn = document.getElementById("bottomResealBtn");
  const parchmentManuscript = document.getElementById("parchmentManuscript");

  // Dynamic Copy Nodes
  const heroRecipientName = document.getElementById("heroRecipientName");
  const heroSenderName = document.getElementById("heroSenderName");
  const envelopeRecipientLabel = document.getElementById("envelopeRecipientLabel");
  const envelopeSenderLabel = document.getElementById("envelopeSenderLabel");
  const previewDate = document.getElementById("previewDate");
  const previewSalutation = document.getElementById("previewSalutation");
  const previewExcerpt = document.getElementById("previewExcerpt");
  const previewSignature = document.getElementById("previewSignature");

  const letterDateDisplay = document.getElementById("letterDateDisplay");
  const letterMainTitle = document.getElementById("letterMainTitle");
  const letterSalutation = document.getElementById("letterSalutation");
  const letterHandwrittenCallout = document.getElementById("letterHandwrittenCallout");
  const letterBodyContainer = document.getElementById("letterBodyContainer");
  const letterSignature = document.getElementById("letterSignature");
  const letterPostscript = document.getElementById("letterPostscript");

  // Composer Drawer Nodes
  const openComposerBtn = document.getElementById("openComposerBtn");
  const bottomComposeBtn = document.getElementById("bottomComposeBtn");
  const closeComposerBtn = document.getElementById("closeComposerBtn");
  const composerDrawer = document.getElementById("composerDrawer");
  const urlGeneratorForm = document.getElementById("urlGeneratorForm");
  const inputRecipient = document.getElementById("inputRecipient");
  const inputSender = document.getElementById("inputSender");
  const inputCustomMsg = document.getElementById("inputCustomMsg");
  const generatedUrlPreview = document.getElementById("generatedUrlPreview");
  const copyShareUrlBtn = document.getElementById("copyShareUrlBtn");
  const copyBtnLabel = document.getElementById("copyBtnLabel");
  const resetDefaultUrlBtn = document.getElementById("resetDefaultUrlBtn");

  // Audio Nodes
  const ambientAudio = document.getElementById("ambientAudio");
  const audioToggleBtn = document.getElementById("audioToggleBtn");
  const audioStatusLabel = document.getElementById("audioStatusLabel");

  let isAudioPlaying = false;
  let fadeAnimationFrame = null;

  /**
   * Sanitize and normalize query string values
   */
  function cleanParam(val, maxLen = 80) {
    if (!val || typeof val !== "string") return "";
    return val.trim().replace(/\s+/g, " ").slice(0, maxLen);
  }

  /**
   * Format today's archival date in international English
   */
  function getFormattedDate() {
    try {
      return new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }).format(new Date());
    } catch (_) {
      return "November 8, 2026";
    }
  }

  /**
   * Parse URL query parameters (?to=Name&from=Sender&msg=Optional)
   * and populate the envelope and parchment manuscript dynamically.
   */
  function applyUrlParameters() {
    const params = new URLSearchParams(window.location.search);
    const rawTo = cleanParam(params.get("to"), 60);
    const rawFrom = cleanParam(params.get("from"), 60);
    const rawMsg = params.get("msg") ? params.get("msg").trim().slice(0, 900) : "";

    const hasCustomTo = rawTo.length > 0;
    const hasCustomFrom = rawFrom.length > 0;

    const recipient = hasCustomTo ? rawTo : DEFAULTS.to;
    const sender = hasCustomFrom ? rawFrom : DEFAULTS.from;
    const formattedDate = getFormattedDate();

    // Update Document Title
    document.title = hasCustomTo
      ? `A Sealed Letter for ${recipient} — From ${sender}`
      : "Sealed Letter — An Interactive Wax-Sealed Correspondence";

    // Update Hero & Envelope Labels
    heroRecipientName.textContent = recipient;
    heroSenderName.textContent = sender;
    envelopeRecipientLabel.textContent = hasCustomTo ? `For ${recipient}` : DEFAULTS.to;
    envelopeSenderLabel.textContent = hasCustomFrom
      ? `Dispatched by ${sender}`
      : `From ${DEFAULTS.from}`;

    // Update Dates
    previewDate.textContent = formattedDate;
    letterDateDisplay.textContent = formattedDate;

    // Update Salutation & Title
    const salutationText = hasCustomTo ? `Dearest ${recipient},` : DEFAULTS.salutation;
    const titleText = hasCustomTo
      ? `For ${recipient}, Kept in Quiet Gratitude`
      : DEFAULTS.title;

    previewSalutation.textContent = salutationText;
    letterSalutation.textContent = salutationText;
    letterMainTitle.textContent = titleText;

    // Update Handwritten Callout
    const calloutText = hasCustomTo
      ? `“There are people whose quiet presence makes every season steadier, brighter, and more generous—you have always been one of them, ${recipient}.”`
      : DEFAULTS.callout;

    previewExcerpt.textContent = calloutText;
    letterHandwrittenCallout.textContent = calloutText;

    // Update Body Paragraphs
    letterBodyContainer.innerHTML = "";
    if (rawMsg.length > 0) {
      const customParagraphs = rawMsg
        .split(/\n+/)
        .map((line) => line.trim())
        .filter(Boolean);

      customParagraphs.forEach((paragraphText) => {
        const p = document.createElement("p");
        p.textContent = paragraphText;
        letterBodyContainer.appendChild(p);
      });
    } else {
      const paragraphsToRender = hasCustomTo
        ? [
            `In the quiet rush of passing seasons, we rarely pause long enough to put into ink what matters most. Today felt like the right moment to slow the clock, fold a sheet of warm parchment, and send you a reminder, ${recipient}, of the light, steadiness, and warmth you bring into the lives around you.`,
            DEFAULTS.paragraphs[1],
            DEFAULTS.paragraphs[2],
            DEFAULTS.paragraphs[3],
          ]
        : DEFAULTS.paragraphs;

      paragraphsToRender.forEach((paragraphText) => {
        const p = document.createElement("p");
        p.textContent = paragraphText;
        letterBodyContainer.appendChild(p);
      });
    }

    // Update Signature & Postscript
    const signatureText = hasCustomFrom ? sender : "With Warmest Regards";
    previewSignature.textContent = signatureText;
    letterSignature.textContent = hasCustomFrom ? sender : DEFAULTS.from;
    letterPostscript.textContent = hasCustomTo
      ? `P.S. Keep this letter tucked away, ${recipient}, for any day you need a quiet reminder of how deeply you are appreciated.`
      : "P.S. Keep this letter tucked away for any day you need a quiet reminder that you matter.";

    // Sync Composer Form Inputs
    if (inputRecipient) inputRecipient.value = rawTo;
    if (inputSender) inputSender.value = rawFrom;
    if (inputCustomMsg) inputCustomMsg.value = rawMsg;
    updateShareUrlPreview();
  }

  /**
   * Synthesize a subtle tactile wax-seal crack + paper slide acoustic foley
   * using Web Audio API (no external sound effect file required).
   */
  function playWaxCrackFoley() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;

      // Short crisp snap for the breaking wax
      const bufferSize = ctx.sampleRate * 0.08;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.018));
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(1150, now);
      filter.Q.setValueAtTime(2.2, now);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.075);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      whiteNoise.start(now);

      setTimeout(() => {
        if (ctx.state !== "closed") ctx.close().catch(() => {});
      }, 300);
    } catch (_) {
      // Ignore if Web Audio is blocked
    }
  }

  /**
   * Smoothly fade in background instrumental MP3 when envelope is opened
   */
  function startAndFadeInAudio(targetVolume = 0.45, durationMs = 2400) {
    if (!ambientAudio) return;
    if (fadeAnimationFrame) cancelAnimationFrame(fadeAnimationFrame);

    ambientAudio.muted = false;
    ambientAudio.volume = 0.02;

    const playPromise = ambientAudio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          isAudioPlaying = true;
          updateAudioButtonUI(true);

          const startTime = performance.now();
          const startVol = 0.02;

          function stepVolume(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / durationMs, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            if (!ambientAudio.muted && !ambientAudio.paused) {
              ambientAudio.volume = Math.min(
                targetVolume,
                startVol + (targetVolume - startVol) * eased
              );
            }
            if (progress < 1 && isAudioPlaying) {
              fadeAnimationFrame = requestAnimationFrame(stepVolume);
            }
          }

          fadeAnimationFrame = requestAnimationFrame(stepVolume);
        })
        .catch(() => {
          isAudioPlaying = false;
          updateAudioButtonUI(false);
        });
    }
  }

  /**
   * Toggle Floating Audio Mute / Unmute Button
   */
  function toggleAudio() {
    if (!ambientAudio) return;
    if (fadeAnimationFrame) cancelAnimationFrame(fadeAnimationFrame);

    if (ambientAudio.paused || ambientAudio.muted || !isAudioPlaying) {
      ambientAudio.muted = false;
      ambientAudio.volume = 0.45;
      ambientAudio
        .play()
        .then(() => {
          isAudioPlaying = true;
          updateAudioButtonUI(true);
        })
        .catch(() => {
          isAudioPlaying = false;
          updateAudioButtonUI(false);
        });
    } else {
      ambientAudio.muted = true;
      ambientAudio.pause();
      isAudioPlaying = false;
      updateAudioButtonUI(false);
    }
  }

  function updateAudioButtonUI(playing) {
    if (!audioToggleBtn || !audioStatusLabel) return;
    audioToggleBtn.setAttribute("aria-pressed", playing ? "true" : "false");
    audioStatusLabel.textContent = playing ? "Sound On" : "Sound Off";
  }

  /**
   * Open the Wax-Sealed Envelope & Slide Up Parchment Letter
   */
  function openSealedLetter() {
    const currentState = bodyEl.dataset.state;
    if (currentState === "opening" || currentState === "unsealed") {
      return;
    }

    playWaxCrackFoley();
    startAndFadeInAudio(0.45, 2400);

    // Stage 1: Break Wax Seal & Hinge Flap Open
    bodyEl.dataset.state = "opening";
    envelopeWidget.setAttribute("aria-expanded", "true");
    if (sealPromptText) {
      sealPromptText.textContent = "Wax Seal Broken · Unfolding Parchment Letter...";
    }

    // Stage 2: Smoothly Reveal Full Parchment Manuscript
    setTimeout(() => {
      bodyEl.dataset.state = "unsealed";
      parchmentManuscript.setAttribute("aria-hidden", "false");
      if (resealBtn) resealBtn.hidden = false;
      if (sealPromptText) {
        sealPromptText.textContent = "Fold Letter & Reseal Envelope";
      }

      // Smoothly bring the unfolded parchment letter into reading view
      setTimeout(() => {
        parchmentManuscript.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 280);
    }, 420);
  }

  /**
   * Fold the Parchment Letter & Reseal the Envelope
   */
  function resealEnvelope() {
    bodyEl.dataset.state = "sealed";
    envelopeWidget.setAttribute("aria-expanded", "false");
    parchmentManuscript.setAttribute("aria-hidden", "true");
    if (resealBtn) resealBtn.hidden = true;
    if (sealPromptText) {
      sealPromptText.textContent = "Click the Royal Burgundy Wax Seal to Break & Open";
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /**
   * Toggle Composer Drawer & Generate Shareable URL
   */
  function toggleComposerDrawer(forceOpen) {
    if (!composerDrawer) return;
    const willOpen =
      typeof forceOpen === "boolean" ? forceOpen : composerDrawer.hidden;
    composerDrawer.hidden = !willOpen;
    if (openComposerBtn) {
      openComposerBtn.setAttribute("aria-expanded", willOpen ? "true" : "false");
    }
    if (willOpen) {
      updateShareUrlPreview();
      composerDrawer.scrollIntoView({ behavior: "smooth", block: "center" });
      if (inputRecipient) inputRecipient.focus();
    }
  }

  function buildShareableUrl(baseOriginPath) {
    const toVal = cleanParam(inputRecipient ? inputRecipient.value : "", 60);
    const fromVal = cleanParam(inputSender ? inputSender.value : "", 60);
    const msgVal = inputCustomMsg ? inputCustomMsg.value.trim().slice(0, 900) : "";

    const searchParams = new URLSearchParams();
    if (toVal) searchParams.set("to", toVal);
    if (fromVal) searchParams.set("from", fromVal);
    if (msgVal) searchParams.set("msg", msgVal);

    const queryStr = searchParams.toString();
    return queryStr ? `${baseOriginPath}?${queryStr}` : baseOriginPath;
  }

  function updateShareUrlPreview() {
    if (!generatedUrlPreview) return;
    const isLocal =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";
    const displayBase = isLocal
      ? `${window.location.origin}${window.location.pathname}`
      : "https://4jeeh.github.io/sealed-letter/";
    generatedUrlPreview.textContent = buildShareableUrl(displayBase);
  }

  /**
   * Subtle Warm Parchment Dust Motes Canvas
   */
  function initParchmentCanvas() {
    const canvas = document.getElementById("parchmentCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const moteCount = 28;
    const motes = Array.from({ length: moteCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2.1 + 0.8,
      vx: (Math.random() - 0.5) * 0.22,
      vy: -Math.random() * 0.28 - 0.08,
      alpha: Math.random() * 0.22 + 0.06,
      isBurgundy: Math.random() < 0.25,
    }));

    function renderMotes() {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < motes.length; i++) {
        const m = motes[i];
        m.x += m.vx;
        m.y += m.vy;

        if (m.y < -10) {
          m.y = height + 10;
          m.x = Math.random() * width;
        }
        if (m.x < -10) m.x = width + 10;
        if (m.x > width + 10) m.x = -10;

        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.fillStyle = m.isBurgundy
          ? `rgba(136, 19, 55, ${m.alpha * 0.75})`
          : `rgba(184, 151, 104, ${m.alpha})`;
        ctx.fill();
      }
      requestAnimationFrame(renderMotes);
    }

    renderMotes();

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });
  }

  /**
   * Bind Event Listeners
   */
  function initEvents() {
    if (envelopeWidget) {
      envelopeWidget.addEventListener("click", () => {
        if (bodyEl.dataset.state === "sealed") {
          openSealedLetter();
        }
      });

      envelopeWidget.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          if (bodyEl.dataset.state === "sealed") {
            openSealedLetter();
          } else {
            resealEnvelope();
          }
        }
      });
    }

    if (unsealTriggerBtn) {
      unsealTriggerBtn.addEventListener("click", () => {
        if (bodyEl.dataset.state === "sealed") {
          openSealedLetter();
        } else {
          resealEnvelope();
        }
      });
    }

    if (resealBtn) {
      resealBtn.addEventListener("click", resealEnvelope);
    }

    if (bottomResealBtn) {
      bottomResealBtn.addEventListener("click", resealEnvelope);
    }

    if (audioToggleBtn) {
      audioToggleBtn.addEventListener("click", toggleAudio);
    }

    if (openComposerBtn) {
      openComposerBtn.addEventListener("click", () => toggleComposerDrawer());
    }

    if (bottomComposeBtn) {
      bottomComposeBtn.addEventListener("click", () => toggleComposerDrawer(true));
    }

    if (closeComposerBtn) {
      closeComposerBtn.addEventListener("click", () => toggleComposerDrawer(false));
    }

    [inputRecipient, inputSender, inputCustomMsg].forEach((inputEl) => {
      if (inputEl) {
        inputEl.addEventListener("input", updateShareUrlPreview);
      }
    });

    if (urlGeneratorForm) {
      urlGeneratorForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const newRelativeUrl = buildShareableUrl(window.location.pathname);
        window.history.pushState({}, "", newRelativeUrl);
        applyUrlParameters();
        toggleComposerDrawer(false);
        resealEnvelope();
      });
    }

    if (copyShareUrlBtn) {
      copyShareUrlBtn.addEventListener("click", async () => {
        const liveUrl = buildShareableUrl(
          `${window.location.origin}${window.location.pathname}`
        );
        try {
          await navigator.clipboard.writeText(liveUrl);
          if (copyBtnLabel) copyBtnLabel.textContent = "Copied Shareable Link!";
          setTimeout(() => {
            if (copyBtnLabel) copyBtnLabel.textContent = "Copy Shareable URL";
          }, 2200);
        } catch (_) {
          if (copyBtnLabel) copyBtnLabel.textContent = "Select URL Above to Copy";
        }
      });
    }

    if (resetDefaultUrlBtn) {
      resetDefaultUrlBtn.addEventListener("click", () => {
        if (inputRecipient) inputRecipient.value = "";
        if (inputSender) inputSender.value = "";
        if (inputCustomMsg) inputCustomMsg.value = "";
        window.history.pushState({}, "", window.location.pathname);
        applyUrlParameters();
        updateShareUrlPreview();
        resealEnvelope();
      });
    }

    window.addEventListener("popstate", () => {
      applyUrlParameters();
    });
  }

  // Initialize App
  applyUrlParameters();
  initEvents();
  initParchmentCanvas();
})();
