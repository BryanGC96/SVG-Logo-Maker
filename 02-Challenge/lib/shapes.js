// Generates a circle:
const circleShape = (`<circle cx="150" cy="100" r="80" `);

// Generates a square:
const squareShape = (`<rect x="85" y="40" width="130" height="130" `);

// Generates a triangle:
const triangleShape = (`<polyline points="150 10, 1 300, 500 700, 150 10" `);

module.exports = { circleShape, squareShape, triangleShape };