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



const sw     = document.getElementById('langSwitch');
const coin   = document.getElementById('flagCoin');
const knob   = document.getElementById('knob');
const shine  = document.getElementById('shine');
const row    = sw.closest('.switch-row');

let turns = 0;        // total quarter-turns of rotation, always increasing
let knobLeftPx = 0;   // resting position of the knob
const knobTravel = 55 - 30 ; // track width - knob width - both insets

sw.addEventListener('click', () => {
    const goingRight = sw.getAttribute('data-state') === 'left';
    const newState = goingRight ? 'right' : 'left';


    sw.setAttribute('data-state', newState);
    sw.setAttribute('aria-checked', newState === 'right' ? 'true' : 'false');

    row.querySelectorAll('.lang-label').forEach(lbl => {
        lbl.classList.toggle('active', lbl.dataset.side === newState);
    });

    // Change website language
    const language = newState === 'right' ? 'fa' : 'en';
    loadLanguage(language);

    turns += 1;
    const fromAngle = (turns - 1) * 180;
    const toAngle   = turns * 180;

    // coin-flip: rotate on Y, squash width at the midpoint, lift up slightly
    coin.animate([
        { transform: `rotateY(${fromAngle}deg) scale(1, 1)`,      offset: 0   },
        { transform: `rotateY(${fromAngle + 90}deg) scale(0.55, 1.12)`, offset: 0.5 },
        { transform: `rotateY(${toAngle}deg) scale(1, 1)`,        offset: 1   }
    ], {
        duration: 550,
        easing: 'cubic-bezier(.33,1,.68,1)',
        fill: 'forwards'
    });

    // knob: slide with a springy overshoot, plus a little squash of its own
    const fromLeft = goingRight ? 1 : knobTravel;
    const toLeft   = goingRight ? knobTravel : 1;
    knob.animate([
        { left: `${fromLeft}px`, transform: 'scale(1,1)' },
        { left: `${(fromLeft + toLeft) / 2}px`, transform: 'scale(1.15,0.85)', offset: 0.5 },
        { left: `${toLeft + (goingRight ? 6 : -6)}px`, transform: 'scale(0.95,1.05)', offset: 0.8 },
        { left: `${toLeft}px`, transform: 'scale(1,1)' }
    ], {
        duration: 550,
        easing: 'cubic-bezier(.33,1,.68,1)',
        fill: 'forwards'
    }).onfinish = () => { knob.style.left = `${toLeft}px`; };

    // light sweep across the flag as it turns
    shine.animate([
        { opacity: 0,   transform: 'translateX(-40%)' },
        { opacity: 0.9, transform: 'translateX(0%)', offset: 0.5 },
        { opacity: 0,   transform: 'translateX(40%)' }
    ], {
        duration: 550,
        easing: 'ease-out'
    });
});