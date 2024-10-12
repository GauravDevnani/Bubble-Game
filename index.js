var intervalID;
var timer = 30;
var score = 0;
var currentHitNumber = 0; // Renamed to avoid confusion

function increaseScore() {
    score += 10;
    document.querySelector("#scoreval").textContent = score;
}

document.querySelector("#pbtn").addEventListener("click", function(dets) {
    // Check if the clicked element has the class 'bubble'
    if (dets.target.classList.contains('bubble')) {
        // Retrieve the number from the bubble's text content
        var clickedNumber = Number(dets.target.textContent);
        // Compare the clicked number with the current hit number
        if (clickedNumber === currentHitNumber) {
            increaseScore();
            makeBubble(); // Refresh bubbles
            getNewHit(); // Get a new hit number
        }
    }
});

function makeBubble() {
    var clutter = "";
    for (var i = 1; i <= 168; i++) {
        var hitNumber = Math.floor(Math.random() * 10); // Generate number for each bubble
        // Create bubble with number
        clutter += `<div class="bubble">${hitNumber}</div>`; 
    }
    document.querySelector("#pbtn").innerHTML = clutter;
}

function getNewHit() {
    currentHitNumber = Math.floor(Math.random() * 10); // Set the current hit number
    document.querySelector('#hitval').textContent = currentHitNumber;
}

function runTimer() {
    if (!intervalID) { // Check if the timer is not already running
        intervalID = setInterval(function() {
            if (timer > 0) {
                timer--;
                document.querySelector("#Timerval").textContent = timer;
            } else {
                clearInterval(intervalID); // Stop the timer when it reaches 0
                intervalID = null; // Reset interval ID
                document.querySelector("#pbtn").innerHTML = `<h1>Game Over<h1>`; // Clear bubbles
            }
        }, 1000);

        // Reset the game state
        score = 0;
        currentHitNumber = 0;
        document.querySelector("#scoreval").textContent = score; 
        document.querySelector('#hitval').textContent = currentHitNumber;

        // Initialize bubbles and hit number
        makeBubble();
        getNewHit();
    }
}

document.querySelector(".button").addEventListener("click", runTimer);

// Initialize values on page load
document.querySelector("#scoreval").textContent = score;
document.querySelector('#hitval').textContent = currentHitNumber;

// Initialize bubbles
makeBubble();
