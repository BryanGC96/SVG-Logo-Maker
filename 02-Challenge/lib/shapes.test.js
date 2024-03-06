const { Triangle, Square, Circle } = require('./shapes');

describe('Triangle', () => {
    it('Should render corresponding SVG string with given shape color.', () => {
        const shape = new Triangle("150, 18 244, 182 56, 182");
        shape.setColor("blue");
        expect(shape.render()).toEqual('<polygon points="150, 18 244, 182 56, 182" fill="blue" />');
    });
});

describe('Square', () => {
    it('Should render corresponding SVG string with given shape color.', () => {
        const shape = new Square(85, 40, 130, 130);
        shape.setColor("black");
        expect(shape.render()).toEqual('<rect x="85" y="40" width="130" height="130" fill="black" />');
    });
});

describe('Circle', () => {
    it('Should render corresponding SVG string with given shape color.', () => {
        const shape = new Circle(150, 100, 80);
        shape.setColor("red");
        expect(shape.render()).toEqual('<circle cx="150" cy="100" r="80" fill="red" />');
    });
});