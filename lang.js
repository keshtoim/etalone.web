// Russian for Russian-speaking browsers, English otherwise; a picked language is remembered.
(function () {
    var root = document.documentElement;
    var saved = null;
    try { saved = localStorage.getItem("lang"); } catch (e) {}
    var lang = saved || (/^ru\b/i.test(navigator.language || "") ? "ru" : "en");

    function apply(value) {
        root.lang = value;
        document.querySelectorAll(".lang button").forEach(function (button) {
            button.setAttribute("aria-pressed", String(button.dataset.set === value));
        });
        var title = document.querySelector("title[data-" + value + "]");
        if (title) document.title = title.getAttribute("data-" + value);
    }

    apply(lang);
    document.addEventListener("click", function (event) {
        var button = event.target.closest(".lang button");
        if (!button) return;
        try { localStorage.setItem("lang", button.dataset.set); } catch (e) {}
        apply(button.dataset.set);
    });
})();
