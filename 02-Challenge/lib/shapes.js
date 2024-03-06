// Generates a circle:
class Circle {
    constructor(cx, cy, r) {
        this.cx = cx;
        this.cy = cy;
        this.r = r;
    }
    setColor(color) {
        this.color = color;
    }
    render() {
        return `<circle cx="${this.cx}" cy="${this.cy}" r="${this.r}" fill="${this.color}" />`
    }
};

// Generates a triangle:
class Triangle {
    constructor(points) {
        this.points = points;
    }
    setColor(color) {
        this.color = color;
    }
    render() {
        return `<polygon points="${this.points}" fill="${this.color}" />`
    }
};

// Generates a square:
class Square {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    setColor(color) {
        this.color = color;
    }
    render() {
        return `<rect x="${this.x}" y="${this.y}" width="${this.width}" height="${this.height}" fill="${this.color}" />`
    }
};

module.exports = { Circle, Triangle, Square };