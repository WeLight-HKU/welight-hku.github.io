(function() {
  "use strict";

  var controlSelector = [
    ".publications button.special-btn",
    ".publications button.abstract",
    ".publications button.bibtex"
  ].join(", ");

  document.documentElement.classList.add("publication-controls-ready");

  function getEntry(button) {
    return button.closest(".row-hover-effect");
  }

  function setDetailsState(button, details, expanded) {
    details.classList.toggle("is-expanded", expanded);
    button.setAttribute("aria-expanded", String(expanded));
    button.textContent = expanded ? "Show Less" : "Show More";
  }

  function setSupplementState(button, supplement, expanded) {
    supplement.classList.toggle("open", expanded);
    button.setAttribute("aria-expanded", String(expanded));
  }

  document.addEventListener("click", function(event) {
    var eventTarget = event.target;
    var button = eventTarget instanceof Element ? eventTarget.closest(controlSelector) : null;

    if (!button) {
      return;
    }

    var entry = getEntry(button);
    if (!entry) {
      return;
    }

    event.preventDefault();

    if (button.classList.contains("special-btn")) {
      var details = entry.querySelector(".collapsible-content");
      if (details) {
        var shouldExpand = button.getAttribute("aria-expanded") !== "true";
        setDetailsState(button, details, shouldExpand);
      }
      return;
    }

    var isAbstract = button.classList.contains("abstract");
    var targetSelector = isAbstract ? ".abstract.hidden" : ".bibtex.hidden";
    var otherSelector = isAbstract ? ".bibtex.hidden" : ".abstract.hidden";
    var otherButtonSelector = isAbstract ? "button.bibtex" : "button.abstract";
    var supplement = entry.querySelector(targetSelector);

    if (!supplement) {
      return;
    }

    var shouldOpen = !supplement.classList.contains("open");
    setSupplementState(button, supplement, shouldOpen);

    var otherSupplement = entry.querySelector(otherSelector);
    var otherButton = entry.querySelector(otherButtonSelector);
    if (otherSupplement && otherButton) {
      setSupplementState(otherButton, otherSupplement, false);
    }
  });

})();
