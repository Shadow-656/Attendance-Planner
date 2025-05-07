function calculateMissedClasses() {
    const totalClasses = parseInt(document.getElementById('totalClasses').value);
    const resultsDiv = document.getElementById('results');
    
    if (isNaN(totalClasses) || totalClasses <= 0) {
        resultsDiv.innerHTML = '<p style="color: red;">Please enter a valid number of total classes.</p>';
        return;
    }

    const attendanceThresholds = {
        95: Math.floor(totalClasses * (1 - 0.95)),
        90: Math.floor(totalClasses * (1 - 0.90)),
        85: Math.floor(totalClasses * (1 - 0.85)),
        80: Math.floor(totalClasses * (1 - 0.80)),
        75: Math.floor(totalClasses * (1 - 0.75)),
    };

    let resultHTML = '<h3>Results:</h3>';
    for (let percentage in attendanceThresholds) {
        resultHTML += `<p class="result" style="margin-bottom: 10px;">You can miss <a class="class">${attendanceThresholds[percentage]}</a> classes for attendance above <a class="percentage">${percentage}%</a></p>`;
    }

    resultsDiv.innerHTML = resultHTML;
}

document.getElementById('totalClasses').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        calculateMissedClasses();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const themeToggleButton = document.getElementById("theme-toggle-btn");
    const body = document.body;

    if (!themeToggleButton) {
        console.error("Theme toggle button not found!");
        return;
    }

    const sunIcon = themeToggleButton.querySelector(".icon-sun");
    const moonIcon = themeToggleButton.querySelector(".icon-moon");
    
    if (!sunIcon || !moonIcon) {
        console.error("Theme icons not found within the toggle button!");
    }

    const applyTheme = (theme) => {
        if (theme === "dark") {
            body.classList.add("dark-mode");
            body.classList.remove("light-mode");
        } else {
            body.classList.remove("dark-mode");
            body.classList.add("light-mode");
        }

        if (sunIcon) {
            sunIcon.style.display = theme === "light" ? "inline" : "none";
        }
        if (moonIcon) {
            moonIcon.style.display = theme === "dark" ? "inline" : "none";
        }

        themeToggleButton.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} mode`);
        themeToggleButton.setAttribute("aria-pressed", theme === "dark");
    };

    const getCurrentThemePreference = () => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            return savedTheme;
        }
        if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
            return "dark";
        }
        return "light";
    };

    let currentTheme = getCurrentThemePreference();
    applyTheme(currentTheme);

    themeToggleButton.addEventListener("click", () => {
        currentTheme = body.classList.contains("dark-mode") ? "light" : "dark";
        localStorage.setItem("theme", currentTheme);
        applyTheme(currentTheme);
    });

    if (window.matchMedia) {
        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", event => {
            if (!localStorage.getItem("theme")) {
                currentTheme = event.matches ? "dark" : "light";
                applyTheme(currentTheme);
            }
        });
    }
});