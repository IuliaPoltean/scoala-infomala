window.onbeforeunload = function () {
    document.querySelector("#loading").classList.remove("hidden");
};

window.addEventListener('load', (event) => {
    setTimeout(function () {
        document.querySelector("#loading").classList.add("hidden");
    }, 500);
})