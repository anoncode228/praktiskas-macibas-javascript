"use strict";

const pageStyles = document.getElementById("page-styles");

function activateStyles() {
    pageStyles.media = "all";
}

pageStyles.addEventListener("load", activateStyles, { once: true });

if (pageStyles.sheet) {
    activateStyles();
}

const slides = document.querySelectorAll("[data-carousel]");
const slideImage = document.getElementById("slide-image");
const slideCaption = document.getElementById("slide-caption");
const slideNumber = document.getElementById("slide-number");
const slideTitle = document.getElementById("slide-title");
const slideDescription = document.getElementById("slide-description");
const controls = document.getElementById("carousel-controls");
const previousButton = document.getElementById("previous-slide");
const nextButton = document.getElementById("next-slide");
const playbackButton = document.getElementById("toggle-playback");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const slideDelay = 5000;

let currentSlide = 0;
let timer = null;

function showSlide(index) {
    currentSlide = (index + slides.length) % slides.length;

    const slide = slides[currentSlide];
    const image = slide.querySelector("img");

    slideImage.setAttribute("width", image.getAttribute("width"));
    slideImage.setAttribute("height", image.getAttribute("height"));
    slideImage.srcset = image.srcset;
    slideImage.src = image.src;
    slideImage.alt = image.alt;
    slideNumber.textContent = (currentSlide + 1) + " / " + slides.length;
    slideTitle.textContent = slide.querySelector("h3").textContent;
    slideDescription.textContent = slide.querySelector(".photo-description").textContent;
}

function advanceAutomatically() {
    showSlide(currentSlide + 1);
    timer = window.setTimeout(advanceAutomatically, slideDelay);
}

function startPlayback() {
    if (timer !== null) {
        return;
    }

    slideCaption.setAttribute("aria-live", "off");
    playbackButton.textContent = "Apturēt automātisko pārslēgšanu";
    timer = window.setTimeout(advanceAutomatically, slideDelay);
}

function stopPlayback() {
    window.clearTimeout(timer);
    timer = null;
    slideCaption.setAttribute("aria-live", "polite");
    playbackButton.textContent = "Atsākt automātisko pārslēgšanu";
}

function changeSlide(direction) {
    showSlide(currentSlide + direction);

    if (timer !== null) {
        window.clearTimeout(timer);
        timer = window.setTimeout(advanceAutomatically, slideDelay);
    }
}

previousButton.addEventListener("click", function () {
    changeSlide(-1);
});

nextButton.addEventListener("click", function () {
    changeSlide(1);
});

playbackButton.addEventListener("click", function () {
    if (timer !== null) {
        stopPlayback();
    } else {
        startPlayback();
    }
});

controls.addEventListener("focusin", function (event) {
    if (!controls.contains(event.relatedTarget) && event.target.matches(":focus-visible")) {
        stopPlayback();
    }
});

reducedMotion.addEventListener("change", function (event) {
    if (event.matches) {
        stopPlayback();
    }
});

showSlide(0);
controls.hidden = false;

if (!reducedMotion.matches) {
    startPlayback();
}
document.querySelectorAll("a[href]").forEach(function (link) {
    link.addEventListener("keydown", function (event) {
        if (event.key === " " && !event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
            event.preventDefault();
            if (!event.repeat) {
                link.click();
            }
        }
    });
});
