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
        resultHTML += `<p style="margin-bottom: 10px;">You can miss <a class="class">${attendanceThresholds[percentage]}</a> classes for attendance above <a class="percentage">${percentage}%</a></p>`;
    }

    resultsDiv.innerHTML = resultHTML;
}

document.getElementById('totalClasses').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        calculateMissedClasses();
    }
});