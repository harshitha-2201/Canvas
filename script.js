const canvas = document.getElementById('bubblesCanvas');
const ctx = canvas.getContext('2d');
const resetButton = document.getElementById('resetButton');



// Define circles with positions and arrows pointing towards them
const circles = [
    { x: 100, y: 50, radius: 30, color: 'red', originalColor: 'red', arrowX: 500, arrowY: 50 },
    { x: 100, y: 150, radius: 30, color: 'blue', originalColor: 'blue', arrowX: 500, arrowY: 150 },
    { x: 100, y: 250, radius: 30, color: 'green', originalColor: 'green', arrowX: 500, arrowY: 250 },
    { x: 100, y: 350, radius: 30, color: 'yellow', originalColor: 'yellow', arrowX: 500, arrowY: 350 }
];

// Function to draw all circles and arrows on the canvas
function drawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    circles.forEach(circle => {
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
        ctx.fillStyle = circle.color;
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.beginPath();
        ctx.moveTo(circle.arrowX, circle.arrowY); 
        ctx.lineTo(circle.arrowX - 40, circle.arrowY); 
        ctx.lineTo(circle.arrowX - 30, circle.arrowY - 10); 
        ctx.moveTo(circle.arrowX - 40, circle.arrowY); 
        ctx.lineTo(circle.arrowX - 30, circle.arrowY + 10); 
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.closePath();
    });
}

// Function to detect if a circle was clicked
function detectCircleClick(x, y) {
    return circles.findIndex(circle => {
        const distance = Math.sqrt((circle.x - x) ** 2+ (circle.y - y) ** 2);
        return distance <= circle.radius; 
    });
}

// Move the arrow towards its corresponding circle
function moveArrow(circleIndex) {
    const circle = circles[circleIndex];
    if (circle.arrowHit) return;

    const interval = setInterval(() => {
        if (circle.arrowX - circle.x <= circle.radius + 10) {
            circle.arrowHit = false;
            circle.color = 'gray'; 
            clearInterval(interval);
            drawCanvas();
            return;
        }
        circle.arrowX -= 5; 
        drawCanvas();
    }, 30);
}

canvas.addEventListener('click', event => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const circleIndex = detectCircleClick(x, y);
    if (circleIndex !== -1) {
        moveArrow(circleIndex);
    }
});

// Reset button functionality
resetButton.addEventListener('click', () => {
    circles.forEach(circle => {
        circle.arrowX = 500; 
        circle.color = circle.originalColor; 
    });
    drawCanvas(); 
});

drawCanvas();
