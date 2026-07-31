// This script runs in <head>. Event delegation makes the toggle interactive as
// soon as the script loads, without waiting for deferred page resources.
document.addEventListener("click", function(event) {
    const target = event.target;
    if (!(target instanceof Element) || !target.closest("#light-toggle")) {
        return;
    }

    toggleTheme(getStoredTheme());
});
