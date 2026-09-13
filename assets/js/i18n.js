const translations = {};
const DEFAULT_LANGUAGE = "en";

async function loadLanguage(language) {
    if (!translations[language]) {
        const response = await fetch(`assets/locales/${language}.json`);
        translations[language] = await response.json();
    }

    applyTranslations(language);
    setDirection(language);

    localStorage.setItem("language", language);
}

function applyTranslations(language) {
    document.querySelectorAll("[data-i18n]").forEach(element => {
        const key = element.dataset.i18n;
        const value = getTranslation(key, language);

        if (value === undefined) return;

        if (element.dataset.i18nAttr) {
            element.setAttribute(element.dataset.i18nAttr, value);
        } else if (element.dataset.i18nHtml === "true") {
            element.innerHTML = value;
        } else {
            element.textContent = value;
        }
    });
}

function getTranslation(key, language) {
    return key.split(".").reduce(
        (object, property) => object?.[property],
        translations[language]
    );
}

function setDirection(language) {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "fa" ? "rtl" : "ltr";
}

const savedLanguage = localStorage.getItem("language") || DEFAULT_LANGUAGE;
loadLanguage("fa");

//۱۲۳۴۵۶۷۸۹۰