// Applies the saved theme before first paint (loaded synchronously in <head>; CSP forbids inline
// scripts). "system" removes the attribute so the prefers-color-scheme media query decides.
(function () {
  var KEY = "domicile:theme";
  var OLD_KEY = "wealthmap:theme"; // before the rename to domicile.wiki
  function apply(choice) {
    var root = document.documentElement;
    if (choice === "light" || choice === "dark") root.setAttribute("data-theme", choice);
    else root.removeAttribute("data-theme");
  }
  var saved = "system";
  try {
    saved = window.localStorage.getItem(KEY) || window.localStorage.getItem(OLD_KEY) || "system";
  } catch (e) {
    /* storage unavailable */
  }
  apply(saved);
  window.domicileTheme = {
    get: function () {
      return saved;
    },
    set: function (choice) {
      saved = choice;
      apply(choice);
      try {
        window.localStorage.setItem(KEY, choice);
      } catch (e) {
        /* ignore */
      }
    },
  };
})();
