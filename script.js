const API_KEY = "YOUR_GOOGLE_API_KEY";
const API_URL = "https://translation.googleapis.com/language/translate/v2";

const languageMap = {
    "af": "Afrikaans", "sq": "Albanian", "am": "Amharic", "ar": "Arabic",
    "hy": "Armenian", "az": "Azerbaijani", "eu": "Basque", "bn": "Bengali",
    "bs": "Bosnian", "bg": "Bulgarian", "ca": "Catalan", "zh": "Chinese",
    "hr": "Croatian", "cs": "Czech", "da": "Danish", "nl": "Dutch",
    "en": "English", "et": "Estonian", "fi": "Finnish", "fr": "French",
    "de": "German", "el": "Greek", "gu": "Gujarati", "hi": "Hindi",
    "hu": "Hungarian", "is": "Icelandic", "id": "Indonesian", "it": "Italian",
    "ja": "Japanese", "kn": "Kannada", "ko": "Korean", "lv": "Latvian",
    "lt": "Lithuanian", "ms": "Malay", "ml": "Malayalam", "mr": "Marathi",
    "ne": "Nepali", "no": "Norwegian", "fa": "Persian", "pl": "Polish",
    "pt": "Portuguese", "pa": "Punjabi", "ro": "Romanian", "ru": "Russian",
    "sr": "Serbian", "si": "Sinhala", "sk": "Slovak", "sl": "Slovenian",
    "es": "Spanish", "sw": "Swahili", "sv": "Swedish", "ta": "Tamil",
    "te": "Telugu", "th": "Thai", "tr": "Turkish", "uk": "Ukrainian",
    "ur": "Urdu", "vi": "Vietnamese", "cy": "Welsh"
};

document.addEventListener("DOMContentLoaded", () => {
    const sourceLang = document.getElementById("source-lang");
    const targetLang = document.getElementById("target-lang");
    const inputText = document.getElementById("input-text");
    const outputText = document.getElementById("output-text");
    const translateBtn = document.getElementById("translate-btn");
    const swapBtn = document.getElementById("swap-languages");
    const copyBtn = document.getElementById("copy-btn");
    const clearBtn = document.getElementById("clear-btn");
    const themeToggle = document.getElementById("theme-toggle");

    // Populate language dropdowns
    function loadLanguages() {
        Object.entries(languageMap).forEach(([code, name]) => {
            let option1 = new Option(name, code);
            let option2 = new Option(name, code);
            sourceLang.appendChild(option1);
            targetLang.appendChild(option2);
        });

        sourceLang.value = "en";  // Default: English
        targetLang.value = "es";  // Default: Spanish
    }

    // Translate text using Google Translate API
    async function translateText() {
        const text = inputText.value.trim();
        if (!text) return;

        const source = sourceLang.value;
        const target = targetLang.value;

        try {
            const response = await fetch(`${API_URL}?key=${API_KEY}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    q: text,
                    source: source,
                    target: target,
                    format: "text",
                }),
            });

            const data = await response.json();
            console.log("API Response:", data);  // Log API response for debugging

            if (data.error) {
                outputText.value = "Error: " + data.error.message;
            } else {
                outputText.value = data.data.translations[0].translatedText;
            }
        } catch (error) {
            console.error("Translation error:", error);
            outputText.value = "Error occurred during translation.";
        }
    }

    // Swap source and target languages
    swapBtn.addEventListener("click", () => {
        [sourceLang.value, targetLang.value] = [targetLang.value, sourceLang.value];
    });

    // Copy translated text
    copyBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(outputText.value);
        alert("Copied to clipboard!");
    });

    // Clear text fields
    clearBtn.addEventListener("click", () => {
        inputText.value = "";
        outputText.value = "";
    });

    // Toggle dark mode
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        themeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
    });

    translateBtn.addEventListener("click", translateText);

    loadLanguages();  // Initialize language options
});