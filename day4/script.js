// Select the elements
const noteText = document.getElementById("note-text");
const charCount = document.getElementById("char-count");
const wordCount = document.getElementById("word-count");
const clearBtn = document.getElementById("clear-btn");
const themeToggle = document.getElementById("theme-toggle");


// Update character and word counts
function updateCounts() {
    const text = noteText.value;
    const characterCount = text.length;

    // Count words
    const trimmedText = text.trim();

    let numberOfWords = 0;

    if (trimmedText.length > 0) {
        numberOfWords = trimmedText.split(/\s+/).length;
    }

    // Update the counters
    charCount.textContent = `${characterCount} / 200 characters`;
    wordCount.textContent = `${numberOfWords} words`;

    // Remove previous warning classes
    charCount.classList.remove("warning", "over");

    // Add the appropriate class
    if (characterCount > 200) {
        charCount.classList.add("over");
    } else if (characterCount > 180) {
        charCount.classList.add("warning");
    }
}


// Save draft to localStorage
function saveDraft() {
    localStorage.setItem("noteDraft", noteText.value);
}


// Clear the note
function clearNote() {
    noteText.value = "";

    updateCounts();

    localStorage.removeItem("noteDraft");
}


// Set the theme
function setTheme(isDark) {
    document.body.classList.toggle("dark", isDark);

    if (isDark) {
        themeToggle.textContent = "Light mode";
        localStorage.setItem("theme", "dark");
    } else {
        themeToggle.textContent = "Dark mode";
        localStorage.setItem("theme", "light");
    }
}


// Handle every input event
noteText.addEventListener("input", function () {
    updateCounts();
    saveDraft();
});


// Clear button
clearBtn.addEventListener("click", function () {
    clearNote();
});


// Escape key inside textarea
noteText.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        clearNote();
    }
});


// Theme toggle button
themeToggle.addEventListener("click", function () {
    const isDark = !document.body.classList.contains("dark");

    setTheme(isDark);
});


// Restore saved data when the page loads
const savedDraft = localStorage.getItem("noteDraft");

if (savedDraft !== null) {
    noteText.value = savedDraft;
}


// Restore saved theme
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    setTheme(true);
} else {
    setTheme(false);
}


// Update counters after restoring saved data
updateCounts();

