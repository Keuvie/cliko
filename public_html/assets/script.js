/*jshint esversion: 6 */

const uuid = window.location.hash.substr(1);

const paramString = document.currentScript.src.split("?")[1];
const queryString = new URLSearchParams(paramString);
const version = queryString.get("version");

const populateStorage = () => {
    localStorage.clear();
    localStorage.setItem("version", version);
    localStorage.setItem("asciinema", JSON.stringify({
        autoplay: false,
        loop: false,
        speed: 1,
        idletimelimit: 2,
        theme: "asciinema"
    }));
};

const setFormValues = (formID) => {
    var formElem = document.getElementById(formID);
    var values = JSON.parse(localStorage.getItem(formElem.getAttribute("data-name")));

    for (var [key, value] of Object.entries(values)) {
        var formItem = formElem.querySelector("[name=" + key + "]");
        if (formItem.type == "checkbox") {
            formItem.checked = value;
        } else {
            formItem.value = value;
        }
    }
};

if (!localStorage.getItem("version") || (localStorage.getItem("version") != version)) {
    populateStorage();
    setFormValues("form-settings");
} else {
    setFormValues("form-settings");
}

const isModalOpen = (e) => !(!e.hasAttribute("open") || "false" == e.getAttribute("open"));

const toggleModal = (e) => {
    e.preventDefault();
    e = document.getElementById(e.currentTarget.getAttribute("data-target"));
    e.setAttribute("open", !isModalOpen(e));
};

const saveForm = (e) => {
    var formData = new FormData(e);
    localStorage.setItem(e.getAttribute("data-name"), JSON.stringify(Object.fromEntries(formData)));
};

const create_player = (url) => {
    const player = AsciinemaPlayer.create(
        url,
        document.getElementById("player"),
        JSON.parse(localStorage.getItem("asciinema")) || {}
    );
};

if (uuid) create_player(["/casts", uuid].join("/"));
