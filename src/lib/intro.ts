// Shared rules for the loading intro: it plays once per browser session,
// can be skipped, and is skipped for visitors who prefer reduced motion.
export const INTRO_SEEN_KEY = "intro-seen";
export const INTRO_DONE_EVENT = "intro:done";

// Failsafe: if the intro video never ends (slow network, autoplay blocked),
// the intro closes after this long so the site is never held back.
export const INTRO_MAX_MS = 6000;

export const shouldSkipIntro = () => {
  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return true;
    }
    return sessionStorage.getItem(INTRO_SEEN_KEY) === "1";
  } catch {
    return false;
  }
};

export const markIntroSeen = () => {
  try {
    sessionStorage.setItem(INTRO_SEEN_KEY, "1");
  } catch {
    // Storage can be unavailable (private mode); the intro then just replays.
  }
};

// Inline script that runs before first paint, so returning visitors never see
// the intro overlay flash. It marks <html>, and globals.css hides the overlay.
export const introGuardScript = `try{if(matchMedia("(prefers-reduced-motion: reduce)").matches||sessionStorage.getItem("${INTRO_SEEN_KEY}")==="1"){document.documentElement.classList.add("intro-skip")}}catch(e){}`;
