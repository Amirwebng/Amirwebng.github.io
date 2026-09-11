"use strict"

// Nav menu
const menuButton = document.getElementById("menu__button");
const menuButtonIcon = menuButton.querySelector("i");
const headerInner = document.getElementById("header__inner");
const nav = document.getElementById("header__nav");

menuButton.addEventListener("click", (e) => {
    if(e.currentTarget.classList.contains("active")) {
        menuButton.classList.remove("active");
        menuButtonIcon.className = "ri-menu-line";
        nav.classList.remove("visible");
        headerInner.classList.remove("visible");
    }else{
        menuButton.classList.add("active");
        menuButtonIcon.className = "ri-close-large-fill";
        nav.classList.add("visible");
        headerInner.classList.add("visible");
    }
})

const favButton = document.querySelectorAll(".recipe-card__favorite");
const favButtonIcon = document.querySelectorAll(".recipe-card__favorite i");
favButton.forEach(fav => {
    const favIcon = fav.querySelector("i");
    fav.addEventListener("click", (e) => {
        if(e.currentTarget.classList.contains("active")) {
            fav.classList.remove("active");
            favIcon.classList.replace("ri-heart-fill","ri-heart-line");
        }else{
            fav.classList.add("active");
            favIcon.classList.replace("ri-heart-line","ri-heart-fill");
        }
    })
})
