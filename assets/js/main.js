"use strict"

// Nav menu
const menuButton = document.getElementById("menu__button");
const menuButtonIcon = menuButton.querySelector("i");
const headerInner = document.getElementById("header__inner");
const nav = document.getElementById("header__nav");

menuButton.addEventListener("click", (e) => {
    if(e.currentTarget.classList.contains("active")) {
        console.log("menu button clicked");
        menuButton.classList.remove("active");
        menuButtonIcon.className = "ri-menu-3-line";
        nav.classList.remove("visible");
        headerInner.classList.remove("visible");
    }else{
        menuButton.classList.add("active");
        menuButtonIcon.className = "ri-close-large-fill";
        nav.classList.add("visible");
        headerInner.classList.add("visible");
    }
})